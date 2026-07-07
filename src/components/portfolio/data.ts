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
      { name: "React", level: 100 },
      { name: "Next.js", level: 100 },
      { name: "TypeScript", level: 100 },
      { name: "Tailwind CSS", level: 100 },
      { name: "Framer Motion", level: 100 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 100 },
      { name: "Express", level: 100 },
      { name: "REST APIs", level: 100 },
      { name: "JWT / Auth", level: 100 },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", level: 100 },
      { name: "PostgreSQL", level: 100 },
      { name: "Mongoose", level: 100 },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Python", level: 100 },
      { name: "TensorFlow", level: 100 },
      { name: "PyTorch", level: 100 },
      { name: "LLM / RAG", level: 100 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 100 },
      { name: "Docker", level: 100 },
      { name: "Vercel", level: 100 },
      { name: "Git / CI", level: 100 },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", level: 100 },
      { name: "OOP", level: 100 },
      { name: "DBMS", level: 100 },
      { name: "OS / Networks", level: 100 },
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
    year: "2026",
    title: "MERN Stack Developer Intern",
    subtitle: "ModelSuite AI",
    description: "Worked on React, Node.js, Express, and MongoDB features while debugging issues and improving UI consistency.",
    tag: "Internship",
  },
  {
    year: "2025",
    title: "Full Stack Development Intern",
    subtitle: "Sampath Software Solutions",
    description: "Built production-ready MERN features, secured REST APIs, and improved database performance in an Agile workflow.",
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
  image?: string;
  screenshots?: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "Recycling Verification & Reward System",
    tagline: "QR and GPS based recycling verification platform",
    stack: ["React.js", "Firebase", "Firestore", "Firebase Authentication"],
    problem: "Eco-actions were hard to verify and reward manually.",
    solution: "Developed a QR and GPS based recycling verification platform using React.js and Firebase.",
    features: [
      "QR and GPS based verification",
      "Firebase Authentication for secure user login and session management",
      "Firestore database for storing user records, verification logs, and reward history",
      "Reward allocation and recycling validation workflows",
      "Real-time Firebase integration",
      "Verification log tracking",
    ],
    href: `${GH}/Ecorecylr`,
    demo: "https://eco-flax.vercel.app/",
    major: true,
    image: "https://drive.google.com/file/d/1o6sitz6TSLWVCOZpCzKEwD9TI1q8mu3B/view?usp=drivesdk",
    overview: "Implemented Firebase Authentication for secure user login and session management. Used Firestore database for storing user records, verification logs, and reward history. Designed reward allocation and recycling validation workflows with real-time Firebase integration.",
    architecture: "React.js frontend with Firestore as the real-time database and Firebase Authentication for secure user identity management.",
    challenges: "Ensuring QR and GPS verification accuracy while maintaining low latency in real-time reward updates.",
    learned: "How to design reliable verification systems using Firebase and build real-time validation workflows at scale.",
    future: "Expand analytics dashboard and add AI-assisted verification for higher trust and automation.",
  },
  {
    name: "AgriConnect – Farmer Marketplace",
    tagline: "MERN-based farmer-to-buyer marketplace platform",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    problem: "Farmers needed a reliable marketplace with secure transactions and smoother communication.",
    solution: "Developed a MERN-based farmer-to-buyer marketplace platform for Farmers, Buyers, and Ad-mins with secure transactions and operational workflows.",
    features: [
      "Role-based access control (RBAC) and JWT authentication",
      "REST APIs for crop listings, orders, buyer-farmer interactions",
      "Cloudinary media storage integration",
      "Razorpay payments processing",
      "Invoice PDF generation",
      "Real-time order tracking and updates",
    ],
    href: `${GH}/FarmerFrontend`,
    demo: "https://farmer-frontend-theta.vercel.app",
    major: true,
    image: "https://drive.google.com/file/d/19setcmANX2sYrg4W_QH3LUfp0iGsT_7M/view?usp=drivesdk",
    overview: "Designed role-based access control (RBAC) and JWT authentication for secure user authorization. Built REST APIs using Node.js and Express.js to manage crop listings, orders, and buyer-farmer interactions. Integrated Cloudinary for media storage, Razorpay for payments, invoice generation, and order tracking.",
    architecture: "React.js frontend, Express.js REST API, MongoDB database, Cloudinary for media storage, and Razorpay payment integration.",
    challenges: "Handling multi-role marketplace workflows with secure permissions, media uploads, and reliable transaction processing.",
    learned: "How to design role-based systems and build marketplace workflows that scale reliably with secure user authorization.",
    future: "Add delivery-partner integration, richer notifications, and expand to more regional marketplace support.",
  },
  {
    name: "Personal Financial Manager",
    tagline: "Full-stack finance application for tracking income and expenses",
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Sequelize ORM"],
    problem: "Users needed a simple and secure way to track income, expenses, and budgets.",
    solution: "Built a full-stack personal finance management application for tracking income and expenses with secure authentication and protected routes.",
    features: [
      "Budget tracking and expense categorization",
      "Secure authentication and protected routes using JWT authorization",
      "Budget tracking, expense categorization, and financial reporting",
      "Real-time dashboard with financial insights",
      "PostgreSQL with Sequelize ORM for efficient database management",
      "Query handling and secure data persistence",
    ],
    href: `${GH}/pfm`,
    major: true,
    image: "https://images.unsplash.com/photo-1579621970563-430f63602022?w=1200&h=800&fit=crop&q=80",
    overview: "Developed secure authentication and protected routes using JWT-based authorization. Designed budget tracking, expense categorization, and financial reporting features. Used PostgreSQL with Sequelize ORM for efficient database management and query handling.",
    architecture: "React.js frontend, Express.js REST API, PostgreSQL database with Sequelize ORM, and JWT-based authentication for secure access.",
    challenges: "Designing an intuitive finance tracking workflow while ensuring data integrity and secure user sessions.",
    learned: "How to build meaningful financial dashboards and keep expense tracking workflows simple, reliable, and performant.",
    future: "Add richer reporting analytics, automated recurring expense management, and AI-powered spending insights.",
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
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1579621970563-430f63602022?w=600&h=400&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1553531889-e6cf89870f18?w=600&h=400&fit=crop&q=80",
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
  { name: "LeetCode", value: "400+", label: "problems solved", href: PROFILE.leetcode },
  { name: "CodeChef", value: "Active", label: "competitive profile", href: PROFILE.codechef },
  { name: "GitHub", value: "40+", label: "public repos", href: PROFILE.github },
  { name: "LinkedIn", value: "Connect", label: "professional network", href: PROFILE.linkedin },
];
