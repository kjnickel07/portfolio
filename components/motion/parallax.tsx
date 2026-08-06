"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of drift across the element's full viewport traversal. */
  rate?: number;
  /** Drift axis — vertical for marginalia, horizontal for the "also" index rows. */
  axis?: "x" | "y";
}

/**
 * Rate-controlled drift as the element crosses the viewport — used for
 * marginalia notes (vertical) and the "also" index rows (horizontal).
 */
export function Parallax({ children, className, rate = 40, axis = "y" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const offset = useTransform(scrollYProgress, [0, 1], [rate, -rate]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={axis === "x" ? { x: offset } : { y: offset }}>
      {children}
    </motion.div>
  );
}
