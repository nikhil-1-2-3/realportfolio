import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Terminal, ChevronRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavigationProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-theme-base/90 backdrop-blur-xl border-b border-theme-border py-3.5 shadow-sand'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
          aria-label="Back to top"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-palette p-0.5 shadow-sand-sm">
            <div className="w-full h-full bg-theme-surface rounded-[10px] flex items-center justify-center text-theme-accent group-hover:bg-transparent group-hover:text-white transition-all duration-200">
              <Terminal className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-theme-main group-hover:text-theme-accent transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-theme-muted -mt-0.5">
              Full Stack & DevOps
            </span>
          </div>
        </button>

        {/* Desktop Island Navigation with Sliding Active Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-theme-hover/60 p-1.5 rounded-full border border-theme-border backdrop-blur-md shadow-sand-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 ${
                  isActive ? 'text-theme-main font-bold' : 'text-theme-muted hover:text-theme-main'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-theme-surface rounded-full border border-theme-border shadow-sand-sm -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-theme-surface hover:bg-theme-hover border border-theme-border text-theme-main hover:text-theme-accent transition-all shadow-sand-sm"
          >
            <Download className="w-3.5 h-3.5 text-theme-accent" />
            <span>Resume</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-palette text-white hover:brightness-110 shadow-sand-sm transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </motion.button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-theme-main bg-theme-surface rounded-xl border border-theme-border shadow-sand-sm focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-theme-base/95 backdrop-blur-xl border-b border-theme-border px-4 pt-3 pb-6 overflow-hidden shadow-sand-lg"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-colors text-left ${
                      isActive
                        ? 'bg-theme-surface text-theme-accent font-bold border border-theme-border shadow-sand-sm'
                        : 'text-theme-muted hover:bg-theme-surface/60 hover:text-theme-main'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-theme-border flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Nikhil_Singh_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:bg-theme-hover transition-all shadow-sand"
              >
                <Download className="w-4 h-4 text-theme-accent" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-gradient-palette text-white hover:brightness-110 transition-all shadow-sand"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
