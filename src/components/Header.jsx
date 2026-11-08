import { useContent } from '../ContentContext.jsx';

export default function Header({ theme, onToggleTheme }) {
  const { profile } = useContent();
  const dark = theme === 'dark';
  return (
    <header className="site-header wrap">
      <a href="/#top" className="logo">
        {profile.shortName}
        <span className="logo-dot">.</span>
      </a>
      <nav aria-label="Main" className="nav">
        <a href="/#work">Work</a>
        <a href="/#research">Research</a>
        <a href="/#events">Events</a>
        <a href="/#offclock">Off the clock</a>
        <a href={profile.resumeUrl} className="nav-resume">Resume</a>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={dark ? 'Switch to day mode' : 'Switch to night mode'}
        >
          <span className="theme-dot" aria-hidden="true" />
          {dark ? 'Day mode' : 'Night mode'}
        </button>
      </nav>
    </header>
  );
}
