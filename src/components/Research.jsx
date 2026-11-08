import { useContent } from '../ContentContext.jsx';

export default function Research() {
  const { research, certifications, profile } = useContent();
  return (
    <section id="research" className="wrap research">
      <div className="research-head">
        <h2 className="section-title">Research</h2>
        <p>Human-Centered AI Institute, Howard University. Two published papers in 2026.</p>
        <a className="research-link" href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar profile ↗</a>
      </div>
      <div className="research-list">
        {research.map((r) => (
          <div className="research-item" key={r.title}>
            <p className="research-when">{r.when}</p>
            <div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              {r.link && (
                <a className="research-link" href={r.link.href} {...(r.link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {r.link.label} {r.link.href.startsWith('http') ? '↗' : '→'}
                </a>
              )}
            </div>
          </div>
        ))}
        <p className="certs">
          <strong>Certified</strong> {certifications.join(' · ')}
        </p>
      </div>
    </section>
  );
}
