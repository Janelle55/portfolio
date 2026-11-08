import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Intro from './components/Intro.jsx';
import Work from './components/Work.jsx';
import SkillsStrip from './components/SkillsStrip.jsx';
import Research from './components/Research.jsx';
import Events from './components/Events.jsx';
import OffTheClock from './components/OffTheClock.jsx';
import Footer from './components/Footer.jsx';
import { useTheme } from './useTheme.js';
import { ContentProvider } from './ContentContext.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();
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
