import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useIdeas } from '../context/IdeasContext';
import { 
  X, 
  User, 
  Sparkles, 
  Code, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Check, 
  Plus, 
  Globe, 
  Github, 
  Linkedin,
  Save
} from 'lucide-react';

const COMMON_SKILLS = [
  "Python", "React", "TypeScript", "PyTorch", "C++", "FastAPI",
  "Node.js", "Docker", "ESP32", "ROS2", "PostgreSQL", "Flutter",
  "UI/UX Design", "Figma", "Computer Vision", "Tailwind CSS"
];

export default function ProfileModal() {
  const { currentUser, updateProfile, isProfileModalOpen, setIsProfileModalOpen } = useAuth();
  const { showToast } = useIdeas();

  if (!isProfileModalOpen || !currentUser) return null;

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    department: currentUser.department || '',
    college: currentUser.college || '',
    year: currentUser.year || '',
    bio: currentUser.bio || '',
    skills: currentUser.skills || [],
    interests: currentUser.interests || [],
    github: currentUser.github || '',
    linkedin: currentUser.linkedin || '',
    portfolio: currentUser.portfolio || ''
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const clean = newSkillInput.trim();
    if (!formData.skills.includes(clean)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, clean]
      }));
    }
    setNewSkillInput('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    showToast('Student profile updated! ✨');
    setIsProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-vault-950/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsProfileModalOpen(false)}
      />

      {/* Main Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-vault-900 border border-white/15 shadow-2xl p-6 sm:p-8 z-10 flex flex-col max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white shadow-glow-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">
                Student Builder Profile
              </h2>
              <p className="text-xs text-slate-400">
                Manage your academic department, skills, and portfolio presence
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          
          {/* Avatar and basic info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-vault-950/80 border border-white/5">
            <img
              src={currentUser.avatar}
              alt={formData.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-indigo/50"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-white">{formData.name}</h3>
              <p className="text-xs text-slate-400">{currentUser.email}</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
                {currentUser.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-indigo/20 text-brand-cyan border border-brand-indigo/30"
                    title={badge.description}
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{badge.title}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. Senior (4th Year), Junior"
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Department / Major
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                College / University
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Short Bio
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="What are you building or interested in exploring?"
              className="w-full p-2.5 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-brand-indigo/50 resize-none leading-relaxed"
            />
          </div>

          {/* Skills Management Section */}
          <div className="pt-2">
            <label className="block text-slate-300 font-semibold mb-1.5">
              Technical Skills & Badges (powers Smart Recommendations)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {COMMON_SKILLS.map(skill => {
                const isSelected = formData.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-indigo text-white border border-brand-indigo'
                        : 'bg-vault-950 text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add other skill (e.g. OpenCV, Go, Solana)..."
                className="flex-1 p-2 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 rounded-xl bg-vault-800 hover:bg-vault-700 text-slate-200 text-xs font-semibold cursor-pointer border border-white/10"
              >
                Add
              </button>
            </div>
          </div>

          {/* Social / Portfolio Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub Handle</span>
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="github.com/username"
                className="w-full p-2 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/username"
                className="w-full p-2 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[11px] mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Portfolio Site</span>
              </label>
              <input
                type="text"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                placeholder="portfolio.dev"
                className="w-full p-2 rounded-xl bg-vault-950 border border-white/10 text-slate-100 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-violet text-white font-bold shadow-glow-sm transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
