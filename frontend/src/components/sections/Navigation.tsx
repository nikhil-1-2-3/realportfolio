import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Terminal, ChevronRight } from 'lucide-react';
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
          ? 'bg-[#f7f4ed]/85 backdrop-blur-xl border-b border-amber-900/10 py-3.5 shadow-sand'
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
          <div className="w-9 h-9 rounded-xl bg-white border border-amber-900/15 shadow-sand-sm flex items-center justify-center text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-all duration-200">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-stone-500 -mt-0.5">
              Full Stack & DevOps
            </span>
          </div>
        </button>

        {/* Desktop Island Navigation with Sliding Active Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ede6d8]/60 p-1.5 rounded-full border border-amber-900/10 backdrop-blur-md shadow-sand-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 ${
                  isActive ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white rounded-full border border-amber-900/10 shadow-sand-sm -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Resume CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-white hover:bg-[#faf7f2] border border-amber-900/15 text-stone-800 hover:text-amber-800 transition-all shadow-sand-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Resume</span>
          </motion.a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="p-2 text-stone-700 hover:text-amber-800 bg-white rounded-xl border border-amber-900/15 shadow-sand-sm"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 bg-white rounded-xl border border-amber-900/15 shadow-sand-sm focus:outline-none"
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
            className="md:hidden bg-[#f7f4ed]/95 backdrop-blur-xl border-b border-amber-900/10 px-4 pt-3 pb-6 overflow-hidden shadow-sand-lg"
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
                        ? 'bg-white text-amber-900 font-bold border border-amber-900/15 shadow-sand-sm'
                        : 'text-stone-700 hover:bg-white/60 hover:text-stone-950'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-amber-900/10">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Nikhil_Singh_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-gradient-to-r from-amber-700 to-stone-900 text-white hover:brightness-110 transition-all shadow-sand"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
