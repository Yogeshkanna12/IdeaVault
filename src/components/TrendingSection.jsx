import React from 'react';
import { useIdeas } from '../context/IdeasContext';
import { 
  Flame, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  Heart, 
  Users, 
  Eye, 
  ArrowRight,
  Award
} from 'lucide-react';

export default function TrendingSection() {
  const { 
    projects, 
    votedIdeaIds, 
    toggleVote, 
    openProjectDetail, 
    setActiveTab, 
    setSelectedCategory 
  } = useIdeas();

  // Top 5 trending projects sorted by votes & velocity
  const trendingProjects = [...projects]
    .sort((a, b) => (b.votes * 1.4 + b.views * 0.1) - (a.votes * 1.4 + a.views * 0.1))
    .slice(0, 5);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return {
          label: "#1",
          style: "bg-gradient-to-br from-amber-400 to-yellow-600 text-vault-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-300/40",
          tag: "Top Velocity"
        };
      case 1:
        return {
          label: "#2",
          style: "bg-gradient-to-br from-cyan-400 to-blue-500 text-vault-950 font-black shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-300/40",
          tag: "Surging"
        };
      case 2:
        return {
          label: "#3",
          style: "bg-gradient-to-br from-purple-400 to-indigo-500 text-white font-black shadow-lg shadow-purple-500/20 ring-2 ring-purple-300/40",
          tag: "Rising Star"
        };
      default:
        return {
          label: `#${index + 1}`,
          style: "bg-vault-800 text-slate-300 font-bold border border-white/10",
          tag: "Hot"
        };
    }
  };

  return (
    <section className="py-14 border-b border-white/5 relative bg-vault-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Campus Buzz</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Trending Now
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              High-traction student concepts receiving the most votes and team applications this week.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-blue transition-colors group cursor-pointer"
          >
            <span>Explore all {projects.length} ideas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dynamic Leaderboard Showcase Grid (NOT a boring table) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Rank #1 Flagship Spotlight Card */}
          {trendingProjects[0] && (
            <div className="md:col-span-12 lg:col-span-5 rounded-3xl p-6 bg-gradient-to-br from-vault-900 via-vault-900 to-vault-950 border border-amber-500/30 relative overflow-hidden group shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex flex-col justify-between">
              {/* Background ambient gold aura */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                {/* Top Badge row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black bg-gradient-to-br from-amber-400 to-yellow-600 text-vault-950 shadow-lg shadow-amber-500/20 ring-2 ring-amber-300/40">
                      #1
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      Top Trending Campus Concept
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {trendingProjects[0].category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 
                  onClick={() => openProjectDetail(trendingProjects[0])}
                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors cursor-pointer leading-snug"
                >
                  {trendingProjects[0].title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {trendingProjects[0].tagline}
                </p>

                {/* Open roles alert */}
                {trendingProjects[0].openRoles && trendingProjects[0].openRoles.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-vault-950/70 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-cyan" />
                      <span className="text-xs font-medium text-slate-300">
                        Looking for {trendingProjects[0].openRoles.length} teammate{trendingProjects[0].openRoles.length === 1 ? '' : 's'}:
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-brand-cyan font-semibold truncate max-w-[160px]">
                      {trendingProjects[0].openRoles.map(r => r.role.split(' ')[0]).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Metadata & Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={trendingProjects[0].creator.avatar}
                    alt={trendingProjects[0].creator.name}
                    className="w-8 h-8 rounded-lg object-cover border border-amber-400/40"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {trendingProjects[0].creator.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {trendingProjects[0].creator.department.split('&')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVote(trendingProjects[0].id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      votedIdeaIds.includes(trendingProjects[0].id)
                        ? 'bg-amber-400 text-vault-950 shadow-md'
                        : 'bg-vault-800 hover:bg-vault-700 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${votedIdeaIds.includes(trendingProjects[0].id) ? 'fill-current' : ''}`} />
                    <span>{trendingProjects[0].votes}</span>
                  </button>

                  <button
                    onClick={() => openProjectDetail(trendingProjects[0])}
                    className="p-2 rounded-xl bg-vault-800 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                    title="View details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ranks #2 through #5 Grid of Cards */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between gap-3">
            {trendingProjects.slice(1, 5).map((project, idx) => {
              const rankInfo = getRankBadge(idx + 1);
              const isVoted = votedIdeaIds.includes(project.id);
              const openSpots = project.openRoles?.reduce((acc, r) => acc + (r.spots - r.filled), 0) || 0;

              return (
                <div
                  key={project.id}
                  className="rounded-2xl p-3.5 sm:p-4 bg-vault-900/60 hover:bg-vault-900 border border-white/5 hover:border-brand-indigo/30 transition-all duration-200 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Rank Indicator */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${rankInfo.style}`}>
                      {rankInfo.label}
                    </div>

                    {/* Project Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5 shrink-0">
                          {project.category}
                        </span>
                        {openSpots > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                            {openSpots} role{openSpots > 1 ? 's' : ''} open
                          </span>
                        )}
                      </div>
                      
                      <h4 
                        onClick={() => openProjectDetail(project)}
                        className="text-sm font-semibold text-slate-100 group-hover:text-brand-cyan transition-colors truncate cursor-pointer"
                      >
                        {project.title}
                      </h4>
                      
                      <p className="text-xs text-slate-400 truncate max-w-md hidden sm:block">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Upvote */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleVote(project.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isVoted
                          ? 'bg-brand-indigo text-white shadow-glow-sm'
                          : 'bg-vault-800 hover:bg-vault-700 text-slate-300 border border-white/10'
                      }`}
                      title={isVoted ? "You upvoted this" : "Upvote"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isVoted ? 'fill-current text-rose-400' : 'text-slate-400'}`} />
                      <span className="font-mono">{project.votes}</span>
                    </button>

                    <button
                      onClick={() => openProjectDetail(project)}
                      className="p-1.5 rounded-xl bg-vault-800 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="View details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
