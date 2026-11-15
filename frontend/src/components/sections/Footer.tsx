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
    <footer className="border-t border-amber-900/10 bg-[#f4ede1] text-stone-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-amber-900/15 shadow-sand-sm flex items-center justify-center text-amber-800">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-base text-stone-900">
              Singh Nikhil Subhash
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-stone-500 mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Available for Opportunities
            </span>
            <span>•</span>
            <span>IST: {istTime || '16:00:00 IST'}</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-amber-900/10 text-stone-700 hover:text-amber-800 hover:border-amber-900/25 transition-all shadow-sand-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-amber-900/10 text-stone-700 hover:text-terracotta-600 hover:border-amber-900/25 transition-all shadow-sand-sm"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white border border-amber-900/10 text-stone-700 hover:text-lapis-600 hover:border-amber-900/25 transition-all shadow-sand-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-white border border-amber-900/10 text-stone-700 hover:text-amber-800 hover:border-amber-900/25 transition-all shadow-sand-sm"
            aria-label="Email Nikhil"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-2.5 rounded-xl bg-white border border-amber-900/15 text-stone-800 hover:text-amber-800 hover:border-amber-700 transition-all shadow-sand-sm"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-amber-900/10 text-center md:flex md:justify-between text-xs font-mono text-stone-500">
        <p>© {new Date().getFullYear()} Nikhil Singh Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Engineered with React, TypeScript & Tailwind CSS • MySQL Database in Docker
        </p>
      </div>
    </footer>
  );
};
