import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, ExternalLink, ArrowRight, ArrowUpRight,
  Code2, Sparkles, Cpu, Database, Cloud, Braces, Brain, Send, FileText,
  Award, GraduationCap, Trophy, Star, GitFork, X, MessageCircle,
} from "lucide-react";
import portraitImg from "@/assets/portrait.jpg";
import {
  PROFILE, SKILLS, TIMELINE, PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, CODING_PROFILES,
} from "./data";

/* ---------- Cursor Glow ---------- */
function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 30 });
  const sy = useSpring(y, { stiffness: 200, damping: 30 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        x: sx, y: sy,
        background: "radial-gradient(circle, oklch(0.72 0.28 305 / 0.18), transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

/* ---------- Particle field ---------- */
function Particles() {
  const dots = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-white/60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 5 + (i % 5),
            repeat: Infinity,
            delay: (i % 7) * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Aurora Backdrop ---------- */
function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-20 top-10 h-[520px] w-[520px] rounded-full bg-[oklch(0.55_0.25_305/0.35)] blur-[120px] animate-aurora" />
      <div className="absolute right-0 top-40 h-[480px] w-[480px] rounded-full bg-[oklch(0.55_0.2_240/0.35)] blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.55_0.18_200/0.28)] blur-[120px] animate-aurora" style={{ animationDelay: "-3s" }} />
    </div>
  );
}

/* ---------- Nav ---------- */
const NAV_ITEMS = [
  ["about", "About"], ["journey", "Journey"], ["skills", "Skills"],
  ["projects", "Projects"], ["profiles", "Profiles"], ["contact", "Contact"],
];
function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ["oklch(1 0 0 / 0)", "oklch(0.14 0.02 275 / 0.7)"]);
  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b border-white/5"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
            S
          </div>
          <span className="font-display text-sm font-semibold tracking-wide">
            SUDHEESHNA<span className="text-primary">.</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1 rounded-full glass px-2 py-1.5">
          {NAV_ITEMS.map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact"
          className="group hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105">
          Let's talk <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- Section wrapper ---------- */
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 100, damping: 20 });
  const smy = useSpring(my, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} id="top" className="relative min-h-screen overflow-hidden">
      <Aurora />
      <Particles />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-16 md:pt-40 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — text */}
        <div className="lg:col-span-7">
          <IntroHologram />
          <Eyebrow>Full Stack • AI/ML • India</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Hi, I'm <span className="text-gradient">Sudheeshna</span>.
            <span className="mt-2 block text-3xl font-medium text-muted-foreground md:text-4xl lg:text-5xl">
              I design & build cinematic software.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A B.Tech Computer Science student from India with a strong focus on DSA,
            competitive programming, and building full-stack MERN products with AI-driven ideas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" primary>
              View my work <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact">
              Get in touch <Send className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={PROFILE.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
              <Code2 className="h-4 w-4" /> LeetCode
            </a>
          </motion.div>
        </div>

        {/* RIGHT — portrait */}
        <motion.div
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            mx.set((e.clientX - r.left - r.width / 2) / 20);
            my.set((e.clientY - r.top - r.height / 2) / 20);
          }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative mx-auto w-full max-w-xl lg:col-span-5 lg:scale-[1.15] lg:origin-center"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-transparent blur-3xl" />
          <motion.div
            style={{ rotateY: smx, rotateX: smy }}
            className="glass-strong relative overflow-hidden rounded-[2rem] p-2 [transform-style:preserve-3d]"
          >
            <img
              src={portraitImg}
              alt={`${PROFILE.name} — portrait`}
              width={896} height={1152}
              className="w-full rounded-[1.5rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[1.5rem] ring-1 ring-white/10" />
          </motion.div>
          <FloatingChip className="-left-6 top-10" delay={0}>
            <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Engineer
          </FloatingChip>
          <FloatingChip className="-right-4 top-1/3" delay={0.4}>
            <Code2 className="h-3.5 w-3.5 text-accent" /> MERN Stack
          </FloatingChip>
          <FloatingChip className="-left-4 bottom-10" delay={0.8}>
            <Cpu className="h-3.5 w-3.5 text-[oklch(0.78_0.18_180)]" /> DSA · 500+
          </FloatingChip>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="relative z-10 mt-6 border-y border-white/5 py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16">
              <span>React</span><span>·</span><span>Node.js</span><span>·</span><span>TypeScript</span><span>·</span>
              <span>MongoDB</span><span>·</span><span>Next.js</span><span>·</span><span>Python</span><span>·</span>
              <span>TensorFlow</span><span>·</span><span>AWS</span><span>·</span><span>Docker</span><span>·</span>
              <span>OpenAI</span><span>·</span><span>Framer Motion</span><span>·</span><span>Tailwind</span><span>·</span>
              <span>PostgreSQL</span><span>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingChip({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay, duration: 0.6 }}
      className={`absolute flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-medium animate-float-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ href, primary, children }: { href: string; primary?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });
  return (
    <motion.a
      ref={ref} href={href}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow
        ${primary
          ? "bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.72_0.28_305/0.6)] hover:shadow-[0_20px_60px_-15px_oklch(0.72_0.28_305/0.8)]"
          : "glass hover:bg-white/10"}`}
    >
      {children}
    </motion.a>
  );
}

