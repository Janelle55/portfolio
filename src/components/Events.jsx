import { useContent } from '../ContentContext.jsx';

export default function Events() {
  const { events } = useContent();
  return (
    <section id="events" className="events">
      <div className="wrap events-inner">
        <div className="section-head">
          <h2 className="section-title">
            Where I <em className="rose">show up</em>
          </h2>
          <p>Conferences, symposiums, and communities I've presented at, contributed to, or joined.</p>
        </div>
        <div className="event-grid">
          {events.map((e) => (
            <article className="event-card" key={e.title}>
              <div className={`event-photo photo-${e.photoColor}`}>
                {e.photo ? (
                  <img src={e.photo} alt={`At ${e.title}`} />
                ) : (
                  <div className="event-cover" aria-hidden="true">
                    <span className="cover-year">{e.year}</span>
                    <span className="cover-place">{e.place}</span>
                  </div>
                )}
              </div>
              <div className="medal">
                {e.badge.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <p className="event-when">{e.when}</p>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              {e.link && (
                <a href={e.link.href} target="_blank" rel="noreferrer" className="event-link">
                  {e.link.label} →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
