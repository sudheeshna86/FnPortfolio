/**
 * Admin Authentication API
 * Handles login, logout, and session management
 */
import { createFileRoute } from "@tanstack/react-router";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Change this!
const SESSION_KEY = "admin-session";

export interface AdminSession {
  authenticated: boolean;
  timestamp?: number;
}

// Simple in-memory session store (in production, use proper sessions)
const sessions = new Map<string, AdminSession>();

export const Route = createFileRoute("/api/admin/auth/api")({
  beforeLoad: async ({ location }) => {
    const method = location.pathname.split("/").pop();

    if (method === "login") {
      return { authenticated: false };
    }

    return { authenticated: false };
  },
});
