"use client";

import { Brain, Cloud, Code2, Database, LineChart, PanelsTopLeft } from "lucide-react";
import { Reveal, Section, SpotlightCard } from "./ui";
import { skills, softSkills } from "@/data/content";

const icons = [Brain, LineChart, PanelsTopLeft, Code2, Database, Cloud];

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      lead="The tools I use to take a model from a notebook to something people can use."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-glow/25 bg-signal/10 text-glow">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                </div>
                <p className="mt-3 text-sm text-haze">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="chip transition-colors hover:border-glow/60 hover:text-moon"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-haze">
          <span className="text-sm text-moon">How I work with people:</span>
          {softSkills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
