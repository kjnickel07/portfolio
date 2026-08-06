"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { usePhoneScene } from "./use-phone-scene";
import { LoginScreen } from "./login-screen";
import { HomeScreen } from "./home-screen";
import { TabBar } from "./tab-bar";
import { AppHeader } from "./app-header";
import { usePhoneScale } from "./use-phone-scale";
import { PhoneScaleProvider } from "./phone-scale-context";

interface PhoneProps {
  progress: MotionValue<number>;
}

/**
 * The phone is DOM, not an image — every internal element animates on its
 * own. The device frame, glass and drop shadow are content, so they carry
 * the radius and shadow the rest of the page withholds.
 *
 * Everything below driven by `scene` (from usePhoneScene) is the
 * animation — untouched. Screen content renders at the real serviceUNSW
 * app's point values inside PhoneScaleProvider, which scales them
 * uniformly to fit whatever size this mockup renders at.
 */
export function Phone({ progress }: PhoneProps) {
  const scene = usePhoneScene(progress);
  const screenRef = useRef<HTMLDivElement>(null);
  const scale = usePhoneScale(screenRef);
  // Dissolve the wordmark as the real header logo fades in underneath it —
  // see the note at the wordmark's JSX below.
  const wordmarkDisplayOpacity = useTransform(
    [scene.wordmarkOpacity, scene.headerContentOpacity],
    ([wordmarkOpacity, headerContentOpacity]: number[]) => wordmarkOpacity * (1 - headerContentOpacity)
  );

  return (
    <div style={{ perspective: 1400 }} className="mx-auto w-[clamp(220px,26vw,300px)]">
      <motion.div
        className="relative aspect-[393/852] w-full rounded-[44px] bg-ink"
        style={{
          y: scene.y,
          scale: scene.scale,
          rotateX: scene.rotateX,
          rotateY: scene.rotateY,
          filter: scene.filter,
          transformStyle: "preserve-3d",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderTopWidth: 6,
          borderBottomWidth: 6,
          borderLeftStyle: "solid",
          borderRightStyle: "solid",
          borderLeftWidth: scene.bezelLeft,
          borderRightWidth: scene.bezelRight,
          borderColor: "#222222",
        }}
      >
        {/* Lift shadow — the one sanctioned shadow: content, not chrome.
            Skewed and offset by rotateY so it reads as cast by a tilted
            object rather than a flat card floating above a fixed blur. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-8 -bottom-4 h-8 rounded-full bg-navy blur-2xl"
          style={{ opacity: scene.shadowOpacity, y: scene.shadowY, x: scene.shadowX, transform: scene.shadowSkew }}
        />

        {/* Depth shading — a light/shadow wash across the whole body that
            shifts with rotateY, the cue that sells volume at small tilt
            angles where the bezel alone isn't enough. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 rounded-[44px]"
          style={{ background: scene.depthShade }}
        />

        {/* Dynamic island */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[9px] z-30 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-black"
        />

        {/* Screen */}
        <div ref={screenRef} className="absolute inset-[3px] overflow-hidden rounded-[38px] bg-white">
          <PhoneScaleProvider scale={scale}>
            {/* Header strip — yellow while "login", crossfades to white as it becomes the app header */}
            <motion.div className="absolute inset-x-0 top-0 z-20 h-[8%]" style={{ backgroundColor: scene.headerBg }}>
              <motion.div className="h-full" style={{ opacity: scene.headerContentOpacity }}>
                <AppHeader />
              </motion.div>
            </motion.div>

            {/* Yellow hero → banner */}
            <motion.div
              className="absolute inset-x-0 top-[8%] z-10 overflow-hidden bg-[#FFDC00]"
              style={{ height: scene.heroHeight }}
            >
              <LoginScreen progress={progress} slot="hero" />
              <HomeScreen progress={progress} slot="hero" />
            </motion.div>

            {/* White sheet */}
            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 bg-white"
              style={{
                top: scene.sheetTop,
                borderTopLeftRadius: scene.sheetRadius,
                borderTopRightRadius: scene.sheetRadius,
                marginTop: scene.sheetOverlap,
              }}
            >
              <LoginScreen progress={progress} slot="sheet" />
              <HomeScreen progress={progress} slot="sheet" />
            </motion.div>

            {/* Wordmark — one continuous element, shrinking from hero-center
                toward the header-left slot. Movement/scale/timing (scene.wordmark*)
                are untouched; its opacity is additionally cut by headerContentOpacity
                so it dissolves as the real header logo fades in underneath it,
                rather than the two overlapping — a compositing fix, not a
                timing change. */}
            <div className="pointer-events-none absolute left-1/2 top-[26%] z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.p
                className="whitespace-nowrap text-[18px] font-semibold text-ink"
                style={{ x: scene.wordmarkX, y: scene.wordmarkY, scale: scene.wordmarkScale, opacity: wordmarkDisplayOpacity }}
              >
                ServiceUNSW
              </motion.p>
            </div>

            {/* Specular glass sweep — a soft wash with a brighter, tighter
                core line inside it, reading as light catching curved glass
                rather than a flat highlight band. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
              style={{ left: scene.specularX }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 z-30 w-[6%] bg-white/40 blur-[2px]"
              style={{ left: scene.specularCoreX }}
            />

            <TabBar progress={progress} />
          </PhoneScaleProvider>
        </div>
      </motion.div>
    </div>
  );
}