/* ---------- Intro Hologram ---------- */
function IntroHologram() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const lines = [
    "Hi, I'm Sudheeshna.",
    "Welcome to my digital universe.",
    "Full Stack Developer & AI enthusiast — building scalable, intelligent products.",
    "Let me show you my journey.",
  ];
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setStep((s) => (s + 1) % lines.length), 3200);
    return () => clearInterval(t);
  }, [open, lines.length]);
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex items-center gap-3 rounded-full glass-strong px-4 py-2 pr-2"
    >
      <div className="relative">
        <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary/50">
          <img src={portraitImg} alt="" className="h-full w-full object-cover" />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.18_180)] ring-2 ring-background animate-pulse-glow" />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium max-w-[280px] md:max-w-none"
        >
          {lines[step]}
        </motion.p>
      </AnimatePresence>
      <button onClick={() => setOpen(false)} className="ml-1 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground">
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about">
      <Reveal>
        <Eyebrow>About</Eyebrow>
        <h2 className="max-w-4xl font-display text-4xl font-semibold leading-tight md:text-6xl">
          Building <span className="text-gradient">AI + Full Stack products</span> with a strong foundation in problem solving and product thinking.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Code2, title: "Engineering", body: "Ship reliable systems with clean architecture across frontend, backend, and infra." },
          { icon: Brain, title: "AI-first thinking", body: "Design intelligent workflows — RAG, agents, and evaluation loops that actually work." },
          { icon: Sparkles, title: "Craft & taste", body: "Obsessed with motion, typography, and micro-interactions that feel alive." },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-all hover:-translate-y-1 hover:glow-ring">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <c.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-6 font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Timeline ---------- */
