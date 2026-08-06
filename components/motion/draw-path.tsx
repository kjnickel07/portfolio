"use client";

import { motion, type MotionValue } from "motion/react";

interface DrawPathProps {
  pathLength: MotionValue<number> | number;
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  fill?: string;
  fillOpacity?: number;
  className?: string;
}

/**
 * Thin wrapper around motion.path driven by an externally-computed
 * pathLength — every scroll-drawn line in the site (vine stems, the risk
 * sparkline, the model-graph edges) renders through this so the drawing
 * mechanics live in one place.
 *
 * `fill` defaults to "none": SVG's own default is a solid black fill,
 * which for any path that curves back on itself (a meandering stem, a
 * zigzag sparkline) fills the enclosed area into a solid shape instead of
 * drawing a stroked line. Callers that actually want a filled shape can
 * still pass `fill` explicitly to override this.
 */
export function DrawPath({ pathLength, fill = "none", ...props }: DrawPathProps) {
  return <motion.path style={{ pathLength }} fill={fill} {...props} />;
}
