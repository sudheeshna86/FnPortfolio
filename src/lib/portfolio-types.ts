/**
 * Portfolio Data Types
 * Defines all structures for portfolio content
 */

export interface Profile {
  name: string;
  short: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codechef: string;
  tagline: string;
  profileImage?: string;
  resumeLink?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface Project {
  id?: string;
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
  image?: string; // New: Project image/screenshot
  screenshots?: string[]; // Optional: Multiple screenshots
}

export interface Achievement {
  id?: string;
  text: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
}

export interface CodingProfile {
  name: string;
  href: string;
  value: string;
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  portfolioLinks?: string[];
}

export interface About {
  title: string;
  description: string;
  highlights: Array<{
    icon: string;
    title: string;
    body: string;
  }>;
  statistics: Array<{
    label: string;
    value: string;
  }>;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  skills: SkillCategory[];
  timeline: TimelineEntry[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
  codingProfiles: CodingProfile[];
  contact: Contact;
}

export interface AdminSession {
  authenticated: boolean;
  timestamp?: number;
}
