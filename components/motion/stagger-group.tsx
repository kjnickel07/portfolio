"use client";

import { motion, useInView, type Variants } from "motion/react";
import { Children, useRef, type ReactNode } from "react";
import { settle, staggerChildren } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  amount?: number;
  y?: number;
}

const containerVariants = (amount: number): Variants => ({
  hidden: {},
  show: { transition: staggerChildren(amount) },
});

const itemVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: settle },
});

/**
 * Wraps a list of children in a staggered spring reveal — favourites
 * cards, class cards, experience rows and the "also" index all cascade in
 * through this shared orchestration rather than each rolling their own.
 */
export function StaggerGroup({
  children,
  className,
  itemClassName,
  amount = 0.08,
  y = 24,
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        {Children.map(children, (child, i) => (
          <div key={i} className={itemClassName}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants(amount)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} className={itemClassName} variants={itemVariants(y)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
