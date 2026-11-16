import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';
import { Project, ProjectCategory } from '../../types';
import { Search } from 'lucide-react';

interface FilterOption {
  key: ProjectCategory | 'all';
  label: string;
}

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterOptions: FilterOption[] = [
    { key: 'all', label: `All Projects (${PROJECTS_DATA.length})` },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'devops', label: 'DevOps & CI/CD' },
    { key: 'microservices', label: 'Microservices & IaC' },
    { key: 'monitoring', label: 'Monitoring' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      let matchesCategory = false;
      if (activeCategory === 'all') {
        matchesCategory = true;
      } else if (activeCategory === 'devops') {
        matchesCategory =
          project.category === 'devops' ||
          project.techStack.includes('Docker') ||
          project.techStack.includes('Kubernetes') ||
          project.techStack.includes('AWS');
      } else {
        matchesCategory = project.category === activeCategory;
      }

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-theme-border bg-theme-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="04. PROJECTS"
          title="Things I've Built. Problems I've Solved."
          description="A unified portfolio gallery of production-ready full-stack applications, containerized microservices, and cloud infrastructure."
        />

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-theme-border/60">
          {/* Category Filter Pills with Sliding Animation */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-theme-elevated border border-theme-border shadow-sand-sm">
            {filterOptions.map((filter) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveCategory(filter.key)}
                  className={`relative px-4 py-2 text-xs font-mono rounded-xl transition-colors duration-200 ${
                    isActive ? 'text-theme-main font-bold' : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectFilterPill"
                      className="absolute inset-0 bg-theme-surface rounded-xl border border-theme-border shadow-sand-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box with Warm Inset */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
            <input
              type="text"
              placeholder="Filter by stack (e.g. AWS, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-xs font-mono bg-theme-surface border border-theme-border rounded-xl text-theme-main placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-theme-accent/30 focus:border-theme-accent shadow-sand-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-theme-muted hover:text-theme-main bg-theme-elevated px-2 py-0.5 rounded-md border border-theme-border"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between text-xs font-mono text-theme-muted">
          <span>
            Displaying <strong className="text-theme-accent font-bold">{filteredProjects.length}</strong> of{' '}
            {PROJECTS_DATA.length} verified projects
          </span>
          {searchQuery && (
            <span>
              Searching: &quot;<span className="text-theme-main font-medium">{searchQuery}</span>&quot;
            </span>
          )}
        </div>

        {/* Unified Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={(p) => setSelectedProject(p)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="p-16 text-center rounded-2xl bg-theme-surface border border-theme-border shadow-sand text-theme-muted">
              <p className="text-base font-serif font-bold text-theme-main">No projects found matching criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-mono text-theme-accent bg-theme-accent/10 border border-theme-accent/25 rounded-xl hover:bg-theme-accent/20 font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Deep Architecture Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
