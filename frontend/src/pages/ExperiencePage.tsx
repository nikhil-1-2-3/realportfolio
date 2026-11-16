import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { TimelineItem } from '../components/ui/TimelineItem';
import { ExperienceItem } from '../types';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="CAREER TIMELINE"
        title="Experience & Education"
        description="Real-world software engineering internships, technical progression, and formal academic rigor."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Work Experience Timeline (7 cols) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-cognac shadow-sm" />
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#231215] font-bold">
              Professional Experience
            </h3>
          </div>

          <div className="relative">
            {EXPERIENCES_DATA.map((item: ExperienceItem, idx: number) => (
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
            <span className="w-2.5 h-2.5 rounded-full bg-ochre shadow-sm" />
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#231215] font-bold">
              Formal Education
            </h3>
          </div>

          <div className="bg-white border border-rose/30 rounded-2xl p-6 shadow-card-light relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="p-3 rounded-xl bg-cognac/10 border border-cognac/25 text-cognac shrink-0 shadow-aesthetic-sm">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF4EC] border border-cognac/30 text-cognac font-mono text-xs font-bold shadow-aesthetic-sm">
                <Award className="w-3.5 h-3.5 text-cognac" />
                <span>CGPA: {EDUCATION_DATA.score}</span>
              </div>
            </div>

            {/* Degree Title & Institution */}
            <div>
              <h4 className="text-lg font-display font-bold text-[#231215]">
                {EDUCATION_DATA.degree}
              </h4>
              <p className="text-sm font-bold text-cognac mt-0.5">
                {EDUCATION_DATA.institution}
              </p>
            </div>

            {/* Period */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-rose/20 text-xs font-mono text-[#5C4448]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-ochre" />
                <span>{EDUCATION_DATA.period}</span>
              </span>
              <span>•</span>
              <span className="text-cognac font-bold">Gujarat, India</span>
            </div>

            {/* Core Coursework */}
            <div className="mt-5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#5C4448] mb-2.5">
                <BookOpen className="w-3.5 h-3.5 text-ochre" />
                <span>Core Academic Foundation:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {EDUCATION_DATA.coursework.map((course: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#FAF4EC] border border-rose/25 text-[#5C4448]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
