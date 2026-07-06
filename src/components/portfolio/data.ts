export const PROFILE = {
  name: "Matta Sudheeshna",
  short: "Sudheeshna",
  title: "B.Tech CSE Student • DSA & Competitive Programming • MERN Developer",
  location: "Visakhapatnam, India",
  email: "sudheehoney2806@gmail.com",
  github: "https://github.com/sudheeshna86",
  linkedin: "https://www.linkedin.com/in/sudheeshna-matta-3a60a3296/",
  leetcode: "https://leetcode.com/u/sudheeshna_08/",
  codechef: "https://www.codechef.com/users/sudheeshna_8",
  tagline:
    "B.Tech student focused on DSA, competitive programming, and full-stack development with the MERN stack.",
};

export const SKILLS: { category: string; items: { name: string; level: number }[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 78 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 92 },
      { name: "Express", level: 90 },
      { name: "REST APIs", level: 90 },
      { name: "JWT / Auth", level: 85 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 78 },
      { name: "Mongoose", level: 88 },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Python", level: 88 },
      { name: "TensorFlow", level: 70 },
      { name: "PyTorch", level: 65 },
      { name: "LLM / RAG", level: 72 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 68 },
      { name: "Docker", level: 72 },
      { name: "Vercel", level: 90 },
      { name: "Git / CI", level: 88 },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", level: 90 },
      { name: "OOP", level: 88 },
      { name: "DBMS", level: 85 },
      { name: "OS / Networks", level: 78 },
    ],
  },
];

export const TIMELINE = [
  {
    year: "2026",
    title: "Building AI + Full Stack Products",
    subtitle: "Independent",
    description: "Shipping full-stack MERN products and exploring AI-driven features across side projects.",
    tag: "Now",
  },
  {
    year: "2025",
    title: "Full Stack Development Intern",
    subtitle: "Sampath Software Solutions",
    description: "Built production-ready MERN features, secured REST APIs, and improved database performance in an Agile workflow.",
    tag: "Internship",
  },
  {
    year: "2025",
    title: "MERN Stack Developer Intern",
    subtitle: "ModelSuite AI",
    description: "Worked on React, Node.js, Express, and MongoDB features while debugging issues and improving UI consistency.",
    tag: "Internship",
  },
  {
    year: "2023",
    title: "B.Tech in Computer Science & Engineering",
    subtitle: "Vignan's Institute of Information Technology",
    description: "Deep focus on DSA, competitive programming, databases, and the fundamentals of software engineering.",
    tag: "Education",
  },
];

