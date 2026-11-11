"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CountUp, Reveal, Section } from "./ui";
import { profile, stats } from "@/data/content";

/** Photo that tilts gently toward the pointer. */
function TiltPhoto() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 160, damping: 18 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });

  return (
    <div
      className="[perspective:1000px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-signal/40 via-transparent to-ember/30 blur-2xl"
        />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-glow/25 shadow-glow-soft">
          <Image
            src="/images/hashir-about.webp"
            alt={`Portrait of ${profile.name}, smiling`}
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 380px, 80vw"
            className="h-auto w-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid items-start gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-xs lg:max-w-none">
          <TiltPhoto />
        </Reveal>

        <div>
          <div className="space-y-5 text-lg text-haze">
            {profile.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl text-moon" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="surface h-full p-5">
                  <dd className="font-display text-4xl font-semibold text-glow glow-text">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-2 text-sm leading-snug text-haze">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
