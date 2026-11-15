import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../../data/portfolioData';
import { TimelineItem } from '../ui/TimelineItem';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10 bg-[#f7f4ed]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="05. EXPERIENCE & EDUCATION"
          title="My Journey & Experience"
          description="Real-world internships and formal engineering education underpinning my technical progression."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-700 shadow-sm" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-800 font-bold">
                Professional Experience
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
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta-600 shadow-sm" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-800 font-bold">
                Formal Education
              </h3>
            </div>

            <div className="bg-white border border-amber-900/15 rounded-2xl p-6 card-shading relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-900/15 text-amber-800 shrink-0 shadow-sand-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-900/15 text-amber-900 font-mono text-xs font-bold shadow-sand-sm">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>CGPA: {EDUCATION_DATA.score}</span>
                </div>
              </div>

              {/* Degree Title & Institution */}
              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                  {EDUCATION_DATA.degree}
                </h4>
                <div className="text-sm font-semibold text-amber-800 mt-1">
                  {EDUCATION_DATA.institution}
                </div>
              </div>

              {/* Duration and Location */}
              <div className="flex items-center gap-4 mt-3 text-xs font-mono text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>{EDUCATION_DATA.period}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Gujarat, India</span>
                </span>
              </div>

              {/* Core Coursework */}
              <div className="mt-6 pt-5 border-t border-amber-900/10">
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                  <span>Core Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_DATA.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#faf7f2] text-stone-700 border border-amber-900/10"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic & Practical Balance Card */}
            <div className="p-6 rounded-2xl bg-[#fdfbf7] border border-amber-900/15 shadow-sand-sm text-xs text-stone-600 space-y-2">
              <div className="font-mono text-stone-900 font-bold flex items-center gap-2">
                <span>// Academic & Practical Synthesis</span>
              </div>
              <p className="leading-relaxed font-sans">
                Combining rigorous algorithms, operating system concepts, and database theory with hands-on container orchestration, CI/CD automation pipelines, and production AWS infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
