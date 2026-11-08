import { useContent } from '../ContentContext.jsx';
import { lazy, Suspense } from 'react';
import Stars from './Stars.jsx';

const JourneyGlobe = lazy(() => import('./JourneyGlobe.jsx'));

export default function Hero({ theme }) {
  const { profile } = useContent();
  const { first, middle, last } = profile.fullName;
  return (
    <div className="hero">
      {theme === 'dark' && <Stars count={45} maxTop={80} />}
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.places}</p>
          <h1 className="hero-name">
            {first} <span className="gold-foil">{middle}</span> {last}
          </h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="pitch">{profile.pitch}</p>
          <p className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            {profile.status}
          </p>
          <div className="hero-actions">
            <a className="btn btn-ink" href="#work">See my work</a>
            <a className="btn btn-gold" href={profile.resumeUrl}>Download resume</a>
            <a className="btn btn-outline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn btn-outline" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <figure className="hero-globe">
          <Suspense fallback={<div className="globe-holder" aria-hidden="true" />}>
            <JourneyGlobe />
          </Suspense>
          <figcaption className="globe-caption">Accra to D.C., October 2023 · drag to spin</figcaption>
        </figure>
      </div>
      <svg className="shoreline" aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C240,30 480,90 720,62 C960,34 1200,86 1440,58 L1440,120 L0,120 Z" className="shore-pink" />
        <path d="M0,78 C260,52 520,104 780,80 C1040,56 1240,100 1440,78" className="shore-gold" />
        <path d="M0,90 C320,70 640,112 960,92 C1180,78 1320,104 1440,94 L1440,120 L0,120 Z" className="shore-sand" />
      </svg>
    </div>
  );
}
