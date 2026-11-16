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

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-2xl border-b border-rose/25 py-3 shadow-aesthetic-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Mulberry/Cognac Monogram */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-left focus:outline-none"
          aria-label="Singh Nikhil Subhash"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-mulberry via-cognac to-ochre p-[1.5px] shadow-aesthetic-sm">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-mulberry group-hover:bg-mulberry group-hover:text-white transition-all duration-300">
              <Terminal className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-[#231215] group-hover:text-cognac transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-ochre font-bold tracking-wider uppercase -mt-0.5">
              Full Stack • DevOps
            </span>
          </div>
        </Link>

        {/* Desktop Island Navigation with Sliding Active Pill */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/95 p-1.5 rounded-full border border-rose/30 backdrop-blur-xl shadow-aesthetic-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-1.5 text-xs font-mono font-medium rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-mulberry text-white font-bold shadow-aesthetic-sm' : 'text-[#5C4448] hover:text-[#231215]'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-white hover:bg-[#F5ECE3] border border-rose/30 text-[#231215] hover:border-cognac/50 transition-all shadow-aesthetic-sm"
          >
            <Download className="w-3.5 h-3.5 text-cognac" />
            <span>Resume</span>
          </motion.a>

          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-cognac hover:bg-[#94473f] text-white shadow-aesthetic-sm transition-all border border-cognac/30"
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
            className="p-2.5 text-[#231215] bg-white rounded-xl border border-rose/30 shadow-aesthetic-sm focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cognac" /> : <Menu className="w-5 h-5" />}
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
            className="lg:hidden bg-[#FAF6F0]/98 backdrop-blur-2xl border-b border-rose/25 px-4 pt-3 pb-6 overflow-hidden shadow-aesthetic-lg"
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
                        ? 'bg-mulberry text-white font-bold shadow-aesthetic-sm'
                        : 'text-[#5C4448] hover:bg-white hover:text-[#231215]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-rose/20 flex flex-col gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Nikhil_Singh_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-white border border-rose/30 text-[#231215] hover:border-cognac/50 transition-all shadow-aesthetic-sm"
              >
                <Download className="w-4 h-4 text-cognac" />
                <span>Download Resume (PDF)</span>
              </a>

              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-bold rounded-xl bg-cognac text-white hover:bg-[#94473f] transition-all shadow-aesthetic-sm"
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
