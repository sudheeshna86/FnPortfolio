import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  usePortfolio,
  loginAdmin,
  logoutAdmin,
  isAdminAuthed,
  updateData,
  updateProfile,
  upsertProject,
  deleteProject,
  resetAll,
  exportJson,
  importJson,
} from "@/lib/portfolioStore";
import { ArrowLeft, LogOut, Save, Trash2, Plus, Download, Upload, RotateCcw, Shield, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/components/portfolio/data";
import { PROJECT_IMAGE_FALLBACK } from "@/components/portfolio/data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Portfolio CMS" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => (typeof window !== "undefined" ? isAdminAuthed() : false));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-xs font-semibold hover:bg-white/10">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-xs">
            <Shield className="h-3.5 w-3.5 text-primary" /> Admin
          </div>
          {authed && (
            <button
              onClick={() => { logoutAdmin(); setAuthed(false); }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-xs font-semibold hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          )}
        </div>
      </header>
      {authed ? <Dashboard /> : <Login onOk={() => setAuthed(true)} />}
    </div>
  );
}

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl glass-strong p-8">
        <h1 className="font-display text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to manage your portfolio content.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loginAdmin(pw)) onOk();
            else setErr("Incorrect password.");
          }}
          className="mt-6 space-y-4"
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary/60"
            autoFocus
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-primary to-accent px-4 py-3 text-sm font-semibold text-primary-foreground"
          >
            Enter dashboard
          </button>
          <p className="text-[11px] text-muted-foreground">
            Default password: <code className="rounded bg-white/5 px-1">admin123</code> — override via <code className="rounded bg-white/5 px-1">VITE_ADMIN_PASSWORD</code>.
          </p>
        </form>
      </div>
    </main>
  );
}

const TABS = ["Profile", "Projects", "Skills", "Timeline", "Achievements", "Certifications", "Coding Profiles", "Data"] as const;
type Tab = typeof TABS[number];

function Dashboard() {
  const [tab, setTab] = useState<Tab>("Projects");
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <h1 className="font-display text-3xl font-semibold md:text-4xl">Portfolio CMS</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Changes save immediately to this browser and reflect on the live portfolio. Use the Data tab to export/import your content as JSON so you can back it up or paste it into <code>data.ts</code>.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 rounded-full glass-strong p-1.5 w-fit max-w-full overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${tab === t ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "Profile" && <ProfileEditor />}
        {tab === "Projects" && <ProjectsEditor />}
        {tab === "Skills" && <SkillsEditor />}
        {tab === "Timeline" && <TimelineEditor />}
        {tab === "Achievements" && <AchievementsEditor />}
        {tab === "Certifications" && <CertificationsEditor />}
        {tab === "Coding Profiles" && <CodingProfilesEditor />}
        {tab === "Data" && <DataTools />}
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary/50";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl glass p-6">{children}</div>;
}

function Toast({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg">
      {text}
    </div>
  );
}

function ProfileEditor() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState(profile);
  const [toast, setToast] = useState<string | null>(null);
  const save = () => { updateProfile(form); setToast("Profile saved"); setTimeout(() => setToast(null), 1500); };
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Short name"><input className={inputCls} value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} /></Field>
        <Field label="Title"><input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Location"><input className={inputCls} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Resume URL"><input className={inputCls} value={form.resumeUrl ?? ""} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} /></Field>
        <Field label="GitHub"><input className={inputCls} value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} /></Field>
        <Field label="LinkedIn"><input className={inputCls} value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></Field>
        <Field label="LeetCode"><input className={inputCls} value={form.leetcode} onChange={(e) => setForm({ ...form, leetcode: e.target.value })} /></Field>
        <Field label="CodeChef"><input className={inputCls} value={form.codechef} onChange={(e) => setForm({ ...form, codechef: e.target.value })} /></Field>
        <div className="md:col-span-2"><Field label="Tagline"><textarea rows={2} className={inputCls} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></Field></div>
      </div>
      <div className="mt-5 flex justify-end">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-semibold text-primary-foreground">
          <Save className="h-3.5 w-3.5" /> Save profile
        </button>
      </div>
      <Toast text={toast} />
    </Card>
  );
}

