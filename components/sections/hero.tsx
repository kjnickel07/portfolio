"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/lib/content";
import { WordStagger } from "@/components/motion/word-stagger";
import { LineReveal } from "@/components/motion/line-reveal";
import { BlurIn } from "@/components/motion/blur-in";
import { Hairline } from "@/components/layout/hairline";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The cover page. The one sanctioned deviation from the type scale lives
 * here — everything below returns to 14/16/18/24/40/48.
 *
 * Two additions beyond the initial reveal: the content drifts up and
 * fades slightly as the page scrolls it away (so the hero isn't inert for
 * however long a visitor sits on it before scrolling), and a small
 * scroll-cue signals there's more below, fading out the moment scrolling
 * actually starts.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.35]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -56]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-center px-[24px] pb-[64px] pt-[112px] md:px-[32px]"
    >
      <motion.div
        className="mx-auto w-full max-w-[1200px]"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <LineReveal as="p" className="mb-[16px] text-caption text-link">
          {hero.eyebrow}
        </LineReveal>

        <h1 className="mb-[8px]">
          <WordStagger
            as="span"
            className="block text-[clamp(56px,11vw,148px)] font-bold leading-[0.92] text-ink"
          >
            {hero.name}
          </WordStagger>
        </h1>

        <LineReveal
          as="p"
          delay={0.15}
          className="mb-[32px] text-subheading font-semibold text-ink"
        >
          {hero.role}
        </LineReveal>

        <Hairline className="mb-[32px] max-w-[560px]" />

        <BlurIn delay={0.1} className="reading-measure">
          <p className="text-body text-ink">{hero.thesis}</p>
        </BlurIn>
      </motion.div>

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[40px] flex flex-col items-center gap-[8px]"
          style={{ opacity: cueOpacity }}
          aria-hidden
        >
          <span className="text-caption text-ink/50">Scroll</span>
          <div className="relative h-[26px] w-px bg-stone">
            <motion.span
              className="absolute left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-ink"
              animate={{ y: [0, 20, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
