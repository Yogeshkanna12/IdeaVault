import React, { useState, useEffect } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { 
  Compass, 
  PlusCircle, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Brain, 
  Globe, 
  Cpu, 
  Activity, 
  Coins, 
  ShieldAlert, 
  Sprout, 
  Bot,
  Users,
  CheckCircle,
  Lightbulb,
  Zap
} from 'lucide-react';

export default function HeroUniverse() {
  const { 
    setActiveTab, 
    setSelectedCategory, 
    setIsSubmitModalOpen,
    projects,
    openProjectDetail 
  } = useIdeas();

  const [activeHoverNode, setActiveHoverNode] = useState(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Subtle cyclic pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 8);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const universeNodes = [
    {
      id: "ai-ml",
      label: "AI & ML",
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
      accent: "#6366F1",
      glow: "rgba(99, 102, 241, 0.4)",
      x: 18,
      y: 20,
      ideasCount: 38,
      popularProject: "NeuroPulse EEG"
    },
    {
      id: "web-dev",
      label: "Web 3.0 & CRDTs",
      icon: Globe,
      color: "from-cyan-400 to-blue-500",
      accent: "#00F2FE",
      glow: "rgba(0, 242, 254, 0.4)",
      x: 74,
      y: 18,
      ideasCount: 46,
      popularProject: "Synthetix IDE"
    },
    {
      id: "iot-embedded",
      label: "IoT & Hardware",
      icon: Cpu,
      color: "from-amber-400 to-orange-500",
      accent: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.4)",
      x: 88,
      y: 52,
      ideasCount: 29,
      popularProject: "HydroSmart Sensors"
    },
    {
      id: "healthcare",
      label: "MedTech & Health",
      icon: Activity,
      color: "from-emerald-400 to-teal-500",
      accent: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      x: 12,
      y: 58,
      ideasCount: 31,
      popularProject: "Vitalis ICU Guard"
    },
    {
      id: "fintech",
      label: "FinTech & Escrow",
      icon: Coins,
      color: "from-yellow-400 to-amber-500",
      accent: "#EAB308",
      glow: "rgba(234, 179, 8, 0.4)",
      x: 78,
      y: 84,
      ideasCount: 24,
      popularProject: "SplitFair Escrow"
    },
    {
      id: "cybersecurity",
      label: "Cybersecurity",
      icon: ShieldAlert,
      color: "from-rose-500 to-red-600",
      accent: "#F43F5E",
      glow: "rgba(244, 63, 94, 0.4)",
      x: 22,
      y: 86,
      ideasCount: 27,
      popularProject: "AegisNet Mesh"
    },
    {
      id: "agriculture",
      label: "AgriTech & Drones",
      icon: Sprout,
      color: "from-lime-400 to-green-500",
      accent: "#84CC16",
      glow: "rgba(132, 204, 22, 0.4)",
      x: 48,
      y: 8,
      ideasCount: 19,
      popularProject: "AgriVision YOLO"
    },
    {
      id: "robotics",
      label: "Robotics & ROS2",
      icon: Bot,
      color: "from-purple-400 to-pink-500",
      accent: "#A855F7",
      glow: "rgba(168, 85, 247, 0.4)",
      x: 52,
      y: 92,
      ideasCount: 22,
      popularProject: "RoboArm 6-DOF"
    }
  ];

  const handleNodeClick = (nodeId) => {
    setSelectedCategory(nodeId);
    setActiveTab('explore');
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    setActiveTab('explore');
    const el = document.getElementById('explore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 border-b border-white/5 bg-radial-gradient">
      {/* Dynamic background light flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-indigo/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-brand-cyan/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Campus Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-vault-900/90 border border-brand-indigo/30 shadow-glow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              Collegiate Innovation Vault • Fall 2026 Showcase
            </span>
            <span className="text-[11px] font-mono font-bold text-brand-cyan px-2 py-0.5 rounded-full bg-brand-cyan/10">
              300+ Builders
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            
            {/* Title / Brand */}
            <div>
              <div className="inline-block text-xs font-mono font-bold tracking-[0.25em] uppercase text-brand-cyan mb-2">
                IDEAVAULT PLATFORM
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.12]">
                Where Ideas Find <br />
                <span className="gradient-brand">Their People.</span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Discover innovative project ideas, turn concepts into real products, and find passionate college students who want to build with you.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan text-white text-sm font-bold tracking-wide shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Ideas</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-vault-900/90 hover:bg-vault-800/90 border border-white/10 hover:border-brand-indigo/40 text-slate-200 text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] backdrop-blur-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-brand-cyan" />
                <span>Submit an Idea</span>
              </button>
            </div>

            {/* Live Platform Proof Counters */}
            <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  340<span className="text-brand-cyan">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Project Concepts
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  1,280<span className="text-brand-violet">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Student Builders
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  94<span className="text-emerald-400">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Teams Formed
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: "Idea Universe" / "Idea Network" Interactive Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Visual Frame */}
            <div className="relative w-full aspect-square max-w-[520px] rounded-3xl p-4 sm:p-6 bg-vault-900/40 border border-white/10 backdrop-blur-xl shadow-glass overflow-hidden group">
              
              {/* Radial background rings in Universe */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[88%] h-[88%] rounded-full border border-brand-indigo/15 animate-spin-slow opacity-60" />
                <div className="w-[64%] h-[64%] rounded-full border border-brand-cyan/20 border-dashed animate-pulse-slow" />
                <div className="w-[40%] h-[40%] rounded-full border border-white/10" />
              </div>

              {/* Connecting Neural Pulse Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGradient" x1="50%" y1="50%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {universeNodes.map((node, i) => (
                  <g key={`line-${node.id}`}>
                    {/* Dynamic line to center */}
                    <line
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={activeHoverNode === node.id || pulseIndex === i ? node.accent : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={activeHoverNode === node.id || pulseIndex === i ? "0.8" : "0.3"}
                      strokeDasharray={i % 2 === 0 ? "1 1" : "none"}
                    />
                    {/* Animated Pulse dot traveling along line */}
                    {(activeHoverNode === node.id || pulseIndex === i) && (
                      <circle
                        cx={(50 + node.x) / 2}
                        cy={(50 + node.y) / 2}
                        r="1"
                        fill={node.accent}
                        className="animate-ping"
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* Center Core: The IdeaVault Nexus */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group/core"
                onClick={handleExploreClick}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-vault-950 via-vault-900 to-vault-800 border-2 border-brand-cyan/60 flex items-center justify-center shadow-glow-cyan group-hover/core:scale-110 transition-transform duration-300">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-brand-indigo/40 blur-md animate-pulse" />
                    <Zap className="w-8 h-8 text-brand-cyan relative z-10" />
                  </div>
                </div>
                <span className="mt-2 text-[10px] font-mono font-bold tracking-widest uppercase text-brand-cyan bg-vault-950/80 px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
                  IDEAVAULT CORE
                </span>
              </div>

              {/* Orbiting Satellite Nodes: AI, Web, IoT, Healthcare, etc. */}
              {universeNodes.map((node, i) => {
                const IconComponent = node.icon;
                const isHovered = activeHoverNode === node.id;
                const isPulsing = pulseIndex === i;

                return (
                  <div
                    key={node.id}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20 group/node cursor-pointer"
                    onMouseEnter={() => setActiveHoverNode(node.id)}
                    onMouseLeave={() => setActiveHoverNode(null)}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    {/* Node Capsule */}
                    <div 
                      className={`relative flex items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${
                        isHovered || isPulsing
                          ? 'scale-110 bg-vault-900 border-2 shadow-glow-md'
                          : 'bg-vault-950/90 border border-white/10 hover:border-white/30'
                      }`}
                      style={{
                        borderColor: isHovered || isPulsing ? node.accent : undefined
                      }}
                    >
                      <div 
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center text-white shrink-0 shadow-sm`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-200 hidden sm:inline whitespace-nowrap pr-1">
                        {node.label}
                      </span>
                    </div>

                    {/* Interactive Hover Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2.5 rounded-xl bg-vault-950 border border-white/20 shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                          <span>{node.ideasCount} Active Ideas</span>
                          <span className="text-emerald-400 font-bold">Trending</span>
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          ★ {node.popularProject}
                        </div>
                        <div className="mt-1 text-[10px] text-brand-cyan flex items-center gap-1">
                          <span>Click to filter</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Floating Live Card Preview (Hero micro-card) */}
              <div 
                onClick={() => {
                  const sample = projects.find(p => p.id === 'idea-1');
                  if (sample) openProjectDetail(sample);
                }}
                className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 p-2.5 rounded-xl bg-vault-950/90 border border-brand-indigo/30 backdrop-blur-md flex items-center justify-between gap-3 text-xs cursor-pointer hover:border-brand-cyan/50 transition-colors z-20 group/livecard"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block leading-none mb-1">
                      FEATURED IDEA OF THE DAY
                    </span>
                    <span className="font-semibold text-slate-100 group-hover/livecard:text-brand-cyan truncate block">
                      AegisNet: Decentralized Campus Emergency Mesh
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-brand-cyan shrink-0 px-2 py-1 rounded-md bg-brand-cyan/10">
                  <span>184 Upvotes</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