function emptyProject(): Project {
  return {
    id: `p-${Date.now()}`,
    name: "New Project",
    tagline: "",
    stack: [],
    problem: "",
    solution: "",
    features: [],
    href: "",
    demo: "",
    major: false,
    image: "",
    overview: "",
    architecture: "",
    challenges: "",
    learned: "",
    future: "",
  };
}

function ProjectsEditor() {
  const { projects } = usePortfolio();
  const [editing, setEditing] = useState<Project | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Projects ({projects.length})</h3>
          <button
            onClick={() => setEditing(emptyProject())}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <ul className="mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setEditing(p)}
                className={`w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition-colors hover:bg-white/[0.06] ${editing?.id === p.id ? "ring-1 ring-primary/50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <img src={p.image || PROJECT_IMAGE_FALLBACK} alt="" className="h-10 w-14 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{p.tagline}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${p.major ? "bg-primary/20 text-primary" : "bg-white/5"}`}>{p.major ? "Major" : "Mini"}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        {editing ? (
          <ProjectForm
            key={editing.id}
            project={editing}
            onSave={(p) => { upsertProject(p); setEditing(p); setToast("Project saved"); setTimeout(() => setToast(null), 1500); }}
            onDelete={(id) => { if (confirm("Delete this project?")) { deleteProject(id); setEditing(null); setToast("Deleted"); setTimeout(() => setToast(null), 1500); } }}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Select a project to edit, or click <b>New</b>.</p>
        )}
      </Card>
      <Toast text={toast} />
    </div>
  );
}

