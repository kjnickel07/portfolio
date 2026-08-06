"use client";

import { motion, useInView, type HTMLMotionProps, type Variants } from "motion/react";
import { useMemo, useRef } from "react";
import { glide, staggerChildren } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface WordStaggerProps {
  children: string;
  as?: Tag;
  className?: string;
  wordClassName?: string;
}

const container: Variants = {
  hidden: {},
  show: { transition: staggerChildren(0.045, 0) },
};

const word: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: glide },
};

/**
 * Splits text into words and reveals each with a staggered spring — the
 * hero name and any headline that should feel like it's assembling itself
 * rather than simply appearing.
 */
export function WordStagger({ children, as = "div", className, wordClassName }: WordStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const words = useMemo(() => children.split(" "), [children]);
  const MotionTag = motion[as] as (props: HTMLMotionProps<"div">) => React.JSX.Element;
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] mr-[0.22em] align-bottom">
          <motion.span className={`inline-block ${wordClassName ?? ""}`} variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
