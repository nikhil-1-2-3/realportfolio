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
    <footer className="border-t border-theme-border bg-theme-elevated text-theme-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-theme-surface border border-theme-border shadow-sand-sm flex items-center justify-center text-theme-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-base text-theme-main">
              Singh Nikhil Subhash
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-theme-muted mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
            className="p-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:text-theme-accent hover:border-theme-border-strong transition-all shadow-sand-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:text-orange-500 hover:border-theme-border-strong transition-all shadow-sand-sm"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:text-cyan-500 hover:border-theme-border-strong transition-all shadow-sand-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:text-theme-accent hover:border-theme-border-strong transition-all shadow-sand-sm"
            aria-label="Email Nikhil"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="ml-2 p-2.5 rounded-xl bg-theme-surface border border-theme-border text-theme-main hover:text-theme-accent hover:border-theme-border-strong transition-all shadow-sand-sm"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-theme-border/60 text-center md:flex md:justify-between text-xs font-mono text-theme-muted">
        <p>© {new Date().getFullYear()} Nikhil Singh Subhash. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Engineered with React, TypeScript & Tailwind CSS • MySQL Database in Docker
        </p>
      </div>
    </footer>
  );
};
