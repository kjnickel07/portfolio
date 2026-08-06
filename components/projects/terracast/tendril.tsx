"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { DrawPath } from "@/components/motion/draw-path";
import { VinePalette } from "./vine-palette";

interface TendrilProps {
  x: number;
  y: number;
  rotate: number;
  growth: MotionValue<number>;
  threshold: number;
}

/** A loose two-turn coil — the thin curling tendril a grapevine grips a trellis with. */
const TENDRIL_PATH =
  "M0,0 C5,-2 8,1 7,5 C6,9 1,10 -1,7 C-3,4 -1,1 2,1 C4,1 5,3 3,4";

/**
 * A tendril that draws itself in and settles from a tighter, over-rotated
 * coil into its resting angle — reads as springing open rather than
 * simply fading in.
 */
export function Tendril({ x, y, rotate, growth, threshold }: TendrilProps) {
  const pathLength = useTransform(growth, [threshold, threshold + 0.08], [0, 1]);
  const settle = useTransform(growth, [threshold, threshold + 0.12], [rotate - 70, rotate]);
  const scale = useTransform(growth, [threshold, threshold + 0.06], [0.6, 1]);

  return (
    <motion.g style={{ x, y, rotate: settle, scale }}>
      <DrawPath
        pathLength={pathLength}
        d={TENDRIL_PATH}
        stroke={VinePalette.tendril}
        strokeWidth={0.7}
        strokeLinecap="round"
      />
    </motion.g>
  );
}
