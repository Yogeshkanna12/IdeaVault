import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_PROJECTS, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { useAuth } from './AuthContext';

const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const { currentUser } = useAuth();

  // Load projects from localStorage or mock
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  // Voted idea IDs for current session/user
  const [votedIdeaIds, setVotedIdeaIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_voted_ids');
      return saved ? JSON.parse(saved) : ['idea-1', 'idea-5'];
    } catch (e) {
      return ['idea-1', 'idea-5'];
    }
  });

  // Saved / bookmarked idea IDs
  const [savedIdeaIds, setSavedIdeaIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_saved_ids');
      return saved ? JSON.parse(saved) : ['idea-1', 'idea-2', 'idea-4'];
    } catch (e) {
      return ['idea-1', 'idea-2', 'idea-4'];
    }
  });

  // User applications to join project teams
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_applications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'app-init-1',
          ideaId: 'idea-1',
          projectTitle: 'AegisNet: Decentralized Campus Emergency Mesh',
          category: 'Cybersecurity',
          role: 'Frontend Developer',
          pitch: 'I built the offline emergency maps module for hackathon last semester and would love to build the real-time telemetry screen in Flutter/React.',
          date: '2026-09-24',
          status: 'Under Review',
          creatorName: 'Marcus Vance'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Filters and Navigation state
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'categories' | 'trending' | 'how-it-works' | 'dashboard'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTech, setSelectedTech] = useState([]);
  const [sortBy, setSortBy] = useState('trending'); // 'trending' | 'most-voted' | 'newest' | 'open-roles'

  // Modals
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalTarget, setJoinModalTarget] = useState({ project: null, role: null });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ideavault_projects', JSON.stringify(projects));
      localStorage.setItem('ideavault_voted_ids', JSON.stringify(votedIdeaIds));
      localStorage.setItem('ideavault_saved_ids', JSON.stringify(savedIdeaIds));
      localStorage.setItem('ideavault_applications', JSON.stringify(applications));
      localStorage.setItem('ideavault_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [projects, votedIdeaIds, savedIdeaIds, applications, notifications]);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ id: Date.now(), message, type });
  };

  // Upvote / Toggle Vote
  const toggleVote = (ideaId) => {
    const isVoted = votedIdeaIds.includes(ideaId);
    let nextVoted;
    if (isVoted) {
      nextVoted = votedIdeaIds.filter(id => id !== ideaId);
      showToast('Removed vote');
    } else {
      nextVoted = [...votedIdeaIds, ideaId];
      showToast('Upvoted idea! 🚀');
    }
    setVotedIdeaIds(nextVoted);

    setProjects(prev =>
      prev.map(p => {
        if (p.id === ideaId) {
          const newVotes = isVoted ? Math.max(0, p.votes - 1) : p.votes + 1;
          return { ...p, votes: newVotes };
        }
        return p;
      })
    );

    // Also update selectedProject if open
    if (selectedProject && selectedProject.id === ideaId) {
      setSelectedProject(prev => ({
        ...prev,
        votes: isVoted ? Math.max(0, prev.votes - 1) : prev.votes + 1
      }));
    }
  };

  // Save / Toggle Bookmark
  const toggleSave = (ideaId) => {
    const isSaved = savedIdeaIds.includes(ideaId);
    let nextSaved;
    if (isSaved) {
      nextSaved = savedIdeaIds.filter(id => id !== ideaId);
      showToast('Removed from saved ideas');
    } else {
      nextSaved = [...savedIdeaIds, ideaId];
      showToast('Saved to your Idea Vault! 📌');
    }
    setSavedIdeaIds(nextSaved);

    setProjects(prev =>
      prev.map(p => {
        if (p.id === ideaId) {
          const newSaves = isSaved ? Math.max(0, p.saves - 1) : p.saves + 1;
          return { ...p, saves: newSaves };
        }
        return p;
      })
    );

    if (selectedProject && selectedProject.id === ideaId) {
      setSelectedProject(prev => ({
        ...prev,
        saves: isSaved ? Math.max(0, prev.saves - 1) : prev.saves + 1
      }));
    }
  };

  // Submit New Idea
  const submitIdea = (ideaData) => {
    const newId = `idea-${Date.now()}`;
    const fullProject = {
      id: newId,
      title: ideaData.title,
      tagline: ideaData.tagline || ideaData.problem.slice(0, 100) + '...',
      category: ideaData.category,
      categoryId: ideaData.categoryId,
      difficulty: ideaData.difficulty || 'Intermediate',
      timeline: ideaData.timeline || '2 Months',
      status: 'Recruiting',
      votes: 1,
      saves: 1,
      views: 12,
      trendingRank: projects.length + 1,
      creator: {
        name: currentUser?.name || 'Anonymous Student',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        department: currentUser?.department || 'Engineering & Computing',
        college: currentUser?.college || 'University Campus',
        year: currentUser?.year || 'Student',
        bio: currentUser?.bio || 'Passionate student innovator.',
        github: currentUser?.github || ''
      },
      problem: ideaData.problem,
      solution: ideaData.solution,
      whyItMatters: ideaData.whyItMatters || 'Creates high educational and practical impact on campus.',
      technologies: ideaData.technologies || ['Python', 'React'],
      openRoles: ideaData.openRoles || [],
      teamMembers: [
        {
          name: currentUser?.name || 'Lead Creator',
          role: 'Project Creator & Lead',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          department: currentUser?.department || 'Engineering'
        }
      ],
      roadmap: ideaData.roadmap && ideaData.roadmap.length > 0 ? ideaData.roadmap : [
        { phase: 'Phase 1: Architecture & Prototyping', status: 'Current', description: 'Initial requirements and MVP design' },
        { phase: 'Phase 2: Alpha Implementation', status: 'Upcoming', description: 'Core functional tests and developer integration' },
        { phase: 'Phase 3: Campus Showcase', status: 'Planned', description: 'Demo and user trial' }
      ],
      comments: [],
      createdDate: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [fullProject, ...prev]);
    setVotedIdeaIds(prev => [...prev, newId]);
    setSavedIdeaIds(prev => [...prev, newId]);

    // Push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'creation',
      title: 'Idea Published to IdeaVault!',
      message: `Your project "${ideaData.title}" is now live and accepting team collaboration requests.`,
      time: 'Just now',
      read: false,
      ideaId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Project idea successfully published to IdeaVault! 🎉');
    return fullProject;
  };

  // Submit Application to Join
  const applyForRole = (projectId, roleName, pitch) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newApp = {
      id: `app-${Date.now()}`,
      ideaId: projectId,
      projectTitle: project.title,
      category: project.category,
      role: roleName,
      pitch: pitch,
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      creatorName: project.creator.name
    };

    setApplications(prev => [newApp, ...prev]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'application',
      title: 'Application Submitted',
      message: `You applied for ${roleName} on "${project.title}". The project lead will review your request.`,
      time: 'Just now',
      read: false,
      ideaId: projectId
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Application submitted for ${roleName}! 🌟`);
  };

  // Post Comment
  const addComment = (ideaId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comment-${Date.now()}`,
      author: currentUser?.name || 'Student Builder',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: text.trim(),
      time: 'Just now',
      role: currentUser?.department || 'Student'
    };

    setProjects(prev =>
      prev.map(p => {
        if (p.id === ideaId) {
          return {
            ...p,
            comments: [newComment, ...(p.comments || [])]
          };
        }
        return p;
      })
    );

    if (selectedProject && selectedProject.id === ideaId) {
      setSelectedProject(prev => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      }));
    }

    showToast('Comment posted to discussion!');
  };

  // Project Detail modal handlers
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const closeProjectDetail = () => {
    setIsDetailModalOpen(false);
  };

  const openJoinModal = (project, role = null) => {
    setJoinModalTarget({ project, role });
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    setJoinModalTarget({ project: null, role: null });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedTech([]);
    setSortBy('trending');
  };

  // Notifications helpers
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesTagline = p.tagline?.toLowerCase().includes(query);
        const matchesProblem = p.problem.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesCreator = p.creator.name.toLowerCase().includes(query);
        const matchesTech = p.technologies?.some(t => t.toLowerCase().includes(query));
        const matchesRoles = p.openRoles?.some(r => r.role.toLowerCase().includes(query) || r.skills.some(s => s.toLowerCase().includes(query)));
        if (!matchesTitle && !matchesTagline && !matchesProblem && !matchesCategory && !matchesCreator && !matchesTech && !matchesRoles) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && p.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Tech Stack
      if (selectedTech.length > 0) {
        const hasTech = selectedTech.every(t =>
          p.technologies?.some(pt => pt.toLowerCase() === t.toLowerCase())
        );
        if (!hasTech) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') {
        return (b.votes * 1.5 + b.views * 0.1) - (a.votes * 1.5 + a.views * 0.1);
      }
      if (sortBy === 'most-voted') {
        return b.votes - a.votes;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      if (sortBy === 'open-roles') {
        const aOpen = a.openRoles?.reduce((acc, r) => acc + (r.spots - r.filled), 0) || 0;
        const bOpen = b.openRoles?.reduce((acc, r) => acc + (r.spots - r.filled), 0) || 0;
        return bOpen - aOpen;
      }
      return 0;
    });
  }, [projects, searchQuery, selectedCategory, selectedDifficulty, selectedTech, sortBy]);

  // Smart Recommendations: "Picked For You"
  const recommendedProjects = useMemo(() => {
    if (!currentUser) return projects.slice(0, 3);
    const userSkills = (currentUser.skills || []).map(s => s.toLowerCase());
    const userInterests = (currentUser.interests || []).map(i => i.toLowerCase());

    const scored = projects.map(p => {
      let score = 0;
      let matchedFactors = [];

      // Check category in user interests
      if (userInterests.some(i => p.category.toLowerCase().includes(i) || i.includes(p.category.toLowerCase()))) {
        score += 5;
        matchedFactors.push(p.category);
      }

      // Check matching technologies
      const matchedTech = (p.technologies || []).filter(tech =>
        userSkills.some(skill => skill.toLowerCase() === tech.toLowerCase())
      );
      if (matchedTech.length > 0) {
        score += matchedTech.length * 3;
        matchedFactors.push(...matchedTech);
      }

      // Check matching open roles
      (p.openRoles || []).forEach(r => {
        const roleMatchedSkills = r.skills.filter(s => userSkills.includes(s.toLowerCase()));
        if (roleMatchedSkills.length > 0) {
          score += 4;
        }
      });

      return {
        ...p,
        recommendationScore: score,
        matchedFactors: Array.from(new Set(matchedFactors))
      };
    });

    return scored
      .filter(p => p.recommendationScore > 0)
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 4);
  }, [projects, currentUser]);

  return (
    <IdeasContext.Provider
      value={{
        projects,
        filteredProjects,
        recommendedProjects,
        votedIdeaIds,
        savedIdeaIds,
        applications,
        notifications,
        unreadNotificationsCount: notifications.filter(n => !n.read).length,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedTech,
        setSelectedTech,
        sortBy,
        setSortBy,
        resetFilters,
        toggleVote,
        toggleSave,
        submitIdea,
        applyForRole,
        addComment,
        selectedProject,
        isDetailModalOpen,
        openProjectDetail,
        closeProjectDetail,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isJoinModalOpen,
        joinModalTarget,
        openJoinModal,
        closeJoinModal,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        setToastMessage,
        showToast,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
}
