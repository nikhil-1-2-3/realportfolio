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
          {/* Backdrop with Soft Vintage Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#231215]/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-rose/35 rounded-2xl shadow-aesthetic-lg flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-rose/20 flex items-start justify-between gap-4 bg-[#FAF4EC]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose/30 text-mulberry font-mono text-xs mb-2 shadow-aesthetic-sm font-bold">
                  <span>{project.categoryLabel}</span>
                  <span>•</span>
                  <span>{project.thumbnailBadge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#231215]">
                  {project.title}
                </h3>
                <p className="text-sm text-ochre font-mono mt-1 font-semibold">{project.subtitle}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#8A6E73] hover:text-[#231215] hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-cognac border border-transparent hover:border-rose/30"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-[#5C4448] text-sm leading-relaxed">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-xs uppercase font-mono text-cognac tracking-wider mb-2.5 flex items-center gap-2 font-bold">
                  <Terminal className="w-4 h-4 text-cognac" />
                  Engineering Overview
                </h4>
                <p className="text-[#231215] leading-relaxed font-sans">{project.longDescription}</p>
              </div>

              {/* Key Metrics / Highlights */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF4EC] border border-rose/25">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-mono uppercase text-[#8A6E73] font-semibold">{stat.label}</span>
                      <span className="text-sm font-mono font-bold text-cognac mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Details */}
              <div>
                <h4 className="text-xs uppercase font-mono text-ochre tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-ochre" />
                  Technical Architecture & Infrastructure
                </h4>
                <ul className="space-y-2.5">
                  {project.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                      <span className="text-[#231215] font-sans">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges Solved */}
              <div>
                <h4 className="text-xs uppercase font-mono text-mulberry tracking-wider mb-3 flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-mulberry" />
                  Engineering Challenges Overcome
                </h4>
                <ul className="space-y-2.5">
                  {project.challengesSolved.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-mulberry shrink-0 mt-2" />
                      <span className="text-[#231215] font-sans">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete Tech Stack */}
              <div>
                <h4 className="text-xs uppercase font-mono text-[#8A6E73] tracking-wider mb-2.5 font-bold">
                  Technologies, Libraries & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-[#FAF4EC] text-[#231215] border border-rose/25"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-rose/20 bg-[#FAF4EC] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-cognac text-white hover:bg-[#94473f] transition-all shadow-aesthetic-sm"
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
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-xl bg-white hover:bg-[#F5ECE3] text-[#231215] border border-rose/30 transition-colors shadow-aesthetic-sm"
                  >
                    <GitBranch className="w-4 h-4 text-ochre" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-medium text-[#8A6E73] hover:text-[#231215] transition-colors"
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
