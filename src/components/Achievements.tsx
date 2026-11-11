"use client";

import { Award, Trophy, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, Section, SpotlightCard } from "./ui";
import { certifications, hackathons, leadership } from "@/data/content";

type Entry = { title: string; org: string; when: string; detail: string };

function Column({
  icon,
  heading,
  entries,
  delay,
}: {
  icon: ReactNode;
  heading: string;
  entries: Entry[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <SpotlightCard className="h-full p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-glow/25 bg-signal/10 text-glow">
            {icon}
          </span>
          <h3 className="text-xl font-semibold">{heading}</h3>
        </div>
        <ul className="mt-6 space-y-6">
          {entries.map((e) => (
            <li key={e.title} className="border-l border-line pl-4">
              <p className="font-medium text-moon">{e.title}</p>
              <p className="mt-0.5 text-sm text-haze">{e.org}</p>
              <p className="mt-0.5 font-mono text-xs text-glow">{e.when}</p>
              <p className="mt-2 text-sm text-haze">{e.detail}</p>
            </li>
          ))}
        </ul>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Achievements() {
  return (
    <Section
      id="achievements"
      title="Certifications and achievements"
      lead="Certificates, the teams I've led and where I've competed."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Column
          icon={<Award size={22} />}
          heading="Certifications"
          delay={0}
          entries={certifications.map((c) => ({
            title: c.title,
            org: c.issuer,
            when: c.date,
            detail: c.detail,
          }))}
        />
        <Column
          icon={<Users size={22} />}
          heading="Leadership"
          delay={0.08}
          entries={leadership.map((l) => ({
            title: l.title,
            org: l.org,
            when: l.period,
            detail: l.detail,
          }))}
        />
        <Column
          icon={<Trophy size={22} />}
          heading="Hackathons"
          delay={0.16}
          entries={hackathons.map((h) => ({
            title: h.title,
            org: h.org,
            when: h.period,
            detail: h.detail,
          }))}
        />
      </div>
    </Section>
  );
}
