import { cubicBezier, type Transition } from "motion/react";

/**
 * Central motion vocabulary.
 *
 * Every animated component in this project pulls its transition from here —
 * no inline spring configs scattered through components — so the whole site
 * moves with one consistent hand. Four weights, from lightest to heaviest:
 *
 *   snap   — small UI reveals: hairlines, chips, captions, the stamp fill.
 *   glide  — the default: most word/line reveals, marginalia, list items.
 *   settle — deliberate overshoot: cards arriving, the student ID, chart nodes.
 *   drift  — slow and expensive-feeling: the phone lift, sheet slides, vines.
 */

export const snap: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

export const glide: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

export const settle: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 16,
  mass: 1,
};

export const drift: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 20,
  mass: 1.2,
};

/** Stagger helper — keeps delay math consistent wherever children cascade in. */
export function staggerChildren(amount = 0.06, delay = 0.02): Transition {
  return { staggerChildren: amount, delayChildren: delay };
}

/** Editorial ease for non-spring (duration-based) transitions, e.g. opacity fades. */
export const easeEditorial = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-scrubbed segments (useTransform's `ease` option) take easing
 * FUNCTIONS, not bezier arrays, so the two curves below are the function
 * forms. tumbleEase is a symmetric ease-in-out for the phone's fall
 * segments; easeEditorialFn is easeEditorial for its landing.
 */
export const tumbleEase = cubicBezier(0.45, 0, 0.55, 1);
export const easeEditorialFn = cubicBezier(...easeEditorial);
