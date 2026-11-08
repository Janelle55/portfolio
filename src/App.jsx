import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Work from './components/Work.jsx';
import SkillsStrip from './components/SkillsStrip.jsx';
import Research from './components/Research.jsx';
import Events from './components/Events.jsx';
import OffTheClock from './components/OffTheClock.jsx';
import Footer from './components/Footer.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import { useTheme } from './useTheme.js';
import { ContentProvider } from './ContentContext.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const match = window.location.pathname.match(/^\/projects\/([a-z0-9-]+)\/?$/);
  if (match) {
    return (
      <ContentProvider>
        <section className="hero-band hero-band-slim" id="top">
          <Header theme={theme} onToggleTheme={toggleTheme} />
        </section>
        <ProjectPage slug={match[1]} />
        <Footer />
      </ContentProvider>
    );
  }
  return (
    <ContentProvider>
      <section className="hero-band" id="top">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Hero theme={theme} />
      </section>
      <main>
        <Intro />
        <Work />
        <SkillsStrip />
        <Research />
        <Events />
        <OffTheClock />
      </main>
      <Footer />
    </ContentProvider>
  );
}
