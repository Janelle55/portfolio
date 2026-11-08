import { useEffect } from 'react';
import { useContent } from '../ContentContext.jsx';

// A case study page for one project, at /projects/<slug>.
export default function ProjectPage({ slug }) {
  const { projects } = useContent();
  const p = projects.find((x) => x.slug === slug);

  useEffect(() => {
    document.title = p ? `${p.title} · Janelle Yankey` : 'Project not found · Janelle Yankey';
    window.scrollTo(0, 0);
  }, [p]);

  if (!p) {
    return (
      <main className="wrap case-missing">
        <h1 className="section-title">That project isn't here</h1>
        <p>It may have been renamed or hidden.</p>
        <a className="btn btn-ink" href="/#work">See all my work</a>
      </main>
    );
  }

  const external = p.link && p.link.href.startsWith('http');
  const built = p.built || [];
  const challenges = p.challenges || [];

  return (
    <main className="case">
      <section className={`case-hero case-${p.color}`}>
        <div className="wrap case-hero-inner">
          <a className="case-back" href="/#work">← All projects</a>
          <div className="case-pills">
            {p.inProgress && <span className="pill-progress">In progress</span>}
            {p.period && <span className="case-pill">{p.period}</span>}
          </div>
          <h1 className="case-title">{p.title}</h1>
          <p className="case-lede">{p.description}</p>
          {p.team && <p className="case-team">{p.team}</p>}
          <ul className="tags">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="wrap case-body">
        {p.image && (
          <figure className="case-figure">
            <img src={p.image} alt={`Screenshot of ${p.title}`} />
          </figure>
        )}

        <div className="case-grid">
          <div className="case-main">
            {p.overview && (
              <section className="case-section">
                <h2>The problem</h2>
                <p>{p.overview}</p>
              </section>
            )}

            {built.length > 0 && (
              <section className="case-section">
                <h2>What I built</h2>
                <ul className="case-list">
                  {built.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            )}

            {challenges.length > 0 && (
              <section className="case-section">
                <h2>Challenges I worked through</h2>
                <ol className="case-steps">
                  {challenges.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="case-side">
            {p.role && (
              <div className="case-card">
                <h2>My role</h2>
                <p>{p.role}</p>
              </div>
            )}
            {p.note && (
              <div className="case-card case-note">
                <p>{p.note}</p>
              </div>
            )}
            {p.link && (
              <a className="btn btn-gold" href={p.link.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {p.link.label}
              </a>
            )}
            <a className="btn btn-outline" href="/#work">Back to all projects</a>
          </aside>
        </div>
      </div>
    </main>
  );
}
