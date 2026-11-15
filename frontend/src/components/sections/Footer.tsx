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
    <footer className="border-t border-slate-900 bg-[#070b13] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-white font-sans">
              Singh Nikhil Subhash
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </span>
            <span>•</span>
            <span>IST: {istTime || '15:30:00 IST'}</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-5 h-5" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-900 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors"
            aria-label="Email Nikhil"
          >
            <Mail className="w-5 h-5" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center md:flex md:justify-between text-xs font-mono text-slate-400">
        <p>© {new Date().getFullYear()} Nikhil Singh Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Engineered with React, TypeScript & Tailwind CSS • REST API on AWS EC2
        </p>
      </div>
    </footer>
  );
};
