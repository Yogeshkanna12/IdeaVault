import React from 'react';
import { Lightbulb, Plus, Search, Sparkles } from 'lucide-react';
import { useIdeas } from '../context/IdeasContext';

export default function EmptyState({
  icon: Icon = Lightbulb,
  title = "No ideas found",
  description = "Your next great project might be waiting to be discovered.",
  actionLabel = "Explore Ideas",
  onAction = null,
  secondaryActionLabel = null,
  onSecondaryAction = null
}) {
  const { setActiveTab, resetFilters } = useIdeas();

  const handlePrimary = () => {
    if (onAction) {
      onAction();
    } else {
      resetFilters();
      setActiveTab('explore');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-12 my-8 rounded-2xl border border-white/5 bg-vault-900/40 backdrop-blur-md relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

      {/* Stylized icon container */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-indigo/20 via-brand-purple/20 to-brand-cyan/20 border border-white/10 flex items-center justify-center text-brand-cyan shadow-glow-sm">
          <Icon className="w-10 h-10 text-brand-cyan" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 font-display">
        {title}
      </h3>
      <p className="text-slate-400 max-w-md text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handlePrimary}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-sm font-semibold hover:opacity-95 transition-all shadow-glow-sm cursor-pointer"
        >
          {actionLabel}
        </button>

        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vault-800 hover:bg-vault-700 border border-white/10 text-slate-300 text-sm font-medium transition-all cursor-pointer"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
