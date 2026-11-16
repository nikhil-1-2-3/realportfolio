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
        return <Cpu className="w-3.5 h-3.5 text-cognac" />;
      case 'microservices':
        return <Server className="w-3.5 h-3.5 text-ochre" />;
      case 'monitoring':
        return <Layers className="w-3.5 h-3.5 text-rose" />;
      default:
        return <Database className="w-3.5 h-3.5 text-mulberry" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative flex flex-col h-full rounded-2xl border border-rose/25 bg-white shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden backdrop-blur-xl"
    >
      {/* Dynamic Cursor Spotlight Halo */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(162, 87, 79, 0.08),
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Architectural Banner */}
      <div className="relative h-44 w-full bg-[#FAF4EC] p-5 flex flex-col justify-between border-b border-rose/20 overflow-hidden">
        {/* Top Controls Row with the 4 Palette Beads */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cognac shadow-sm" title="#A2574F (Cognac)" />
            <span className="w-2.5 h-2.5 rounded-full bg-ochre" title="#E68057 (Ochre)" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose" title="#BF7587 (Dusty Rose)" />
            <span className="w-2.5 h-2.5 rounded-full bg-mulberry" title="#993A8B (Mulberry)" />
            <span className="ml-2 font-mono text-[11px] text-[#8A6E73] flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cognac" />
              <span>{project.id}</span>
            </span>
          </div>

          {/* Category Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border border-rose/30 bg-white text-[#5C4448] shadow-aesthetic-sm">
            {getCategoryIcon(project.category)}
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Center Title in Banner */}
        <div className="relative z-10 pt-2">
          <h3 className="text-xl font-display font-bold text-[#231215] tracking-tight group-hover:text-cognac transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-ochre font-mono mt-0.5 truncate font-semibold">{project.subtitle}</p>
        </div>

        {/* Bottom Shaded Metrics Ribbon */}
        {project.stats && project.stats.length > 0 && (
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2.5 border-t border-rose/15">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#8A6E73] truncate">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold text-[#231215] truncate">
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
          <p className="text-sm text-[#5C4448] leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#FAF4EC] text-[#5C4448] border border-rose/20 hover:border-cognac/40 hover:text-[#231215] transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-mono rounded-lg bg-[#FAF4EC] text-cognac border border-rose/25 font-bold">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="mt-4 pt-4 border-t border-rose/15 flex items-center justify-between gap-2">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white px-3.5 py-1.5 rounded-lg bg-cognac hover:bg-[#94473f] border border-cognac/30 transition-all shadow-aesthetic-sm"
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
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#5C4448] hover:text-[#231215] px-3 py-1.5 rounded-lg bg-[#FAF4EC] border border-rose/25 hover:border-cognac/40 transition-all shadow-aesthetic-sm"
                title={`View ${project.title} source code`}
              >
                <GitBranch className="w-3.5 h-3.5 text-ochre" />
                <span>Source</span>
              </a>
            )}
          </div>

          {/* Architecture Details Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#5C4448] hover:text-cognac py-1 px-2.5 rounded-lg hover:bg-[#FAF4EC] transition-colors group/btn"
          >
            <span>Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-cognac transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
