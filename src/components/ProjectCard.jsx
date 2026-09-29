import React from 'react';
import { useIdeas } from '../context/IdeasContext';
import { 
  Heart, 
  Bookmark, 
  ArrowUpRight, 
  Users, 
  Sparkles, 
  Layers, 
  Clock,
  Check
} from 'lucide-react';

export default function ProjectCard({ project }) {
  const { 
    votedIdeaIds, 
    savedIdeaIds, 
    toggleVote, 
    toggleSave, 
    openProjectDetail,
    openJoinModal 
  } = useIdeas();

  const isVoted = votedIdeaIds.includes(project.id);
  const isSaved = savedIdeaIds.includes(project.id);

  const getDifficultyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'intermediate':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const openRolesCount = project.openRoles?.reduce(
    (acc, r) => acc + (r.spots - r.filled), 
    0
  ) || 0;

  return (
    <div className="group relative rounded-2xl bg-vault-900/60 hover:bg-vault-900 border border-white/5 hover:border-brand-indigo/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm flex flex-col justify-between overflow-hidden">
      
      {/* Top Accent Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-indigo/40 to-transparent group-hover:via-brand-cyan transition-all duration-300" />

      <div className="p-5 flex-1 flex flex-col">
        
        {/* Category & Badges Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-brand-indigo/10 text-brand-cyan border border-brand-indigo/20 font-medium">
              {project.category}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold ${getDifficultyBadge(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>

          {/* Quick Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(project.id);
            }}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isSaved
                ? 'bg-brand-indigo/20 text-brand-cyan border-brand-indigo/40'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
            }`}
            title={isSaved ? "Saved in your Vault" : "Save to Vault"}
            aria-label="Save idea"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Project Title */}
        <h3
          onClick={() => openProjectDetail(project)}
          className="text-base sm:text-lg font-bold text-white group-hover:text-brand-cyan transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {project.title}
        </h3>

        {/* Short Problem Statement / Tagline */}
        <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed flex-1">
          {project.tagline || project.problem}
        </p>

        {/* Technologies Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies?.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-vault-950 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Team Open Roles Bar */}
        {project.openRoles && project.openRoles.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Users className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-medium text-slate-300">Looking for:</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {openRolesCount} open spot{openRolesCount === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Creator info + Actions */}
      <div className="p-4 bg-vault-950/60 border-t border-white/5 flex items-center justify-between gap-3">
        {/* Creator Info */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={project.creator.avatar}
            alt={project.creator.name}
            className="w-7 h-7 rounded-lg object-cover border border-white/10 shrink-0"
          />
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-200 truncate block leading-tight">
              {project.creator.name}
            </span>
            <span className="text-[10px] text-slate-400 truncate block font-mono">
              {project.creator.department.split('&')[0]}
            </span>
          </div>
        </div>

        {/* Actions: Upvote + View */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleVote(project.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isVoted
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                : 'bg-vault-800 hover:bg-vault-700 text-slate-300 border border-white/10'
            }`}
            title={isVoted ? "Upvoted" : "Upvote idea"}
          >
            <Heart className={`w-3.5 h-3.5 ${isVoted ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="font-mono">{project.votes}</span>
          </button>

          <button
            onClick={() => openProjectDetail(project)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-vault-800 hover:bg-brand-indigo/30 hover:text-brand-cyan text-slate-300 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
          >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
