"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { DrawPath } from "@/components/motion/draw-path";
import { VinePalette } from "./vine-palette";

type Tone = "back" | "mid" | "front";

/** Where a bunch hangs relative to its cluster's attachment point on the vine. */
export interface GrapeBunchPlacement {
  dx: number;
  dy: number;
  scale: number;
  rotate: number;
}

/**
 * One bunch and the peduncle that carries it. `x`/`y` is a point ON the stem
 * curve — the cluster's own origin IS its attachment, which is what keeps the
 * fruit connected no matter how the anchors are later retuned.
 */
export interface GrapeClusterPlacement {
  /** Growth value at which this bunch starts setting. */
  t: number;
  /** Attachment point, in vine viewBox coords — must lie on a stem path. */
  x: number;
  y: number;
  /** Peduncle path in cluster-local coords, starting at 0,0 (i.e. on the vine). */
  stalk: string;
  bunch: GrapeBunchPlacement;
}

/**
 * A real bunch silhouette: rows of 1/2/3/3/2/1 tapering at BOTH ends, widest
 * through the upper-middle. The taper at the top is the important part — the
 * crown is a single small grape the peduncle lands inside, so the bunch reads
 * as hanging off a stalk rather than as a blob parked next to the vine.
 *
 * Local y starts at 0 (the stalk junction) and runs down to ~21.6. Radii are
 * jittered per grape and positions nudged off-grid so it reads as a natural
 * cluster instead of a laid-out pattern. `tone` controls fill, size and
 * whether a grape catches a highlight — back grapes read as further away.
 */
export const GRAPE_LAYOUT: { x: number; y: number; r: number; tone: Tone }[] = [
  { x: 0.0, y: 1.6, r: 1.7, tone: "mid" },

  { x: -2.6, y: 4.4, r: 2.1, tone: "back" },
  { x: 2.3, y: 4.7, r: 2.2, tone: "mid" },

  { x: -4.9, y: 8.0, r: 2.4, tone: "back" },
  { x: -0.2, y: 7.6, r: 2.7, tone: "front" },
  { x: 4.6, y: 8.2, r: 2.3, tone: "mid" },

  { x: -3.4, y: 12.0, r: 2.6, tone: "mid" },
  { x: 1.0, y: 11.6, r: 2.8, tone: "front" },
  { x: 5.0, y: 12.4, r: 2.2, tone: "back" },

  { x: -1.8, y: 15.9, r: 2.4, tone: "front" },
  { x: 2.4, y: 16.3, r: 2.3, tone: "mid" },

  { x: 0.2, y: 19.8, r: 1.8, tone: "front" },
];

const TONE_FILL: Record<Tone, string> = {
  back: VinePalette.grapeBack,
  mid: VinePalette.grapeMid,
  front: VinePalette.grapeFront,
};

const TONE_DEPTH: Record<Tone, number> = { back: 0, mid: 1, front: 2 };

/**
 * Painted back-to-front rather than in row order, so nearer grapes reliably
 * overlap farther ones — depth that holds regardless of where a grape sits in
 * the array. Array order is preserved within a tone (sort is stable).
 */
const PAINT_ORDER = [...GRAPE_LAYOUT].sort((a, b) => TONE_DEPTH[a.tone] - TONE_DEPTH[b.tone]);

/** Peduncle stroke — same colour as the vine, thin enough to read as a side-shoot. */
export const STALK_WIDTH = 0.9;

/**
 * A single grape: base circle, a soft upper-left highlight for the ones facing
 * the light, and a faint outline so overlapping grapes stay individually
 * readable rather than merging into a blob.
 */
function Grape({ x, y, r, tone }: { x: number; y: number; r: number; tone: Tone }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={TONE_FILL[tone]} fillOpacity={tone === "back" ? 0.85 : 0.95} />
      <circle r={r} fill="none" stroke={VinePalette.grapeBack} strokeOpacity={0.4} strokeWidth={0.3} />
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
 * The fruit alone — pure presentation, no motion, no scroll dependency, so the
 * animated cluster and the reduced-motion StaticVine render identical bunches
 * and cannot drift apart.
 */
export function GrapeBunch() {
  return (
    <>
      {PAINT_ORDER.map((grape, i) => (
        <Grape key={i} {...grape} />
      ))}
    </>
  );
}

/**
 * A bunch that sets as growth passes its threshold. Two beats, in the order a
 * real one forms: the peduncle draws outward from the cane first, then the
 * fruit swells on the end of it.
 *
 * The bunch scales from the TOP of its bounding box (originY "0%"), not the
 * centre Motion would default to for an SVG group — otherwise the fruit pulls
 * away from its own stalk for the length of the animation.
 */
export function GrapeCluster({
  x,
  y,
  stalk,
  bunch,
  growth,
  threshold,
}: Omit<GrapeClusterPlacement, "t"> & { growth: MotionValue<number>; threshold: number }) {
  const stalkLength = useTransform(growth, [threshold, threshold + 0.05], [0, 1]);
  const scale = useTransform(
    growth,
    [threshold + 0.03, threshold + 0.09, threshold + 0.13],
    [0, bunch.scale * 1.04, bunch.scale]
  );
  const opacity = useTransform(growth, [threshold + 0.03, threshold + 0.07], [0, 1]);

  return (
    <g transform={`translate(${x} ${y})`}>
      <DrawPath
        pathLength={stalkLength}
        d={stalk}
        stroke={VinePalette.stem}
        strokeWidth={STALK_WIDTH}
        strokeLinecap="round"
      />
      <g transform={`translate(${bunch.dx} ${bunch.dy})`}>
        <motion.g style={{ scale, opacity, rotate: bunch.rotate, originX: "50%", originY: "0%" }}>
          <GrapeBunch />
        </motion.g>
      </g>
    </g>
  );
}
