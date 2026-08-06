"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Maps the scene's 0→1 scroll progress to vine growth: fully grown by 80%
 * through the scene, leaving a settled beat at the end where the grapes
 * and the last few leaves sit still before the section hands off.
 */
export function useVineGrowth(progress: MotionValue<number>): MotionValue<number> {
  return useTransform(progress, [0, 0.8], [0, 1]);
}

/**
 * Maps overall vine `growth` to a single stem segment's own 0→1
 * pathLength across its `range`. Segments' ranges overlap and are
 * non-uniform relative to how much of the stem's length they cover —
 * that mismatch is what makes growth speed up and slow down rather than
 * drawing at one constant rate. useTransform clamps outside the range by
 * default, so a segment sits at 0 before its turn and stays at 1 once done.
 */
export function useSegmentGrowth(growth: MotionValue<number>, range: [number, number]): MotionValue<number> {
  return useTransform(growth, range, [0, 1]);
}
