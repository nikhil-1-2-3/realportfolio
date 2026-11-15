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
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfbf7] border border-amber-900/15 rounded-2xl shadow-sand-xl flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-amber-900/10 flex items-start justify-between gap-4 bg-gradient-to-r from-[#fbf8f2] to-[#f4ede0]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/[0.08] border border-amber-900/15 text-amber-900 font-mono text-xs mb-2">
                  <span>{project.categoryLabel}</span>
                  <span>•</span>
                  <span>{project.thumbnailBadge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-600 font-mono mt-1">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-amber-900/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700 border border-transparent hover:border-amber-900/15"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-xs uppercase font-mono text-stone-500 tracking-wider mb-2.5 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-700" />
                  Engineering Overview
                </h4>
                <p className="text-stone-800 leading-relaxed font-sans">{project.longDescription}</p>
              </div>

              {/* Key Metrics / Highlights */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-amber-900/[0.03] border border-amber-900/10">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-mono uppercase text-stone-500">{stat.label}</span>
                      <span className="text-sm font-mono font-bold text-amber-800 mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Details */}
              <div>
                <h4 className="text-xs uppercase font-mono text-stone-500 tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-terracotta-600" />
                  Technical Architecture & Infrastructure
                </h4>
                <ul className="space-y-2.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-stone-800 font-sans">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges Solved */}
              <div>
                <h4 className="text-xs uppercase font-mono text-stone-500 tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lapis-600" />
                  Engineering Challenges Overcome
                </h4>
                <ul className="space-y-2.5">
                  {project.challengesSolved.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0 mt-2" />
                      <span className="text-stone-800 font-sans">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs uppercase font-mono text-stone-500 tracking-wider mb-2.5">
                  Technologies, Libraries & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-[#f4ede1] text-stone-800 border border-amber-900/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-amber-900/10 bg-[#faf6ee] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:brightness-110 transition-all shadow-sand-sm"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-amber-900/15 transition-colors shadow-sand-sm"
                  >
                    <GitBranch className="w-4 h-4 text-stone-600" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-medium text-stone-600 hover:text-stone-900 transition-colors"
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
