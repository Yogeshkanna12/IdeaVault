import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { IdeasProvider, useIdeas } from './context/IdeasContext';

// Components
import Navbar from './components/Navbar';
import HeroUniverse from './components/HeroUniverse';
import TrendingSection from './components/TrendingSection';
import CategoriesGrid from './components/CategoriesGrid';
import ExploreSection from './components/ExploreSection';
import HowItWorksSection from './components/HowItWorksSection';
import StudentDashboard from './components/StudentDashboard';
import ProjectDetailModal from './components/ProjectDetailModal';
import JoinTeamModal from './components/JoinTeamModal';
import SubmitIdeaWizard from './components/SubmitIdeaWizard';
import ProfileModal from './components/ProfileModal';
import AuthModal from './components/AuthModal';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';
import Footer from './components/Footer';

function MainLayout() {
  const { activeTab, setActiveTab } = useIdeas();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-vault-950 text-slate-100 selection:bg-brand-indigo/30 selection:text-brand-cyan">
      {/* Top Navigation */}
      <Navbar onOpenSearch={() => setIsCommandOpen(true)} />

      {/* Main Body Content based on Active Navigation Tab */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <>
            <HeroUniverse />
            <TrendingSection />
            <CategoriesGrid />
            <ExploreSection />
            <HowItWorksSection />
          </>
        )}

        {activeTab === 'categories' && (
          <div className="pt-4">
            <CategoriesGrid />
            <ExploreSection />
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="pt-4">
            <TrendingSection />
            <ExploreSection />
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="pt-4">
            <HowItWorksSection />
            <ExploreSection />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard />
        )}
      </main>

      {/* Global Modals & Overlays */}
      <ProjectDetailModal />
      <JoinTeamModal />
      <SubmitIdeaWizard />
      <ProfileModal />
      <AuthModal />
      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
      />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <IdeasProvider>
        <MainLayout />
      </IdeasProvider>
    </AuthProvider>
  );
}
