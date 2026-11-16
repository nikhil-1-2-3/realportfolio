import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Cloud, ShieldCheck } from 'lucide-react';
import { SkillCategory } from '../../types';
import { SpotlightCard } from './SpotlightCard';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-theme-accent" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-orange-500" />;
      case 'Server':
        return <Server className="w-5 h-5 text-cyan-500" />;
      case 'Database':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      default:
        return <Code2 className="w-5 h-5 text-theme-accent" />;
    }
  };

  return (
    <SpotlightCard className="flex flex-col justify-between h-full bg-theme-surface border-theme-border card-shading">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="p-3 rounded-xl bg-theme-elevated border border-theme-border shadow-sand-sm shrink-0">
            {getIcon(category.iconName)}
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-theme-main tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs text-theme-muted mt-0.5 line-clamp-1">{category.description}</p>
          </div>
        </div>

        {/* Skill Badges with Spring Hover */}
        <div className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default ${
                skill.highlight
                  ? 'bg-theme-accent/15 text-theme-main border border-theme-accent/40 hover:border-theme-accent shadow-sand-sm font-semibold'
                  : 'bg-theme-elevated text-theme-muted border border-theme-border hover:border-theme-border-strong hover:text-theme-main hover:bg-theme-hover'
              }`}
            >
              {skill.highlight && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-theme-accent mr-2 shadow-sm" />
              )}
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};
