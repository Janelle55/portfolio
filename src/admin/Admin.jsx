import { useCallback, useEffect, useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase.js';
import { useTheme } from '../useTheme.js';
import { SECTIONS, SETTINGS_FIELDS, OWNER_EMAIL } from './sections.js';
import './admin.css';

const NAV = [
  ['overview', 'Overview'],
  ['projects', 'Projects'],
  ['events', 'Events'],
  ['table_items', "Akokua's Table"],
  ['music_artists', 'Music'],
  ['settings', 'Resume & details'],
];

function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return undefined;
    const t = setTimeout(() => setMsg(null), 2400);
    return () => clearTimeout(t);
  }, [msg]);
  return [msg, setMsg];
}

// Phone photos can be 5 MB or more. Shrink images to at most 1600px wide
// (JPEG, good quality) so the homepage stays fast. PDFs upload as they are.
async function shrinkImage(file) {
  if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 900000) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

async function uploadFile(rawFile, folder) {
  const file = await shrinkImage(rawFile);
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { contentType: file.type || undefined });
  if (error) throw error;
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}

/* ---------------- Sign in ---------------- */
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) setError('That email and password did not match. Try again.');
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <div className="adm-medal" aria-hidden="true" />
        <h1>
          Welcome back, <em>boss.</em>
        </h1>
        <p className="adm-sub">Only you can sign in here. Visitors never see this page.</p>
        <label className="adm-field" htmlFor="lg-email">
          Email
          <input id="lg-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="adm-field" htmlFor="lg-pass">
          Password
          <input id="lg-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="adm-err">{error}</p>}
        <button className="adm-btn adm-btn-ink" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <a className="adm-back" href="/">Back to the site</a>
      </form>
    </div>
  );
}

