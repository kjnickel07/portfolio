"use client";

import { useRef } from "react";
import { motion, type MotionValue } from "motion/react";
import { usePhoneScene } from "./use-phone-scene";
import { LoginScreen } from "./login-screen";
import { HomeScreen } from "./home-screen";
import { TabBar } from "./tab-bar";
import { BackPlate } from "./back-plate";
import { usePhoneScale } from "./use-phone-scale";
import { PhoneScaleProvider } from "./phone-scale-context";

interface PhoneProps {
  progress: MotionValue<number>;
}

/**
 * Device thickness as a fraction of its width (a real 71.6mm by 7.8mm
 * body), and how many chassis slices fake that thickness. Stacking the
 * rounded silhouette along Z is what lets a CSS box keep rounded corners
 * on its edges from every angle; six flat side walls could not.
 */
const DEPTH = 0.11;
const SLICES = 18;
const HALF = DEPTH / 2;

/**
 * The phone is DOM, not an image: two real screens rendered at the app's
 * own point values (scaled by usePhoneScale) inside a 3D slab.
 *
 * Structure, outside in:
 *
 *   column     the 3D context root (perspective). Also anchors the floor glow.
 *   flight     translate + scale only. preserve-3d, so perspective reaches
 *              the rotator below it.
 *   attitude   the three rotations. preserve-3d.
 *   front      chassis + screen at +half depth, backface hidden.
 *   slices     the body between the faces: the chassis silhouette repeated
 *              along Z, with a lighter band in the middle for the rim.
 *   back       the back plate at -half depth, pre-rotated 180, backface
 *              hidden.
 *
 * Nothing on column, flight or attitude may flatten the 3D context: no
 * filter, no opacity below 1, no overflow-hidden, no clip-path, no mask.
 * Those live on flat descendants (the screen, the glow) only.
 *
 * `--phone-w` is the device width; the flight height follows from the real
 * 393:852 aspect, and the depth from DEPTH. Every vertical offset in the
 * drop is a percentage of the height (see use-phone-scene.ts), so the same
 * keyframes fit every stage size.
 */
export function Phone({ progress }: PhoneProps) {
  const scene = usePhoneScene(progress);
  const screenRef = useRef<HTMLDivElement>(null);
  const scale = usePhoneScale(screenRef);

  return (
    <div className="relative flex h-full items-center justify-center perspective-[1000px] perspective-origin-center [--phone-w:clamp(140px,17vh,280px)] lg:[--phone-w:clamp(200px,30vh,280px)]">
      {/* Floor glow: sits at the landing spot, under the landed phone's
          bottom edge (centre + 22% travel + half the height, in units of
          the device width). Flat and blurred, allowed here because it is
          not inside the 3D context. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[calc(50%+1.561*var(--phone-w))] h-[28px] w-[var(--phone-w)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-2xl"
        style={{ opacity: scene.floorGlowOpacity, scaleX: scene.floorGlowScaleX }}
      />

      <motion.div
        className="relative aspect-[393/852] w-[var(--phone-w)] transform-3d will-change-transform"
        style={{ y: scene.y, scale: scene.scale }}
      >
        <motion.div
          className="absolute inset-0 transform-3d will-change-transform"
          style={{ rotateX: scene.rotateX, rotateY: scene.rotateY, rotateZ: scene.rotateZ }}
        >
          {/* Body slices, front to back */}
          {Array.from({ length: SLICES }, (_, k) => {
            const z = HALF - ((k + 0.5) * DEPTH) / SLICES;
            const rim = k >= 6 && k <= 11;
            return (
              <div
                key={k}
                aria-hidden
                className={`absolute inset-0 rounded-[44px] ${rim ? "bg-[#2c2c2c] ring-1 ring-inset ring-white/10" : "bg-[#202020]"}`}
                style={{ transform: `translateZ(calc(var(--phone-w) * ${z.toFixed(4)}))` }}
              />
            );
          })}

          {/* Front face */}
          <div
            className="absolute inset-0 rounded-[44px] border-[6px] border-device bg-device backface-hidden"
            style={{ transform: `translateZ(calc(var(--phone-w) * ${HALF}))` }}
          >
            {/* Dynamic island */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[9px] z-30 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-black"
            />

            {/* Screen */}
            <div ref={screenRef} className="absolute inset-[3px] overflow-hidden rounded-[38px] bg-white">
              <PhoneScaleProvider scale={scale}>
                <motion.div className="absolute inset-0" style={{ opacity: scene.loginOpacity }}>
                  <LoginScreen />
                </motion.div>
                <motion.div className="absolute inset-0" style={{ opacity: scene.homeOpacity }}>
                  <HomeScreen landing={scene.landing} />
                  <TabBar landing={scene.landing} />
                </motion.div>

                {/* Specular sweep across the glass */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  style={{ x: scene.specularX }}
                />

                {/* Depth shading: the edge turning away darkens */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-r from-black/70 to-transparent to-45%"
                  style={{ opacity: scene.shadeLeftOpacity }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-l from-black/70 to-transparent to-45%"
                  style={{ opacity: scene.shadeRightOpacity }}
                />
              </PhoneScaleProvider>
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{ transform: `rotateY(180deg) translateZ(calc(var(--phone-w) * ${HALF}))` }}
          >
            <BackPlate shadeLeft={scene.shadeLeftOpacity} shadeRight={scene.shadeRightOpacity} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
