import React, { useState, useEffect } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Sparkles, 
  Lightbulb, 
  Flame, 
  Layers, 
  User, 
  PlusCircle, 
  ArrowRight, 
  X,
  Code
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }) {
  const { 
    projects, 
    openProjectDetail, 
    setActiveTab, 
    setSelectedCategory,
    setIsSubmitModalOpen 
  } = useIdeas();
  const { setIsProfileModalOpen } = useAuth();

  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedProjects = query.trim()
    ? projects.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies?.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        p.problem.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : projects.slice(0, 3);

  const quickActions = [
    {
      id: 'action-submit',
      icon: PlusCircle,
      title: 'Submit a New Project Idea',
      description: 'Open the 5-step IdeaVault submission wizard',
      run: () => {
        setIsSubmitModalOpen(true);
        onClose();
      }
    },
    {
      id: 'action-trending',
      icon: Flame,
      title: 'View Trending Projects Leaderboard',
      description: 'See the top voted concepts gaining momentum',
      run: () => {
        setActiveTab('trending');
        onClose();
      }
    },
    {
      id: 'action-categories',
      icon: Layers,
      title: 'Browse All 12 Project Categories',
      description: 'Explore AI, IoT, Web, MedTech, AgriTech, FinTech...',
      run: () => {
        setActiveTab('categories');
        onClose();
      }
    },
    {
      id: 'action-profile',
      icon: User,
      title: 'My Student Profile & Skills',
      description: 'Manage your portfolio, skills, and active badge awards',
      run: () => {
        setIsProfileModalOpen(true);
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-vault-900 border border-white/10 shadow-2xl shadow-brand-indigo/20 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-vault-950/80">
          <Search className="w-5 h-5 text-brand-cyan shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies (React, PyTorch), domains, or actions..."
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Projects matched */}
          <div>
            <div className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 font-mono">
              {query.trim() ? 'Matching Project Ideas' : 'Featured Student Projects'}
            </div>
            <div className="mt-1 space-y-1">
              {matchedProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => {
                    openProjectDetail(project);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center text-brand-cyan shrink-0">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-brand-cyan transition-colors truncate">
                          {project.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 shrink-0">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 ml-3">
                    <span className="font-mono text-brand-cyan">★ {project.votes}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand-cyan" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 font-mono">
              Quick Actions
            </div>
            <div className="mt-1 space-y-1">
              {quickActions.map(action => {
                const IconComponent = action.icon;
                return (
                  <div
                    key={action.id}
                    onClick={action.run}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-indigo/10 hover:border-brand-indigo/20 border border-transparent cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-vault-800 border border-white/5 flex items-center justify-center text-slate-300 group-hover:text-brand-cyan">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-200 group-hover:text-brand-cyan">
                          {action.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/5 bg-vault-950/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</kbd>
            <span>Select:</span>
            <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">Enter</kbd>
          </div>
          <span>IdeaVault Global Search</span>
        </div>
      </div>
    </div>
  );
}
