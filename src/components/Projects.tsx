"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink, Plus, X } from "lucide-react";
import { Reveal, Section, SpotlightCard } from "./ui";
import { projects, type Project, type ProjectCategory } from "@/data/content";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "Deep learning",
  "Machine learning",
  "Web",
  "Mobile",
];

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-end bg-night/80 backdrop-blur-md sm:place-items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="surface max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-b-none p-6 shadow-glow sm:rounded-b-[1.25rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-glow">{project.context}</p>
            <h3 id="project-dialog-title" className="mt-1 text-3xl font-semibold">
              {project.title}
            </h3>
            <p className="mt-1 text-haze">{project.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-haze transition-colors hover:border-glow/60 hover:text-moon"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-6 text-lg text-moon">{project.summary}</p>
        <ul className="mt-5 space-y-3">
          {project.points.map((p) => (
            <li key={p} className="flex gap-3 text-haze">
              <Check size={18} className="mt-1 shrink-0 text-glow" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <h4 className="mt-7 text-sm font-medium text-moon">Built with</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-moon px-5 py-2.5 font-medium text-night"
          >
            <ExternalLink size={18} />
            Open project
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <Section
      id="projects"
      title="Projects"
      lead="Things I've built outside of work: in college, at IIT Madras and at a hackathon. Select a project for the details."
    >
      <Reveal>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const selected = f === filter;
            const count =
              f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selected ? "text-night" : "border border-line text-haze hover:text-moon"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-moon shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f} <span className="opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="group flex h-full flex-col p-6">
                <p className="text-sm text-glow">{p.context}</p>
                <h3 className="mt-2 text-2xl font-semibold">
                  {/* The button stretches over the whole card so the card is one click target. */}
                  <button
                    type="button"
                    onClick={() => setOpen(p)}
                    className="text-left after:absolute after:inset-0 after:rounded-[1.25rem]"
                  >
                    {p.title}
                  </button>
                </h3>
                <p className="mt-1 text-sm text-haze">{p.subtitle}</p>
                <p className="mt-4 flex-1 text-haze">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                  {p.stack.length > 4 && <li className="chip">+{p.stack.length - 4}</li>}
                </ul>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-moon transition-colors group-hover:text-glow"
                >
                  <Plus size={16} className="transition-transform group-hover:rotate-90" />
                  View details
                </span>
              </SpotlightCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open && <ProjectDialog project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </Section>
  );
}
