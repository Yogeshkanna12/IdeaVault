import React, { useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';
import { 
  Sparkles, 
  Bookmark, 
  Lightbulb, 
  Users, 
  Heart, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Target,
  Award,
  Layers,
  Code
} from 'lucide-react';

export default function StudentDashboard() {
  const { 
    projects, 
    recommendedProjects, 
    savedIdeaIds, 
    applications, 
    setIsSubmitModalOpen, 
    openProjectDetail,
    setActiveTab,
    resetFilters
  } = useIdeas();

  const { currentUser, setIsProfileModalOpen } = useAuth();
  const [activeDashboardTab, setActiveDashboardTab] = useState('recommended'); // 'recommended' | 'saved' | 'my-ideas' | 'collaborations'

  // Ideas authored by current user
  const myAuthoredIdeas = projects.filter(p => 
    p.creator.name.toLowerCase() === currentUser?.name?.toLowerCase() ||
    p.creator.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );

  // Saved ideas
  const mySavedProjects = projects.filter(p => savedIdeaIds.includes(p.id));

  // Compute total votes received on user's ideas
  const totalVotesReceived = myAuthoredIdeas.reduce((sum, p) => sum + p.votes, 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Personalized Welcome Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-vault-900 via-vault-900 to-brand-indigo/20 border border-white/10 shadow-xl overflow-hidden">
        {/* Ambient decorative glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-brand-indigo/50 shadow-glow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  Welcome back, {currentUser?.name?.split(' ')[0]}!
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                  {currentUser?.year?.split(' ')[0] || 'Student'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {currentUser?.department} • {currentUser?.college}
              </p>
              
              {/* Skills Quick Chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {currentUser?.skills?.slice(0, 5).map(skill => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-[10px] font-mono text-brand-cyan hover:underline ml-1"
                >
                  Edit Skills →
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit New Idea</span>
            </button>
          </div>
        </div>

        {/* Visual Statistics Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-vault-950/60 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white font-display">
                {myAuthoredIdeas.length}
              </div>
              <div className="text-xs text-slate-400 font-medium">Ideas Submitted</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-vault-950/60 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-indigo/20 text-brand-indigo flex items-center justify-center shrink-0">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white font-display">
                {mySavedProjects.length}
              </div>
              <div className="text-xs text-slate-400 font-medium">Saved in Vault</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-vault-950/60 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white font-display">
                {totalVotesReceived}
              </div>
              <div className="text-xs text-slate-400 font-medium">Votes Received</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-vault-950/60 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-white font-display">
                {applications.length}
              </div>
              <div className="text-xs text-slate-400 font-medium">Team Applications</div>
            </div>
          </div>
        </div>

      </div>

      {/* Dashboard Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'recommended', label: 'Picked For You', icon: Sparkles, badge: recommendedProjects.length },
          { id: 'saved', label: 'Saved Ideas', icon: Bookmark, badge: mySavedProjects.length },
          { id: 'my-ideas', label: 'My Submitted Ideas', icon: Lightbulb, badge: myAuthoredIdeas.length },
          { id: 'collaborations', label: 'My Collaborations', icon: Users, badge: applications.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeDashboardTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDashboardTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-brand-indigo text-white shadow-glow-sm'
                  : 'bg-vault-900/60 text-slate-400 hover:text-slate-200 hover:bg-vault-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* DASHBOARD TAB 1: PICKED FOR YOU (SMART RECOMMENDATION UI) */}
      {activeDashboardTab === 'recommended' && (
        <div className="space-y-6">
          {/* Smart Recommendation Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-indigo/15 via-brand-purple/10 to-transparent border border-brand-indigo/30 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-indigo/20 flex items-center justify-center text-brand-cyan">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Intelligent Skill & Interest Match
                </h3>
                <p className="text-xs text-slate-300">
                  Recommended based on your declared skills ({currentUser?.skills?.slice(0, 3).join(', ')}) and interest domains.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs text-brand-cyan hover:underline font-semibold"
            >
              Tune Skills Profile →
            </button>
          </div>

          {recommendedProjects.length === 0 ? (
            <EmptyState
              title="No recommendations found yet"
              description="Add more skills and interest tags to your student profile so we can match you to projects!"
              actionLabel="Update Profile Skills"
              onAction={() => setIsProfileModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProjects.map(project => (
                <div key={project.id} className="relative flex flex-col">
                  {/* Match Reason Banner */}
                  <div className="mb-2 px-3 py-1.5 rounded-xl bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-between text-[11px] font-mono text-brand-cyan">
                    <span>⚡ Matched: {project.matchedFactors?.slice(0, 2).join(' + ') || 'Profile Match'}</span>
                    <span className="font-bold text-white">★ Top Fit</span>
                  </div>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 2: SAVED IDEAS */}
      {activeDashboardTab === 'saved' && (
        <div>
          {mySavedProjects.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No ideas saved yet."
              description="Your next great project might be waiting to be discovered. Browse and bookmark ideas you want to keep an eye on."
              actionLabel="Explore Ideas"
              onAction={() => {
                resetFilters();
                setActiveTab('explore');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mySavedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 3: MY SUBMITTED IDEAS */}
      {activeDashboardTab === 'my-ideas' && (
        <div>
          {myAuthoredIdeas.length === 0 ? (
            <EmptyState
              icon={Lightbulb}
              title="You haven't submitted any ideas yet."
              description="Have an innovative solution for campus, health, or sustainability? Pitch it to find students who want to build with you."
              actionLabel="Submit an Idea"
              onAction={() => setIsSubmitModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myAuthoredIdeas.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 4: MY COLLABORATIONS */}
      {activeDashboardTab === 'collaborations' && (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No collaboration requests yet."
              description="Browse active projects with open roles and express interest to join a team."
              actionLabel="Find Projects Recruiting"
              onAction={() => {
                resetFilters();
                setActiveTab('explore');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-vault-900 border border-white/5 space-y-3 hover:border-brand-indigo/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-semibold">
                      {app.category}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{app.status}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {app.projectTitle}
                    </h4>
                    <p className="text-xs text-brand-cyan font-medium mt-0.5">
                      Applied Role: <strong>{app.role}</strong>
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 bg-vault-950 p-3 rounded-xl border border-white/5 leading-relaxed">
                    "{app.pitch}"
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Applied on {app.date}</span>
                    <span>Project Lead: {app.creatorName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
