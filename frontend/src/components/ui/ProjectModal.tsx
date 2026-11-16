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
          {/* Backdrop with Deep Atmospheric Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#070308]/85 backdrop-blur-md transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#130A15] border border-lavender/35 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-lavender/20 flex items-start justify-between gap-4 bg-[#1B0E1E]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#130A15] border border-mint/35 text-mint font-mono text-xs mb-2 shadow-glow-mint">
                  <span>{project.categoryLabel}</span>
                  <span>•</span>
                  <span>{project.thumbnailBadge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-ice font-mono mt-1">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#8E8295] hover:text-white hover:bg-[#26142A] transition-colors focus:outline-none focus:ring-2 focus:ring-mint border border-transparent hover:border-lavender/30"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-[#D4CDD7] text-sm leading-relaxed">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-xs uppercase font-mono text-mint tracking-wider mb-2.5 flex items-center gap-2 font-bold">
                  <Terminal className="w-4 h-4 text-mint" />
                  Engineering Overview
                </h4>
                <p className="text-white leading-relaxed font-sans">{project.longDescription}</p>
              </div>

              {/* Key Metrics / Highlights */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#1B0E1E] border border-lavender/25">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-mono uppercase text-[#8E8295]">{stat.label}</span>
                      <span className="text-sm font-mono font-bold text-mint mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Details */}
              <div>
                <h4 className="text-xs uppercase font-mono text-teal tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-teal" />
                  Technical Architecture & Infrastructure
                </h4>
                <ul className="space-y-2.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                      <span className="text-white font-sans">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges Solved */}
              <div>
                <h4 className="text-xs uppercase font-mono text-ice tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-ice" />
                  Engineering Challenges Overcome
                </h4>
                <ul className="space-y-2.5">
                  {project.challengesSolved.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-2" />
                      <span className="text-white font-sans">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs uppercase font-mono text-[#8E8295] tracking-wider mb-2.5">
                  Technologies, Libraries & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-[#1B0E1E] text-white border border-lavender/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-lavender/20 bg-[#170C1A] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-mint text-[#0A050B] hover:brightness-110 transition-all shadow-glow-mint"
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
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-xl bg-[#1B0E1E] hover:bg-[#26142A] text-white border border-lavender/30 transition-colors shadow-card-dark"
                  >
                    <GitBranch className="w-4 h-4 text-ice" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-medium text-[#8E8295] hover:text-white transition-colors"
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
