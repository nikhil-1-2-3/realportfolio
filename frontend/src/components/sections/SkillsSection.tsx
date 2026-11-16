import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { SKILLS_DATA } from '../../data/portfolioData';
import { SkillCategoryCard } from '../ui/SkillCategoryCard';
import { CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Disciplines' },
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
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-theme-border bg-theme-base">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="03. SKILLS & TECHNOLOGIES"
            title="My Technical Toolkit"
            description="Categorized tools and technologies backed by genuine production implementations and verified code repositories."
            className="mb-0 md:mb-0"
          />

          {/* Quick Filter Sliding Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-theme-elevated border border-theme-border shadow-sand-sm self-start md:self-end">
            {filterOptions.map((opt) => {
              const isSelected = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`relative px-4 py-2 text-xs font-mono rounded-xl transition-colors duration-200 ${
                    isSelected ? 'text-theme-main font-bold' : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="skillFilterPill"
                      className="absolute inset-0 bg-theme-surface rounded-xl border border-theme-border shadow-sand-sm -z-10"
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
          {filteredCategories.map((category) => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Engineering Philosophy Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-theme-accent/10 text-theme-accent shrink-0 shadow-sand-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-theme-main">
                Verified Hands-On Implementation
              </h4>
              <p className="text-xs text-theme-muted mt-0.5 font-sans">
                Every technology listed is actively utilized across my projects—from Docker containerization to multi-AZ AWS Terraform setups and Prometheus telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-theme-muted shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-theme-accent shadow-sm" />
              Primary Stack
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-theme-muted/50" />
              Foundational Tool
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
