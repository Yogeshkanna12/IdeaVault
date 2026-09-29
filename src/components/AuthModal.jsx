import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useIdeas } from '../context/IdeasContext';
import BrandLogo from './BrandLogo';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    openAuthModal, 
    signIn, 
    signUp, 
    presetAccounts, 
    switchAccount 
  } = useAuth();
  const { showToast } = useIdeas();

  const [mode, setMode] = useState(authMode || 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign Up fields
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [college, setCollege] = useState('School of Engineering');
  const [year, setYear] = useState('Junior (Year 3)');

  // Sync mode with prop
  React.useEffect(() => {
    if (authMode) setMode(authMode);
  }, [authMode]);

  if (!isAuthModalOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const res = signIn(email, password);
    if (res.success) {
      showToast(`Welcome to IdeaVault! 👋`);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    signUp({
      name,
      email,
      department,
      college,
      year,
      skills: ["React", "Python", "Problem Solving"]
    });
    showToast(`Account created! Welcome to IdeaVault, ${name.split(' ')[0]}! 🚀`);
  };

  const handleDemoSelect = (account) => {
    switchAccount(account);
    closeAuthModal();
    showToast(`Logged in as ${account.name} (${account.department.split('&')[0]})`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/85 backdrop-blur-md transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-vault-900 border border-white/15 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Emblem */}
        <div className="flex flex-col items-center text-center mb-6">
          <BrandLogo size="default" />
          <p className="text-xs text-slate-400 mt-2">
            Collegiate Innovation Network • Connect, Build, Ship
          </p>
        </div>

        {/* 1-Click Fast Student Demo Selector (Ideal for 300-student presentations) */}
        <div className="mb-6 p-3 rounded-2xl bg-vault-950/90 border border-brand-indigo/30">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-brand-cyan mb-2">
            <Zap className="w-3.5 h-3.5 text-brand-cyan fill-current" />
            <span>Fast 1-Click Demo Profiles (Instant Test):</span>
          </div>

          <div className="space-y-1.5">
            {presetAccounts.map(account => (
              <button
                key={account.id}
                onClick={() => handleDemoSelect(account)}
                className="w-full p-2 rounded-xl bg-vault-900 hover:bg-brand-indigo/20 border border-white/5 hover:border-brand-indigo/40 flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-7 h-7 rounded-lg object-cover border border-white/10"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-brand-cyan truncate">
                      {account.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {account.department.split('&')[0]}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="flex items-center gap-1 p-1 bg-vault-950 rounded-xl mb-5 border border-white/5">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-brand-indigo text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-brand-indigo text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* SIGN IN FORM */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                College / University Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:opacity-95 text-white font-bold text-xs shadow-glow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to IdeaVault</span>
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                College / University Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m.chen@campus.edu"
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Computer Science"
                  className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Academic Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
                >
                  <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                  <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                  <option value="Junior (Year 3)">Junior (Year 3)</option>
                  <option value="Senior (Year 4)">Senior (Year 4)</option>
                  <option value="Graduate / Master's">Graduate / Master's</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-brand-cyan hover:opacity-95 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Student Account</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
