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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'devops':
        return <Cpu className="w-3.5 h-3.5 text-apricot" />;
      case 'microservices':
        return <Server className="w-3.5 h-3.5 text-plum" />;
      case 'monitoring':
        return <Layers className="w-3.5 h-3.5 text-cognac" />;
      default:
        return <Database className="w-3.5 h-3.5 text-rose" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative flex flex-col h-full rounded-2xl border border-theme-border bg-theme-surface card-shading hover:card-shading-hover transition-all duration-300 overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight),
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Architectural Banner */}
      <div className="relative h-44 w-full bg-theme-elevated p-5 flex flex-col justify-between border-b border-theme-border overflow-hidden">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-20 bg-theme-pattern"
          aria-hidden="true"
        />

        {/* Top Controls Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {/* Palette Beads */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E68057] shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#BF7587] shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#993A8B] shadow-sm" />
            <span className="ml-2 font-mono text-[11px] text-theme-muted flex items-center gap-1">
              <Terminal className="w-3 h-3 text-apricot" />
              <span>{project.id}</span>
            </span>
          </div>

          {/* Category Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border border-theme-border bg-theme-surface text-theme-main shadow-sand-sm">
            {getCategoryIcon(project.category)}
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Center Title in Banner */}
        <div className="relative z-10 pt-2">
          <h3 className="text-xl font-display font-bold text-theme-main tracking-tight group-hover:text-apricot transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-theme-muted font-mono mt-0.5 truncate">{project.subtitle}</p>
        </div>

        {/* Bottom Shaded Metrics Ribbon */}
        {project.stats && project.stats.length > 0 && (
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2.5 border-t border-theme-border/60">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-theme-muted truncate">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold text-theme-main truncate">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-5 relative z-10 bg-theme-surface">
        <div>
          <p className="text-sm text-theme-muted leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-theme-base text-theme-main border border-theme-border hover:border-theme-accent transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-mono rounded-lg bg-theme-elevated text-theme-muted border border-theme-border">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-4 border-t border-theme-border flex items-center justify-between gap-2">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white px-3 py-1.5 rounded-lg bg-gradient-palette hover:brightness-110 border border-white/20 transition-all shadow-sand-sm"
                title={`Visit ${project.title} live deployment`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            {(project.githubUrl || project.gitlabUrl) && (
              <a
                href={project.githubUrl || project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-theme-main hover:text-theme-accent px-3 py-1.5 rounded-lg bg-theme-base border border-theme-border transition-all shadow-sand-sm"
                title={`View ${project.title} source code`}
              >
                <GitBranch className="w-3.5 h-3.5 text-theme-muted" />
                <span>Source</span>
              </a>
            )}
          </div>

          {/* Architecture Details Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-theme-main hover:text-theme-accent py-1 px-2.5 rounded-lg hover:bg-theme-elevated transition-colors group/btn"
          >
            <span>Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-theme-accent transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
