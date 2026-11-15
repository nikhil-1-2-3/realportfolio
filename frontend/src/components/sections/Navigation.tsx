import React, { useState, useEffect } from 'react';
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
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
          aria-label="Back to top"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-200">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Nikhil Singh
            </span>
            <span className="font-mono text-[10px] text-slate-400 -mt-0.5">
              Full Stack & DevOps
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-slate-800 font-semibold shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Resume CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all duration-200 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="p-2 text-slate-300 hover:text-emerald-400 bg-slate-900 rounded-lg border border-slate-800"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-mono transition-colors text-left ${
                    isActive
                      ? 'bg-slate-800/90 text-emerald-400 font-semibold border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Nikhil_Singh_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono font-semibold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

