"use client";

import { motion, type MotionValue } from "motion/react";
import { DrawPath } from "@/components/motion/draw-path";
import { Leaf } from "./leaf";
import { Tendril } from "./tendril";
import { GrapeCluster } from "./grapes";
import { VinePalette } from "./vine-palette";
import { useSegmentGrowth } from "./use-vine-growth";

interface VineProps {
  side: "left" | "right";
  growth: MotionValue<number>;
}

/**
 * The main stem, split into four sequential segments so it can taper —
 * thick woody base narrowing to a delicate tip — instead of one uniform
 * stroke. Each segment continues exactly where the last ends, so despite
 * being four paths it reads as one continuous vine. Coordinates are the
 * original single-path meander, just grouped and centred in the wider
 * (0–76) viewBox that gives the new branches room either side.
 */
export const STEM_SEGMENTS = [
  { d: "M22,780 C54,700 2,630 36,560 C62,500 6,440 34,380", width: 2.6, range: [0, 0.28] as [number, number] },
  { d: "M34,380 C58,330 12,280 38,230 C56,196 18,160 38,120", width: 1.9, range: [0.22, 0.55] as [number, number] },
  { d: "M38,120 C52,96 26,70 36,40", width: 1.3, range: [0.5, 0.75] as [number, number] },
  { d: "M36,40 C42,22 30,10 34,0", width: 0.85, range: [0.7, 0.92] as [number, number] },
];

/** Two shorter branches splitting off the main stem at natural nodes, each its own taper. */
export const BRANCHES = [
  {
    segments: [
      { d: "M34,380 C44,372 54,358 52,340", width: 1.4, range: [0.4, 0.56] as [number, number] },
      { d: "M52,340 C51,330 58,320 60,308", width: 0.9, range: [0.52, 0.68] as [number, number] },
    ],
  },
  {
    segments: [
      { d: "M38,120 C26,112 14,102 12,88", width: 1.2, range: [0.64, 0.78] as [number, number] },
      { d: "M12,88 C11,80 5,72 2,62", width: 0.75, range: [0.74, 0.88] as [number, number] },
    ],
  },
];

/**
 * Leaves anchored near real stem/branch coordinates, offset outward with
 * a gap of bare stem before each. Spread across the *whole* stem length
 * (base through tip) rather than clustered near the top — a real vine
 * leafs out along its length, and it means foliage is visible whatever
 * portion of the vine a given container ends up showing (the short
 * reduced-motion section only ever reveals the lower part of the same
 * 800-unit coordinate space the tall scroll scene shows in full).
 */
export const LEAVES = [
  { t: 0.16, x: 50, y: 600, rotate: -58, flip: false },
  { t: 0.26, x: -8, y: 480, rotate: 232, flip: true },
  { t: 0.38, x: 52, y: 340, rotate: -55, flip: false },
  { t: 0.5, x: -8, y: 270, rotate: 235, flip: true },
  { t: 0.6, x: 54, y: 180, rotate: -50, flip: false },
  { t: 0.68, x: 58, y: 310, rotate: -40, flip: false },
  { t: 0.78, x: -8, y: 70, rotate: 225, flip: true },
  { t: 0.88, x: 48, y: 18, rotate: -45, flip: false },
] as const;

/** Tendrils coiling out near stem nodes, one low on the base cane and two near the branches. */
export const TENDRILS = [
  { t: 0.2, x: 44, y: 560, rotate: 40 },
  { t: 0.52, x: 40, y: 372, rotate: 30 },
  { t: 0.76, x: 32, y: 112, rotate: -150 },
] as const;

/** Three bunches spread along the stem, setting as growth reaches each. */
export const GRAPES = [
  { t: 0.22, x: 12, y: 520, rotate: -8 },
  { t: 0.56, x: -4, y: 200, rotate: 0 },
  { t: 0.72, x: 46, y: 280, rotate: 12 },
] as const;

/**
 * One full vine: a tapered branching stem, tendrils, palmate leaves and
 * grape bunches, precomputed at module scope so the geometry is stable
 * across renders. `side="right"` mirrors the same shapes with a CSS
 * scaleX flip rather than duplicating coordinates.
 */
export function Vine({ side, growth }: VineProps) {
  const sway = side === "left" ? [-0.6, 0.6, -0.6] : [0.6, -0.6, 0.6];

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-0 h-full w-[76px] md:w-[112px] ${side === "left" ? "left-0" : "right-0"}`}
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 76 800"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full overflow-visible"
        animate={{ rotate: sway }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <StemSegments segments={STEM_SEGMENTS} growth={growth} />

        {/* Branches, tendrils, leaves and grapes reach outward past the
            bare stem — on a narrow phone viewport the text column runs
            nearly edge to edge, so there's no room for that reach without
            sitting on top of the words. Below `sm` only the tapering stem
            itself shows; from `sm` up there's enough margin for the full
            illustration. */}
        <g className="hidden sm:inline">
          {BRANCHES.map((branch, i) => (
            <StemSegments key={i} segments={branch.segments} growth={growth} />
          ))}

          {TENDRILS.map((tendril, i) => (
            <Tendril key={i} x={tendril.x} y={tendril.y} rotate={tendril.rotate} growth={growth} threshold={tendril.t} />
          ))}

          {LEAVES.map((leaf, i) => (
            <Leaf
              key={i}
              x={leaf.x}
              y={leaf.y}
              rotate={leaf.rotate}
              growth={growth}
              threshold={leaf.t}
              flip={leaf.flip}
            />
          ))}

          {GRAPES.map((grape, i) => (
            <GrapeCluster key={i} x={grape.x} y={grape.y} rotate={grape.rotate} growth={growth} threshold={grape.t} />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}

/**
 * Renders a sequence of tapering path segments that continue one from the
 * next, each drawn over its own (non-linear) slice of the growth range —
 * the mechanism behind both the taper and the organic, non-constant pace.
 */
function StemSegments({
  segments,
  growth,
}: {
  segments: { d: string; width: number; range: [number, number] }[];
  growth: MotionValue<number>;
}) {
  return (
    <>
      {segments.map((segment, i) => (
        <SegmentPath key={i} d={segment.d} width={segment.width} range={segment.range} growth={growth} />
      ))}
    </>
  );
}

function SegmentPath({
  d,
  width,
  range,
  growth,
}: {
  d: string;
  width: number;
  range: [number, number];
  growth: MotionValue<number>;
}) {
  const pathLength = useSegmentGrowth(growth, range);
  return <DrawPath pathLength={pathLength} d={d} stroke={VinePalette.stem} strokeWidth={width} strokeLinecap="round" />;
}
