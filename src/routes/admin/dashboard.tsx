import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Menu, X, Save, Plus, Trash2 } from "lucide-react";
import { PROFILE, SKILLS, TIMELINE, PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, CODING_PROFILES } from "@/components/portfolio/data";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<"profile" | "skills" | "experience" | "projects" | "achievements" | "certifications" | "contact">("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    navigate({ to: "/admin" });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Call API to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Changes saved successfully!");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "skills", label: "Skills", icon: "🛠️" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
    { id: "certifications", label: "Certifications", icon: "📜" },
    { id: "contact", label: "Contact", icon: "📧" },
  ] as const;

  return (
    <div className="flex h-screen bg-background overflow-x-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-card glass-strong transition-transform lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="font-display text-xl font-bold text-gradient">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage your portfolio</p>
          </div>

          <nav className="space-y-2 flex-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 bg-card/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden rounded-lg p-2 hover:bg-white/10"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <h2 className="font-display text-2xl font-bold">
            {sections.find((s) => s.id === activeSection)?.label}
          </h2>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-2 font-semibold text-primary-foreground hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={activeSection}>
            {activeSection === "profile" && <ProfileEditor />}
            {activeSection === "skills" && <SkillsEditor />}
            {activeSection === "experience" && <ExperienceEditor />}
            {activeSection === "projects" && <ProjectsEditor />}
            {activeSection === "achievements" && <AchievementsEditor />}
            {activeSection === "certifications" && <CertificationsEditor />}
            {activeSection === "contact" && <ContactEditor />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-display text-xl font-bold">Profile Information</h3>
      <div className="space-y-4 rounded-2xl glass p-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input type="text" defaultValue={PROFILE.name} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input type="text" defaultValue={PROFILE.title} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <textarea defaultValue={PROFILE.tagline} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 h-24 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" defaultValue={PROFILE.email} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input type="text" defaultValue={PROFILE.location} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
      </div>
    </div>
  );
}

function SkillsEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Skills</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Skill
        </button>
      </div>
      <div className="space-y-4">
        {SKILLS.map((category) => (
          <div key={category.category} className="rounded-2xl glass p-6">
            <h4 className="font-semibold mb-4">{category.category}</h4>
            <div className="space-y-2">
              {category.items.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <input type="text" defaultValue={skill.name} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
                  <input type="number" min="0" max="100" defaultValue={skill.level} className="w-16 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
                  <button className="p-2 hover:bg-white/10 rounded-lg text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Experience</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>
      <div className="space-y-4">
        {TIMELINE.map((entry) => (
          <div key={entry.year} className="rounded-2xl glass p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input type="text" defaultValue={entry.year} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input type="text" defaultValue={entry.title} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input type="text" defaultValue={entry.subtitle} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tag</label>
                <input type="text" defaultValue={entry.tag} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea defaultValue={entry.description} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm h-20 resize-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Projects</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>
      <div className="space-y-4">
        {PROJECTS.slice(0, 3).map((project) => (
          <div key={project.name} className="rounded-2xl glass p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" defaultValue={project.name} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <input type="text" defaultValue={project.tagline} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              </div>
              {project.image && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Project Image</label>
                  <div className="flex gap-4">
                    <img src={project.image} alt={project.name} className="h-24 w-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <input type="file" accept="image/*" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
                      <p className="text-xs text-muted-foreground mt-2">Upload new image to replace</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Achievements</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Achievement
        </button>
      </div>
      <div className="space-y-2">
        {ACHIEVEMENTS.map((achievement, index) => (
          <div key={index} className="flex gap-2">
            <input type="text" defaultValue={achievement} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
            <button className="p-2 hover:bg-white/10 rounded-lg text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold">Certifications</h3>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/30">
          <Plus className="h-4 w-4" /> Add Certification
        </button>
      </div>
      <div className="space-y-4">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.name} className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex-1">
              <input type="text" defaultValue={cert.name} placeholder="Certification name" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm mb-2" />
              <input type="text" defaultValue={cert.issuer} placeholder="Issuer" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-destructive">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactEditor() {
  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-display text-xl font-bold">Contact Information</h3>
      <div className="space-y-4 rounded-2xl glass p-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" defaultValue={PROFILE.email} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input type="url" defaultValue={PROFILE.github} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input type="url" defaultValue={PROFILE.linkedin} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LeetCode</label>
          <input type="url" defaultValue={PROFILE.leetcode} className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2" />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});
