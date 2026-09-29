import React, { useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Users, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Code, 
  Link as LinkIcon 
} from 'lucide-react';

export default function JoinTeamModal() {
  const { 
    isJoinModalOpen, 
    closeJoinModal, 
    joinModalTarget, 
    applyForRole 
  } = useIdeas();

  const { currentUser, openAuthModal } = useAuth();
  const { project, role: preselectedRole } = joinModalTarget || {};

  const [selectedRole, setSelectedRole] = useState(preselectedRole || '');
  const [pitch, setPitch] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize role if updated
  React.useEffect(() => {
    if (preselectedRole) {
      setSelectedRole(preselectedRole);
    } else if (project?.openRoles && project.openRoles.length > 0) {
      setSelectedRole(project.openRoles[0].role);
    }
  }, [preselectedRole, project]);

  if (!isJoinModalOpen || !project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    if (!selectedRole || !pitch.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      applyForRole(project.id, selectedRole, pitch);
      setIsSubmitting(false);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F2FE', '#6366F1', '#A855F7', '#10B981']
        });
      } catch (err) {
        console.log(err);
      }

      closeJoinModal();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/85 backdrop-blur-md transition-opacity"
        onClick={closeJoinModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-vault-900 border border-white/15 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo/30 to-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Apply to Join Team
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[280px]">
                {project.title}
              </p>
            </div>
          </div>

          <button
            onClick={closeJoinModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Applicant Info Header */}
          {currentUser && (
            <div className="p-3 rounded-xl bg-vault-950/80 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <div className="font-bold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {currentUser.department?.split('&')[0]}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-brand-cyan px-2 py-0.5 rounded-full bg-brand-cyan/10">
                Verified Student
              </span>
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Select Desired Role <span className="text-rose-400">*</span>
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
              required
            >
              {project.openRoles?.map(r => (
                <option key={r.id || r.role} value={r.role}>
                  {r.role} ({r.spots - r.filled} spots left)
                </option>
              ))}
              <option value="General Collaborator">General Collaborator / Other</option>
            </select>
          </div>

          {/* Pitch / Message */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Why do you want to build this? <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Tell the creator about your background, relevant past projects, and which parts of this idea you're excited to build..."
              className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 focus:border-brand-indigo/50 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none resize-none leading-relaxed"
              required
            />
          </div>

          {/* Portfolio or GitHub link */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Portfolio, GitHub or LinkedIn (Optional)</span>
            </label>
            <input
              type="text"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="https://github.com/yourusername or portfolio URL"
              className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 focus:border-brand-indigo/50 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={closeJoinModal}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !pitch.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Collaboration Request'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
