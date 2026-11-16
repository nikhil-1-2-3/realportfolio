import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface TimelineItemProps {
  item: ExperienceItem;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Glowing Palette Laser Spine */}
      {!isLast && (
        <div
          className="absolute left-[20px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-mint via-teal to-wine shadow-glow-mint"
          aria-hidden="true"
        />
      )}

      {/* Node Dot with Glowing Mint Accent */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-[#1B0E1E] border border-mint/40 text-mint shrink-0 shadow-glow-mint">
        <Briefcase className="w-5 h-5" />
      </div>

      {/* Content Card with Ambient Velvet Shading */}
      <div className="flex-1 rounded-2xl border border-lavender/30 bg-[#130A15] p-6 shadow-card-dark hover:border-mint/50 hover:shadow-card-hover transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-display font-bold text-white tracking-tight">{item.role}</h3>
            <div className="text-sm font-semibold text-mint mt-0.5">{item.company}</div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#D4CDD7] shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B0E1E] border border-lavender/25">
              <Calendar className="w-3.5 h-3.5 text-teal" />
              <span>{item.period}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8E8295]" />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="mt-4 space-y-2.5">
          {item.description.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-[#D4CDD7]">
              <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
