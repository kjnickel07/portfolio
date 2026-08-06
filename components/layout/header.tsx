"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Stamp } from "@/components/layout/stamp";
import { nav } from "@/lib/content";
import { snap } from "@/lib/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Minimal top bar: the KN stamp doubles as logo and scroll-progress mark,
 * paired with the active section name and a plain underlined nav list.
 * Hides on scroll-down, reappears on scroll-up — "disappear when reading,
 * reappear naturally" per the brief.
 */
export function Header() {
  const { scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    if (lenis && !reduced) {
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  useMotionValueEvent(scrollYProgress, "change", () => {
    const y = window.scrollY;
    const delta = y - lastY.current;
    if (y < 120) {
      setHidden(false);
    } else if (delta > 4) {
      setHidden(true);
    } else if (delta < -4) {
      setHidden(false);
    }
    lastY.current = y;
  });

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = nav.find((item) => `#${visible.target.id}` === item.href);
          if (match) setActive(match.label);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // The stamp reads as a live index of where you are: its glyph swaps to
  // the active section's initial, falling back to "KN" at the very top.
  const glyph = active ? active.charAt(0).toUpperCase() : "KN";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-stone bg-paper"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={snap}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[24px] py-[16px] md:px-[32px]">
        <a
          href="#top"
          onClick={(e) => navigate(e, "#top")}
          className="flex items-center gap-[8px]"
          aria-label="Karl Nickel — back to top"
        >
          <Stamp progress={scrollYProgress} glyph={glyph} />
          <span className="hidden text-caption text-ink sm:inline" aria-live="polite">
            {active}
          </span>
        </a>
        <nav aria-label="Primary" className="hidden gap-[16px] md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => navigate(e, item.href)}
              className="text-body-sm text-link underline decoration-1 underline-offset-4 hover:text-stamp"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
