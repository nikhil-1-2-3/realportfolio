import React, { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Gitlab, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-lavender/20 bg-[#070308] text-[#8E8295] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luminous Top Gradient Line across the 5 Palette Colors */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-wine via-lavender via-teal via-mint to-ice opacity-80" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-mint via-teal to-wine p-[1px] shadow-glow-mint">
              <div className="w-full h-full bg-[#130A15] rounded-[11px] flex items-center justify-center text-mint">
                <Terminal className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white tracking-wide">
                Singh Nikhil Subhash
              </span>
              <span className="block text-[11px] font-mono text-mint uppercase tracking-wider">
                Full Stack & Cloud DevOps Architect
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#D4CDD7] mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse shadow-glow-mint" />
              Open to Opportunities
            </span>
            <span>•</span>
            <span className="text-white">IST: {istTime || 'Active in IST'}</span>
          </div>
        </div>

        {/* 5-Color Swatch Accent Bar */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#130A15] border border-lavender/30 text-[10px] font-mono text-[#D4CDD7]">
          <span className="text-[#8E8295] mr-1">PALETTE:</span>
          <span className="w-2.5 h-2.5 rounded-full bg-mint shadow-glow-mint" title="#73EEDC (Mint)" />
          <span className="w-2.5 h-2.5 rounded-full bg-teal" title="#73C2BE (Teal)" />
          <span className="w-2.5 h-2.5 rounded-full bg-ice" title="#90C3C8 (Ice)" />
          <span className="w-2.5 h-2.5 rounded-full bg-lavender" title="#776885 (Lavender)" />
          <span className="w-2.5 h-2.5 rounded-full bg-wine" title="#5F1A37 (Wine)" />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#130A15] border border-lavender/30 text-[#D4CDD7] hover:text-white hover:border-mint hover:bg-mint/15 transition-all group shadow-card-dark"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-mint group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#130A15] border border-lavender/30 text-[#D4CDD7] hover:text-white hover:border-teal hover:bg-teal/15 transition-all group shadow-card-dark"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4 text-teal group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#130A15] border border-lavender/30 text-[#D4CDD7] hover:text-white hover:border-ice hover:bg-ice/15 transition-all group shadow-card-dark"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-ice group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 rounded-xl bg-[#130A15] border border-lavender/30 text-[#D4CDD7] hover:text-white hover:border-wine hover:bg-wine/30 transition-all group shadow-card-dark"
            aria-label="Email Nikhil"
          >
            <Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-3 rounded-xl bg-gradient-to-r from-teal/20 to-mint/20 border border-mint/40 text-mint hover:text-[#0A050B] hover:bg-mint transition-all shadow-glow-mint group"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-lavender/15 text-center md:flex md:justify-between text-xs font-mono text-[#8E8295]">
        <p>© {new Date().getFullYear()} Singh Nikhil Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-[#D4CDD7]">
          Engineered with React, TypeScript & Tailwind CSS • Containerized Docker MySQL
        </p>
      </div>
    </footer>
  );
};
