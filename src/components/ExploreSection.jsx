import React from 'react';
import { useIdeas } from '../context/IdeasContext';
import { CATEGORIES } from '../data/mockData';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Filter, 
  Check,
  RotateCcw
} from 'lucide-react';

const POPULAR_TECHS = [
  "Python", "React", "PyTorch", "C++", "ESP32", "TypeScript", 
  "Node.js", "Flutter", "FastAPI", "ROS2", "Docker", "PostgreSQL"
];

export default function ExploreSection() {
  const {
    filteredProjects,
    projects,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTech,
    setSelectedTech,
    sortBy,
    setSortBy,
    resetFilters
  } = useIdeas();

  const handleTechToggle = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(prev => prev.filter(t => t !== tech));
    } else {
      setSelectedTech(prev => [...prev, tech]);
    }
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedTech.length > 0 ||
    sortBy !== 'trending';

  return (
    <section id="explore-section" className="py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Discovery Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Explore Project Concepts
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Find innovative ideas seeking teammates, vote on your favorites, or request to join a project.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Showing <strong className="text-brand-cyan">{filteredProjects.length}</strong> of {projects.length} ideas</span>
          </div>
        </div>

        {/* Intelligent Search & Filter Toolbar */}
        <div className="rounded-2xl bg-vault-900/80 border border-white/10 p-4 shadow-xl backdrop-blur-xl mb-8 space-y-4">
          
          {/* Top Row: Search Input + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, problem, tech stack, or student name..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-vault-950/80 border border-white/5 focus:border-brand-indigo/50 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty Selector */}
            <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-vault-950/80 border border-white/5 text-slate-200 text-xs font-medium focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* Sort Order Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-vault-950/80 border border-white/5 text-slate-200 text-xs font-medium focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
              >
                <option value="trending">Sort: Trending Now</option>
                <option value="most-voted">Sort: Most Voted</option>
                <option value="newest">Sort: Newest First</option>
                <option value="open-roles">Sort: Most Open Roles</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Pills Scroller */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-brand-indigo text-white shadow-glow-sm'
                  : 'bg-vault-950/60 text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              All Categories ({projects.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = projects.filter(p => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brand-indigo text-white shadow-glow-sm'
                      : 'bg-vault-950/60 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {cat.name} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>

          {/* Technology Quick-Tags Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5 text-xs">
            <span className="text-[11px] font-mono text-slate-500 mr-1.5">
              Filter by Tech:
            </span>
            {POPULAR_TECHS.map(tech => {
              const isSelected = selectedTech.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => handleTechToggle(tech)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 font-semibold'
                      : 'bg-vault-950/50 text-slate-400 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  {tech}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-rose-500/10"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No project ideas match your search"
            description="Try loosening your filters or search keywords, or be the first student to submit an idea in this domain!"
            actionLabel="Reset Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
