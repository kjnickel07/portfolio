"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { VinePalette } from "./vine-palette";

interface GrapeClusterProps {
  x: number;
  y: number;
  rotate?: number;
  growth: MotionValue<number>;
  threshold: number;
}

type Tone = "back" | "mid" | "front";

/**
 * A real bunch silhouette: rows of 4/3/3/2/1 tapering to a point, radius
 * jittered per grape rather than uniform, positions nudged off-grid so it
 * reads as a natural cluster instead of a laid-out pattern. `tone`
 * controls both fill and whether a grape gets a highlight — back grapes
 * (top row, read as further away) are smaller/darker with no highlight;
 * front grapes (lower, closer) are larger/lighter and catch the light.
 */
export const GRAPE_LAYOUT: { x: number; y: number; r: number; tone: Tone }[] = [
  { x: -6, y: 0, r: 2.2, tone: "back" },
  { x: -2, y: -0.4, r: 2.5, tone: "mid" },
  { x: 2, y: -0.4, r: 2.5, tone: "mid" },
  { x: 6, y: 0, r: 2.2, tone: "back" },

  { x: -4.3, y: 4.1, r: 2.8, tone: "front" },
  { x: 0.1, y: 3.7, r: 3.0, tone: "front" },
  { x: 4.4, y: 4.2, r: 2.7, tone: "front" },

  { x: -3.1, y: 8.2, r: 2.4, tone: "mid" },
  { x: 0.4, y: 8.6, r: 2.6, tone: "front" },
  { x: 3.6, y: 8.0, r: 2.3, tone: "mid" },

  { x: -1.5, y: 12.1, r: 2.0, tone: "mid" },
  { x: 1.9, y: 12.4, r: 1.9, tone: "back" },

  { x: 0.3, y: 15.6, r: 1.6, tone: "front" },
];

const TONE_FILL: Record<Tone, string> = {
  back: VinePalette.grapeBack,
  mid: VinePalette.grapeMid,
  front: VinePalette.grapeFront,
};

/**
 * A single grape: base circle, a soft upper-left highlight for the ones
 * facing the light, and a faint outline so overlapping grapes stay
 * individually readable rather than merging into a blob.
 */
function Grape({ x, y, r, tone }: { x: number; y: number; r: number; tone: Tone }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={TONE_FILL[tone]} fillOpacity={tone === "back" ? 0.85 : 0.95} />
      <circle r={r} fill="none" stroke={VinePalette.grapeBack} strokeOpacity={0.25} strokeWidth={0.3} />
      {tone === "front" && (
        <ellipse
          cx={-r * 0.32}
          cy={-r * 0.38}
          rx={r * 0.34}
          ry={r * 0.24}
          fill={VinePalette.grapeHighlight}
          fillOpacity={0.4}
        />
      )}
    </g>
  );
}

/**
 * A bunch that sets late in the vine's growth — springs in with a little
 * overshoot rather than simply fading, echoing how the leaves unfurl.
 */
export function GrapeCluster({ x, y, rotate = 0, growth, threshold }: GrapeClusterProps) {
  const scale = useTransform(growth, [threshold, threshold + 0.05, threshold + 0.1], [0, 1.08, 1]);
  const opacity = useTransform(growth, [threshold, threshold + 0.04], [0, 1]);

  return (
    <motion.g style={{ x, y, rotate, scale, opacity }}>
      {GRAPE_LAYOUT.map((grape, i) => (
        <Grape key={i} {...grape} />
      ))}
    </motion.g>
  );
}
