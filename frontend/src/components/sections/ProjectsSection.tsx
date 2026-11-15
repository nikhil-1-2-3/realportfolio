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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10 bg-[#fbf9f4]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="04. PROJECTS"
          title="Things I've Built. Problems I've Solved."
          description="A unified portfolio gallery of production-ready full-stack applications, containerized microservices, and cloud infrastructure."
        />

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-amber-900/10">
          {/* Category Filter Pills with Sliding Animation */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#ede6d8]/60 border border-amber-900/10 shadow-sand-sm">
            {filterOptions.map((filter) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveCategory(filter.key)}
                  className={`relative px-4 py-2 text-xs font-mono rounded-xl transition-colors duration-200 ${
                    isActive ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="projectFilterPill"
                      className="absolute inset-0 bg-white rounded-xl border border-amber-900/10 shadow-sand-sm -z-10"
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
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Filter by stack (e.g. AWS, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 text-xs font-mono bg-white border border-amber-900/15 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 shadow-sand-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-500 hover:text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between text-xs font-mono text-stone-500">
          <span>
            Displaying <strong className="text-amber-800 font-bold">{filteredProjects.length}</strong> of{' '}
            {PROJECTS_DATA.length} verified projects
          </span>
          {searchQuery && (
            <span>
              Searching: &quot;<span className="text-stone-900 font-medium">{searchQuery}</span>&quot;
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
            <div className="p-16 text-center rounded-2xl bg-white border border-amber-900/15 shadow-sand text-stone-600">
              <p className="text-base font-serif font-bold text-stone-800">No projects found matching criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-mono text-amber-800 bg-amber-500/10 border border-amber-500/25 rounded-xl hover:bg-amber-500/20 font-semibold"
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
