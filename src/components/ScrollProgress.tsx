"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin glowing bar at the top of the page showing how far you've scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-signal via-glow to-moon shadow-[0_0_12px_rgb(140_200_255/0.8)]"
    />
  );
}
