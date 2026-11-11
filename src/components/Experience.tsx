"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, GraduationCap, MapPin } from "lucide-react";
import { Reveal, Section, SpotlightCard } from "./ui";
import { education, experience, type Job } from "@/data/content";

function JobCard({ job }: { job: Job }) {
  const [current, setCurrent] = useState(job.streams[0].id);
  const stream = job.streams.find((s) => s.id === current) ?? job.streams[0];
  const uid = useId();

  return (
    <SpotlightCard className="p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-2xl font-semibold">{job.role}</h3>
        <p className="font-mono text-sm text-glow">{job.period}</p>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 text-haze">
        <span className="text-moon">{job.company}</span>
        <span className="inline-flex items-center gap-1 text-sm">
          <MapPin size={14} /> {job.location}
        </span>
      </p>
      <p className="mt-4 max-w-3xl text-haze">{job.intro}</p>

      <div role="tablist" aria-label={`${job.company} projects`} className="mt-6 flex flex-wrap gap-2">
        {job.streams.map((s) => {
          const selected = s.id === current;
          return (
            <button
              key={s.id}
              role="tab"
              type="button"
              id={`${uid}-tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              onClick={() => setCurrent(s.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selected ? "text-night" : "border border-line text-haze hover:text-moon"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 rounded-full bg-moon shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{s.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${stream.id}`}
        className="mt-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-lg text-moon">{stream.summary}</p>
            <ul className="mt-4 space-y-3">
              {stream.points.map((p) => (
                <li key={p} className="flex gap-3 text-haze">
                  <Check size={18} className="mt-1 shrink-0 text-glow" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2">
              {stream.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}

export default function Experience() {
  return (
    <>
      <Section
        id="experience"
        title="Experience"
        lead="Pick a project inside each role to see what I did on it."
      >
        {/* A timeline: the order is real, newest first. */}
        <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-10">
          {experience.map((job) => (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+7px)] top-8 size-3.5 rounded-full border-2 border-glow bg-night shadow-[0_0_14px_rgb(140_200_255/0.9)] sm:-left-[calc(2.5rem+7px)]"
              />
              <Reveal>
                <JobCard job={job} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" title="Education">
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <SpotlightCard className="h-full p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-glow/25 bg-signal/10 text-glow">
                    <GraduationCap size={22} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{e.degree}</h3>
                    <p className="mt-1 text-moon">{e.school}</p>
                    <p className="mt-1 font-mono text-sm text-glow">{e.period}</p>
                    <p className="mt-3 text-haze">{e.note}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
