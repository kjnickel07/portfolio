"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { VinePalette } from "./vine-palette";

interface LeafProps {
  x: number;
  y: number;
  rotate: number;
  growth: MotionValue<number>;
  threshold: number;
  /** Mirrors the lobes for a little natural asymmetry between instances. */
  flip?: boolean;
}

/**
 * A real palmate grape-leaf silhouette — a base notch, two shoulder lobes
 * and a longer centre lobe, not a teardrop — with three vein strokes
 * fanning from the base for a touch of engraved detail at this scale.
 */
export const LEAF_PATH =
  "M0,1 C-2,0 -5,0 -7,3 C-9,6 -9,9 -7,11 C-8,14 -7,17 -4,18 C-2,19 -1,17 0,15 C1,17 2,19 4,18 C7,17 8,14 7,11 C9,9 9,6 7,3 C5,0 2,0 0,1 Z";

const VEINS = [
  "M0,1 L-6,11",
  "M0,1 L0,15",
  "M0,1 L6,11",
] as const;

/**
 * A single leaf that unfolds — scale 0→1 *and* a rotational settle from a
 * folded angle into its final orientation — as growth crosses its
 * threshold, so it reads as unfurling rather than just popping in.
 */
export function Leaf({ x, y, rotate, growth, threshold, flip = false }: LeafProps) {
  const scale = useTransform(growth, [threshold, threshold + 0.05], [0, 1]);
  const unfold = useTransform(growth, [threshold, threshold + 0.08], [rotate - 40, rotate]);

  return (
    <motion.g style={{ x, y, rotate: unfold, scale: scale, scaleX: flip ? -1 : 1 }}>
      <path d={LEAF_PATH} fill={VinePalette.leaf} fillOpacity={0.9} />
      <path d={LEAF_PATH} fill={VinePalette.leafDark} fillOpacity={0.22} transform="translate(1.2 0.8)" />
      {VEINS.map((d) => (
        <path key={d} d={d} stroke={VinePalette.vein} strokeWidth={0.5} strokeOpacity={0.55} fill="none" />
      ))}
    </motion.g>
  );
}
