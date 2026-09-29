// IdeaVault Comprehensive Seed Dataset
// 12 Realistic, High-Caliber Student Projects Across Diverse Domains

export const CATEGORIES = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: "Brain",
    color: "from-blue-500 to-indigo-600",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    description: "Deep learning, NLP, computer vision, autonomous agents & generative AI."
  },
  {
    id: "web-dev",
    name: "Web Development",
    icon: "Globe",
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description: "Next-gen web applications, real-time collaboration platforms & tools."
  },
  {
    id: "mobile-apps",
    name: "Mobile Applications",
    icon: "Smartphone",
    color: "from-violet-500 to-purple-600",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    description: "Cross-platform iOS and Android apps solving everyday campus and real-world issues."
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "ShieldAlert",
    color: "from-red-500 to-rose-600",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    description: "Zero-trust networks, encrypted communications, vulnerability scanners & privacy."
  },
  {
    id: "iot-embedded",
    name: "IoT & Embedded Systems",
    icon: "Cpu",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description: "Microcontrollers, LoRaWAN, smart sensors, wearable tech & campus telemetry."
  },
  {
    id: "healthcare",
    name: "Healthcare & MedTech",
    icon: "Activity",
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Diagnostic aids, clinical workflow helpers, mental health tools & biosensors."
  },
  {
    id: "agriculture",
    name: "Agriculture & AgriTech",
    icon: "Sprout",
    color: "from-lime-500 to-green-600",
    badgeColor: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    description: "Drone crop monitoring, hydroponic automation, soil sensors & supply chain tracking."
  },
  {
    id: "fintech",
    name: "FinTech & Web3",
    icon: "Coins",
    color: "from-yellow-500 to-amber-600",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    description: "Micro-investing, campus escrow systems, decentralized identity & budget planners."
  },
  {
    id: "sustainability",
    name: "Sustainability & CleanTech",
    icon: "Leaf",
    color: "from-teal-500 to-emerald-600",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    description: "Carbon footprint tracking, zero-waste barter hubs & renewable energy monitoring."
  },
  {
    id: "education",
    name: "Education & EdTech",
    icon: "GraduationCap",
    color: "from-sky-500 to-indigo-600",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    description: "Adaptive flashcards, peer study rooms, interactive code tutors & course planners."
  },
  {
    id: "robotics",
    name: "Robotics & Automation",
    icon: "Bot",
    color: "from-purple-500 to-pink-600",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "ROS2 navigation, autonomous delivery rovers, robotic arms & computer vision control."
  },
  {
    id: "open-innovation",
    name: "Open Innovation",
    icon: "Sparkles",
    color: "from-fuchsia-500 to-pink-600",
    badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    description: "Civic tech, open-source science, accessibility tools & public community goods."
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "idea-1",
    title: "AegisNet: Decentralized Campus Emergency Mesh",
    tagline: "Off-grid peer-to-peer LoRaWAN & BLE network for campus security during disasters.",
    category: "Cybersecurity",
    categoryId: "cybersecurity",
    difficulty: "Advanced",
    timeline: "3 Months",
    status: "Recruiting",
    votes: 184,
    saves: 68,
    views: 890,
    trendingRank: 1,
    creator: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Cybersecurity & Network Systems",
      college: "School of Engineering",
      year: "Senior (4th Year)",
      bio: "Hardware security enthusiast, DEFCON CTF competitor, building resilient offline communication protocols.",
      github: "marcusvance-net"
    },
    problem: "During severe weather, flash floods, or power blackouts on university campuses, standard cellular towers saturate or drop completely. Students in isolated labs or residential dorms are unable to broadcast SOS coordinates or receive verified building evacuation updates.",
    solution: "AegisNet deploys a battery-backed ESP32 mesh nodes across campus buildings paired with an encrypted peer-to-peer Bluetooth Low Energy (BLE) mobile relay app. When cell signals die, packets hop peer-to-peer to campus dispatch stations without needing internet.",
    whyItMatters: "Provides zero-downtime safety for 15,000+ campus residents and eliminates lethal communication blind spots in basements and concrete auditoriums.",
    technologies: ["C++", "ESP32", "LoRaWAN", "Flutter", "Rust", "SQLite"],
    openRoles: [
      {
        id: "r1",
        role: "Embedded Hardware/IoT Developer",
        skills: ["ESP32", "C++", "PCB Design"],
        spots: 1,
        filled: 0,
        description: "Design low-power sleep cycles and antenna gain tuning for battery-backed relay nodes."
      },
      {
        id: "r2",
        role: "Mobile App Developer (Flutter)",
        skills: ["Flutter", "Dart", "BLE Protocols"],
        spots: 1,
        filled: 0,
        description: "Develop the offline background BLE packet discovery engine for Android & iOS."
      },
      {
        id: "r3",
        role: "UI/UX Designer",
        skills: ["Figma", "High-Contrast UI", "Accessibility"],
        spots: 1,
        filled: 0,
        description: "Craft stress-tested, high-legibility emergency SOS screens usable in dark conditions."
      }
    ],
    teamMembers: [
      {
        name: "Marcus Vance",
        role: "Lead Hardware & Protocol Architect",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        department: "Cybersecurity"
      },
      {
        name: "Clara Zhang",
        role: "Cryptography & Packet Security",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        department: "Computer Science"
      }
    ],
    roadmap: [
      { phase: "Phase 1: RF Field Prototyping", status: "Completed", description: "Benchmarked 915MHz LoRa packet reach across 3 concrete academic halls." },
      { phase: "Phase 2: BLE Relay Client", status: "Current", description: "Integrating background peer-to-peer discovery on Flutter for low-battery phones." },
      { phase: "Phase 3: Dispatch Dashboard", status: "Upcoming", description: "Building desktop console for campus safety police with heatmaps." },
      { phase: "Phase 4: Full Campus Drill", status: "Planned", description: "Simulating grid blackout during campus tech fest." }
    ],
    comments: [
      {
        id: "c1",
        author: "Prof. Henderson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        text: "The School of Engineering can sponsor 20 Heltec ESP32-LoRa boards for testing if you set up the gateway in Hall B!",
        time: "2 days ago",
        role: "Faculty Advisor"
      },
      {
        id: "c2",
        author: "Devon Patel",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        text: "Love the focus on zero-network reliance. Would you consider mesh multi-hop encryption using Curve25519?",
        time: "1 day ago",
        role: "Student Builder"
      }
    ],
    createdDate: "2026-09-18"
  },
  {
    id: "idea-2",
    title: "NeuroPulse: Non-Invasive EEG Focus & Fatigue Tracker",
    tagline: "Ultra-low-cost OpenBCI wearable headband with real-time neural fatigue detection for students.",
    category: "Healthcare & MedTech",
    categoryId: "healthcare",
    difficulty: "Advanced",
    timeline: "4 Months",
    status: "Recruiting",
    votes: 162,
    saves: 59,
    views: 740,
    trendingRank: 2,
    creator: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      department: "Biomedical Engineering & Neuroscience",
      college: "Institute of Health Sciences",
      year: "Junior (3rd Year)",
      bio: "Neuroengineering researcher researching prefrontal alpha/theta band spectral analysis during cognitive load.",
      github: "elena-neuro"
    },
    problem: "Over 78% of STEM college students experience chronic cognitive exhaustion, leading to severe burnout and micro-sleep while driving or studying. Existing clinical EEG equipment costs upwards of $10,000, making preventive neuro-monitoring inaccessible.",
    solution: "A 4-channel dry-electrode headband running on an STM32 with bluetooth streaming to an on-device lightweight convolutional neural network that detects micro-fatigue before subjective exhaustion sets in.",
    whyItMatters: "Enables students to optimize study rhythms, prevent burnout, and offers an open-hardware platform for neuroscience labs.",
    technologies: ["Python", "PyTorch", "OpenBCI", "STM32", "Signal Processing", "React"],
    openRoles: [
      {
        id: "r4",
        role: "AI/ML Developer",
        skills: ["PyTorch", "SciPy", "EEG Filtering"],
        spots: 1,
        filled: 0,
        description: "Fine-tune 1D-CNN on preprocessed spectral EEG data to classify fatigue vs focused states."
      },
      {
        id: "r5",
        role: "Frontend Developer",
        skills: ["React", "Chart.js", "WebSockets"],
        spots: 1,
        filled: 0,
        description: "Create a live 60fps brainwave visualizer and circadian productivity dashboard."
      }
    ],
    teamMembers: [
      {
        name: "Elena Rostova",
        role: "Lead Neurotech Researcher",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        department: "Biomedical Eng"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Analog Front-End", status: "Completed", description: "Clean 50Hz notch filter and instrumentation amplifier tested." },
      { phase: "Phase 2: Signal Classification", status: "Current", description: "Collecting 50 hours of verified study sessions for training." },
      { phase: "Phase 3: 3D Printed Headband", status: "Upcoming", description: "Ergonomic flexible headband for comfortable 3-hour study wear." }
    ],
    comments: [
      {
        id: "c3",
        author: "Devon Patel",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        text: "I have experience with lightweight PyTorch models converted to ONNX for browser runtime. Would love to help!",
        time: "18 hours ago",
        role: "Student Builder"
      }
    ],
    createdDate: "2026-09-20"
  },
  {
    id: "idea-3",
    title: "AgriVision: Edge-AI Drone Crop Disease Classifier",
    tagline: "Autonomous multispectral drone imagery analysis detecting fungal blight before visual symptoms appear.",
    category: "Agriculture & AgriTech",
    categoryId: "agriculture",
    difficulty: "Intermediate",
    timeline: "2 Months",
    status: "Recruiting",
    votes: 147,
    saves: 52,
    views: 680,
    trendingRank: 3,
    creator: {
      name: "Tariq Al-Mansoor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      department: "Agricultural Engineering & Robotics",
      college: "College of Sustainable Systems",
      year: "Senior (4th Year)",
      bio: "Drone pilot and precision farming advocate with family roots in organic citrus farming.",
      github: "tariq-agri"
    },
    problem: "Smallholder farmers lose between 20% to 40% of crop yields to powdery mildew and early fungal blight because manual field scouting only catches infections after foliage necrosis has already spread.",
    solution: "A custom lightweight YOLOv10-tiny model deployed on a Raspberry Pi 5 + Pi Camera mounted to a low-cost quadcopter that flies automated waypoint grids, tagging GPS coordinates of infected plants in real-time.",
    whyItMatters: "Reduces fungicide spraying by 65% through targeted micro-spot treatments and saves smallholder harvests.",
    technologies: ["Python", "YOLOv10", "OpenCV", "Raspberry Pi", "QGroundControl", "FastAPI"],
    openRoles: [
      {
        id: "r6",
        role: "Drone/Robotics Developer",
        skills: ["ROS2", "MAVLink", "PX4"],
        spots: 1,
        filled: 0,
        description: "Automate mission grid flights and geotagging synchronization with GPS receiver."
      },
      {
        id: "r7",
        role: "Full Stack Developer",
        skills: ["React", "Mapbox GL", "Python"],
        spots: 1,
        filled: 0,
        description: "Build interactive GIS farm map showing disease severity heatmaps."
      }
    ],
    teamMembers: [
      {
        name: "Tariq Al-Mansoor",
        role: "Lead Hardware & Flight Ops",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        department: "Agri Robotics"
      },
      {
        name: "Samantha Lee",
        role: "Plant Pathology & Data Curation",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        department: "Plant Sciences"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Dataset Collection", status: "Completed", description: "Tagged 4,000 leaf images at the university research farm." },
      { phase: "Phase 2: Edge Model Optimization", status: "Current", description: "Quantized weights to INT8 achieving 28 FPS on Pi 5." },
      { phase: "Phase 3: Field Pilot Testing", status: "Upcoming", description: "Deploying on 5 local strawberry acreage plots." }
    ],
    comments: [],
    createdDate: "2026-09-22"
  },
  {
    id: "idea-4",
    title: "EcoChain: Campus Zero-Waste Resource Barter & Swap",
    tagline: "Gamified circular economy platform for university students to exchange textbooks, electronics, and dorm gear.",
    category: "Sustainability & CleanTech",
    categoryId: "sustainability",
    difficulty: "Beginner",
    timeline: "6 Weeks",
    status: "Recruiting",
    votes: 138,
    saves: 49,
    views: 620,
    trendingRank: 4,
    creator: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      department: "Environmental Economics & Design",
      college: "School of Public Affairs",
      year: "Sophomore (2nd Year)",
      bio: "Zero-waste activist and product designer passionate about community-driven climate solutions.",
      github: "mayapatel-eco"
    },
    problem: "At the end of every semester, dumpsters outside college dorms are filled with working mini-fridges, chemistry textbooks, monitors, and furniture, while incoming freshmen spend thousands rebuying the exact same items.",
    solution: "A mobile-first web app with verified .edu login, peer-to-peer escrow tokens (EcoKarma), smart item image recognition for automatic categorizing, and designated campus drop-off lockers.",
    whyItMatters: "Prevents 12+ tons of landfill waste per university per year and saves college students hundreds of dollars per semester.",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Cloudinary"],
    openRoles: [
      {
        id: "r8",
        role: "Frontend Developer",
        skills: ["React", "Tailwind", "Responsive Design"],
        spots: 1,
        filled: 0,
        description: "Build clean, snappy mobile swipe-cards for browsing available dorm gear nearby."
      },
      {
        id: "r9",
        role: "Backend Developer",
        skills: ["Node.js", "PostgreSQL", "Auth"],
        spots: 1,
        filled: 0,
        description: "Implement campus email verification and karma token transaction ledger."
      }
    ],
    teamMembers: [
      {
        name: "Maya Patel",
        role: "Product Lead & UI/UX",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
        department: "Environmental Economics"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Student User Interviews", status: "Completed", description: "Surveyed 240 dorm residents on moving-day habits." },
      { phase: "Phase 2: Core Barter Flow", status: "Current", description: "Building camera upload and tag recognition flow." },
      { phase: "Phase 3: Campus Launch", status: "Upcoming", description: "Partnering with Campus Sustainability Office for fall move-in." }
    ],
    comments: [],
    createdDate: "2026-09-21"
  },
  {
    id: "idea-5",
    title: "Synthetix: Open Source Code-Review & Pair Arena",
    tagline: "Live collaborative pair-programming rooms with automated AST anti-pattern auditing.",
    category: "Web Development",
    categoryId: "web-dev",
    difficulty: "Intermediate",
    timeline: "2 Months",
    status: "Recruiting",
    votes: 129,
    saves: 45,
    views: 590,
    trendingRank: 5,
    creator: {
      name: "Chen Wei",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      department: "Computer Science",
      college: "School of Computing",
      year: "Junior (3rd Year)",
      bio: "Full-stack engineer, WebAssembly tinkerer, passionate about developer tooling and real-time CRDTs.",
      github: "chenwei-dev"
    },
    problem: "CS students struggle to get meaningful code review on their class assignments before submission deadlines. TAs are overwhelmed with 300+ submissions, and existing commercial tools are geared exclusively for enterprise git workflows.",
    solution: "A browser-based collaborative IDE running Monaco editor synced via Yjs CRDTs over WebSockets, featuring instant AST static analysis that highlights memory leaks, Big-O regressions, and code smells in real-time.",
    whyItMatters: "Levels the playing field for novice coders by teaching engineering rigor interactively.",
    technologies: ["TypeScript", "React", "WebSockets", "Yjs", "WebAssembly", "Docker"],
    openRoles: [
      {
        id: "r10",
        role: "Backend/Systems Developer",
        skills: ["Go", "Docker", "WebSockets"],
        spots: 1,
        filled: 0,
        description: "Implement isolated Docker micro-sandboxes for secure code execution and compilation."
      },
      {
        id: "r11",
        role: "UI/UX Designer",
        skills: ["Figma", "Dark Theme", "Code IDE Layout"],
        spots: 1,
        filled: 0,
        description: "Refine multi-cursor visual feedback and syntax suggestion popovers."
      }
    ],
    teamMembers: [
      {
        name: "Chen Wei",
        role: "Lead Full Stack Architect",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        department: "Computer Science"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Monaco + Yjs Sync", status: "Completed", description: "Conflict-free multi-user typing running at sub-20ms latency." },
      { phase: "Phase 2: AST Rule Engine", status: "Current", description: "Writing parser rules for Python and C++ common bugs." }
    ],
    comments: [],
    createdDate: "2026-09-24"
  },
  {
    id: "idea-6",
    title: "ChronoStudy: Circadian-Optimized Exam Prep Engine",
    tagline: "Adaptive learning system aligning flashcard spaced repetition with student cognitive peaks.",
    category: "Education & EdTech",
    categoryId: "education",
    difficulty: "Intermediate",
    timeline: "2 Months",
    status: "Recruiting",
    votes: 115,
    saves: 38,
    views: 510,
    trendingRank: 6,
    creator: {
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Cognitive Science & Psychology",
      college: "Faculty of Arts & Sciences",
      year: "Junior (3rd Year)",
      bio: "Researches chronobiology and memory retention models in high-stress academic environments.",
      github: "sophia-cog"
    },
    problem: "Most flashcard systems treat memory as static across the 24-hour cycle. Students cram at 2:00 AM when neurochemical consolidation is at its nadir, leading to 60% memory decay within 48 hours.",
    solution: "ChronoStudy uses the FSRS (Free Spaced Repetition Scheduler) algorithm combined with chronotype survey input and optional wearable sleep telemetry to dynamically schedule difficult problem reviews when focus is highest.",
    whyItMatters: "Cuts required study hours in half while boosting long-term recall for pre-med and engineering exams.",
    technologies: ["React", "Python", "FastAPI", "SQLite", "Tailwind CSS"],
    openRoles: [
      {
        id: "r12",
        role: "AI/ML Developer",
        skills: ["Python", "Statistics", "Optimization Algorithms"],
        spots: 1,
        filled: 0,
        description: "Implement custom decay curve regression models based on individual answer latency."
      }
    ],
    teamMembers: [
      {
        name: "Sophia Martinez",
        role: "Project Lead",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        department: "Cognitive Science"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Algorithm Benchmarking", status: "Completed", description: "Verified FSRS curve against Anki legacy datasets." }
    ],
    comments: [],
    createdDate: "2026-09-23"
  },
  {
    id: "idea-7",
    title: "RoboArm: Haptic Tele-Operated Lab Assistant",
    tagline: "Low-cost 6-DOF robotic manipulator with bilateral force feedback for hazardous chemistry labs.",
    category: "Robotics & Automation",
    categoryId: "robotics",
    difficulty: "Advanced",
    timeline: "4 Months",
    status: "Recruiting",
    votes: 110,
    saves: 41,
    views: 480,
    trendingRank: 7,
    creator: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      department: "Mechanical & Mechatronics Engineering",
      college: "School of Engineering",
      year: "Senior (4th Year)",
      bio: "Roboticist with expertise in brushless motor control, 3D printing structural mechanics, and inverse kinematics.",
      github: "davidkim-robotics"
    },
    problem: "Undergraduate chemistry researchers frequently handle volatile pyrotechnic reagents or radioactive tracers inside fume hoods where manual pipetting mistakes can result in toxic inhalation or burns.",
    solution: "A 3D-printable 6-degree-of-freedom robotic arm controlled remotely through an exoskeleton glove with brushless motor force-feedback, letting researchers 'feel' fluid resistance and surface contact safely from outside the enclosure.",
    whyItMatters: "Democratizes safe chemical handling for underfunded academic institutions without requiring $50k industrial robotic arms.",
    technologies: ["C++", "ROS2", "CAD / SolidWorks", "ESP32", "CAN Bus", "Python"],
    openRoles: [
      {
        id: "r13",
        role: "Hardware/IoT Developer",
        skills: ["CAN Bus", "STM32", "Motor Drivers"],
        spots: 1,
        filled: 0,
        description: "Program high-frequency current sensing loops on Field Oriented Control (FOC) motor boards."
      },
      {
        id: "r14",
        role: "Researcher / Testing Lead",
        skills: ["Chemistry Lab Safety", "Lab Protocols"],
        spots: 1,
        filled: 0,
        description: "Benchmark fluid transfer precision using micro-pipette attachments."
      }
    ],
    teamMembers: [
      {
        name: "David Kim",
        role: "Mechanical & Robotics Lead",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        department: "Mechatronics"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Arm Frame Kinematics", status: "Completed", description: "3D printed cycloidal gearboxes tested at 2.5kg payload." },
      { phase: "Phase 2: Haptic Glove", status: "Current", description: "Building magnetic encoder finger angle capture rig." }
    ],
    comments: [],
    createdDate: "2026-09-17"
  },
  {
    id: "idea-8",
    title: "SignSync: Real-Time ASL Video Call Translation Extension",
    tagline: "Lightweight browser extension translating American Sign Language to spoken audio in real-time.",
    category: "AI & Machine Learning",
    categoryId: "ai-ml",
    difficulty: "Advanced",
    timeline: "3 Months",
    status: "Recruiting",
    votes: 154,
    saves: 62,
    views: 820,
    trendingRank: 8,
    creator: {
      name: "Priya Sundaram",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      department: "Computer Vision & Human-Computer Interaction",
      college: "School of Computing",
      year: "Junior (3rd Year)",
      bio: "HCI researcher passionate about accessibility tech and spatial keypoint tracking.",
      github: "priya-cv"
    },
    problem: "Deaf and hard-of-hearing students face extreme barriers during remote campus lectures, office hours, and group project calls on Zoom or Google Meet when qualified ASL interpreters are unavailable.",
    solution: "A client-side Chrome extension utilizing MediaPipe hand/pose mesh detection combined with a temporal Transformer network that translates continuous ASL gestures directly into speech and live subtitles at 30 FPS.",
    whyItMatters: "Provides inclusive, instant access for thousands of Deaf university students in academic and social discussions.",
    technologies: ["MediaPipe", "TensorFlow.js", "WebRTC", "React", "TypeScript", "Web Speech API"],
    openRoles: [
      {
        id: "r15",
        role: "AI/ML Developer",
        skills: ["TensorFlow.js", "Transformers", "Time-series Models"],
        spots: 1,
        filled: 0,
        description: "Train continuous gesture boundary classification to distinguish grammar markers."
      },
      {
        id: "r16",
        role: "Frontend Developer",
        skills: ["React", "Chrome Extension MV3", "WebRTC"],
        spots: 1,
        filled: 0,
        description: "Integrate non-intrusive HUD overlays directly onto Google Meet and Zoom web clients."
      }
    ],
    teamMembers: [
      {
        name: "Priya Sundaram",
        role: "Lead ML & Computer Vision",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        department: "CS / HCI"
      }
    ],
    roadmap: [
      { phase: "Phase 1: 21-Keypoint Hand Pipeline", status: "Completed", description: "Achieved 35 FPS tracking on integrated Intel Iris graphics." },
      { phase: "Phase 2: Vocabulary Expansion", status: "Current", description: "Expanding vocabulary from 150 words to 500 academic terms." }
    ],
    comments: [],
    createdDate: "2026-09-19"
  },
  {
    id: "idea-9",
    title: "SafeRoute: Crowd-Verified Campus Night Navigation",
    tagline: "Real-time illuminated pathfinder prioritizing well-lit, security-monitored routes for students.",
    category: "Mobile Applications",
    categoryId: "mobile-apps",
    difficulty: "Intermediate",
    timeline: "2 Months",
    status: "Recruiting",
    votes: 142,
    saves: 55,
    views: 710,
    trendingRank: 9,
    creator: {
      name: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      department: "Software Engineering & Urban Planning",
      college: "School of Architecture & Computing",
      year: "Sophomore (2nd Year)",
      bio: "Mobile app developer interested in algorithmic routing, campus safety, and spatial statistics.",
      github: "liam-routes"
    },
    problem: "Standard Google or Apple Maps routing algorithms prioritize the shortest distance, often guiding students walking back from late library sessions through unlit construction zones, alleyways, or desolate areas.",
    solution: "SafeRoute computes custom safety-weighted Dijkstra graphs combining campus emergency blue-light phone locations, streetlamp density maps, active security shuttle routes, and peer check-ins.",
    whyItMatters: "Gives students peace of mind and reduces nighttime security incidents across college campuses.",
    technologies: ["React Native", "Expo", "Node.js", "PostGIS", "Mapbox GL", "WebSockets"],
    openRoles: [
      {
        id: "r17",
        role: "Mobile App Developer",
        skills: ["React Native", "Expo", "Geolocation"],
        spots: 1,
        filled: 0,
        description: "Implement background geo-fencing and one-touch companion walk alerts."
      },
      {
        id: "r18",
        role: "Backend Developer",
        skills: ["Node.js", "PostGIS", "Graph Routing"],
        spots: 1,
        filled: 0,
        description: "Maintain PostGIS graph routing engine with dynamic safety weight updates."
      }
    ],
    teamMembers: [
      {
        name: "Liam O'Connor",
        role: "Mobile Lead",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
        department: "Software Eng"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Campus GIS Lighting Audit", status: "Completed", description: "Mapped 450 campus lampposts and 32 blue-light poles." },
      { phase: "Phase 2: Navigation Engine", status: "Current", description: "Testing battery consumption on background GPS turns." }
    ],
    comments: [],
    createdDate: "2026-09-25"
  },
  {
    id: "idea-10",
    title: "SplitFair: Autonomous Roommate Utility & Grocery Escrow",
    tagline: "Micro-escrow and smart receipt OCR for college student shared housing without awkward money talks.",
    category: "FinTech & Web3",
    categoryId: "fintech",
    difficulty: "Beginner",
    timeline: "6 Weeks",
    status: "Recruiting",
    votes: 98,
    saves: 34,
    views: 430,
    trendingRank: 10,
    creator: {
      name: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      department: "Financial Informatics & Business",
      college: "School of Management",
      year: "Junior (3rd Year)",
      bio: "Fintech enthusiast obsessed with automating micro-transactions and eliminating friction in student rentals.",
      github: "ananya-fin"
    },
    problem: "Roommate conflict in off-campus student housing stems primarily from unpaid electric bills, wifi accounts, and shared grocery runs, causing friction and damaged credit scores.",
    solution: "An automated receipt OCR scanner that extracts items, detects who bought what, and automatically reconciles mutual balances through instant peer settlement without tedious manual math.",
    whyItMatters: "Eliminates emotional stress and keeps college roommate dynamics healthy and transparent.",
    technologies: ["React", "FastAPI", "Tesseract OCR", "Plaid API", "PostgreSQL", "Tailwind CSS"],
    openRoles: [
      {
        id: "r19",
        role: "UI/UX Designer",
        skills: ["Figma", "Fintech Mobile Design"],
        spots: 1,
        filled: 0,
        description: "Create an intuitive, friction-free receipt verification and breakdown interface."
      }
    ],
    teamMembers: [
      {
        name: "Ananya Roy",
        role: "Product & Backend Lead",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        department: "Fintech"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Receipt Parser", status: "Completed", description: "Parsed 120 grocery receipts with 94% item accuracy." }
    ],
    comments: [],
    createdDate: "2026-09-26"
  },
  {
    id: "idea-11",
    title: "HydroSmart: Closed-Loop Aquaponics Nutrient Controller",
    tagline: "Automated pH, dissolved oxygen & nitrogen balancing for urban rooftop campus food gardens.",
    category: "IoT & Embedded Systems",
    categoryId: "iot-embedded",
    difficulty: "Intermediate",
    timeline: "2 Months",
    status: "Recruiting",
    votes: 92,
    saves: 31,
    views: 390,
    trendingRank: 11,
    creator: {
      name: "Mateo Silva",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      department: "Electrical & Environmental Engineering",
      college: "School of Engineering",
      year: "Sophomore (2nd Year)",
      bio: "Aquaponics grower and microcontroller designer building sustainable food systems for dense urban centers.",
      github: "mateo-hydro"
    },
    problem: "Urban university aquaponic systems fail when biological spikes in ammonia go undetected over weekends when students are away, killing beneficial bacteria and fish stocks.",
    solution: "A modular array of submersible ion-selective electrodes hooked to an RP2040 microcontroller with automated peristaltic dosing pumps, maintaining exact chemical equilibrium 24/7.",
    whyItMatters: "Enables campus dining halls to harvest fresh greens year-round using 90% less water than traditional soil farming.",
    technologies: ["C++", "RP2040", "MQTT", "Grafana", "Node.js", "React"],
    openRoles: [
      {
        id: "r20",
        role: "Hardware/IoT Developer",
        skills: ["RP2040", "I2C", "Calibration"],
        spots: 1,
        filled: 0,
        description: "Implement temperature compensation math for analog pH and EC probe reads."
      }
    ],
    teamMembers: [
      {
        name: "Mateo Silva",
        role: "Hardware Lead",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        department: "Electrical Eng"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Dosing Bench", status: "Completed", description: "Peristaltic pump control PCB designed and fabricated." }
    ],
    comments: [],
    createdDate: "2026-09-27"
  },
  {
    id: "idea-12",
    title: "OpenCivic: Hyper-Local Student Municipality Ballot Guide",
    tagline: "Objective, plain-language breakdown of municipal ordinances and local election candidates for student voters.",
    category: "Open Innovation",
    categoryId: "open-innovation",
    difficulty: "Beginner",
    timeline: "1 Month",
    status: "Recruiting",
    votes: 89,
    saves: 29,
    views: 360,
    trendingRank: 12,
    creator: {
      name: "Hannah Goldstein",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      department: "Political Science & Journalism",
      college: "School of Public Affairs",
      year: "Senior (4th Year)",
      bio: "Student journalist dedicated to transparent governance, civic engagement, and voting rights.",
      github: "hannah-civic"
    },
    problem: "College students often fail to vote in local city council and bond ballot elections because legal measure text is intentionally convoluted, despite local housing policies having the biggest direct impact on student rent.",
    solution: "A civic exploration app featuring impartial pros/cons summaries, campaign donor funding transparency graphs, and candidate questionnaire responses tailored specifically to college district boundaries.",
    whyItMatters: "Empowers youth voter turnout and elevates student voice in local municipal housing and transit decisions.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Python", "BeautifulSoup"],
    openRoles: [
      {
        id: "r21",
        role: "Content/Presentation Designer",
        skills: ["Journalism", "Infographics", "Copywriting"],
        spots: 2,
        filled: 0,
        description: "Translate complex legal ordinance paragraphs into clear, visual infographics."
      },
      {
        id: "r22",
        role: "Frontend Developer",
        skills: ["React", "Interactive Data Viz"],
        spots: 1,
        filled: 0,
        description: "Build interactive campaign donor contribution chord diagrams."
      }
    ],
    teamMembers: [
      {
        name: "Hannah Goldstein",
        role: "Editor-in-Chief",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        department: "Political Science"
      }
    ],
    roadmap: [
      { phase: "Phase 1: Candidate Questionnaires", status: "Completed", description: "Collected responses from 8 city council candidates." }
    ],
    comments: [],
    createdDate: "2026-09-28"
  }
];

export const DEMO_STUDENT = {
  id: "student-devon",
  name: "Devon Patel",
  email: "devon.patel@campus.edu",
  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  department: "Computer Science & Artificial Intelligence",
  college: "College of Computing & Informatics",
  year: "Senior (Year 4)",
  bio: "Passionate about edge ML, real-time web applications, and building tools that connect students to high-impact projects. Seeking to build or join innovative teams.",
  skills: ["Python", "PyTorch", "React", "TypeScript", "FastAPI", "Docker", "Computer Vision"],
  interests: ["AI & Machine Learning", "Healthcare & MedTech", "Sustainability & CleanTech", "Robotics"],
  github: "github.com/devonpatel-dev",
  linkedin: "linkedin.com/in/devonpatel",
  portfolio: "devonpatel.dev",
  badges: [
    { title: "Early Innovator", description: "Platform founding beta tester", icon: "Sparkles" },
    { title: "Team Builder", description: "Collaborated in 3+ cross-functional teams", icon: "Users" },
    { title: "Top Voter", description: "Active project scout in campus vault", icon: "ThumbsUp" }
  ]
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "vote",
    title: "New Upvote on your comment",
    message: "Elena Rostova upvoted your insight on NeuroPulse signal classification.",
    time: "25m ago",
    read: false,
    ideaId: "idea-2"
  },
  {
    id: "notif-2",
    type: "application",
    title: "Collaboration Request",
    message: "Aarav Sharma requested to join AegisNet as Frontend Developer.",
    time: "2h ago",
    read: false,
    ideaId: "idea-1"
  },
  {
    id: "notif-3",
    type: "recommendation",
    title: "New Idea Matches Your Skills",
    message: "SignSync matches 4 of your skills (Python, PyTorch, React, Computer Vision).",
    time: "5h ago",
    read: true,
    ideaId: "idea-8"
  },
  {
    id: "notif-4",
    type: "milestone",
    title: "Trending Alert",
    message: "AgriVision just reached 140+ student votes and entered the Top 3 Leaderboard!",
    time: "1d ago",
    read: true,
    ideaId: "idea-3"
  }
];
