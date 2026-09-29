import React, { useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  Users, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Calendar,
  Layers,
  Code,
  Github,
  Award
} from 'lucide-react';

export default function ProjectDetailModal() {
  const { 
    selectedProject, 
    isDetailModalOpen, 
    closeProjectDetail,
    votedIdeaIds,
    savedIdeaIds,
    toggleVote,
    toggleSave,
    openJoinModal,
    addComment,
    showToast
  } = useIdeas();

  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'roadmap' | 'team' | 'discussion'
  const [commentInput, setCommentInput] = useState('');

  if (!isDetailModalOpen || !selectedProject) return null;

  const isVoted = votedIdeaIds.includes(selectedProject.id);
  const isSaved = savedIdeaIds.includes(selectedProject.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Project link copied to clipboard! 📋');
    } else {
      showToast('Project link ready to share!');
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(selectedProject.id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/85 backdrop-blur-md transition-opacity"
        onClick={closeProjectDetail}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-vault-900 border border-white/15 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-vault-950 via-vault-900 to-brand-indigo/15 border-b border-white/10 shrink-0">
          
          {/* Close & Share Button */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 font-semibold">
                {selectedProject.category}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">
                Difficulty: {selectedProject.difficulty}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Status: {selectedProject.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-vault-800 hover:bg-vault-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                title="Share project link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={closeProjectDetail}
                className="p-2 rounded-xl bg-vault-800 hover:bg-vault-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight leading-tight">
            {selectedProject.title}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
            {selectedProject.tagline}
          </p>

          {/* Creator Profile Chip */}
          <div className="mt-5 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={selectedProject.creator.avatar}
                alt={selectedProject.creator.name}
                className="w-10 h-10 rounded-xl object-cover border border-brand-indigo/40"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedProject.creator.name}</span>
                  <span className="text-[11px] font-mono font-normal text-brand-cyan px-2 py-0.2 rounded-full bg-brand-cyan/10">
                    Lead Creator
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {selectedProject.creator.department} • {selectedProject.creator.year}
                </div>
              </div>
            </div>

            {/* Action Buttons: Vote, Save, Join */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => toggleVote(selectedProject.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isVoted
                    ? 'bg-rose-500 text-white shadow-glow-sm'
                    : 'bg-vault-800 hover:bg-vault-700 text-slate-200 border border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isVoted ? 'fill-current' : ''}`} />
                <span>{selectedProject.votes} Votes</span>
              </button>

              <button
                onClick={() => toggleSave(selectedProject.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-brand-indigo text-white shadow-glow-sm'
                    : 'bg-vault-800 hover:bg-vault-700 text-slate-200 border border-white/10'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => openJoinModal(selectedProject)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Join Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-2.5 bg-vault-950/70 border-b border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Impact' },
            { id: 'roadmap', label: 'Roadmap & Tech Stack' },
            { id: 'team', label: `Open Roles & Team (${selectedProject.openRoles?.length || 0})` },
            { id: 'discussion', label: `Discussion & Brainstorm (${selectedProject.comments?.length || 0})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-indigo/30 text-brand-cyan border border-brand-indigo/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: OVERVIEW & IMPACT */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Problem Statement Card */}
              <div className="p-5 rounded-2xl bg-vault-950/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>The Real-World Problem</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              {/* Proposed Technical Solution */}
              <div className="p-5 rounded-2xl bg-vault-950/60 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan" />
                  <span>Proposed Solution & Architecture</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>

              {/* Why It Matters & Expected Impact */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-indigo/10 to-brand-violet/10 border border-brand-indigo/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-violet">
                  <Award className="w-4 h-4 text-brand-violet" />
                  <span>Expected Impact & Significance</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedProject.whyItMatters}
                </p>
              </div>

              {/* Project Stats Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-vault-950/40 border border-white/5">
                  <div className="text-xs text-slate-500 font-mono">Estimated Timeline</div>
                  <div className="text-base font-bold text-white mt-1">{selectedProject.timeline || '2 Months'}</div>
                </div>
                <div className="p-4 rounded-xl bg-vault-950/40 border border-white/5">
                  <div className="text-xs text-slate-500 font-mono">Total Upvotes</div>
                  <div className="text-base font-bold text-brand-cyan mt-1">{selectedProject.votes} Students</div>
                </div>
                <div className="p-4 rounded-xl bg-vault-950/40 border border-white/5">
                  <div className="text-xs text-slate-500 font-mono">Saves in Vault</div>
                  <div className="text-base font-bold text-brand-violet mt-1">{selectedProject.saves} Bookmarks</div>
                </div>
                <div className="p-4 rounded-xl bg-vault-950/40 border border-white/5">
                  <div className="text-xs text-slate-500 font-mono">Open Roles</div>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    {selectedProject.openRoles?.length || 0} Positions
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ROADMAP & TECH STACK */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Technologies Section */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-brand-cyan" />
                  <span>Tech Stack & Libraries</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies?.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-vault-950 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones Roadmap */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-violet" />
                  <span>Project Roadmap & Execution Phases</span>
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {selectedProject.roadmap?.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Milestone Status Marker */}
                      <span className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 bg-vault-950 flex items-center justify-center ${
                        item.status === 'Completed'
                          ? 'border-emerald-400 bg-emerald-400/20'
                          : item.status === 'Current'
                          ? 'border-brand-cyan bg-brand-cyan animate-pulse'
                          : 'border-slate-500'
                      }`} />

                      <div className="p-4 rounded-xl bg-vault-950/60 border border-white/5">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-white">
                            {item.phase}
                          </h4>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            item.status === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : item.status === 'Current'
                              ? 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20'
                              : 'bg-white/5 text-slate-400 border-white/5'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: OPEN ROLES & TEAM FORMATION */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-indigo/10 via-brand-purple/10 to-transparent border border-brand-indigo/20 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Looking for Talented Teammates
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Express interest in one of the open roles below. The project creator will review your profile!
                  </p>
                </div>
                <button
                  onClick={() => openJoinModal(selectedProject)}
                  className="px-4 py-2 rounded-xl bg-brand-indigo hover:bg-brand-violet text-white text-xs font-bold shadow-glow-sm transition-all cursor-pointer"
                >
                  Apply to Join
                </button>
              </div>

              {/* Open Roles List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Open Positions ({selectedProject.openRoles?.length || 0})
                </h4>
                
                {selectedProject.openRoles?.map(role => (
                  <div
                    key={role.id || role.role}
                    className="p-4 rounded-2xl bg-vault-950/70 border border-white/5 hover:border-brand-indigo/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                          {role.role}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {role.spots - role.filled} spot available
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-2">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills?.map(skill => (
                          <span
                            key={skill}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => openJoinModal(selectedProject, role.role)}
                      className="px-3.5 py-2 rounded-xl bg-vault-800 hover:bg-brand-indigo hover:text-white text-slate-200 text-xs font-semibold border border-white/10 transition-all shrink-0 cursor-pointer text-center"
                    >
                      Join as {role.role.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>

              {/* Current Team Members */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Current Team Members ({selectedProject.teamMembers?.length || 1})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.teamMembers?.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-vault-950/50 border border-white/5 flex items-center gap-3"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-lg object-cover border border-white/10"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-brand-cyan truncate">
                          {member.role}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">
                          {member.department}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: DISCUSSION & BRAINSTORM */}
          {activeTab === 'discussion' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Comment Input Form */}
              <form onSubmit={handlePostComment} className="p-4 rounded-2xl bg-vault-950/70 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <MessageSquare className="w-4 h-4 text-brand-cyan" />
                  <span>Join the Discussion & Brainstorm</span>
                </div>
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Share technical feedback, suggest feature ideas, or ask the creator questions..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-vault-900 border border-white/5 focus:border-brand-indigo/50 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none resize-none transition-colors"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Posting as <strong className="text-slate-300">{currentUser?.name || 'Student Builder'}</strong>
                  </span>
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-indigo hover:bg-brand-violet disabled:opacity-50 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>Post Comment</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Comments Feed */}
              <div className="space-y-3">
                {(!selectedProject.comments || selectedProject.comments.length === 0) ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No comments yet. Be the first student to start the conversation!
                  </div>
                ) : (
                  selectedProject.comments.map(c => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-vault-950/50 border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={c.avatar}
                            alt={c.author}
                            className="w-6 h-6 rounded-md object-cover border border-white/10"
                          />
                          <span className="text-xs font-bold text-white">
                            {c.author}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/5">
                            {c.role}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-8">
                        {c.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="p-4 sm:p-5 bg-vault-950/80 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Project ID: #{selectedProject.id} • Posted {selectedProject.createdDate}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={closeProjectDetail}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Back to Ideas
            </button>
            <button
              onClick={() => openJoinModal(selectedProject)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold shadow-glow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Apply to Join Team</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
