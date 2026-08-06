"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks the user's `prefers-reduced-motion` setting live via
 * useSyncExternalStore — SSR-safe (no hydration mismatch) and avoids
 * setState-in-effect entirely.
 *
 * Reduced motion is a first-class path here, not an afterthought: every
 * scroll-driven scene checks this and renders its settled final state
 * instead of subscribing to scroll progress at all, so the page stays a
 * complete, readable document with zero animation when asked for.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
