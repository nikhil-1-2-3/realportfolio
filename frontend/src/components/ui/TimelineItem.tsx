import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface TimelineItemProps {
  item: ExperienceItem;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast = false }) => {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Editorial Laser Spine */}
      {!isLast && (
        <div
          className="absolute left-[20px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-mulberry via-cognac to-ochre"
          aria-hidden="true"
        />
      )}

      {/* Node Dot with Mulberry Accent */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-cognac/40 text-cognac shrink-0 shadow-aesthetic-sm">
        <Briefcase className="w-5 h-5" />
      </div>

      {/* Content Card with Ambient Warm Shading */}
      <div className="flex-1 rounded-2xl border border-rose/30 bg-white p-6 shadow-card-light hover:border-cognac/40 hover:shadow-card-hover transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-display font-bold text-[#231215] tracking-tight">{item.role}</h3>
            <div className="text-sm font-bold text-cognac mt-0.5">{item.company}</div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#5C4448] shrink-0 font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EC] border border-rose/25">
              <Calendar className="w-3.5 h-3.5 text-ochre" />
              <span>{item.period}</span>
            </span>
            <span className="text-[#8A6E73] font-normal">{item.location}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="mt-4 space-y-2.5">
          {item.description.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-[#5C4448]">
              <CheckCircle2 className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
