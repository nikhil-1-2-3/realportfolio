import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { SKILLS_DATA } from '../../data/portfolioData';
import { SkillCategoryCard } from '../ui/SkillCategoryCard';
import { CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Domains' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'databases', label: 'Databases' },
  ];

  const filteredCategories =
    selectedFilter === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((cat) => cat.id.includes(selectedFilter) || selectedFilter.includes(cat.id));

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeader
            eyebrow="03. SKILLS & TECHNOLOGIES"
            title="My Technical Toolkit"
            description="Categorized tools and technologies backed by genuine project implementations and active hands-on experience."
            className="mb-0 md:mb-0"
          />

          {/* Quick Domain Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-end">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  selectedFilter === opt.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Engineering Philosophy Notice */}
        <div className="mt-12 p-6 rounded-xl bg-[#0d1322] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-sans">
                Verified Hands-On Implementation
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                Every technology listed is actively utilized across my projects—from Docker containerization to multi-AZ AWS Terraform setups and Prometheus telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Primary Stack
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              Foundational Tool
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

