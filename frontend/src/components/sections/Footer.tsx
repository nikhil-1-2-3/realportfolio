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
    <footer className="border-t border-rose/25 bg-[#F2EAE0] text-[#5C4448] py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Top Gradient Line across the 4 Palette Colors */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-mulberry via-cognac via-ochre to-rose opacity-80" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-mulberry via-cognac to-ochre p-[1px] shadow-aesthetic-sm">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center text-mulberry">
                <Terminal className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-[#231215] tracking-wide">
                Singh Nikhil Subhash
              </span>
              <span className="block text-[11px] font-mono text-cognac font-bold uppercase tracking-wider">
                Full Stack & Cloud DevOps Architect
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#5C4448] mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
              Open to Opportunities
            </span>
            <span>•</span>
            <span className="text-[#231215] font-semibold">IST: {istTime || 'Active in IST'}</span>
          </div>
        </div>

        {/* 4-Color Swatch Accent Bar */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose/30 text-[10px] font-mono text-[#5C4448] shadow-aesthetic-sm">
          <span className="text-[#8A6E73] mr-1">PALETTE:</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cognac" title="#A2574F (Cognac)" />
          <span className="w-2.5 h-2.5 rounded-full bg-ochre" title="#E68057 (Ochre)" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose" title="#BF7587 (Dusty Rose)" />
          <span className="w-2.5 h-2.5 rounded-full bg-mulberry" title="#993A8B (Mulberry)" />
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-rose/30 text-[#231215] hover:text-white hover:border-cognac hover:bg-cognac transition-all group shadow-aesthetic-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4 text-cognac group-hover:text-white group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-rose/30 text-[#231215] hover:text-white hover:border-ochre hover:bg-ochre transition-all group shadow-aesthetic-sm"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4 text-ochre group-hover:text-white group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white border border-rose/30 text-[#231215] hover:text-white hover:border-rose hover:bg-rose transition-all group shadow-aesthetic-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-rose group-hover:text-white group-hover:scale-110 transition-transform" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-3 rounded-xl bg-white border border-rose/30 text-[#231215] hover:text-white hover:border-mulberry hover:bg-mulberry transition-all group shadow-aesthetic-sm"
            aria-label="Email Nikhil"
          >
            <Mail className="w-4 h-4 text-mulberry group-hover:text-white group-hover:scale-110 transition-transform" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-3 rounded-xl bg-white border border-rose/35 text-mulberry hover:text-white hover:bg-mulberry transition-all shadow-aesthetic-sm group"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-rose/20 text-center md:flex md:justify-between text-xs font-mono text-[#8A6E73]">
        <p>© {new Date().getFullYear()} Singh Nikhil Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-[#5C4448]">
          Engineered with React, TypeScript & Tailwind CSS • Containerized Docker MySQL
        </p>
      </div>
    </footer>
  );
};
