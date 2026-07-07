import { useSyncExternalStore } from "react";
import { DEFAULT_DATA, type PortfolioData, type Project } from "@/components/portfolio/data";

const KEY = "portfolio_data_v1";
const AUTH_KEY = "portfolio_admin_auth_v1";

type Listener = () => void;
const listeners = new Set<Listener>();

function load(): PortfolioData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    return {
      profile: { ...DEFAULT_DATA.profile, ...(parsed.profile ?? {}) },
      skills: parsed.skills ?? DEFAULT_DATA.skills,
      timeline: parsed.timeline ?? DEFAULT_DATA.timeline,
      projects: parsed.projects ?? DEFAULT_DATA.projects,
      achievements: parsed.achievements ?? DEFAULT_DATA.achievements,
      certifications: parsed.certifications ?? DEFAULT_DATA.certifications,
      codingProfiles: parsed.codingProfiles ?? DEFAULT_DATA.codingProfiles,
    };
  } catch {
    return DEFAULT_DATA;
  }
}

let state: PortfolioData = load();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to persist portfolio data", e);
  }
  listeners.forEach((l) => l());
}

export function getPortfolio(): PortfolioData {
  return state;
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function usePortfolio(): PortfolioData {
  return useSyncExternalStore(subscribe, getPortfolio, () => DEFAULT_DATA);
}

export function updateData(patch: Partial<PortfolioData>) {
  state = { ...state, ...patch };
  persist();
}

export function updateProfile(patch: Partial<PortfolioData["profile"]>) {
  state = { ...state, profile: { ...state.profile, ...patch } };
  persist();
}

export function upsertProject(p: Project) {
  const exists = state.projects.some((x) => x.id === p.id);
  const projects = exists
    ? state.projects.map((x) => (x.id === p.id ? p : x))
    : [...state.projects, p];
  state = { ...state, projects };
  persist();
}

export function deleteProject(id: string) {
  state = { ...state, projects: state.projects.filter((p) => p.id !== id) };
  persist();
}

export function resetAll() {
  localStorage.removeItem(KEY);
  state = load();
  listeners.forEach((l) => l());
}

export function exportJson(): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(json: string) {
  const parsed = JSON.parse(json) as PortfolioData;
  state = parsed;
  persist();
}

const DEFAULT_PW = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || "admin123";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function loginAdmin(pw: string): boolean {
  if (pw === DEFAULT_PW) {
    sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
}
