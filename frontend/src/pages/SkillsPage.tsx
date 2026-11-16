import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategoryCard } from '../components/ui/SkillCategoryCard';
import { SkillCategory } from '../types';
import { CheckCircle2 } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'databases', label: 'Databases' },
  ];

  const filteredCategories: SkillCategory[] =
    selectedFilter === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((cat: SkillCategory) => cat.id.includes(selectedFilter) || selectedFilter.includes(cat.id));

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <SectionHeader
          eyebrow="TECHNICAL TOOLKIT"
          title="Skills & Technologies"
          description="Categorized tools and technologies backed by genuine production implementations and verified code repositories."
          className="mb-0 md:mb-0"
        />

        {/* Quick Filter Sliding Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#130A15] border border-lavender/25 shadow-card-dark self-start md:self-end">
          {filterOptions.map((opt) => {
            const isSelected = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`relative px-4 py-2 text-xs font-mono font-medium rounded-xl transition-colors duration-200 ${
                  isSelected ? 'text-[#0A050B] font-bold' : 'text-[#D4CDD7] hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="skillFilterPill"
                    className="absolute inset-0 bg-mint rounded-xl shadow-glow-mint -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skill Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category: SkillCategory) => (
          <SkillCategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Engineering Philosophy Notice */}
      <div className="mt-14 p-6 rounded-2xl bg-[#130A15] border border-lavender/25 shadow-card-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-mint/15 text-mint border border-mint/30 shrink-0 shadow-glow-mint">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-display font-bold text-white">
              Verified Hands-On Implementation
            </h4>
            <p className="text-xs text-[#D4CDD7] mt-0.5 font-sans">
              Every technology listed is actively utilized across my projects—from Docker containerization to multi-AZ AWS Terraform setups and Prometheus telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-[#D4CDD7] shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-mint shadow-glow-mint" />
            <span className="text-white font-bold">Primary Stack</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lavender" />
            <span>Foundational Tool</span>
          </span>
        </div>
      </div>
    </div>
  );
};
