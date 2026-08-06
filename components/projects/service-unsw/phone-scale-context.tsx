"use client";

import { createContext, useContext, type ReactNode } from "react";

const PhoneScaleContext = createContext(1);

export function PhoneScaleProvider({ scale, children }: { scale: number; children: ReactNode }) {
  return <PhoneScaleContext.Provider value={scale}>{children}</PhoneScaleContext.Provider>;
}

/** The current measured phone scale — multiply real app point values by this. */
export function useScale(): number {
  return useContext(PhoneScaleContext);
}

/**
 * Returns a `px(n)` converter bound to the current scale — call once per
 * component, then use the returned function for every real-point value
 * that component needs, rather than calling a hook per value.
 */
export function usePx(): (n: number) => number {
  const scale = useScale();
  return (n: number) => Math.round(n * scale * 100) / 100;
}
