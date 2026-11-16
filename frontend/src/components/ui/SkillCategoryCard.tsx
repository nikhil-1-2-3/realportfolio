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
        return { icon: <Code2 className="w-5 h-5 text-mint" />, color: '#73EEDC', bg: 'rgba(115, 238, 220, 0.12)' };
      case 'Layout':
        return { icon: <Layout className="w-5 h-5 text-teal" />, color: '#73C2BE', bg: 'rgba(115, 194, 190, 0.12)' };
      case 'Server':
        return { icon: <Server className="w-5 h-5 text-ice" />, color: '#90C3C8', bg: 'rgba(144, 195, 200, 0.12)' };
      case 'Database':
        return { icon: <Database className="w-5 h-5 text-mint" />, color: '#73EEDC', bg: 'rgba(115, 238, 220, 0.12)' };
      case 'Cloud':
        return { icon: <Cloud className="w-5 h-5 text-teal" />, color: '#73C2BE', bg: 'rgba(115, 194, 190, 0.12)' };
      case 'ShieldCheck':
        return { icon: <ShieldCheck className="w-5 h-5 text-lavender" />, color: '#776885', bg: 'rgba(119, 104, 133, 0.15)' };
      default:
        return { icon: <Code2 className="w-5 h-5 text-mint" />, color: '#73EEDC', bg: 'rgba(115, 238, 220, 0.12)' };
    }
  };

  const { icon, color, bg } = getIconData(category.iconName);

  return (
    <SpotlightCard
      spotlightColor={`${color}18`}
      className="flex flex-col justify-between h-full bg-[#130A15] border border-lavender/25 shadow-card-dark"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div
            className="p-3 rounded-xl border shrink-0 shadow-card-dark"
            style={{ backgroundColor: bg, borderColor: `${color}35` }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-base font-display font-bold text-white tracking-tight">
              {category.title}
            </h3>
            <p className="text-xs text-[#D4CDD7] mt-0.5 line-clamp-1 font-sans">{category.description}</p>
          </div>
        </div>

        {/* Skill Badges with Spring Hover */}
        <div className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-default ${
                skill.highlight
                  ? 'bg-gradient-to-r from-mint/20 via-teal/15 to-wine/30 text-white border border-mint/60 shadow-glow-mint font-bold'
                  : 'bg-[#1B0E1E] text-[#D4CDD7] border border-lavender/20 hover:border-mint/40 hover:text-white hover:bg-[#26142A]'
              }`}
            >
              {skill.highlight && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-mint mr-2 shadow-sm" />
              )}
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};
