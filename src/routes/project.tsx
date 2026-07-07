import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/components/portfolio/data";

function ProjectDetails() {
  const { projectId } = Route.useSearch();
  const project = PROJECTS.find((p) => p.name === decodeURIComponent(projectId));

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center glass rounded-3xl p-10">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">The project you're looking for doesn't exist.</p>
          <a
            href="/#projects"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Back button */}
        <a
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Project image - Large */}
          {project.image && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-white/10">
                <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
              </div>
            </motion.div>
          )}

          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {project.major ? "Major Project" : "Mini Project"}
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight">{project.name}</h1>
            <p className="text-lg text-muted-foreground">{project.tagline}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="rounded-2xl glass p-6">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Tech Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content sections */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-6">
            {project.overview && (
              <div className="rounded-2xl glass p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Project Overview</h3>
                <p className="mt-3 leading-relaxed">{project.overview}</p>
              </div>
            )}

            <div className="rounded-2xl glass p-6">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Problem Statement</h3>
              <p className="mt-3 leading-relaxed">{project.problem}</p>
            </div>

            <div className="rounded-2xl glass p-6">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Solution</h3>
              <p className="mt-3 leading-relaxed">{project.solution}</p>
            </div>

            {project.architecture && (
              <div className="rounded-2xl glass p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Architecture</h3>
                <p className="mt-3 leading-relaxed">{project.architecture}</p>
              </div>
            )}

            <div className="rounded-2xl glass p-6">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Features</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {project.challenges && (
              <div className="rounded-2xl glass p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Challenges</h3>
                <p className="mt-3 leading-relaxed">{project.challenges}</p>
              </div>
            )}

            {project.learned && (
              <div className="rounded-2xl glass p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">What I Learned</h3>
                <p className="mt-3 leading-relaxed">{project.learned}</p>
              </div>
            )}

            {project.future && (
              <div className="rounded-2xl glass p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Future Improvements</h3>
                <p className="mt-3 leading-relaxed">{project.future}</p>
              </div>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 pt-4">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub Repository
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-lg transition-all"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/project")({
  component: ProjectDetails,
  validateSearch: (search): { projectId: string } => ({
    projectId: (search as Record<string, unknown>).projectId as string,
  }),
});
