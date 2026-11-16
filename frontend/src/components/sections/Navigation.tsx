import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Terminal, ChevronRight, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/cloud', label: 'Cloud & DevOps' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Experience' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A050B]/90 backdrop-blur-2xl border-b border-lavender/20 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Mint Monogram */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-left focus:outline-none"
          aria-label="Singh Nikhil Subhash"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-wine via-teal to-mint p-[1.5px] shadow-glow-mint">
            <div className="w-full h-full bg-[#130A15] rounded-[10px] flex items-center justify-center text-mint group-hover:bg-mint group-hover:text-[#0A050B] transition-all duration-300">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-mint transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-ice font-semibold tracking-wider uppercase -mt-0.5">
              Full Stack • DevOps
            </span>
          </div>
        </Link>

        {/* Desktop Island Navigation with Sliding Active Pill */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#130A15]/85 p-1.5 rounded-full border border-lavender/25 backdrop-blur-xl shadow-card-dark">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-1.5 text-xs font-mono font-medium rounded-full transition-colors duration-200 ${
                  isActive ? 'text-[#0A050B] font-bold' : 'text-[#D4CDD7] hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-mint rounded-full shadow-glow-mint -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-[#1B0E1E] hover:bg-[#26142A] border border-lavender/30 text-white hover:border-mint transition-all shadow-card-dark"
          >
            <Download className="w-3.5 h-3.5 text-teal" />
            <span>Resume</span>
          </motion.a>

          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-teal to-mint text-[#0A050B] hover:brightness-110 shadow-glow-mint transition-all border border-white/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-white bg-[#130A15] rounded-xl border border-lavender/30 shadow-card-dark focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-mint" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-[#0F0711]/98 backdrop-blur-2xl border-b border-lavender/25 px-4 pt-3 pb-6 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-colors text-left ${
                      isActive
                        ? 'bg-mint text-[#0A050B] font-bold shadow-glow-mint'
                        : 'text-[#D4CDD7] hover:bg-[#1B0E1E] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-lavender/20 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Nikhil_Singh_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-[#1B0E1E] border border-lavender/30 text-white hover:border-mint transition-all shadow-card-dark"
              >
                <Download className="w-4 h-4 text-teal" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-gradient-to-r from-teal to-mint text-[#0A050B] hover:brightness-110 transition-all shadow-glow-mint"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
