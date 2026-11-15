import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../../data/portfolioData';
import { TimelineItem } from '../ui/TimelineItem';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="05. EXPERIENCE & EDUCATION"
          title="My Journey & Experience"
          description="Real-world internships and ongoing formal engineering education underpinning my technical progression."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold">
                Professional Internships
              </h3>
            </div>

            <div className="relative">
              {EXPERIENCES_DATA.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isLast={idx === EXPERIENCES_DATA.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Education & Academic Rigor (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-300 font-bold">
                Formal Education
              </h3>
            </div>

            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>CGPA: {EDUCATION_DATA.score}</span>
                </div>
              </div>

              {/* Degree Title & Institution */}
              <div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {EDUCATION_DATA.degree}
                </h4>
                <div className="text-sm font-semibold text-cyan-400 mt-1">
                  {EDUCATION_DATA.institution}
                </div>
              </div>

              {/* Duration and Location */}
              <div className="flex items-center gap-4 mt-3 text-xs font-mono text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{EDUCATION_DATA.period}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Gujarat, India</span>
                </span>
              </div>

              {/* Core Coursework */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Relevant Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Approach Card */}
            <div className="p-5 rounded-xl bg-[#090e1a] border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="font-mono text-slate-300 font-bold flex items-center gap-2">
                <span>// Academic & Practical Balance</span>
              </div>
              <p className="leading-relaxed">
                Combining formal algorithms, data structures, and computer science foundations with real-world open source projects, automated CI/CD deployments, and cloud infrastructure management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

