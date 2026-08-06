"use client";

import { useRef, type RefObject } from "react";
import { useScroll, useSpring, type MotionValue } from "motion/react";

type ScrollOffset = Parameters<typeof useScroll>[0] extends { offset?: infer O }
  ? O
  : never;

interface SectionProgressOptions {
  /** Passed straight to Framer Motion's useScroll. Defaults to the classic sticky-stage range. */
  offset?: ScrollOffset;
  /** Set false to skip the spring smoothing and read raw scroll progress. */
  smooth?: boolean;
}

interface SectionProgress<T extends HTMLElement> {
  ref: RefObject<T | null>;
  /** Spring-smoothed 0→1 progress across the target's scroll range. */
  progress: MotionValue<number>;
  /** Unsmoothed scrollYProgress, for cases that need to react instantly. */
  raw: MotionValue<number>;
}

/**
 * Shared scroll-progress wrapper. Every sticky scene (the phone, the vines,
 * the model graph) reads its 0→1 timeline from here instead of
 * instantiating its own useScroll, so offsets and spring-smoothing stay
 * consistent across the whole site — and so motion keeps drifting for a
 * beat after the wheel stops, per the brief's "continues naturally" rule.
 */
export function useSectionProgress<T extends HTMLElement>(
  options: SectionProgressOptions = {}
): SectionProgress<T> {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<T>,
    offset: options.offset ?? (["start start", "end end"] as ScrollOffset),
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.4,
  });

  return {
    ref,
    progress: options.smooth === false ? scrollYProgress : smoothed,
    raw: scrollYProgress,
  };
}
