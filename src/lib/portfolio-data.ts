/**
 * Portfolio Data Service
 * Manages all data operations for the portfolio
 */

import type { PortfolioData, Project, Achievement, Certification, SkillCategory } from "./portfolio-types";

// API base URL - can be configured
const API_BASE = "/api";

// Default portfolio data - will be synced with server
export let PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Matta Sudheeshna",
    short: "Sudheeshna",
    title: "B.Tech CSE Student • DSA & Competitive Programming • MERN Developer",
    location: "Visakhapatnam, India",
    email: "sudheehoney2806@gmail.com",
    github: "https://github.com/sudheeshna86",
    linkedin: "https://www.linkedin.com/in/sudheeshna-matta-3a60a3296/",
    leetcode: "https://leetcode.com/u/sudheeshna_08/",
    codechef: "https://www.codechef.com/users/sudheeshna_8",
    tagline: "B.Tech student focused on DSA, competitive programming, and full-stack development with the MERN stack.",
  },
  about: {
    title: "Building AI + Full Stack products",
    description: "with a strong foundation in problem solving and product thinking.",
    highlights: [
      {
        icon: "Code2",
        title: "Engineering",
        body: "Ship reliable systems with clean architecture across frontend, backend, and infra.",
      },
      {
        icon: "Brain",
        title: "AI-first thinking",
        body: "Design intelligent workflows — RAG, agents, and evaluation loops that actually work.",
      },
      {
        icon: "Sparkles",
        title: "Craft & taste",
        body: "Obsessed with motion, typography, and micro-interactions that feel alive.",
      },
    ],
    statistics: [
      { label: "Projects", value: "15+" },
      { label: "Experience", value: "2+ years" },
      { label: "Learning", value: "Forever" },
    ],
  },
  skills: [],
  timeline: [],
  projects: [],
  achievements: [],
  certifications: [],
  codingProfiles: [],
  contact: {
    email: "sudheehoney2806@gmail.com",
    linkedin: "https://www.linkedin.com/in/sudheeshna-matta-3a60a3296/",
    github: "https://github.com/sudheeshna86",
  },
};

/**
 * Fetch portfolio data from server
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetch(`${API_BASE}/portfolio`);
    if (response.ok) {
      const data = await response.json();
      PORTFOLIO_DATA = data;
      return data;
    } else {
      console.warn("Failed to fetch portfolio data, using defaults");
      return PORTFOLIO_DATA;
    }
  } catch (error) {
    console.warn("Error fetching portfolio data:", error);
    return PORTFOLIO_DATA;
  }
}

/**
 * Update portfolio data
 */
export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/portfolio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      PORTFOLIO_DATA = data;
    } else {
      throw new Error("Failed to update portfolio data");
    }
  } catch (error) {
    console.error("Error updating portfolio data:", error);
    throw error;
  }
}

/**
 * Upload image and get URL
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const { url } = await response.json();
      return url;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Check admin authentication
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/admin/check-auth`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Admin login
 */
export async function adminLogin(password: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    return response.ok;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

/**
 * Admin logout
 */
export async function adminLogout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/logout`, { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Helper functions to get specific data
export function getProjects(): Project[] {
  return PORTFOLIO_DATA.projects || [];
}

export function getProject(id: string): Project | undefined {
  return PORTFOLIO_DATA.projects.find((p) => p.id === id);
}

export function getSkills(): SkillCategory[] {
  return PORTFOLIO_DATA.skills || [];
}

export function getAchievements(): Achievement[] {
  return PORTFOLIO_DATA.achievements || [];
}

export function getCertifications(): Certification[] {
  return PORTFOLIO_DATA.certifications || [];
}
