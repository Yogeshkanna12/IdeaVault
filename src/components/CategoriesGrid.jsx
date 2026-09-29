import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useIdeas } from '../context/IdeasContext';
import { 
  Brain, 
  Globe, 
  Smartphone, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Sprout, 
  Coins, 
  Leaf, 
  GraduationCap, 
  Bot, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Brain,
  Globe,
  Smartphone,
  ShieldAlert,
  Cpu,
  Activity,
  Sprout,
  Coins,
  Leaf,
  GraduationCap,
  Bot,
  Sparkles
};

export default function CategoriesGrid() {
  const { 
    projects, 
    selectedCategory, 
    setSelectedCategory, 
    setActiveTab 
  } = useIdeas();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('explore');
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-14 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Hubs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Idea Categories
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Explore 12 distinct collegiate innovation domains where students are actively designing and shipping projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => {
            const IconComponent = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            const projectCount = projects.filter(
              p => p.categoryId === cat.id || p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-indigo/20 border-brand-indigo shadow-glow-sm scale-[1.02]'
                    : 'bg-vault-900/50 hover:bg-vault-900 border-white/5 hover:border-brand-indigo/30 hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400 group-hover:text-brand-cyan group-hover:bg-brand-cyan/10 transition-colors">
                      {projectCount} {projectCount === 1 ? 'idea' : 'ideas'}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-cyan transition-colors font-display">
                    {cat.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-brand-cyan transition-colors">
                  <span className="font-medium text-[11px]">Explore domain</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
