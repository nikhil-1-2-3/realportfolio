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
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Glowing Palette Laser Spine */}
      {!isLast && (
        <div
          className="absolute left-[20px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-apricot via-rose to-plum shadow-glow-apricot"
          aria-hidden="true"
        />
      )}

      {/* Node Dot with Glowing Palette Accent */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-[#201524] border border-apricot/40 text-apricot shrink-0 shadow-glow-apricot">
        <Briefcase className="w-5 h-5" />
      </div>

      {/* Content Card with Ambient Velvet Shading */}
      <div className="flex-1 rounded-2xl border border-cognac/30 bg-[#160e19] p-6 shadow-card-dark hover:border-apricot/50 hover:shadow-card-hover transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-display font-bold text-white tracking-tight">{item.role}</h3>
            <div className="text-sm font-semibold text-apricot mt-0.5">{item.company}</div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201524] border border-cognac/25 shadow-sand-sm">
              <Calendar className="w-3.5 h-3.5 text-rose" />
              <span>{item.period}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="mt-4 space-y-2.5">
          {item.description.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Used */}
        <div className="mt-5 pt-4 border-t border-cognac/20 flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#221626] text-neutral-300 border border-cognac/25"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
