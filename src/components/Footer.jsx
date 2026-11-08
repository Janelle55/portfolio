import { useContent } from '../ContentContext.jsx';
import Stars from './Stars.jsx';

export default function Footer() {
  const { profile } = useContent();
  return (
    <footer id="contact" className="footer">
      <Stars count={70} maxTop={70} />
      <div className="moon" aria-hidden="true" />
      <div className="wrap footer-inner">
        <h2 className="footer-title">
          Let's build something bold and <span className="gold-foil">beautiful.</span>
        </h2>
        <p className="footer-sub">{profile.availability}</p>
        <div className="footer-actions">
          {profile.email && (
            <span className="btn btn-pink email" aria-label="Email address">
              {profile.email}
            </span>
          )}
          <a className={profile.email ? 'btn btn-outline-light' : 'btn btn-pink'} href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.email ? 'LinkedIn' : 'Message me on LinkedIn'}
          </a>
          <a className="btn btn-outline-light" href={profile.resumeUrl}>Resume</a>
          <a className="btn btn-outline-light" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn btn-outline-light" href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Janelle Nana Akokua Yankey</p>
      </div>
    </footer>
  );
}
