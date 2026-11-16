import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with Soft Warm Dark Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-theme-surface border border-theme-border rounded-2xl shadow-sand-xl flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-theme-border flex items-start justify-between gap-4 bg-theme-elevated">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-base border border-theme-border text-theme-main font-mono text-xs mb-2">
                  <span>{project.categoryLabel}</span>
                  <span>•</span>
                  <span>{project.thumbnailBadge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-theme-main">
                  {project.title}
                </h3>
                <p className="text-sm text-theme-muted font-mono mt-1">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-theme-muted hover:text-theme-main hover:bg-theme-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent border border-transparent hover:border-theme-border"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-theme-muted text-sm leading-relaxed">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-xs uppercase font-mono text-theme-muted tracking-wider mb-2.5 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-theme-accent" />
                  Engineering Overview
                </h4>
                <p className="text-theme-main leading-relaxed font-sans">{project.longDescription}</p>
              </div>

              {/* Key Metrics / Highlights */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-theme-elevated border border-theme-border">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-mono uppercase text-theme-muted">{stat.label}</span>
                      <span className="text-sm font-mono font-bold text-theme-accent mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Details */}
              <div>
                <h4 className="text-xs uppercase font-mono text-theme-muted tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-apricot" />
                  Technical Architecture & Infrastructure
                </h4>
                <ul className="space-y-2.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-theme-main font-sans">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges Solved */}
              <div>
                <h4 className="text-xs uppercase font-mono text-theme-muted tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-plum" />
                  Engineering Challenges Overcome
                </h4>
                <ul className="space-y-2.5">
                  {project.challengesSolved.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cognac shrink-0 mt-2" />
                      <span className="text-theme-main font-sans">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs uppercase font-mono text-theme-muted tracking-wider mb-2.5">
                  Technologies, Libraries & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-theme-elevated text-theme-main border border-theme-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-theme-border bg-theme-elevated flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold rounded-xl bg-gradient-palette text-white hover:brightness-110 transition-all shadow-sand-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Application</span>
                  </a>
                )}

                {(project.githubUrl || project.gitlabUrl) && (
                  <a
                    href={project.githubUrl || project.gitlabUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium rounded-xl bg-theme-surface hover:bg-theme-hover text-theme-main border border-theme-border transition-colors shadow-sand-sm"
                  >
                    <GitBranch className="w-4 h-4 text-theme-muted" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-medium text-theme-muted hover:text-theme-main transition-colors"
              >
                Close Dialog
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