function ProjectForm({ project, onSave, onDelete }: { project: Project; onSave: (p: Project) => void; onDelete: (id: string) => void }) {
  const [f, setF] = useState<Project>(project);
  const upd = <K extends keyof Project>(k: K, v: Project[K]) => setF({ ...f, [k]: v });
  const onImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => upd("image", String(reader.result));
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold truncate">{f.name || "Untitled"}</h3>
        <label className="inline-flex items-center gap-2 text-xs">
          <input type="checkbox" checked={f.major} onChange={(e) => upd("major", e.target.checked)} /> Major project
        </label>
      </div>

      <div>
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Project image</span>
        <div className="flex flex-wrap items-center gap-3">
          <img src={f.image || PROJECT_IMAGE_FALLBACK} alt="" className="h-24 w-40 rounded-xl object-cover ring-1 ring-white/10" />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full glass px-3 py-2 text-xs font-semibold hover:bg-white/10">
            <ImageIcon className="h-3.5 w-3.5" /> Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) onImage(file); }} />
          </label>
          {f.image && (
            <button onClick={() => upd("image", "")} className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-2 text-xs hover:bg-white/10">
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          )}
          <input placeholder="…or paste image URL" className={inputCls + " flex-1 min-w-[220px]"} value={f.image ?? ""} onChange={(e) => upd("image", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name"><input className={inputCls} value={f.name} onChange={(e) => upd("name", e.target.value)} /></Field>
        <Field label="Tagline"><input className={inputCls} value={f.tagline} onChange={(e) => upd("tagline", e.target.value)} /></Field>
        <Field label="GitHub URL"><input className={inputCls} value={f.href} onChange={(e) => upd("href", e.target.value)} /></Field>
        <Field label="Live demo URL"><input className={inputCls} value={f.demo ?? ""} onChange={(e) => upd("demo", e.target.value)} /></Field>
        <Field label="Stack (comma separated)"><input className={inputCls} value={f.stack.join(", ")} onChange={(e) => upd("stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} /></Field>
        <Field label="Features (one per line)">
          <textarea rows={3} className={inputCls} value={f.features.join("\n")} onChange={(e) => upd("features", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
        </Field>
      </div>

      <Field label="Problem"><textarea rows={2} className={inputCls} value={f.problem} onChange={(e) => upd("problem", e.target.value)} /></Field>
      <Field label="Solution"><textarea rows={2} className={inputCls} value={f.solution} onChange={(e) => upd("solution", e.target.value)} /></Field>
      <Field label="Overview"><textarea rows={2} className={inputCls} value={f.overview ?? ""} onChange={(e) => upd("overview", e.target.value)} /></Field>
      <Field label="Architecture"><textarea rows={2} className={inputCls} value={f.architecture ?? ""} onChange={(e) => upd("architecture", e.target.value)} /></Field>
      <Field label="Challenges"><textarea rows={2} className={inputCls} value={f.challenges ?? ""} onChange={(e) => upd("challenges", e.target.value)} /></Field>
      <Field label="What I learned"><textarea rows={2} className={inputCls} value={f.learned ?? ""} onChange={(e) => upd("learned", e.target.value)} /></Field>
      <Field label="Future improvements"><textarea rows={2} className={inputCls} value={f.future ?? ""} onChange={(e) => upd("future", e.target.value)} /></Field>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button onClick={() => onDelete(f.id)} className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
        <button onClick={() => onSave(f)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-xs font-semibold text-primary-foreground">
          <Save className="h-3.5 w-3.5" /> Save project
        </button>
      </div>
    </div>
  );
}

function JsonListEditor<T>({ title, value, onSave, hint }: { title: string; value: T; onSave: (v: T) => void; hint?: string }) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [err, setErr] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <button
          onClick={() => {
            try { const parsed = JSON.parse(text); onSave(parsed as T); setErr(""); setToast("Saved"); setTimeout(() => setToast(null), 1500); }
            catch (e: any) { setErr(e.message); }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          <Save className="h-3.5 w-3.5" /> Save
        </button>
      </div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      <textarea rows={18} spellCheck={false} value={text} onChange={(e) => setText(e.target.value)}
        className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs outline-none focus:border-primary/40" />
      {err && <p className="mt-2 text-xs text-destructive">JSON error: {err}</p>}
      <Toast text={toast} />
    </Card>
  );
}

function SkillsEditor() {
  const { skills } = usePortfolio();
  return <JsonListEditor title="Skills" value={skills} onSave={(v) => updateData({ skills: v })} hint="Array of { category, items: [{ name, level (0–100) }] }" />;
}
function TimelineEditor() {
  const { timeline } = usePortfolio();
  return <JsonListEditor title="Timeline / Journey" value={timeline} onSave={(v) => updateData({ timeline: v })} hint="Array of { year, title, subtitle, description, tag }" />;
}
function AchievementsEditor() {
  const { achievements } = usePortfolio();
  return <JsonListEditor title="Achievements" value={achievements} onSave={(v) => updateData({ achievements: v })} hint="Array of strings" />;
}
function CertificationsEditor() {
  const { certifications } = usePortfolio();
  return <JsonListEditor title="Certifications" value={certifications} onSave={(v) => updateData({ certifications: v })} hint="Array of { name, issuer }" />;
}
function CodingProfilesEditor() {
  const { codingProfiles } = usePortfolio();
  return <JsonListEditor title="Coding Profiles" value={codingProfiles} onSave={(v) => updateData({ codingProfiles: v })} hint="Array of { name, value, label, href }" />;
}

function DataTools() {
  const data = usePortfolio();
  const [toast, setToast] = useState<string | null>(null);
  const json = useMemo(() => exportJson(), [data]);
  const download = () => {
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio-data.json";
    a.click();
    setToast("Downloaded"); setTimeout(() => setToast(null), 1500);
  };
  const onImport = (file: File) => {
    const r = new FileReader();
    r.onload = () => {
      try { importJson(String(r.result)); setToast("Imported"); }
      catch (e: any) { setToast("Import failed: " + e.message); }
      setTimeout(() => setToast(null), 2000);
    };
    r.readAsText(file);
  };
  return (
    <Card>
      <h3 className="font-display text-lg font-semibold">Data tools</h3>
      <p className="mt-2 text-sm text-muted-foreground">Content is stored per browser. Export to JSON to back up or move it to another device.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={download} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold hover:bg-white/10">
          <Download className="h-3.5 w-3.5" /> Export JSON
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold hover:bg-white/10">
          <Upload className="h-3.5 w-3.5" /> Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); }} />
        </label>
        <button
          onClick={() => { if (confirm("Reset all content to defaults? This cannot be undone.")) { resetAll(); setToast("Reset to defaults"); setTimeout(() => setToast(null), 1500); } }}
          className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
        </button>
      </div>
      <textarea rows={16} readOnly value={json} className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs outline-none" />
      <Toast text={toast} />
    </Card>
  );
}
