import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navigation } from './components/sections/Navigation';
import { Footer } from './components/sections/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CloudPage } from './pages/CloudPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Component to scroll to top whenever the URL path changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A050B] text-white flex flex-col font-sans selection:bg-mint selection:text-[#0A050B]">
        <ScrollToTop />

        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-mint text-[#0A050B] font-bold font-mono text-xs rounded-xl shadow-glow-mint"
        >
          Skip to main content
        </a>

        {/* Floating Modern Header Navigation */}
        <Navigation />

        {/* Multi-Page Routed Content Stream */}
        <main id="main-content" className="flex-1 w-full bg-mesh-pattern">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/cloud" element={<CloudPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
