"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Wraps the page in a root Lenis instance for buttery scroll — disabled
 * entirely under prefers-reduced-motion, where native discrete scrolling
 * is the more accessible, more predictable choice.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
