import { useContent } from '../ContentContext.jsx';
import Rose from './Rose.jsx';

// One personal section: Akokua's Table (food) and On repeat (music), side by side.
export default function OffTheClock() {
  const { table, music } = useContent();
  return (
    <section id="offclock" className="otc-band">
      <div className="wrap otc-inner">
        <div className="section-head otc-head">
          <h2 className="section-title">
            Off the <em>clock</em>
          </h2>
          <p>When I'm not coding, I'm cooking, trying new restaurants, or playing something I love. I'm happiest by the sea.</p>
        </div>

        <div className="otc-grid">
          <article id="table" className="menu-card">
            <div className="menu-frame">
              <div className="menu-rose">
                <Rose />
              </div>
              <h3 className="menu-title">
                Akokua's <em>Table</em>
              </h3>
              <p className="menu-intro">I cook, I hunt down new restaurants, and I love trying new things.</p>
              {table.length > 0 && (
                <ul className="menu-list">
                  {table.map((item) => (
                    <li key={item.course + item.name} className={item.photo ? 'has-photo' : ''}>
                      {item.photo && (
                        <img className="menu-photo" src={item.photo} alt={item.name} loading="lazy" />
                      )}
                      <span className="menu-course">{item.course}</span>
                      <span className="menu-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>

          <article id="music" className="music-card">
            <div className="record-wrap" aria-hidden="true">
              <div className="record is-playing">
                <div className="record-label">
                  <span className="label-name">Akokua</span>
                  <span className="label-side">Side A</span>
                </div>
              </div>
            </div>
            <div className="music-copy">
              <h3 className="music-title">
                On <em>repeat</em>
              </h3>
              <ol className="tracklist" aria-label="Artists I love">
                {music.artists.map((name, i) => (
                  <li key={name}>
                    <span className="track-no">A{i + 1}</span>
                    <span className="track-song">{name}</span>
                  </li>
                ))}
              </ol>
              <ul className="genres" aria-label="Genres I love">
                {music.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
