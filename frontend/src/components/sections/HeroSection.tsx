import React from 'react';
import { ArrowDown, Mail, Download, Github, Linkedin, Gitlab, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Subtle Ambient Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md mb-8 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">
            Available for Engineering Roles & Projects
          </span>
        </div>

        {/* Name & Title */}
        <div className="space-y-3 max-w-4xl">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-400 font-semibold">
            Hello, I am
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
            Singh Nikhil Subhash
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 font-sans max-w-2xl mx-auto">
            Full Stack Developer <span className="text-slate-600 px-1 font-mono">|</span> Cloud & DevOps Engineer
          </p>
        </div>

        {/* Strong Personal Headline */}
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Architecting scalable web applications, automating deployment infrastructure with CI/CD and Kubernetes, and solving real-world engineering challenges.
          </p>
        </div>

        {/* Engineering Highlights Micro-Bar */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-4 font-mono text-xs text-slate-400">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900/70 border border-slate-800">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>MERN & Microservices</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900/70 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Docker & Kubernetes</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900/70 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>CI/CD & Terraform IaC</span>
          </div>
        </div>

        {/* Call to Actions (CTAs) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo('projects')}
            rightIcon={<ArrowDown className="w-4 h-4" />}
          >
            View Projects
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('contact')}
            leftIcon={<Mail className="w-4 h-4 text-emerald-400" />}
          >
            Contact Me
          </Button>

          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Nikhil_Singh_Resume.pdf"
            className="inline-flex items-center justify-center font-mono text-xs px-4 py-3 gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>

        {/* Social Links Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 w-full max-w-md flex items-center justify-center gap-6">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-900"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={PERSONAL_INFO.socials.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg hover:bg-slate-900"
            aria-label="GitLab Profile"
          >
            <Gitlab className="w-4 h-4" />
            <span>GitLab</span>
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-indigo-400 transition-colors p-2 rounded-lg hover:bg-slate-900"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

