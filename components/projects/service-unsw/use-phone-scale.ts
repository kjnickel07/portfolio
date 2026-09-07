"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** The reference device width, in points, every real value in the recreated
 * screens is authored against — matches the phone frame's own aspect-[393/852]. */
export const REFERENCE_WIDTH = 393;

/**
 * Measures the phone screen's actual rendered width and returns
 * `measuredWidth / REFERENCE_WIDTH`. Every recreated component multiplies
 * the app's real point values (spacing, font sizes, radii, icon sizes) by
 * this single factor, so proportions between elements exactly match the
 * real app at every viewport size instead of being hand-tuned per element.
 */
export function usePhoneScale(ref: RefObject<HTMLElement | null>): number {
  // Reasonable pre-measurement guess so nothing flashes at the wrong size —
  // the middle of the clamp() range used for the phone's own width.
  const [scale, setScale] = useState(260 / REFERENCE_WIDTH);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = (width: number) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setScale(width / REFERENCE_WIDTH));
    };

    // offsetWidth is layout-space: the flight wrapper above the screen
    // starts at scale 0.9, and a bounding rect would bake that in for the
    // first frame (a 10% undersize until the ResizeObserver corrects it).
    measure(el.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) measure(width);
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return scale;
}
