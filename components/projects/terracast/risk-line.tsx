"use client";

import type { MotionValue } from "motion/react";
import { DrawPath } from "@/components/motion/draw-path";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface RiskLineProps {
  progress: MotionValue<number>;
}

const POINTS = "M0,40 L20,32 L40,44 L60,20 L80,28 L100,10 L120,18 L140,4";

/**
 * A scroll-drawn sparkline standing in for TerraCast's frost-risk chart —
 * the "SVG path drawing" idea from the brief, at document scale. Under
 * reduced motion it renders fully drawn immediately rather than reading a
 * scroll progress that (in that path) never advances.
 */
export function RiskLine({ progress }: RiskLineProps) {
  const reduced = useReducedMotion();

  return (
    <svg viewBox="0 0 140 48" className="h-[48px] w-full max-w-[280px]" aria-hidden>
      <DrawPath
        pathLength={reduced ? 1 : progress}
        d={POINTS}
        stroke="#222222"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
