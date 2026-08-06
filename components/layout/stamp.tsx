"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { snap } from "@/lib/motion";

interface StampProps {
  /** 0→1 across the whole page. */
  progress: MotionValue<number>;
  /** The mark shown in the stamp — defaults to "KN", swaps to the active section's initial. */
  glyph?: string;
}

/**
 * The KN stamp: logo, nav mark and scroll-progress indicator collapsed
 * into one 32×32 square. A blue fill rises from the bottom as `progress`
 * advances; the mark stays legible at every fill level because the white
 * and blue glyph layers share exact registration. The glyph itself swaps
 * to the active section's initial as you scroll, so the stamp reads as a
 * live index rather than a static logo.
 */
export function Stamp({ progress, glyph = "KN" }: StampProps) {
  const clipPath = useTransform(progress, (v) => `inset(${100 - v * 100}% 0 0 0)`);

  return (
    <div className="relative h-[32px] w-[32px] shrink-0 border border-stamp bg-paper">
      <motion.span
        key={`ink-${glyph}`}
        className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tracking-tight text-stamp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={snap}
      >
        {glyph}
      </motion.span>
      <motion.div className="absolute inset-0 overflow-hidden bg-stamp" style={{ clipPath }}>
        <motion.span
          key={`paper-${glyph}`}
          className="absolute inset-0 flex items-center justify-center text-[11px] font-bold tracking-tight text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={snap}
        >
          {glyph}
        </motion.span>
      </motion.div>
    </div>
  );
}