/* ---------------- Editor form ---------------- */
function Editor({ section, row, onCancel, onSaved, toast }) {
  const cfg = SECTIONS[section];
  const [vals, setVals] = useState(() => ({ ...cfg.blank, published: false, ...(row || {}) }));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setVals((s) => ({ ...s, [k]: v }));

  async function onImage(key, file) {
    if (!file) return;
    try {
      setBusy(true);
      set(key, await uploadFile(file, section));
      toast('Image uploaded');
    } catch (err) {
      setError(`The image did not upload (${err?.message || 'unknown error'}). Try again, or try a different photo.`);
    } finally {
      setBusy(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    const missing = cfg.fields.find((f) => f.required && !String(vals[f.key] || '').trim());
    if (missing) {
      setError(`Add a ${missing.label.toLowerCase()} so visitors know what this is.`);
      return;
    }
    const payload = {};
    for (const f of cfg.fields) {
      let v = vals[f.key];
      if (f.type === 'tags') v = Array.isArray(v) ? v : String(v || '').split(',').map((t) => t.trim()).filter(Boolean);
      else if (f.type === 'checkbox') v = Boolean(v);
      else if (typeof v === 'string') v = v.trim() || null;
      payload[f.key] = v ?? null;
    }
    payload.published = Boolean(vals.published);
    if (section === 'projects') {
      const slugify = (t) => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      payload.slug = slugify(payload.slug || payload.title) || null;
    }
    setBusy(true);
    const q = row
      ? supabase.from(cfg.table).update(payload).eq('id', row.id)
      : supabase.from(cfg.table).insert({ ...payload, sort_order: Date.now() % 100000000 });
    const { error: err } = await q;
    setBusy(false);
    if (err) {
      setError('Saving did not work. Check your connection and try again.');
      return;
    }
    onSaved(payload.published ? 'Saved and published' : 'Saved as draft', `${row ? 'Edited' : 'Added'} ${payload.title || payload.name}`);
  }

  return (
    <form className="adm-editor" onSubmit={save} noValidate>
      <h2>{row ? 'Edit entry' : 'New entry'}</h2>
      <div className="adm-grid">
        {cfg.fields.map((f) => {
          const id = `f-${section}-${f.key}`;
          if (f.type === 'checkbox') {
            return (
              <label key={f.key} className="adm-check" htmlFor={id}>
                <input id={id} type="checkbox" checked={Boolean(vals[f.key])} onChange={(e) => set(f.key, e.target.checked)} />
                {f.label}
              </label>
            );
          }
          if (f.type === 'image') {
            return (
              <div key={f.key} className="adm-field adm-wide">
                <label htmlFor={id}>{f.label}</label>
                {vals[f.key] && (
                  <div className="adm-thumb">
                    <img src={vals[f.key]} alt="" />
                    <button type="button" className="adm-btn adm-btn-line adm-sm" onClick={() => set(f.key, null)}>
                      Remove image
                    </button>
                  </div>
                )}
                <input id={id} type="file" accept="image/*" onChange={(e) => onImage(f.key, e.target.files?.[0])} />
              </div>
            );
          }
          return (
            <label key={f.key} className={`adm-field${f.type === 'textarea' ? ' adm-wide' : ''}`} htmlFor={id}>
              {f.label}
              {f.type === 'textarea' ? (
                <textarea id={id} rows={3} value={vals[f.key] || ''} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)} />
              ) : f.type === 'select' ? (
                <select id={id} value={vals[f.key] || f.options[0]} onChange={(e) => set(f.key, e.target.value)}>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={f.type === 'url' ? 'url' : 'text'}
                  value={f.type === 'tags' ? (Array.isArray(vals[f.key]) ? vals[f.key].join(', ') : vals[f.key] || '') : vals[f.key] || ''}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
            </label>
          );
        })}
        <label className="adm-check" htmlFor={`f-${section}-published`}>
          <input id={`f-${section}-published`} type="checkbox" checked={Boolean(vals.published)} onChange={(e) => set('published', e.target.checked)} />
          Show on my site
        </label>
      </div>
      {error && <p className="adm-err">{error}</p>}
      <div className="adm-actions-end">
        <button className="adm-btn adm-btn-line" type="button" onClick={onCancel}>Cancel</button>
        <button className="adm-btn adm-btn-gold" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  );
}

/* ---------------- List of entries ---------------- */
function ListView({ section, rows, reload, toast, log, startNew, clearNew }) {
  const cfg = SECTIONS[section];
  const [editing, setEditing] = useState(startNew ? 'new' : null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (startNew) {
      setEditing('new');
      clearNew();
    }
  }, [startNew, clearNew]);

  async function toggle(r) {
    const { error } = await supabase.from(cfg.table).update({ published: !r.published }).eq('id', r.id);
    if (error) return toast('That did not save. Try again.');
    log(`${r.published ? 'Unpublished' : 'Published'} ${r.title || r.name}`);
    toast(r.published ? 'Moved to drafts' : 'Published');
    reload();
  }

  async function remove(r) {
    const { error } = await supabase.from(cfg.table).delete().eq('id', r.id);
    setConfirmId(null);
    if (error) return toast('That did not delete. Try again.');
    log(`Deleted ${r.title || r.name}`);
    toast('Deleted');
    reload();
  }

  async function move(index, dir) {
    const other = rows[index + dir];
    const cur = rows[index];
    if (!other) return;
    await Promise.all([
      supabase.from(cfg.table).update({ sort_order: other.sort_order }).eq('id', cur.id),
      supabase.from(cfg.table).update({ sort_order: cur.sort_order }).eq('id', other.id),
    ]);
    reload();
  }

  const editRow = editing && editing !== 'new' ? rows.find((r) => r.id === editing) : null;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>{cfg.label}</h1>
          <p className="adm-sub">{cfg.hint}</p>
        </div>
        <button className="adm-btn adm-btn-ink" type="button" onClick={() => setEditing('new')}>+ {cfg.addLabel}</button>
      </div>

      {editing && (
        <Editor
          key={editing}
          section={section}
          row={editRow}
          toast={toast}
          onCancel={() => setEditing(null)}
          onSaved={(msg, entry) => {
            setEditing(null);
            toast(msg);
            log(entry);
            reload();
          }}
        />
      )}

      {rows.length === 0 ? (
        <p className="adm-empty">Nothing here yet. Use "{cfg.addLabel}" to create your first one.</p>
      ) : (
        <div className="adm-rows">
          {rows.map((r, i) => (
            <div className="adm-row" key={r.id}>
              <div className="adm-order">
                <button type="button" aria-label={`Move ${r.title || r.name} up`} disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                <button type="button" aria-label={`Move ${r.title || r.name} down`} disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
              </div>
              {r.image_url || r.photo_url ? (
                <img className="adm-sw adm-sw-img" src={r.image_url || r.photo_url} alt="" />
              ) : (
                <div className="adm-sw" style={{ background: cfg.swatch(r) }} aria-hidden="true" />
              )}
              <div className="adm-meta">
                <div className="adm-t">{r.title || r.name}</div>
                <div className="adm-s">{cfg.subtitle(r)}</div>
              </div>
              <span className={`adm-chip ${r.published ? 'live' : 'draft'}`}>{r.published ? 'Published' : 'Draft'}</span>
              <div className="adm-acts">
                <button className="adm-btn adm-btn-line adm-sm" type="button" onClick={() => setEditing(r.id)}>Edit</button>
                <button className="adm-btn adm-btn-ink adm-sm" type="button" onClick={() => toggle(r)}>{r.published ? 'Unpublish' : 'Publish'}</button>
                <button className="adm-btn adm-btn-danger adm-sm" type="button" onClick={() => setConfirmId(r.id)}>Delete</button>
              </div>
              {confirmId === r.id && (
                <div className="adm-confirm">
                  <span>Delete "{r.title || r.name}"? This removes it from your site.</span>
                  <button className="adm-btn adm-btn-danger adm-sm" type="button" onClick={() => remove(r)}>Delete it</button>
                  <button className="adm-btn adm-btn-line adm-sm" type="button" onClick={() => setConfirmId(null)}>Keep it</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- Settings + resume ---------------- */
function SettingsView({ settings, reload, toast, log }) {
  const [vals, setVals] = useState(settings);
  const [busy, setBusy] = useState(false);
  useEffect(() => setVals(settings), [settings]);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    const rows = SETTINGS_FIELDS.map((f) => ({ key: f.key, value: (vals[f.key] || '').trim() || null }));
    const { error } = await supabase.from('site_settings').upsert(rows);
    setBusy(false);
    if (error) return toast('That did not save. Try again.');
    log('Updated site details');
    toast('Saved');
    reload();
  }

  async function onResume(file) {
    if (!file) return;
    if (file.type !== 'application/pdf') return toast('Choose a PDF file.');
    try {
      setBusy(true);
      const url = await uploadFile(file, 'resume');
      const { error } = await supabase.from('site_settings').upsert({ key: 'resume_url', value: url });
      if (error) throw error;
      log('Replaced resume');
      toast('Resume replaced');
      reload();
    } catch {
      toast('The resume did not upload. Try again.');
    } finally {
      setBusy(false);
    }
  }

  const resumeUrl = settings.resume_url || '/resume.pdf';

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Resume &amp; details</h1>
          <p className="adm-sub">Your resume file and the small lines of text around your site.</p>
        </div>
      </div>
      <section className="adm-box adm-file">
        <div className="adm-pdf" aria-hidden="true">PDF</div>
        <div className="adm-meta">
          <div className="adm-t">Current resume</div>
          <a className="adm-s" href={resumeUrl} target="_blank" rel="noreferrer">Open it</a>
        </div>
      </section>
      <label className="adm-drop" htmlFor="resume-file">
        <strong>Upload a new PDF to replace it</strong>
        <span className="adm-sub">Every "Download resume" button switches to the new file right away. Leave your phone number and address off it.</span>
        <input id="resume-file" type="file" accept="application/pdf" disabled={busy} onChange={(e) => onResume(e.target.files?.[0])} />
      </label>
      <form className="adm-editor" onSubmit={save}>
        <h2>Details</h2>
        <div className="adm-grid">
          {SETTINGS_FIELDS.map((f) => (
            <label key={f.key} className={`adm-field${f.type === 'textarea' ? ' adm-wide' : ''}`} htmlFor={`s-${f.key}`}>
              {f.label}
              {f.type === 'textarea' ? (
                <textarea id={`s-${f.key}`} rows={3} value={vals[f.key] || ''} onChange={(e) => setVals((s) => ({ ...s, [f.key]: e.target.value }))} />
              ) : (
                <input id={`s-${f.key}`} type="text" value={vals[f.key] || ''} placeholder={f.placeholder} onChange={(e) => setVals((s) => ({ ...s, [f.key]: e.target.value }))} />
              )}
            </label>
          ))}
        </div>
        <div className="adm-actions-end">
          <button className="adm-btn adm-btn-gold" type="submit" disabled={busy}>Save details</button>
        </div>
      </form>
    </>
  );
}

/* ---------------- Dashboard shell ---------------- */
function Dashboard({ session }) {
  const [theme, toggleTheme] = useTheme();
  const [view, setView] = useState('overview');
  const [data, setData] = useState({ projects: [], events: [], table_items: [], music_artists: [], settings: {} });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [toast, setToast] = useToast();
  const [recent, setRecent] = useState([]);
  const [startNew, setStartNew] = useState(false);
  const log = (m) => setRecent((r) => [m, ...r].slice(0, 5));
  const clearNew = useCallback(() => setStartNew(false), []);

  const reload = useCallback(async () => {
    const asc = { ascending: true };
    const res = await Promise.all([
      supabase.from('projects').select('*').order('sort_order', asc),
      supabase.from('events').select('*').order('sort_order', asc),
      supabase.from('table_items').select('*').order('sort_order', asc),
      supabase.from('music_artists').select('*').order('sort_order', asc),
      supabase.from('site_settings').select('*'),
    ]);
    if (res.some((r) => r.error)) {
      setLoadError(true);
      setLoading(false);
      return;
    }
    setLoadError(false);
    setData({
      projects: res[0].data,
      events: res[1].data,
      table_items: res[2].data,
      music_artists: res[3].data,
      settings: Object.fromEntries(res[4].data.map((r) => [r.key, r.value])),
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const count = (k, live) => data[k].filter((r) => (live == null ? true : r.published === live)).length;
  const go = (v, isNew = false) => {
    setView(v);
    setStartNew(isNew);
  };

  let body;
  if (loading) body = <p className="adm-sub">Loading your content…</p>;
  else if (loadError)
    body = (
      <p className="adm-err">
        Your content did not load. If your Supabase project was paused for inactivity, open supabase.com, restore it, then refresh this page.
      </p>
    );
  else if (view === 'overview')
    body = (
      <>
        <div className="adm-head">
          <div>
            <h1>
              Hello, <em>Akokua.</em>
            </h1>
            <p className="adm-sub">Here is what visitors can see on your site right now.</p>
          </div>
          <a className="adm-btn adm-btn-line" href="/" target="_blank" rel="noreferrer">View my site</a>
        </div>
        <div className="adm-stats">
          {[
            ['Projects live', count('projects', true), `${count('projects', false)} in drafts`],
            ['Events live', count('events', true), `${count('events', false)} in drafts`],
            ["On Akokua's Table", count('table_items', true), `${count('table_items', false)} in drafts`],
            ['Artists', count('music_artists', true), 'in On repeat'],
          ].map(([k, v, h]) => (
            <div className="adm-stat" key={k}>
              <span className="k">{k}</span>
              <span className="v">{v}</span>
              <span className="h">{h}</span>
            </div>
          ))}
        </div>
        <section className="adm-box">
          <h2>Quick actions</h2>
          <div className="adm-quick">
            <button className="adm-btn q-teal" type="button" onClick={() => go('projects', true)}>+ Add a project</button>
            <button className="adm-btn q-pink" type="button" onClick={() => go('events', true)}>+ Add an event</button>
            <button className="adm-btn q-gold" type="button" onClick={() => go('table_items', true)}>+ Add to Akokua's Table</button>
            <button className="adm-btn adm-btn-line" type="button" onClick={() => go('settings')}>Replace resume</button>
          </div>
        </section>
        {recent.length > 0 && (
          <section className="adm-box">
            <h2>This session</h2>
            <ul className="adm-recent">
              {recent.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  else if (view === 'settings') body = <SettingsView settings={data.settings} reload={reload} toast={setToast} log={log} />;
  else
    body = (
      <ListView key={view} section={view} rows={data[view]} reload={reload} toast={setToast} log={log} startNew={startNew} clearNew={clearNew} />
    );

  return (
    <div className="adm-app">
      <aside className="adm-side">
        <div>
          <div className="adm-brand">
            Janelle Yankey<span>.</span>
          </div>
          <div className="adm-role">Admin</div>
        </div>
        <nav className="adm-nav" aria-label="Admin sections">
          {NAV.map(([k, label]) => (
            <button key={k} type="button" aria-current={view === k ? 'page' : undefined} onClick={() => go(k)}>
              {label}
              {SECTIONS[k] && <span className="n">{data[k].length}</span>}
            </button>
          ))}
        </nav>
        <div className="adm-side-foot">
          <span className="adm-who">{session.user.email}</span>
          <button className="adm-ghost" type="button" onClick={toggleTheme}>{theme === 'dark' ? 'Day mode' : 'Night mode'}</button>
          <button className="adm-ghost" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </aside>
      <main className="adm-main">
        <div className="adm-wrap">{body}</div>
      </main>
      {toast && (
        <div className="adm-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------- Entry ---------------- */
export default function Admin() {
  useTheme();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    document.title = 'Admin · Janelle Yankey';
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isConfigured) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <h1>Not connected yet</h1>
          <p className="adm-sub">
            Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel (Settings, Environment Variables), then redeploy.
          </p>
          <a className="adm-back" href="/">Back to the site</a>
        </div>
      </div>
    );
  }
  if (session === undefined) return <div className="adm-login" />;
  if (!session) return <SignIn />;
  if (session.user.email !== OWNER_EMAIL) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <h1>This account can't edit</h1>
          <p className="adm-sub">You're signed in as {session.user.email}. Only the site owner can make changes.</p>
          <button className="adm-btn adm-btn-ink" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>
    );
  }
  return <Dashboard session={session} />;
}
