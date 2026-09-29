import React, { useRef, useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { 
  Compass, 
  Heart, 
  Users, 
  Rocket, 
  Sparkles 
} from 'lucide-react';

function PhaseCard({ item }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Icon = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl p-6 bg-vault-900/60 border border-white/5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card flex flex-col justify-between group relative overflow-hidden select-none"
    >
      {/* Dynamic Cursor-Following Border Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ease-out z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '1px',
          background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Dynamic Cursor-Following Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${item.glowColor}, transparent 70%)`,
        }}
      />

      {/* Subtle step number watermark in background */}
      <div className="absolute -right-3 -bottom-3 text-6xl font-black font-display text-white/[0.03] select-none group-hover:text-brand-indigo/10 transition-colors pointer-events-none z-0">
        {item.step}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Phase Icon with smooth scale & subtle rotation effect on hover */}
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md transition-all duration-300 ease-out group-hover:scale-[1.06] group-hover:rotate-[2.5deg] group-hover:shadow-glow-sm`}
          >
            <Icon className="w-6 h-6 transition-transform duration-300 ease-out group-hover:scale-105" />
          </div>
          <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
            PHASE {item.step}
          </span>
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors mb-2 font-display">
          {item.title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const { setActiveTab, setIsSubmitModalOpen } = useIdeas();

  const steps = [
    {
      step: "01",
      title: "Discover Concepts",
      subtitle: "Filter through cross-domain student projects across AI, IoT, Robotics, MedTech, and Sustainability.",
      icon: Compass,
      color: "from-blue-500 to-indigo-600",
      accent: "text-brand-cyan",
      glowColor: "rgba(99, 102, 241, 0.15)"
    },
    {
      step: "02",
      title: "Upvote & Validate",
      subtitle: "Support bold concepts, save ideas to your personal Vault, and give early feedback to student creators.",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      accent: "text-rose-400",
      glowColor: "rgba(244, 63, 94, 0.15)"
    },
    {
      step: "03",
      title: "Assemble the Team",
      subtitle: "Apply for open developer, design, or research roles, or post your own project to recruit co-builders.",
      icon: Users,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      glowColor: "rgba(16, 185, 129, 0.15)"
    },
    {
      step: "04",
      title: "Build & Ship",
      subtitle: "Turn shared ideas into functional prototypes with verified milestones and campus demo day showcase.",
      icon: Rocket,
      color: "from-amber-500 to-yellow-600",
      accent: "text-amber-400",
      glowColor: "rgba(245, 158, 11, 0.15)"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 border-b border-white/5 relative bg-vault-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/20 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collegiate Innovation Cycle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            How IdeaVault Works
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            A purpose-built ecosystem designed to eliminate the friction between having a great project idea and finding the right team to build it.
          </p>
        </div>

        {/* 4 Interactive Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item) => (
            <PhaseCard key={item.step} item={item} />
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-indigo/20 via-brand-purple/20 to-brand-cyan/20 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Have an innovative concept in mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Don't let your project idea sit in your notes app. Pitch it on IdeaVault and connect with 300+ students ready to build.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all cursor-pointer"
            >
              Submit Your Idea
            </button>
            <button
              onClick={() => {
                setActiveTab('explore');
                const el = document.getElementById('explore-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-vault-900/80 hover:bg-vault-800 text-slate-200 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              Browse Projects
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
