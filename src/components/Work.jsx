import { useContent } from '../ContentContext.jsx';

function ProjectCard({ p, index }) {
  const number = String(index + 1).padStart(2, '0');
  const external = p.link && p.link.href.startsWith('http');
  return (
    <article className={`project project-${p.color}${p.featured ? ' project-featured' : ''}`}>
      <div className="project-body">
        <div className="project-top">
          <span className="project-num">{number}</span>
          {p.inProgress && <span className="pill-progress">In progress</span>}
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.note && <p className="project-note">{p.note}</p>}
        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {p.link && (
          <a className="project-link" href={p.link.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {p.link.label} →
          </a>
        )}
      </div>
      {p.image && (
        <div className="project-media">
          <img src={p.image} alt={`Screenshot of ${p.title}`} />
        </div>
      )}
    </article>
  );
}

export default function Work() {
  const { projects } = useContent();
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="work">
      <div className="wrap work-inner">
        <h2 className="section-title">
          Selected <em>work</em>
        </h2>
        <ProjectCard p={featured} index={0} />
        <div className="project-grid">
          {rest.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
