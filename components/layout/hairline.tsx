"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { drift } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface HairlineProps {
  className?: string;
}

/**
 * The one structural rule the design system permits — draws its own width
 * open from 0 as it scrolls into view instead of simply appearing, so even
 * the quietest element on the page carries a beat of motion.
 */
export function Hairline({ className = "" }: HairlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={`h-px w-full bg-stone ${className}`} />;
  }

  return (
    <div ref={ref} className={`h-px w-full ${className}`}>
      <motion.div
        className="h-px bg-stone"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : undefined}
        transition={drift}
      />
    </div>
  );
}
