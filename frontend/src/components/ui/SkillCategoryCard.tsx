import React from 'react';
import { Code2, Layout, Server, Database, Cloud, ShieldCheck } from 'lucide-react';
import { SkillCategory } from '../../types';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-amber-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-[#0d1322] border border-slate-800/90 hover:border-slate-700/80 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/40 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
            {getIcon(category.iconName)}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight font-sans">
              {category.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{category.description}</p>
          </div>
        </div>

        {/* Skill Badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill.name}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 ${
                skill.highlight
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/15'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              {skill.highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

