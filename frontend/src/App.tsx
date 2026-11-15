import { useState, useEffect } from 'react';
import { Navigation } from './components/sections/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-500 text-slate-950 font-bold font-mono text-xs rounded-lg shadow-xl"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navigation activeSection={activeSection} />

      {/* Main Single Page Stream */}
      <main id="main-content" className="flex-1 w-full">
        {/* Section 1: Home / Hero */}
        <HeroSection />

        {/* Section 2: About Me ("The Person Behind the Work") */}
        <AboutSection />

        {/* Section 3: Skills & Technologies ("My Technical Toolkit") */}
        <SkillsSection />

        {/* Section 4: Projects ("Things I've Built. Problems I've Solved.") - Strictly ONE unified gallery */}
        <ProjectsSection />

        {/* Section 5: Experience & Education */}
        <ExperienceSection />

        {/* Section 6: Contact ("Let's Build Something Together") - Directly below Experience */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
