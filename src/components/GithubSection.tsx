"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { GithubIcon } from "./icons";
import { Reveal, Section, SpotlightCard } from "./ui";
import type { ContributionDay, GithubData } from "@/lib/github";
import { profile } from "@/data/content";

// Opacity of the accent colour for each activity level, lowest to highest.
const levelClass = [
  "bg-line/70",
  "bg-signal/30",
  "bg-signal/55",
  "bg-signal/80",
  "bg-glow shadow-[0_0_6px_rgb(var(--link-rgb)/0.8)]",
];

function Calendar({ days }: { days: ContributionDay[] }) {
  // Pad the start so the first column begins on a Sunday, like GitHub's own chart.
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  // On narrow screens the chart scrolls sideways; start at the most recent weeks.
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <div ref={scroller} className="overflow-x-auto pb-2">
      <div
        role="img"
        aria-label="Calendar of GitHub contributions over the last year"
        className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
      >
        {Array.from({ length: offset }, (_, i) => (
          <span key={`pad-${i}`} className="size-3" />
        ))}
        {days.map((d) => (
          <span
            key={d.date}
            title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
            className={`size-3 rounded-[3px] ${levelClass[d.level] ?? levelClass[0]}`}
          />
        ))}
      </div>
    </div>
  );
}

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (!Number.isFinite(days)) return "";
  if (days < 1) return "today";
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function GithubSection({ data }: { data: GithubData | null }) {
  const profileLink = (
    <a
      href={data?.profileUrl ?? profile.github}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-moon transition-colors hover:border-glow/60"
    >
      <GithubIcon size={18} />
      Open my GitHub profile
    </a>
  );

  // GitHub could not be reached when the page was built: show the link only.
  if (!data) {
    return (
      <Section id="github" title="On GitHub" lead="My code and day-to-day activity live on GitHub.">
        {profileLink}
      </Section>
    );
  }

  const facts = [
    { value: data.publicRepos, label: "public repositories" },
    ...(data.contributions
      ? [{ value: data.contributions.total, label: "contributions in the last year" }]
      : []),
    { value: data.followers, label: "followers" },
  ];

  return (
    <Section
      id="github"
      title="On GitHub"
      lead="Pulled live from my profile, so this stays current without me touching the site."
    >
      <Reveal>
        <SpotlightCard className="p-6 sm:p-8">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dd className="font-display text-4xl font-semibold text-glow glow-text">
                  {f.value.toLocaleString("en-IN")}
                </dd>
                <dt className="text-sm text-haze">{f.label}</dt>
              </div>
            ))}
          </dl>
          {data.contributions && (
            <div className="mt-7">
              <Calendar days={data.contributions.days} />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-haze">
                Less
                {levelClass.map((c, i) => (
                  <span key={i} className={`size-3 rounded-[3px] ${c}`} />
                ))}
                More
              </p>
            </div>
          )}
        </SpotlightCard>
      </Reveal>

      {data.repos.length > 0 && (
        <>
          <h3 className="mt-10 text-2xl font-semibold">Recently updated repositories</h3>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((r, i) => (
              <li key={r.name}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <SpotlightCard className="group flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all font-display text-lg font-semibold after:absolute after:inset-0 after:rounded-[1.25rem]"
                      >
                        {r.name}
                      </a>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-haze transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow"
                      />
                    </div>
                    <p className="mt-2 flex-1 text-sm text-haze">
                      {r.description ?? "No description yet."}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-haze">
                      {r.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-glow" />
                          {r.language}
                        </span>
                      )}
                      {r.stars > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Star size={13} />
                          {r.stars}
                        </span>
                      )}
                      {/* The build time differs from the visitor's clock, so let the client text win. */}
                      {r.pushedAt && <span suppressHydrationWarning>Updated {timeAgo(r.pushedAt)}</span>}
                    </p>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8">{profileLink}</div>
    </Section>
  );
}
