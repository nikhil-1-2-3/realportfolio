import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface TimelineItemProps {
  item: ExperienceItem;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast = false }) => {
  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      {/* Vertical Spine */}
      {!isLast && (
        <div
          className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/40 via-slate-700/50 to-slate-800/20"
          aria-hidden="true"
        />
      )}

      {/* Node Dot */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
        <Briefcase className="w-5 h-5" />
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-[#0d1322] border border-slate-800 rounded-xl p-6 transition-all hover:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{item.role}</h3>
            <div className="text-sm font-semibold text-emerald-400 mt-0.5">{item.company}</div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.period}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="mt-4 space-y-2">
          {item.description.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Technologies Used */}
        <div className="mt-5 pt-4 border-t border-slate-800/70 flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
