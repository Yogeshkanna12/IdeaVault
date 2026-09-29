import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_STUDENT } from '../data/mockData';

const AuthContext = createContext();

const PRESET_ACCOUNTS = [
  DEMO_STUDENT,
  {
    id: "student-elena",
    name: "Elena Rostova",
    email: "elena.rostova@campus.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Biomedical Engineering & Neuroscience",
    college: "Institute of Health Sciences",
    year: "Junior (Year 3)",
    bio: "Neuroengineering researcher researching prefrontal alpha/theta band spectral analysis during cognitive load.",
    skills: ["Python", "PyTorch", "Signal Processing", "OpenBCI", "Biomedical Instrumentation"],
    interests: ["Healthcare & MedTech", "AI & Machine Learning", "Robotics"],
    github: "github.com/elena-neuro",
    linkedin: "linkedin.com/in/elena-rostova",
    portfolio: "elenarostova.tech",
    badges: [
      { title: "Neuro Pioneer", description: "Led physiological data trial", icon: "Brain" },
      { title: "Project Lead", description: "Created NeuroPulse", icon: "Award" }
    ]
  },
  {
    id: "student-marcus",
    name: "Marcus Vance",
    email: "marcus.vance@campus.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Cybersecurity & Network Systems",
    college: "School of Engineering",
    year: "Senior (Year 4)",
    bio: "Hardware security enthusiast, DEFCON CTF competitor, building resilient offline communication protocols.",
    skills: ["C++", "Rust", "ESP32", "LoRaWAN", "Network Protocols", "Flutter"],
    interests: ["Cybersecurity", "IoT & Embedded Systems", "Open Innovation"],
    github: "github.com/marcusvance-net",
    linkedin: "linkedin.com/in/marcusvance",
    portfolio: "marcusvance.security",
    badges: [
      { title: "Defcon CTF", description: "Placed Top 10 in collegiate CTF", icon: "Shield" },
      { title: "Mesh Builder", description: "Creator of AegisNet", icon: "Radio" }
    ]
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ideavault_user');
      return saved ? JSON.parse(saved) : DEMO_STUDENT;
    } catch (e) {
      return DEMO_STUDENT;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ideavault_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const openAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = (email, password) => {
    // Check if preset or find matching
    const found = PRESET_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    // Generic fallback mock login for any college email
    const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newUser = {
      id: `student-${Date.now()}`,
      name: formattedName || "Student Builder",
      email: email,
      avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
      department: "Computer Science & Engineering",
      college: "University Campus",
      year: "Student",
      bio: "Excited to collaborate on innovative campus projects and bring ideas to life.",
      skills: ["Python", "JavaScript", "React", "Git"],
      interests: ["AI & Machine Learning", "Web Development"],
      badges: [{ title: "New Explorer", description: "Joined the IdeaVault community", icon: "Sparkles" }]
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signUp = (formData) => {
    const newUser = {
      id: `student-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name}`,
      department: formData.department || "Computer Science",
      college: formData.college || "University Campus",
      year: formData.year || "Undergraduate",
      bio: formData.bio || "Student innovator looking to discover and build impactful projects.",
      skills: formData.skills && formData.skills.length > 0 ? formData.skills : ["React", "Python"],
      interests: formData.interests && formData.interests.length > 0 ? formData.interests : ["Web Development", "AI & Machine Learning"],
      github: formData.github || "",
      linkedin: formData.linkedin || "",
      portfolio: formData.portfolio || "",
      badges: [{ title: "Founding Member", description: "Joined IdeaVault network", icon: "Sparkles" }]
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const switchAccount = (account) => {
    setCurrentUser(account);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        presetAccounts: PRESET_ACCOUNTS,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        updateProfile,
        switchAccount,
        isProfileModalOpen,
        setIsProfileModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
