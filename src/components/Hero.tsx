"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { useRef } from "react";
import Constellation from "./Constellation";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/content";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      <Constellation className="absolute inset-0 -z-10 size-full" />
      {/* Horizon glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-night to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-signal/15 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: textY }} initial="hidden" animate="show">
          <motion.p
            custom={0}
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/70 px-4 py-1.5 text-sm text-haze backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-glow" />
            </span>
            {profile.role} at {profile.company}
          </motion.p>

          <h1 className="mt-6 font-semibold text-[clamp(3rem,10.5vw,6.75rem)] leading-[0.95]">
            <motion.span custom={1} variants={rise} className="block glow-text">
              {first}
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              className="block bg-gradient-to-r from-moon via-glow to-signal bg-clip-text text-transparent"
            >
              {rest.join(" ")}
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            className="mt-6 max-w-xl text-lg text-haze sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            custom={4}
            variants={rise}
            className="mt-4 flex items-center gap-2 text-sm text-haze"
          >
            <MapPin size={16} className="text-ember" />
            {profile.location}
          </motion.p>

          <motion.div custom={5} variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-moon px-6 py-3 font-medium text-night shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              See my work
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-6 py-3 font-medium text-moon backdrop-blur transition-colors hover:border-glow/60"
            >
              <Download size={18} />
              Download resume
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              {[
                { href: profile.github, label: "GitHub", icon: <GithubIcon /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
                { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={20} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid size-11 place-items-center rounded-full text-haze transition-colors hover:bg-panel hover:text-glow"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* The photo's black night sky is blended away so the portrait and its moon sit inside the constellation. */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute left-[38%] top-[12%] size-40 rounded-full bg-glow/30 blur-3xl animate-pulse-glow"
          />
          <Image
            src="/images/hashir-night.webp"
            alt={`${profile.name} standing under a full moon at night`}
            width={1100}
            height={1466}
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="relative h-auto w-full mix-blend-screen [mask-image:radial-gradient(ellipse_56%_60%_at_52%_50%,black_50%,transparent_100%)]"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-haze hover:text-glow sm:block"
      >
        <ArrowDown className="animate-bounce" size={22} />
      </motion.a>
    </section>
  );
}
