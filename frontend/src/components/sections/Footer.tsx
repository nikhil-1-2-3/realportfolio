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
    <footer className="border-t border-cognac/25 bg-[#0a060d] text-neutral-400 py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luminous Top Accent Line with all 4 colors */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cognac via-apricot via-rose to-plum opacity-75" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-apricot to-plum p-[1px] shadow-glow-apricot/40">
              <div className="w-full h-full bg-[#160f18] rounded-[11px] flex items-center justify-center text-apricot">
                <Terminal className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-wide">
                Singh Nikhil Subhash
              </span>
              <span className="block text-[11px] font-mono text-apricot/90 uppercase tracking-wider">
                Full Stack & Cloud Engineer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              Open to Opportunities
            </span>
            <span>•</span>
            <span className="text-neutral-300">IST: {istTime || 'Active IST'}</span>
          </div>
        </div>

        {/* 4-Color Swatch Accent Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#160f18] border border-cognac/30 text-[10px] font-mono text-neutral-400">
          <span className="text-neutral-500 mr-1">PALETTE:</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cognac" title="#A2574F (Cognac)" />
          <span className="w-2.5 h-2.5 rounded-full bg-apricot" title="#E68057 (Apricot)" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose" title="#BF7587 (Rose)" />
          <span className="w-2.5 h-2.5 rounded-full bg-plum" title="#993A8B (Plum)" />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#160f18] border border-apricot/30 text-neutral-300 hover:text-white hover:border-apricot hover:bg-apricot/20 transition-all group shadow-card-dark"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-apricot group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#160f18] border border-cognac/30 text-neutral-300 hover:text-white hover:border-cognac hover:bg-cognac/20 transition-all group shadow-card-dark"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4 text-cognac group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-[#160f18] border border-plum/30 text-neutral-300 hover:text-white hover:border-plum hover:bg-plum/20 transition-all group shadow-card-dark"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-plum group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 rounded-xl bg-[#160f18] border border-rose/30 text-neutral-300 hover:text-white hover:border-rose hover:bg-rose/20 transition-all group shadow-card-dark"
            aria-label="Email Nikhil"
          >
            <Mail className="w-4 h-4 text-rose group-hover:scale-110 transition-transform" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-3 rounded-xl bg-gradient-to-r from-apricot/20 to-plum/20 border border-apricot/40 text-apricot hover:text-white hover:from-apricot hover:to-plum transition-all shadow-glow-apricot/30 group"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-cognac/15 text-center md:flex md:justify-between text-xs font-mono text-neutral-500">
        <p>© {new Date().getFullYear()} Singh Nikhil Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-neutral-400">
          Crafted with React, TypeScript & Tailwind CSS • Containerized MySQL
        </p>
      </div>
    </footer>
  );
};
