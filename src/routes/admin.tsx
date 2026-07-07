import { createFileRoute, useMatch, useNavigate, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

// Debug: Log which password is active
console.log("Active admin password is set to:", ADMIN_PASSWORD);

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (password === ADMIN_PASSWORD) {
        // Store auth in sessionStorage (not localStorage for security)
        sessionStorage.setItem("admin-auth", JSON.stringify({ authenticated: true, timestamp: Date.now() }));
        navigate({ to: "/admin/dashboard" });
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl glass-strong border border-white/10 p-8">
          <div className="mb-8 flex justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Lock className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-center font-display text-3xl font-bold">Admin Access</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Enter password to manage portfolio</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-primary to-accent py-3 font-semibold text-primary-foreground hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            For security, this session will expire after 30 minutes of inactivity
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  component: () => {
    const exactAdminMatch = useMatch({ from: "/admin", strict: true, shouldThrow: false });

    return (
      <>
        <Outlet />
        {exactAdminMatch && <AdminLogin />}
      </>
    );
  },
});
