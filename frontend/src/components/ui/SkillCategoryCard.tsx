import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Cloud, ShieldCheck } from 'lucide-react';
import { SkillCategory } from '../../types';
import { SpotlightCard } from './SpotlightCard';

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category }) => {
  const getIconData = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return { icon: <Code2 className="w-5 h-5 text-amber-800" />, color: 'rgba(180, 83, 9, 0.08)' };
      case 'Layout':
        return { icon: <Layout className="w-5 h-5 text-terracotta-600" />, color: 'rgba(194, 65, 12, 0.08)' };
      case 'Server':
        return { icon: <Server className="w-5 h-5 text-lapis-600" />, color: 'rgba(3, 105, 161, 0.08)' };
      case 'Database':
        return { icon: <Database className="w-5 h-5 text-amber-700" />, color: 'rgba(217, 119, 6, 0.08)' };
      case 'Cloud':
        return { icon: <Cloud className="w-5 h-5 text-sky-700" />, color: 'rgba(14, 165, 233, 0.08)' };
      case 'ShieldCheck':
        return { icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />, color: 'rgba(4, 120, 87, 0.08)' };
      default:
        return { icon: <Code2 className="w-5 h-5 text-stone-700" />, color: 'rgba(120, 113, 108, 0.08)' };
    }
  };

  const { icon, color } = getIconData(category.iconName);

  return (
    <SpotlightCard spotlightColor={color} className="flex flex-col justify-between h-full bg-white card-shading">
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="p-3 rounded-xl bg-[#faf7f2] border border-amber-900/10 shadow-sand-sm shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900 tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{category.description}</p>
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
                  ? 'bg-amber-500/10 text-amber-900 border border-amber-500/30 hover:border-amber-700/50 hover:bg-amber-500/15 shadow-sand-sm font-medium'
                  : 'bg-[#faf7f2] text-stone-700 border border-amber-900/10 hover:border-amber-900/20 hover:bg-[#f3ece0]'
              }`}
            >
              {skill.highlight && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-700 mr-2 shadow-sm" />
              )}
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};