function Timeline() {
  return (
    <Section id="journey">
      <Reveal>
        <Eyebrow>Journey</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Milestones so far</h2>
      </Reveal>
      <div className="relative mt-16">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent md:left-1/2" />
        <div className="space-y-12">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className={`relative flex flex-col gap-6 md:flex-row ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2 md:px-10">
                  <div className="rounded-3xl glass p-6 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-primary">{t.tag}</span>
                      <span>{t.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed">{t.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-background ring-1 ring-primary/50 md:left-1/2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const icons = { Frontend: Code2, Backend: Braces, Database: Database, "AI / ML": Brain, "Cloud & DevOps": Cloud, "Core CS": Cpu } as const;
  return (
    <Section id="skills">
      <Reveal>
        <Eyebrow>Skills & Stack</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">
          Tools I <span className="text-gradient">think in</span>.
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, gi) => {
          const Icon = (icons as Record<string, typeof Code2>)[group.category] ?? Code2;
          return (
            <Reveal key={group.category} delay={gi * 0.06}>
              <div className="h-full rounded-3xl glass p-6 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{group.category}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <motion.span
                      key={s.name}
                      whileHover={{ scale: 1.05 }}
                      className="group relative overflow-hidden rounded-full glass px-3 py-1.5 text-xs font-medium"
                    >
                      <span className="relative z-10">{s.name}</span>
                      <span
                        className="absolute inset-y-0 left-0 -z-0 bg-gradient-to-r from-primary/30 to-accent/30"
                        style={{ width: `${s.level}%` }}
                      />
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <Eyebrow>Experience</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Internship & work</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl glass-strong p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">Full Stack Development Intern</h3>
                <p className="text-sm text-muted-foreground">Sampath Software Solutions · 2025</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>• Built production-ready features using React.js, Node.js, Express.js, and MongoDB.</li>
              <li>• Developed secure REST APIs with JWT authentication and optimized MongoDB queries.</li>
              <li>• Delivered end-to-end features across UI, API, database, and deployment in Agile workflows.</li>
            </ul>
          </div>
          <div className="rounded-3xl glass-strong p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">MERN Stack Developer Intern</h3>
                <p className="text-sm text-muted-foreground">ModelSuite AI · Remote</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>• Built and maintained production-ready MERN features while debugging React and backend issues.</li>
              <li>• Improved UI consistency, responsiveness, and API performance across the app.</li>
              <li>• Collaborated through Git/GitHub feature branches, pull requests, and code reviews.</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Projects (tabbed) ---------- */
import type { Project } from "./data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function Projects() {
  const [tab, setTab] = useState<"major" | "mini">("major");
  const [active, setActive] = useState<Project | null>(null);
  const major = PROJECTS.filter((p) => p.major);
  const mini = PROJECTS.filter((p) => !p.major);

  return (
    <Section id="projects">
      <Reveal>
        <Eyebrow>Featured Work</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            <span className="text-gradient">Projects</span>
          </h2>
          <a href={PROFILE.github} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            All repos on GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.05}>
        <div className="mt-10 inline-flex rounded-full glass-strong p-1.5">
          {(
            [
              { id: "major", label: `Major Projects`, count: major.length },
              { id: "mini", label: `Mini Projects`, count: mini.length },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_10px_30px_-10px_oklch(0.72_0.28_305/0.6)]"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span className={`relative z-10 inline-flex items-center gap-2 ${tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${tab === t.id ? "bg-white/20" : "bg-white/5"}`}>{t.count}</span>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {tab === "major" ? (
          <motion.div
            key="major"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch"
          >
            {major.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <MajorProjectCard project={p} onExpand={() => setActive(p)} />
              </Reveal>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="mini"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mini.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.04}>
                <MiniProjectCard project={p} onExpand={() => setActive(p)} />
              </Reveal>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

function TechPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-gradient-to-br from-primary/15 to-accent/10 px-2.5 py-1 text-[11px] font-medium">
      {children}
    </span>
  );
}

function ProjectVisual({ name }: { name: string }) {
  // Elegant gradient "screenshot" placeholder — themed, no external asset needed
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <div className="relative h-full min-h-[130px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/30 via-accent/20 to-[oklch(0.35_0.15_240/0.4)]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,oklch(1_0_0/0.25),transparent_50%),radial-gradient(circle_at_80%_60%,oklch(0.78_0.18_180/0.3),transparent_55%)]" />
      <div className="absolute inset-0 [background-image:linear-gradient(oklch(1_0_0/0.06)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="font-display text-5xl font-bold tracking-tight text-white/90 drop-shadow-[0_4px_30px_oklch(0.72_0.28_305/0.6)]">
          {initials}
        </span>
      </div>
    </div>
  );
}

function MajorProjectCard({ project, onExpand }: { project: Project; onExpand: () => void }) {
  return (
    <div className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-3xl glass-strong p-4 transition-all hover:-translate-y-1 hover:glow-ring md:p-4">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative grid gap-4 md:grid-cols-5">
        {/* Left content */}
        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Major Project</p>
          <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight md:text-[1.45rem]">{project.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>

          <div className="mt-3 rounded-2xl bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Problem solved</p>
            <p className="mt-1 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => <TechPill key={s}>{s}</TechPill>)}
          </div>
        </div>

        {/* Right visual + buttons */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <ProjectVisual name={project.name} />
          <div className="mt-auto flex flex-wrap gap-2">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
            <a href={project.href} target="_blank" rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full glass px-3 py-2 text-xs font-semibold hover:bg-white/10">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <button onClick={onExpand}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold hover:bg-white/10">
              Expand Details <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniProjectCard({ project, onExpand }: { project: Project; onExpand: () => void }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-display text-lg font-semibold leading-tight">{project.name}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{project.tagline}</p>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 ring-1 ring-white/10">
          <Code2 className="h-3.5 w-3.5 text-primary" />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]">{s}</span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        <a href={project.href} target="_blank" rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full glass px-2.5 py-1.5 text-[11px] font-semibold hover:bg-white/10">
          <Github className="h-3 w-3" /> GitHub
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground">
            <ExternalLink className="h-3 w-3" /> Demo
          </a>
        )}
        <button onClick={onExpand}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold hover:bg-white/10">
          Expand
        </button>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-white/10 bg-[oklch(0.14_0.02_275/0.95)] p-0 sm:max-w-3xl backdrop-blur-xl">
        {project && (
          <div className="relative">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

            <div className="relative p-6 md:p-8">
              <ProjectVisual name={project.name} />
              <DialogHeader className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.major ? "Major Project" : "Mini Project"}
                </div>
                <DialogTitle className="font-display text-3xl font-semibold">{project.name}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">{project.tagline}</DialogDescription>
              </DialogHeader>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((s) => <TechPill key={s}>{s}</TechPill>)}
              </div>

              <div className="mt-6 space-y-5 text-sm leading-relaxed">
                {project.overview && (
                  <ModalBlock title="Project Overview">{project.overview}</ModalBlock>
                )}
                <ModalBlock title="Problem Statement">{project.problem}</ModalBlock>
                <ModalBlock title="Solution">{project.solution}</ModalBlock>
                {project.architecture && <ModalBlock title="Architecture">{project.architecture}</ModalBlock>}
                <ModalBlock title="Features">
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </ModalBlock>
                {project.challenges && <ModalBlock title="Challenges">{project.challenges}</ModalBlock>}
                {project.learned && <ModalBlock title="What I Learned">{project.learned}</ModalBlock>}
                {project.future && <ModalBlock title="Future Improvements">{project.future}</ModalBlock>}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <a href={project.href} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold hover:bg-white/10">
                  <Github className="h-4 w-4" /> GitHub Repository
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ModalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <div className="mt-1.5 text-sm text-foreground/90">{children}</div>
    </div>
  );
}

/* ---------- Achievements / Certs ---------- */
function AchievementsCerts() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Achievements</Eyebrow>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Highlights</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-2xl glass p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/20">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div id="certifications">
          <Reveal>
            <Eyebrow>Certifications</Eyebrow>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Continuous learning</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl glass p-4">
                  <Award className="h-5 w-5 text-accent" />
                  <p className="mt-3 text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Coding profiles ---------- */
function CodingProfiles() {
  return (
    <Section id="profiles">
      <Reveal>
        <Eyebrow>Coding Profiles</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Where I <span className="text-gradient">grind</span></h2>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-4">
        {CODING_PROFILES.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <a href={p.href} target="_blank" rel="noreferrer"
              className="group block overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:glow-ring">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.name}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="mt-6 font-display text-4xl font-semibold text-gradient">{p.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.label}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Resume ---------- */
function Resume() {
  return (
    <>
      <Section id="resume">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <Eyebrow>Resume</Eyebrow>
              <h2 className="font-display text-3xl font-semibold md:text-5xl">
                Everything in <span className="text-gradient">one page</span>.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                A one-page snapshot of my education, internship, projects, and technical skills — ready to review.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1ecvUz_gZSo7a2JbrsmeEz8ox1msGq3cl/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <FileText className="h-4 w-4" /> View resume
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-6xl">
          Let's build something
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          I'm open to internships, full-time roles, freelance and collaborations.
        </p>
      </Reveal>
      <div className="mt-14">
        <Reveal>
          <div className="rounded-[3rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-1 shadow-[0_40px_100px_-60px_rgba(255,255,255,0.25)] backdrop-blur-xl">
            <div className="grid gap-6 rounded-[2.75rem] bg-[rgba(255,255,255,0.02)] p-6 lg:grid-cols-[minmax(18rem,1fr)_minmax(28rem,1.4fr)]">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="grid gap-4 text-sm">
                  <ContactItem label="Email" href={`mailto:${PROFILE.email}`} icon={<Mail className="h-4 w-4 text-primary" />}>
                    {PROFILE.email}
                  </ContactItem>
                  <ContactItem label="LinkedIn" href={PROFILE.linkedin} icon={<Linkedin className="h-4 w-4 text-accent" />}>
                    /in/sudheeshna-matta-3a60a3296/
                  </ContactItem>
                  <ContactItem label="GitHub" href={PROFILE.github} icon={<Github className="h-4 w-4" />}>
                    @sudheeshna86
                  </ContactItem>
                  <ContactItem label="Based" icon={<MapPin className="h-4 w-4" />}>
                    Visakhapatnam, India
                  </ContactItem>
                </div>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you soon."); }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name"><input required className="input" placeholder="Your name" /></Field>
                  <Field label="Email"><input required type="email" className="input" placeholder="jane@company.com" /></Field>
                </div>
                <Field label="Message" className="mt-4">
                  <textarea required rows={5} className="input resize-none" placeholder="Tell me about the role, product or idea..." />
                </Field>
                <button
                  type="submit"
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="mt-16 text-center text-xs text-muted-foreground">
        Designed &amp; Developed by <span className="text-gradient font-semibold">Matta Sudheeshna</span> · © {new Date().getFullYear()}
      </p>
      <style>{`.input{width:100%;background:oklch(1 0 0 /0.04);border:1px solid oklch(1 0 0 /0.08);border-radius:14px;padding:12px 14px;font-size:14px;color:inherit;outline:none;transition:border-color .2s, background .2s}.input:focus{border-color:oklch(0.72 0.28 305 /0.6);background:oklch(1 0 0 /0.06)}`}</style>
    </Section>
  );
}

function ContactItem({ label, href, icon, children }: { label: string; href?: string; icon: React.ReactNode; children: React.ReactNode }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-primary shadow-[0_10px_30px_-20px_rgba(255,255,255,0.35)]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
        <p className="mt-2 font-medium text-sm text-foreground/90">{children}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="group block rounded-[1.75rem] border border-white/10 bg-white/5 p-4 transition duration-200 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_20px_60px_-40px_rgba(255,255,255,0.4)]">
      {content}
    </a>
  ) : (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-[0_12px_30px_-24px_rgba(255,255,255,0.4)]">
      {content}
    </div>
  );
}
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}


/* ---------- Root ---------- */
export function Portfolio() {
  return (
    <div className="relative">
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Experience />
        <Projects />
        <AchievementsCerts />
        <CodingProfiles />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}
