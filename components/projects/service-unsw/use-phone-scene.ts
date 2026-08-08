"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * Derives every shared-chrome motion value for the serviceUNSW phone scene
 * from one 0→1 scroll progress value. Range map (progress → beat):
 *
 *   0.00–0.15  arrival  — lift, scale and un-blur into view
 *   0.15–0.35  turn     — 3D rotation settles, specular sweep, shadow deepens
 *   0.30–0.55  morph    — yellow hero collapses into the banner, wordmark
 *                         shrinks into the header slot, sheet radius eases
 *   0.35–0.65  content  — login fields fade out, home content fades/springs in
 *                         (handled locally in LoginScreen / HomeScreen)
 *   0.65–0.85  settle   — counter-rotation with overshoot
 *   0.85–1.00  release  — drifts back, re-blurs, hands off
 *
 * LoginScreen and HomeScreen read `progress` directly for their own
 * sub-range fades; nothing here duplicates that timing.
 */
export function usePhoneScene(progress: MotionValue<number>) {
  const y = useTransform(progress, [0, 0.15, 0.85, 1], [64, 0, 0, 40]);
  const scale = useTransform(progress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.97]);
  const rotateX = useTransform(progress, [0, 0.15, 0.35, 0.65, 0.85, 1], [16, 8, 2, 2, -3, 0]);
  const rotateY = useTransform(progress, [0.15, 0.35, 0.65, 0.85], [-18, 6, 6, 0]);
  const blur = useTransform(progress, [0, 0.1, 0.9, 1], [6, 0, 0, 4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const shadowOpacity = useTransform(progress, [0, 0.2, 0.8, 1], [0.15, 0.4, 0.4, 0.15]);
  // On the dark page the cast "shadow" is rendered as a white glow (light
  // spill from a lit phone, not a dark shadow) — same timeline as
  // shadowOpacity, just dimmer, since a glow at full shadow strength
  // would overpower the page.
  const shadowGlowOpacity = useTransform(shadowOpacity, (v) => v / 3);
  const shadowY = useTransform(progress, [0, 0.2, 0.8, 1], [20, 48, 48, 20]);
  // The shadow is cast by a tilted object, so it must move and skew with
  // rotateY rather than sitting fixed beneath a flat card — this is the
  // single biggest cue that makes the lift read as three-dimensional.
  const shadowX = useTransform(rotateY, (r) => r * 2.2);
  const shadowSkew = useTransform(rotateY, (r) => `skewX(${r * -0.6}deg) scaleX(${1 - Math.abs(r) * 0.006})`);

  const specularX = useTransform(progress, [0.1, 0.4], ["-30%", "130%"]);
  // The bright core line centred within the wider specular band above.
  const specularCoreX = useTransform(specularX, (x) => `calc(${x} + 13%)`);

  // Side-bezel depth: as the phone turns, one edge's frame reads thicker
  // (catching light, coming toward the viewer) and the other thinner
  // (turning away) — a cheap but effective volume cue CSS perspective
  // alone doesn't sell on a flat six-sided box.
  const bezelLeft = useTransform(rotateY, (r) => `${6 + Math.max(0, -r) * 0.35}px`);
  const bezelRight = useTransform(rotateY, (r) => `${6 + Math.max(0, r) * 0.35}px`);
  // A soft light/shadow wash across the whole body, opposite in direction
  // to the bezel thickening, so the "turning away" side reads darker and
  // the "coming toward" side catches a highlight.
  const depthShade = useTransform(
    rotateY,
    (r) =>
      `linear-gradient(${90 + r * 1.2}deg, rgba(0,0,0,${0.16 + Math.max(0, -r) * 0.01}) 0%, transparent 22%, transparent 78%, rgba(255,255,255,${0.1 + Math.max(0, r) * 0.008}) 100%)`
  );

  // Shared chrome: header stays a constant height but its fill crossfades
  // yellow → white; the hero zone beneath it collapses toward banner size.
  const headerBg = useTransform(progress, [0.28, 0.45], ["#FFDC00", "#ffffff"]);
  const headerContentOpacity = useTransform(progress, [0.4, 0.5], [0, 1]);
  const heroHeight = useTransform(progress, [0.28, 0.5], ["34%", "30%"]);
  // The sheet's top edge always sits directly below the header + hero —
  // derived from heroHeight rather than duplicating the range map, so the
  // two stay pixel-locked to each other at every point in the scroll.
  const sheetTop = useTransform(heroHeight, (h) => `calc(8% + ${h})`);
  const sheetRadius = useTransform(progress, [0.3, 0.55], [30, 22]);
  const sheetOverlap = useTransform(progress, [0.48, 0.58], [0, -18]);

  // Wordmark: large, centered in the hero → small, left-aligned in the header.
  const wordmarkScale = useTransform(progress, [0.32, 0.52], [1, 0.32]);
  const wordmarkY = useTransform(progress, [0.32, 0.52], [0, -128]);
  const wordmarkX = useTransform(progress, [0.32, 0.52], [0, -104]);
  const wordmarkOpacity = useTransform(progress, [0.55, 0.65, 0.95], [1, 1, 0]);

  return {
    y,
    scale,
    rotateX,
    rotateY,
    filter,
    shadowOpacity,
    shadowGlowOpacity,
    shadowY,
    shadowX,
    shadowSkew,
    specularX,
    specularCoreX,
    bezelLeft,
    bezelRight,
    depthShade,
    headerBg,
    headerContentOpacity,
    heroHeight,
    sheetTop,
    sheetRadius,
    sheetOverlap,
    wordmarkScale,
    wordmarkY,
    wordmarkX,
    wordmarkOpacity,
  };
}

export type PhoneScene = ReturnType<typeof usePhoneScene>;