const GH = "https://github.com/sudheeshna86";

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  problem: string;
  solution: string;
  features: string[];
  href: string;
  demo?: string;
  major: boolean;
  overview?: string;
  architecture?: string;
  challenges?: string;
  learned?: string;
  future?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Recycling Verification & Reward System",
    tagline: "QR + GPS based eco-action verification platform",
    stack: ["React.js", "Node.js", "MongoDB", "Firebase", "JWT"],
    problem: "Eco-actions were hard to verify and reward manually.",
    solution: "Built a QR + GPS verification platform with secure auth and automated reward allocation for eco-actions.",
    features: [
      "QR verification",
      "GPS validation",
      "Firebase Auth",
      "Reward automation",
      "Secure user sessions",
      "Optimized API performance",
    ],
    href: `${GH}/Ecorecylr`,
    demo: "https://eco-flax.vercel.app/",
    major: true,
    overview: "A full-stack verification platform that helps users validate eco-actions and receive rewards with speed and security.",
    architecture: "React frontend, Node.js/Express API, MongoDB database, Firebase Auth, and JWT-based session handling.",
    challenges: "Balancing secure verification flows with a lightweight experience for daily user actions.",
    learned: "How to design reliable verification systems and keep API latency low under real-world usage.",
    future: "Expand analytics and add AI-assisted verification for higher trust and automation.",
  },
  {
    name: "AgriConnect – Farmer Marketplace",
    tagline: "Multi-role MERN marketplace for farmers, buyers, and drivers",
    stack: ["React.js", "Node.js", "MongoDB", "Cloudinary", "Razorpay"],
    problem: "Farmers needed a reliable marketplace with secure transactions and smoother communication.",
    solution: "Engineered a multi-role platform with product listings, real-time chat, payments, and invoice generation.",
    features: [
      "Multi-role access",
      "Cloudinary media",
      "Razorpay payments",
      "Socket.IO chat",
      "Invoice PDF generation",
      "Responsive experience",
    ],
    href: `${GH}/FarmerFrontend`,
    demo: "https://farmer-frontend-theta.vercel.app",
    major: true,
    overview: "A full-stack marketplace that connects farmers directly with buyers while supporting secure transactions and operational workflows.",
    architecture: "React frontend, Express API, MongoDB data model, Cloudinary media storage, and payment integration for real-world transactions.",
    challenges: "Handling marketplace workflows, media uploads, and multi-role permissions without sacrificing reliability.",
    learned: "How role-based design and thoughtful product flows make marketplace products feel trustworthy.",
    future: "Add delivery-partner integration, richer notifications, and more regional marketplace support.",
  },
  {
    name: "Personal Financial Manager",
    tagline: "Full-stack finance tracker for income and expenses",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    problem: "Users needed a simple way to track income, expenses, and budgets.",
    solution: "Built a secure finance app with budget tracking, categorization, dashboards, and reports.",
    features: [
      "Budget tracking",
      "Expense categorization",
      "JWT auth",
      "Real-time reports",
      "Dashboard insights",
      "Secure user sessions",
    ],
    href: `${GH}/pfm`,
    major: true,
    overview: "A full-stack finance manager built to make spending patterns visible without needing spreadsheets.",
    architecture: "React frontend, Express REST API, MongoDB data store, and JWT-based authentication for secure access.",
    challenges: "Keeping the product practical for everyday finance tracking while maintaining good data structure.",
    learned: "How to build meaningful dashboards and keep financial workflows simple and reliable.",
    future: "Add richer reporting and more automation for recurring expenses.",
  },
  {
    name: "Sikkim Explorer",
    tagline: "Cinematic travel guide for exploring Sikkim",
    stack: ["React", "JavaScript", "Tailwind", "Framer Motion"],
    problem: "Travel content about Sikkim is fragmented across blogs, PDFs, and outdated pages.",
    solution: "A curated, cinematic single-destination guide with itineraries, gallery, and practical info in one polished experience.",
    features: [
      "Curated multi-day itineraries",
      "Immersive image galleries",
      "Interactive map of highlights",
      "Practical travel tips",
      "Responsive on all devices",
      "Smooth scroll-driven animations",
    ],
    href: `${GH}/sikkim`,
    major: false,
    overview: "A travel micro-site that treats Sikkim as a hero product — cinematic hero, editorial layout, and rich imagery.",
    architecture: "Pure React SPA with Tailwind and Framer Motion. Static content bundled at build time for speed.",
    challenges: "Getting high-quality visuals to load fast without hurting Lighthouse scores.",
    learned: "How editorial design principles (rhythm, negative space, typographic hierarchy) elevate a web experience.",
    future: "Multi-destination expansion and a booking-partner integration.",
  },

  // ---- Mini projects ----
  {
    name: "Business Referral Dashboard",
    tagline: "Dashboard for tracking business referrals & partners",
    stack: ["JavaScript", "React", "Node.js", "REST API"],
    problem: "Referral programs lack a clear analytics surface.",
    solution: "A dashboard that tracks partners, conversions, and payouts in one place.",
    features: ["Partner management", "Conversion analytics", "Auth", "Responsive UI"],
    href: `${GH}/go-business-referral-dashboard`,
    major: false,
    overview: "An internal-tooling style dashboard for tracking referral partners and conversions.",
  },
  {
    name: "Store Rating Management",
    tagline: "Full-stack platform for rating and reviewing stores",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    problem: "Store owners need honest, structured feedback.",
    solution: "Role-based ratings with admin, owner, and user flows.",
    features: ["Role auth", "Rating CRUD", "Search & filter", "Dashboard"],
    href: `${GH}/StoreRatingMng`,
    major: false,
    overview: "A three-role review platform (admin / owner / customer) with a clean permissions model.",
  },
  {
    name: "Fitness Tracker",
    tagline: "TypeScript fitness & workout tracking app",
    stack: ["TypeScript", "React", "Tailwind"],
    problem: "Consistency requires simple, joyful tracking.",
    solution: "A fast UI to log workouts and monitor progress.",
    features: ["Workout logs", "Progress charts", "Responsive"],
    href: `${GH}/fitness`,
    major: false,
    overview: "A typed workout logger designed for daily use and quick entry.",
  },
  {
    name: "Task Management",
    tagline: "MERN task manager with kanban board",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    problem: "Teams need lightweight task boards.",
    solution: "Full-stack Kanban with auth and CRUD.",
    features: ["Kanban board", "JWT auth", "REST API", "Filters"],
    href: `${GH}/TaskManagement`,
    major: false,
    overview: "A MERN Kanban with drag-and-drop, filters, and role-aware boards.",
  },
  {
    name: "Matches Platform",
    tagline: "Full-stack matching web app",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    problem: "Matching people or services needs structured flows.",
    solution: "Backend + frontend with profiles and matching logic.",
    features: ["Profiles", "Matching engine", "Auth", "REST API"],
    href: `${GH}/MatchesFrontend`,
    major: false,
    overview: "A configurable matching platform with profile scoring and preferences.",
  },
  {
    name: "HelpHive",
    tagline: "Community help & local services app",
    stack: ["TypeScript", "React", "Tailwind"],
    problem: "Finding trusted local help is fragmented.",
    solution: "A modern app that hubs help requests and offers.",
    features: ["Listings", "Categories", "Responsive UI"],
    href: `${GH}/Helphive`,
    major: false,
    overview: "A community marketplace for finding and offering local help.",
  },
  {
    name: "Savvy Saver",
    tagline: "Savings & budgeting companion",
    stack: ["TypeScript", "React", "Tailwind"],
    problem: "Saving needs nudges and clarity.",
    solution: "Goal-based savings with clean visuals.",
    features: ["Goals", "Progress", "Insights"],
    href: `${GH}/savvy-saver`,
    major: false,
    overview: "A goal-first savings tracker with clean progress visualizations.",
  },
  {
    name: "Inventory Management",
    tagline: "MERN inventory tracking system",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    problem: "Small businesses need simple stock tracking.",
    solution: "CRUD inventory with dashboards and alerts.",
    features: ["Stock CRUD", "Dashboard", "Low-stock alerts", "Auth"],
    href: `${GH}/inventorymanagement`,
    major: false,
    overview: "A lightweight inventory tool for small businesses with alert thresholds.",
  },
];

export const ACHIEVEMENTS = [
  "Achieved ratings: 1801 on LeetCode and 1666 on CodeChef",
  "Participated in multiple hackathons and coding events",
  "Completed more than 100 Google Cloud Skill Boost badges",
  "500+ DSA problems solved across platforms",
  "Built production-ready MERN applications with a strong focus on quality and performance",
];

export const CERTIFICATIONS = [
  { name: "Java", issuer: "NPTEL" },
  { name: "Python and Web Development", issuer: "Cisco" },
  { name: "Deloitte Australia Technology Job Simulation", issuer: "Forage" },
  { name: "Machine Learning Foundations", issuer: "Coursera" },
  { name: "MongoDB for Developers", issuer: "MongoDB University" },
];

export const CODING_PROFILES = [
  { name: "LeetCode", value: "500+", label: "problems solved", href: PROFILE.leetcode },
  { name: "CodeChef", value: "Active", label: "competitive profile", href: PROFILE.codechef },
  { name: "GitHub", value: "40+", label: "public repos", href: PROFILE.github },
  { name: "LinkedIn", value: "Connect", label: "professional network", href: PROFILE.linkedin },
];
