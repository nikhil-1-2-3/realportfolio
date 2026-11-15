import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ExternalLink, GitBranch, ArrowUpRight, Cpu, Database, Server, Layers, Terminal } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'devops':
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-terracotta-600" />,
          badge: 'border-orange-900/15 bg-orange-50 text-orange-900',
          spotlight: 'rgba(234, 88, 12, 0.08)',
        };
      case 'microservices':
        return {
          icon: <Server className="w-3.5 h-3.5 text-lapis-600" />,
          badge: 'border-sky-900/15 bg-sky-50 text-sky-900',
          spotlight: 'rgba(2, 132, 199, 0.08)',
        };
      case 'monitoring':
        return {
          icon: <Layers className="w-3.5 h-3.5 text-amber-600" />,
          badge: 'border-amber-900/15 bg-amber-50 text-amber-900',
          spotlight: 'rgba(217, 119, 6, 0.08)',
        };
      default:
        return {
          icon: <Database className="w-3.5 h-3.5 text-emerald-700" />,
          badge: 'border-emerald-900/15 bg-emerald-50 text-emerald-900',
          spotlight: 'rgba(16, 185, 129, 0.08)',
        };
    }
  };

  const theme = getCategoryTheme(project.category);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative flex flex-col h-full rounded-2xl border border-amber-900/12 bg-white card-shading hover:card-shading-hover transition-all duration-300 overflow-hidden"
    >
      {/* Warm Sun-Baked Spotlight Cursor Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              ${theme.spotlight},
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Architectural Banner with Parchment Tint */}
      <div className="relative h-44 w-full bg-gradient-to-br from-[#f8f5ee] via-[#f3ede1] to-[#ede4d3] p-5 flex flex-col justify-between border-b border-amber-900/10 overflow-hidden">
        {/* Subtle Papyrus Sand Pattern */}
        <div
          className="absolute inset-0 opacity-25 bg-sand-texture"
          aria-hidden="true"
        />

        {/* Top Controls Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Engraved Terminal Beads */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-800/30" />
            <span className="w-2 h-2 rounded-full bg-amber-800/30" />
            <span className="w-2 h-2 rounded-full bg-amber-800/30" />
            <span className="ml-2 font-mono text-[11px] text-stone-500 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-amber-700" />
              <span>{project.id}</span>
            </span>
          </div>

          {/* Category Chip */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border ${theme.badge} shadow-sand-sm`}>
            {theme.icon}
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Center Title in Banner */}
        <div className="relative z-10 pt-2">
          <h3 className="text-xl font-serif font-bold text-stone-900 tracking-tight group-hover:text-amber-800 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-stone-600 font-mono mt-0.5 truncate">{project.subtitle}</p>
        </div>

        {/* Bottom Shaded Metrics Ribbon */}
        {project.stats && project.stats.length > 0 && (
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2.5 border-t border-amber-900/10">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-stone-500 truncate">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold text-stone-800 truncate">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-5 relative z-10 bg-white">
        <div>
          <p className="text-sm text-stone-700 leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#faf7f2] text-stone-700 border border-amber-900/10 hover:border-amber-700/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-mono rounded-lg bg-[#f5efe4] text-stone-500 border border-amber-900/10">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between gap-2">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 hover:text-amber-900 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all shadow-sand-sm"
                title={`Visit ${project.title} live deployment`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                <span>Live Demo</span>
              </a>
            )}

            {(project.githubUrl || project.gitlabUrl) && (
              <a
                href={project.githubUrl || project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 hover:text-stone-950 px-3 py-1.5 rounded-lg bg-[#faf7f2] hover:bg-[#f3ece0] border border-amber-900/15 transition-all shadow-sand-sm"
                title={`View ${project.title} source code`}
              >
                <GitBranch className="w-3.5 h-3.5 text-stone-600" />
                <span>Source</span>
              </a>
            )}
          </div>

          {/* Architecture Details Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-stone-800 hover:text-amber-800 py-1 px-2.5 rounded-lg hover:bg-amber-500/10 transition-colors group/btn"
          >
            <span>Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-amber-700 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
