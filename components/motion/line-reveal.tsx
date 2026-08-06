"use client";

import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";
import { drift } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface LineRevealProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Reveals a single block of text through a clip-mask sliding open while it
 * rises slightly into place — the "line reveal" move from the brief, for
 * headings and short standalone lines. For multi-line prose that should
 * assemble word by word, use WordStagger instead.
 */
export function LineReveal({ children, as = "div", className, delay = 0, id }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as (props: HTMLMotionProps<"div">) => React.JSX.Element;
  const Tag = as;

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <MotionTag
        id={id}
        className={className}
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{ ...drift, delay }}
      >
        {children}
      </MotionTag>
    </div>
  );
}
