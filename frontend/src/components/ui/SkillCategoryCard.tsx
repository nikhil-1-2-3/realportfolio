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
        return { icon: <Code2 className="w-5 h-5 text-apricot" />, color: '#E68057', bg: 'rgba(230, 128, 87, 0.15)' };
      case 'Layout':
        return { icon: <Layout className="w-5 h-5 text-cognac" />, color: '#A2574F', bg: 'rgba(162, 87, 79, 0.15)' };
      case 'Server':
        return { icon: <Server className="w-5 h-5 text-plum" />, color: '#993A8B', bg: 'rgba(153, 58, 139, 0.15)' };
      case 'Database':
        return { icon: <Database className="w-5 h-5 text-rose" />, color: '#BF7587', bg: 'rgba(191, 117, 135, 0.15)' };
      case 'Cloud':
        return { icon: <Cloud className="w-5 h-5 text-apricot" />, color: '#E68057', bg: 'rgba(230, 128, 87, 0.15)' };
      case 'ShieldCheck':
        return { icon: <ShieldCheck className="w-5 h-5 text-plum" />, color: '#993A8B', bg: 'rgba(153, 58, 139, 0.15)' };
      default:
        return { icon: <Code2 className="w-5 h-5 text-apricot" />, color: '#E68057', bg: 'rgba(230, 128, 87, 0.15)' };
    }
  };

  const { icon, color, bg } = getIconData(category.iconName);

  return (
    <SpotlightCard
      spotlightColor={`${color}22`}
      className="flex flex-col justify-between h-full bg-[#160e19]/90 border border-cognac/25 shadow-card-dark"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div
            className="p-3 rounded-xl border shrink-0 shadow-sand-sm"
            style={{ backgroundColor: bg, borderColor: `${color}40` }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 font-sans">{category.description}</p>
          </div>
        </div>

        {/* Skill Badges with Spring Hover */}
        <div className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default ${
                skill.highlight
                  ? 'bg-gradient-to-r from-apricot/20 to-plum/20 text-white border border-apricot/50 shadow-glow-apricot font-semibold'
                  : 'bg-[#201524] text-neutral-300 border border-cognac/20 hover:border-plum/40 hover:text-white hover:bg-[#281b2e]'
              }`}
            >
              {skill.highlight && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-apricot mr-2 shadow-sm" />
              )}
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};
