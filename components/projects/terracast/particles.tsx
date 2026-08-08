"use client";

import { motion } from "motion/react";

const PARTICLES = [
  { left: "12%", delay: 0 },
  { left: "28%", delay: 1.2 },
  { left: "46%", delay: 2.4 },
  { left: "64%", delay: 0.6 },
  { left: "78%", delay: 1.8 },
  { left: "88%", delay: 3 },
  { left: "20%", delay: 3.4 },
  { left: "58%", delay: 4.2 },
] as const;

/** Ambient drifting ink particles — long, slow loops at low opacity. */
export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((particle, i) => (
        <motion.span
          key={i}
          className="absolute top-full h-[3px] w-[3px] rounded-full bg-ink"
          style={{ left: particle.left, opacity: 0.18 }}
          animate={{ y: ["0%", "-120vh"] }}
          transition={{ duration: 22, delay: particle.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
