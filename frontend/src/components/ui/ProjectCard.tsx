import React from 'react';
import { ExternalLink, GitBranch, ArrowRight, Layers, Cpu, Database, Server } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'devops':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'microservices':
        return <Server className="w-4 h-4 text-indigo-400" />;
      case 'monitoring':
        return <Layers className="w-4 h-4 text-amber-400" />;
      default:
        return <Database className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getGradientForCategory = (category: string) => {
    switch (category) {
      case 'devops':
        return 'from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-500/20 group-hover:border-cyan-500/40';
      case 'microservices':
        return 'from-indigo-950/40 via-slate-900 to-slate-950 border-indigo-500/20 group-hover:border-indigo-500/40';
      case 'monitoring':
        return 'from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/20 group-hover:border-amber-500/40';
      default:
        return 'from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/20 group-hover:border-emerald-500/40';
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#0d1322] rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 overflow-hidden">
      {/* Top Banner / Technical Badge Canvas */}
      <div
        className={`relative h-44 w-full bg-gradient-to-br ${getGradientForCategory(
          project.category
        )} p-5 flex flex-col justify-between border-b transition-colors duration-300`}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        {/* Top Header inside Banner */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            {getCategoryIcon(project.category)}
            <span>{project.categoryLabel}</span>
          </div>

          <div className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded">
            <span>{project.thumbnailBadge}</span>
          </div>
        </div>

        {/* Center / Bottom Info in Banner */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{project.subtitle}</p>
        </div>

        {/* Bottom subtle metrics ribbon */}
        {project.stats && project.stats.length > 0 && (
          <div className="relative z-10 grid grid-cols-3 gap-1 pt-2 border-t border-slate-800/50">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider truncate">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-medium text-slate-200 truncate">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-5">
        <div>
          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Technology Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-1.5 py-0.5 text-xs font-mono rounded bg-slate-800/40 text-slate-400">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {/* External links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 px-2.5 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all"
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
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
                title={`View ${project.title} source code`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            )}
          </div>

          {/* Modal Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors group/btn py-1"
          >
            <span>Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
