import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './lib/supabase.js';
import * as fallback from './data/content.js';

// The site renders right away from content.js, then swaps in whatever is
// published in Supabase. If Supabase is unreachable (for example, a paused
// free project), visitors still see the built-in content.
const ContentContext = createContext(null);

const staticContent = {
  profile: fallback.profile,
  projects: fallback.projects,
  events: fallback.events,
  table: fallback.table,
  music: fallback.music,
  skills: fallback.skills,
  research: fallback.research,
  certifications: fallback.certifications,
  journey: fallback.journey,
};

function mapProject(r) {
  return {
    title: r.title,
    description: r.description,
    note: r.note,
    tags: r.tags || [],
    color: r.color,
    featured: r.featured,
    inProgress: r.in_progress,
    image: r.image_url,
    link: r.link_href ? { label: r.link_label || 'Learn more', href: r.link_href } : null,
  };
}

function mapEvent(r) {
  const words = (r.badge || '').trim().split(/\s+/).filter(Boolean);
  return {
    title: r.title,
    when: r.when_text,
    year: r.year,
    place: r.place,
    badge: words.length ? words : [''],
    text: r.description,
    photo: r.photo_url,
    photoColor: r.photo_color,
    link: r.link_href ? { label: r.link_label || 'Read more', href: r.link_href } : null,
  };
}

async function loadFromSupabase() {
  const order = { ascending: true };
  const [p, e, t, m, s] = await Promise.all([
    supabase.from('projects').select('*').eq('published', true).order('sort_order', order),
    supabase.from('events').select('*').eq('published', true).order('sort_order', order),
    supabase.from('table_items').select('*').eq('published', true).order('sort_order', order),
    supabase.from('music_artists').select('*').eq('published', true).order('sort_order', order),
    supabase.from('site_settings').select('*'),
  ]);
  const failed = [p, e, t, m, s].find((r) => r.error);
  if (failed) throw failed.error;

  const settings = Object.fromEntries(s.data.map((row) => [row.key, row.value]));
  const projects = p.data.map(mapProject);
  // The featured project always goes first.
  projects.sort((a, b) => Number(b.featured) - Number(a.featured));

  return {
    ...staticContent,
    profile: {
      ...staticContent.profile,
      status: settings.status ?? staticContent.profile.status,
      availability: settings.availability ?? staticContent.profile.availability,
      email: settings.email || null,
      resumeUrl: settings.resume_url || staticContent.profile.resumeUrl,
    },
    projects: projects.length ? projects : staticContent.projects,
    events: e.data.map(mapEvent),
    table: t.data.map((r) => ({ course: r.course, name: r.name, photo: r.image_url })),
    music: {
      artists: m.data.map((r) => r.name),
      genres: settings.genres
        ? settings.genres.split(',').map((g) => g.trim()).filter(Boolean)
        : staticContent.music.genres,
    },
  };
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(staticContent);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    loadFromSupabase()
      .then((data) => alive && setContent(data))
      .catch(() => {
        /* keep the built-in content */
      });
    return () => {
      alive = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
