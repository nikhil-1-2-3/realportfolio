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
        return <Cpu className="w-3.5 h-3.5 text-mint" />;
      case 'microservices':
        return <Server className="w-3.5 h-3.5 text-teal" />;
      case 'monitoring':
        return <Layers className="w-3.5 h-3.5 text-ice" />;
      default:
        return <Database className="w-3.5 h-3.5 text-mint" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative flex flex-col h-full rounded-2xl border border-lavender/25 bg-[#130A15] shadow-card-dark hover:border-mint/60 hover:shadow-card-hover transition-all duration-300 overflow-hidden backdrop-blur-xl"
    >
      {/* Dynamic Cursor Spotlight Halo in Mint Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(115, 238, 220, 0.16),
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Architectural Banner */}
      <div className="relative h-44 w-full bg-[#1A0E1C] p-5 flex flex-col justify-between border-b border-lavender/20 overflow-hidden">
        {/* Top Controls Row with the 5 Palette Beads */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-mint shadow-glow-mint" title="#73EEDC (Mint)" />
            <span className="w-2.5 h-2.5 rounded-full bg-teal" title="#73C2BE (Teal)" />
            <span className="w-2.5 h-2.5 rounded-full bg-ice" title="#90C3C8 (Ice)" />
            <span className="w-2.5 h-2.5 rounded-full bg-lavender" title="#776885 (Lavender)" />
            <span className="w-2.5 h-2.5 rounded-full bg-wine" title="#5F1A37 (Wine)" />
            <span className="ml-2 font-mono text-[11px] text-[#8E8295] flex items-center gap-1">
              <Terminal className="w-3 h-3 text-mint" />
              <span>{project.id}</span>
            </span>
          </div>

          {/* Category Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono border border-lavender/30 bg-[#130A15] text-[#D4CDD7]">
            {getCategoryIcon(project.category)}
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        {/* Center Title in Banner */}
        <div className="relative z-10 pt-2">
          <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-mint transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-ice font-mono mt-0.5 truncate">{project.subtitle}</p>
        </div>

        {/* Bottom Shaded Metrics Ribbon */}
        {project.stats && project.stats.length > 0 && (
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2.5 border-t border-lavender/15">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#8E8295] truncate">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold text-white truncate">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-5 relative z-10 bg-[#130A15]">
        <div>
          <p className="text-sm text-[#D4CDD7] leading-relaxed font-sans line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#1B0E1E] text-[#D4CDD7] border border-lavender/20 hover:border-mint/40 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-mono rounded-lg bg-[#26142A] text-mint border border-lavender/25">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="mt-4 pt-4 border-t border-lavender/15 flex items-center justify-between gap-2">
          {/* External Links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A050B] px-3.5 py-1.5 rounded-lg bg-mint hover:bg-mint/90 border border-white/20 transition-all shadow-glow-mint"
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
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#D4CDD7] hover:text-white px-3 py-1.5 rounded-lg bg-[#1B0E1E] border border-lavender/25 hover:border-mint/40 transition-all shadow-card-dark"
                title={`View ${project.title} source code`}
              >
                <GitBranch className="w-3.5 h-3.5 text-teal" />
                <span>Source</span>
              </a>
            )}
          </div>

          {/* Architecture Details Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#D4CDD7] hover:text-mint py-1 px-2.5 rounded-lg hover:bg-[#1B0E1E] transition-colors group/btn"
          >
            <span>Architecture</span>
            <ArrowUpRight className="w-4 h-4 text-mint transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
