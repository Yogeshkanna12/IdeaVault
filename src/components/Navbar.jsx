import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import NotificationsDrawer from './NotificationsDrawer';
import { 
  Compass, 
  Layers, 
  Flame, 
  HelpCircle, 
  PlusCircle, 
  Search, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  Sparkles,
  Bookmark,
  Users,
  Award
} from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotificationsCount, 
    setIsSubmitModalOpen 
  } = useIdeas();

  const { 
    currentUser, 
    openAuthModal, 
    signOut, 
    setIsProfileModalOpen,
    presetAccounts,
    switchAccount
  } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'dashboard', label: 'My Vault', icon: Bookmark },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-vault-950/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <div onClick={() => handleNavClick('explore')}>
            <BrandLogo size="default" />
          </div>

          {/* Center: Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-vault-900/60 p-1.5 rounded-full border border-white/5 shadow-inner">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-glow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-vault-900/80 hover:bg-vault-800 border border-white/10 text-slate-300 text-xs font-medium transition-all group cursor-pointer"
              title="Search ideas (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-brand-cyan group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-slate-400">Search ideas...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Submit Idea CTA Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan text-white text-xs font-bold tracking-wide hover:shadow-glow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Idea</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(prev => !prev)}
                className="relative p-2 rounded-xl bg-vault-900/80 hover:bg-vault-800 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-cyan text-[9px] font-bold text-vault-950 flex items-center justify-center font-mono animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Profile / Auth Area */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-vault-900/80 hover:bg-vault-800 border border-white/10 text-slate-200 transition-all cursor-pointer group"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover border border-brand-indigo/40"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-white group-hover:text-brand-cyan leading-tight truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono leading-none">
                      {currentUser.year?.split(' ')[0] || 'Student'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 hidden sm:block" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-vault-900 border border-white/10 shadow-2xl p-2 z-40 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                      {/* User Header */}
                      <div className="p-3 border-b border-white/10 mb-1">
                        <div className="flex items-center gap-3">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-xl object-cover border border-brand-indigo/50"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">
                              {currentUser.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">
                              {currentUser.email}
                            </p>
                            <span className="text-[10px] font-mono text-brand-cyan">
                              {currentUser.department?.split('&')[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Options */}
                      <div className="space-y-0.5 text-xs">
                        <button
                          onClick={() => {
                            setActiveTab('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-brand-cyan" />
                          <span>My Vault (Dashboard)</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileModalOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
                        >
                          <User className="w-3.5 h-3.5 text-brand-violet" />
                          <span>Profile & Badges</span>
                        </button>

                        {/* Switch Demo Profiles for immediate testing */}
                        <div className="pt-2 mt-2 border-t border-white/10">
                          <p className="px-3 pb-1 text-[10px] uppercase font-mono text-slate-500 font-semibold tracking-wider">
                            Fast Switch Account:
                          </p>
                          {presetAccounts.map(account => (
                            <button
                              key={account.id}
                              onClick={() => {
                                switchAccount(account);
                                setIsUserMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                                account.id === currentUser.id 
                                  ? 'bg-brand-indigo/20 text-brand-cyan font-semibold' 
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                              }`}
                            >
                              <span className="truncate">{account.name}</span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {account.department.split(' ')[0]}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="pt-2 mt-2 border-t border-white/10">
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left font-medium"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-indigo hover:bg-brand-violet text-white text-xs font-bold transition-all shadow-glow-sm cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-vault-900/80 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-vault-950/95 backdrop-blur-2xl p-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white shadow-glow-sm'
                        : 'bg-vault-900 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setIsSubmitModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan text-white text-xs font-bold tracking-wide shadow-glow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit a Project Idea</span>
            </button>
          </div>
        )}
      </header>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </>
  );
}
