import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Search, FolderGit2 } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectModal } from '../components/ui/ProjectModal';
import { Project, ProjectCategory } from '../types';

interface FilterOption {
  key: ProjectCategory | 'all';
  label: string;
}

export const ProjectsPage: React.FC = () => {
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
    return PROJECTS_DATA.filter((project: Project) => {
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
        project.techStack.some((tech: string) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="PORTFOLIO GALLERY"
        title="Things I've Built. Problems I've Solved."
        description="A comprehensive gallery of production full-stack systems, containerized microservices, and declarative cloud architectures."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-rose/30 shadow-aesthetic-sm">
          {filterOptions.map((opt) => {
            const isSelected = activeCategory === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setActiveCategory(opt.key)}
                className={`relative px-4 py-2 text-xs font-mono rounded-xl transition-all duration-200 ${
                  isSelected ? 'bg-cognac text-white font-bold shadow-aesthetic-sm' : 'text-[#5C4448] hover:text-[#231215]'
                }`}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cognac">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack (e.g. Docker, MySQL, Redis)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-white border border-rose/30 rounded-xl text-[#231215] placeholder-[#8A6E73] focus:outline-none focus:border-cognac focus:ring-1 focus:ring-cognac shadow-aesthetic-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-mono text-[#8A6E73] hover:text-[#231215]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white border border-rose/25 shadow-card-light">
          <FolderGit2 className="w-12 h-12 text-[#8A6E73] mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-[#231215]">No Matching Projects</h3>
          <p className="text-xs text-[#5C4448] mt-1 font-sans">
            Try adjusting your search criteria or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-mono rounded-xl bg-cognac text-white font-bold shadow-aesthetic-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p: Project) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal View for Project Architecture */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
