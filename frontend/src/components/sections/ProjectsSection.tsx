import React, { useState, useMemo } from 'react';
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
      // Category match
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

      // Search match
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="04. PROJECTS"
          title="Things I've Built. Problems I've Solved."
          description="A single comprehensive gallery of production-ready full-stack applications, containerized microservices, and cloud infrastructure."
        />

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((filter) => {
              const isActive = activeCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveCategory(filter.key)}
                  className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search stack (e.g. Docker, AWS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-[#0d1322] border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            Showing <strong className="text-emerald-400">{filteredProjects.length}</strong> of{' '}
            {PROJECTS_DATA.length} projects
          </span>
          {searchQuery && (
            <span>
              Filtering by keyword: &quot;<span className="text-white">{searchQuery}</span>&quot;
            </span>
          )}
        </div>

        {/* Unified Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#0d1322] border border-slate-800 text-slate-400">
            <p className="text-base font-mono">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Inline Modal for Deep Architecture Review */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
