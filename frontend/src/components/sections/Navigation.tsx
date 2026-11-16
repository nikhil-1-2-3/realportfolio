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
          ? 'bg-[#0d080f]/90 backdrop-blur-2xl border-b border-cognac/20 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Glowing Monogram */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          aria-label="Back to top"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-apricot via-rose to-plum p-[1.5px] shadow-glow-apricot">
            <div className="w-full h-full bg-[#150e18] rounded-[10px] flex items-center justify-center text-apricot group-hover:bg-transparent group-hover:text-white transition-all duration-300">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-apricot transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-rose tracking-wider uppercase -mt-0.5">
              Full Stack • DevOps
            </span>
          </div>
        </button>

        {/* Desktop Island Navigation with Sliding Active Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-[#18101b]/80 p-1.5 rounded-full border border-cognac/25 backdrop-blur-xl shadow-card-dark">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-apricot/30 to-plum/40 rounded-full border border-apricot/50 shadow-glow-apricot -z-10"
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
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-[#1e1422] hover:bg-[#281a2e] border border-rose/30 text-white hover:border-plum transition-all shadow-sand-sm"
          >
            <Download className="w-3.5 h-3.5 text-rose" />
            <span>Resume</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-apricot to-plum text-white hover:brightness-110 shadow-glow-apricot transition-all border border-white/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </motion.button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-white bg-[#1a111c] rounded-xl border border-cognac/30 shadow-sand-sm focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-apricot" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-[#120b15]/95 backdrop-blur-2xl border-b border-cognac/25 px-4 pt-3 pb-6 overflow-hidden shadow-2xl"
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
                        ? 'bg-gradient-to-r from-apricot/20 to-plum/20 text-apricot font-bold border border-apricot/40 shadow-glow-apricot'
                        : 'text-neutral-400 hover:bg-[#1f1522] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-cognac/20 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Nikhil_Singh_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-[#1e1422] border border-rose/30 text-white hover:border-plum transition-all shadow-sand"
              >
                <Download className="w-4 h-4 text-rose" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-gradient-to-r from-apricot to-plum text-white hover:brightness-110 transition-all shadow-glow-apricot"
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
