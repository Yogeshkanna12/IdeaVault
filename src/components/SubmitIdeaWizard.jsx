import React, { useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  Lightbulb, 
  Code, 
  Users, 
  Eye, 
  Send,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';

const COMMON_ROLES = [
  "AI/ML Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Hardware/IoT Developer",
  "Researcher",
  "Content/Presentation Designer"
];

const PRESET_TECHS = [
  "Python", "React", "TypeScript", "PyTorch", "C++", "FastAPI", 
  "Node.js", "Docker", "ESP32", "ROS2", "PostgreSQL", "Flutter",
  "Tailwind CSS", "TensorFlow", "WebSockets", "Arduino"
];

export default function SubmitIdeaWizard() {
  const { isSubmitModalOpen, setIsSubmitModalOpen, submitIdea, openProjectDetail } = useIdeas();
  const { currentUser, openAuthModal } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [customTechInput, setCustomTechInput] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    categoryId: 'ai-ml',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    timeline: '2 Months',
    problem: '',
    solution: '',
    whyItMatters: '',
    technologies: ['Python', 'React'],
    openRoles: [
      {
        id: 'role-1',
        role: 'Frontend Developer',
        skills: ['React', 'Tailwind CSS'],
        spots: 1,
        filled: 0,
        description: 'Build user-facing telemetry and responsive dashboard.'
      }
    ]
  });

  if (!isSubmitModalOpen) return null;

  const steps = [
    { number: 1, label: "Basics" },
    { number: 2, label: "Problem & Solution" },
    { number: 3, label: "Tech Stack" },
    { number: 4, label: "Team Roles" },
    { number: 5, label: "Preview & Publish" }
  ];

  const handleCategoryChange = (e) => {
    const selected = CATEGORIES.find(c => c.id === e.target.value);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        categoryId: selected.id,
        category: selected.name
      }));
    }
  };

  const toggleTech = (tech) => {
    if (formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: prev.technologies.filter(t => t !== tech)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }));
    }
  };

  const addCustomTech = (e) => {
    e.preventDefault();
    if (!customTechInput.trim()) return;
    const clean = customTechInput.trim();
    if (!formData.technologies.includes(clean)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, clean]
      }));
    }
    setCustomTechInput('');
  };

  const addRole = (roleTitle) => {
    const newRole = {
      id: `role-${Date.now()}`,
      role: roleTitle,
      skills: ["Collaboration"],
      spots: 1,
      filled: 0,
      description: `Collaborate as ${roleTitle} to bring the prototype to life.`
    };
    setFormData(prev => ({
      ...prev,
      openRoles: [...prev.openRoles, newRole]
    }));
  };

  const removeRole = (index) => {
    setFormData(prev => ({
      ...prev,
      openRoles: prev.openRoles.filter((_, i) => i !== index)
    }));
  };

  const handlePublish = () => {
    if (!currentUser) {
      openAuthModal('signin');
      return;
    }

    const createdProject = submitIdea(formData);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00F2FE', '#6366F1', '#A855F7', '#10B981']
      });
    } catch (e) {
      console.log(e);
    }

    setIsSubmitModalOpen(false);
    setCurrentStep(1);
    openProjectDetail(createdProject);
  };

  // Step validations
  const canProceed = () => {
    if (currentStep === 1) {
      return formData.title.trim().length >= 4 && formData.tagline.trim().length >= 8;
    }
    if (currentStep === 2) {
      return formData.problem.trim().length >= 15 && formData.solution.trim().length >= 15;
    }
    if (currentStep === 3) {
      return formData.technologies.length > 0;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSubmitModalOpen(false)}
      />

      {/* Main Wizard Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-vault-900 border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Title and Step Indicators */}
        <div className="p-6 bg-vault-950/80 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-cyan flex items-center justify-center text-white shadow-glow-sm">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-display">
                  Submit a Project Idea
                </h2>
                <p className="text-xs text-slate-400">
                  Step {currentStep} of 5: {steps[currentStep - 1].label}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map(step => (
              <div key={step.number} className="flex flex-col gap-1">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep > step.number
                      ? 'bg-emerald-400'
                      : currentStep === step.number
                      ? 'bg-gradient-to-r from-brand-cyan to-brand-indigo'
                      : 'bg-white/10'
                  }`}
                />
                <span className={`text-[10px] font-mono hidden sm:inline truncate ${
                  currentStep === step.number ? 'text-brand-cyan font-bold' : 'text-slate-500'
                }`}>
                  {step.number}. {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: PROJECT BASICS */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              <div className="p-3 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 text-brand-cyan text-xs">
                💡 <strong>Tip:</strong> Keep your project title memorable and your tagline punchy so students immediately understand what you want to build.
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AegisNet: Decentralized Campus Emergency Mesh"
                  className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Short Tagline (One-liner) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Off-grid peer-to-peer LoRaWAN network for campus security during blackouts."
                  className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-200 font-semibold mb-1">
                    Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={handleCategoryChange}
                    className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
                  >
                    <option value="Beginner">Beginner Friendly</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1">
                    Estimated Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-brand-indigo/50 cursor-pointer"
                  >
                    <option value="4 Weeks">4 Weeks (Hackathon MVP)</option>
                    <option value="2 Months">2 Months (Semester Sprint)</option>
                    <option value="1 Semester">1 Semester (Capstone Grade)</option>
                    <option value="6 Months">6 Months (Long-term research)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROBLEM & SOLUTION */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Problem Statement <span className="text-rose-400">*</span>
                </label>
                <p className="text-[11px] text-slate-400 mb-1.5">
                  Describe what specific bottleneck, friction, or gap you or other college students experience.
                </p>
                <textarea
                  rows={3}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="e.g. During power blackouts on university campuses, cellular towers saturate and students in concrete auditoriums cannot call campus emergency security..."
                  className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50 resize-none leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Proposed Solution & Technical Approach <span className="text-rose-400">*</span>
                </label>
                <p className="text-[11px] text-slate-400 mb-1.5">
                  Explain how your hardware or software architecture will solve this problem.
                </p>
                <textarea
                  rows={3}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="e.g. We will place battery-backed ESP32 LoRa nodes across academic buildings connected to a Flutter BLE client for encrypted peer-to-peer message hops..."
                  className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50 resize-none leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Why It Matters & Expected Impact
                </label>
                <input
                  type="text"
                  value={formData.whyItMatters}
                  onChange={(e) => setFormData({ ...formData, whyItMatters: e.target.value })}
                  placeholder="e.g. Eliminates dead-zones for 15,000 students and provides zero-downtime campus disaster communication."
                  className="w-full p-3 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-brand-indigo/50"
                />
              </div>
            </div>
          )}

          {/* STEP 3: TECHNOLOGY & SKILLS */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  Select Technologies & Frameworks <span className="text-rose-400">*</span>
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Click to add technologies relevant to this project idea.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {PRESET_TECHS.map(tech => {
                    const isSelected = formData.technologies.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-indigo text-white border border-brand-indigo shadow-sm'
                            : 'bg-vault-950 text-slate-300 border border-white/10 hover:border-white/30'
                        }`}
                      >
                        {isSelected ? `✓ ${tech}` : `+ ${tech}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Tech */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Add Custom Technology / Library
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTechInput}
                    onChange={(e) => setCustomTechInput(e.target.value)}
                    placeholder="e.g. OpenCV, OpenBCI, MediaPipe, WebRTC..."
                    className="flex-1 p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCustomTech}
                    className="px-4 py-2.5 rounded-xl bg-vault-800 hover:bg-vault-700 text-slate-200 border border-white/10 text-xs font-semibold cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Selected List */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                  Current Tech Stack ({formData.technologies.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono"
                    >
                      <span>{t}</span>
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-white"
                        onClick={() => toggleTech(t)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: TEAM REQUIREMENTS & OPEN ROLES */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  What teammates are you looking for?
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Click a role to add open collaboration spots to your project.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {COMMON_ROLES.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => addRole(role)}
                      className="px-2.5 py-1.5 rounded-lg bg-vault-950 hover:bg-vault-800 border border-white/10 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
                    >
                      + {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roles configured */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-300">
                  Configured Open Roles ({formData.openRoles.length})
                </h4>
                {formData.openRoles.length === 0 ? (
                  <p className="text-slate-500 text-xs">
                    No open roles added yet. Click one of the buttons above to specify who you want to build with.
                  </p>
                ) : (
                  formData.openRoles.map((r, idx) => (
                    <div
                      key={r.id || idx}
                      className="p-3 rounded-xl bg-vault-950 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-white text-xs">{r.role}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{r.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {r.spots} Spot
                        </span>
                        <button
                          type="button"
                          onClick={() => removeRole(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 5: PREVIEW & PUBLISH */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs animate-in fade-in duration-150">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                ✨ <strong>Ready to Launch!</strong> Review how your project will look on the live platform before publishing.
              </div>

              {/* Mock Project Card Preview */}
              <div className="rounded-2xl bg-vault-950 p-6 border border-brand-indigo/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 font-semibold">
                      {formData.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                      {formData.difficulty}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    Duration: {formData.timeline}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {formData.title || 'Untitled Project'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {formData.tagline || 'Tagline will appear here'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-vault-900 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">The Problem:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {formData.problem}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Lead Creator: <strong>{currentUser?.name || 'You'}</strong></span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    {formData.openRoles.length} Open Roles
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Bottom Controls */}
        <div className="p-4 sm:p-6 bg-vault-950/80 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-violet disabled:opacity-50 text-white text-xs font-bold shadow-glow-sm transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-brand-cyan to-brand-indigo hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish to IdeaVault</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
