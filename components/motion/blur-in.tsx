"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { glide } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface BlurInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Blur-to-sharp reveal with a slight scale settle — used for prose blocks
 * and the hero thesis line, where a plain fade would read as generic.
 */
export function BlurIn({ children, className, delay = 0 }: BlurInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : undefined}
      transition={{ ...glide, delay }}
    >
      {children}
    </motion.div>
  );
}
