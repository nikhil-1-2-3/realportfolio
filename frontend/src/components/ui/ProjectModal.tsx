import React, { useEffect } from 'react';
import { X, ExternalLink, GitBranch, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c111e] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black flex flex-col overflow-hidden animate-fade-in z-10">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/40">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-2">
              <span>{project.categoryLabel}</span>
              <span>•</span>
              <span>{project.thumbnailBadge}</span>
            </div>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 font-mono mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Project Overview
            </h4>
            <p className="text-slate-200 leading-relaxed font-sans">{project.longDescription}</p>
          </div>

          {/* Key Metrics / Highlights */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase text-slate-400">{stat.label}</span>
                  <span className="text-sm font-mono font-semibold text-emerald-400 mt-0.5">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Details */}
          <div>
            <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Technical Architecture & Implementation
            </h4>
            <ul className="space-y-2.5">
              {project.architectureDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-sans">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges Solved */}
          <div>
            <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Engineering Challenges Solved
            </h4>
            <ul className="space-y-2.5">
              {project.challengesSolved.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                  <span className="text-slate-300 font-sans">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complete Tech Stack */}
          <div>
            <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-2">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Application</span>
              </a>
            )}

            {(project.githubUrl || project.gitlabUrl) && (
              <a
                href={project.githubUrl || project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
