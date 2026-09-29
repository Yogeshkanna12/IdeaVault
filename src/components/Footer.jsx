import React from 'react';
import BrandLogo from './BrandLogo';
import { useIdeas } from '../context/IdeasContext';
import { Github, Globe, Heart, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  const { setActiveTab, setSelectedCategory, setIsSubmitModalOpen } = useIdeas();

  const handleNav = (tabId, categoryId = null) => {
    setActiveTab(tabId);
    if (categoryId) setSelectedCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-vault-950 pt-16 pb-12 relative overflow-hidden text-xs">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brand-indigo/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="default" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              IdeaVault is the premier collegiate platform where university students discover, submit, explore, vote on, and collaborate on groundbreaking project concepts.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-400">
                Live across 42 collegiate engineering & design campuses
              </span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('explore')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Explore Ideas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('trending')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Trending Leaderboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('categories')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  All 12 Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Submit New Concept
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  My Vault (Dashboard)
                </button>
              </li>
            </ul>
          </div>

          {/* Innovation Hubs */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Popular Domains
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('explore', 'ai-ml')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('explore', 'iot-embedded')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  IoT & Embedded Systems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('explore', 'healthcare')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Healthcare & MedTech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('explore', 'sustainability')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Sustainability & CleanTech
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('explore', 'cybersecurity')}
                  className="hover:text-brand-cyan transition-colors cursor-pointer text-left"
                >
                  Cybersecurity
                </button>
              </li>
            </ul>
          </div>

          {/* Student Community */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Student Network
            </h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              Built by college students, for college students. Empowering cross-disciplinary teams to turn semester assignments into real-world ventures.
            </p>
            <div className="p-3 rounded-xl bg-vault-900 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-brand-cyan font-semibold block">
                Next Demo Day:
              </span>
              <span className="text-white font-bold block text-xs">
                Fall Collegiate Showcase
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Over 300 students presenting
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © 2026 IdeaVault. Where Ideas Find Their People.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>for collegiate innovators</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
