"use client";

import { useTransform, type MotionValue } from "motion/react";
import { easeEditorialFn, tumbleEase } from "@/lib/motion";

/**
 * The phone drop. One 0 to 1 scroll progress drives everything below.
 *
 *   0.00 to 0.12  hold      upright, still, high in the stage, login screen
 *   0.12 to 0.82  fall      one continuous, eased full turn about Y while
 *                           the phone descends; a gentle pitch arc and a
 *                           slight lean ride along with it. No reversals:
 *                           the motion reads as a single smooth rotation.
 *   0.47          cut       login becomes home, at the exact midpoint of
 *                           the turn (rotateY 180) while the BACK faces the
 *                           viewer, so no dissolve is ever visible.
 *   0.82 to 0.93  landing   touches down; the settle is in rotateZ only
 *                           (hard floor, no bounce); the student ID settles
 *                           and the tab bar rises
 *   0.93 to 1.00  hold      upright, still, home screen
 *
 * Facing rule. Motion emits `rotateX(a) rotateY(b) rotateZ(c)`, so the
 * face normal's z component is cos(a) * cos(b); rotateZ is irrelevant. With
 * |rotateX| <= 14 degrees, cos(a) > 0, so the back faces the viewer exactly
 * when rotateY is in (90, 270). The turn is one segment from 0.12 to 0.82
 * eased with tumbleEase (cubic-bezier 0.45, 0, 0.55, 1); solving that
 * curve for 25% and 75% of the way gives progress 0.3673 and 0.5728. The
 * cut sits at the segment midpoint, 0.47, where a symmetric ease yields
 * exactly 180, with about 0.1 of progress (roughly 90 degrees) of margin
 * either side. If you change the fall stops or the ease, recompute
 * BACK_WINDOW.
 *
 * The cut is a pure function of progress (no state, no latching): scrub
 * back up and login returns, which is the correct behaviour for a scrubbed
 * timeline.
 */

export const HOLD_IN_END = 0.12;
export const LAND = 0.82;
export const SETTLED = 0.93;
export const SCREEN_CUT = 0.47;
/** Progress window during which the back plate faces the viewer. */
export const BACK_WINDOW = [0.3673, 0.5728] as const;

const DEG = Math.PI / 180;

export function usePhoneScene(progress: MotionValue<number>) {
  // Attitude. One full turn about Y; a pitch arc that peaks at the midpoint
  // and a lean that carries through touchdown and settles.
  const rotateY = useTransform(progress, [0, HOLD_IN_END, LAND, 1], [0, 0, 360, 360], { ease: tumbleEase });
  const rotateX = useTransform(progress, [0, HOLD_IN_END, SCREEN_CUT, LAND, 1], [0, 0, -14, 0, 0], { ease: tumbleEase });
  const rotateZ = useTransform(
    progress,
    [0, HOLD_IN_END, 0.5, LAND, 0.88, SETTLED, 1],
    [0, 0, -9, -4, 2, -0.5, 0],
    { ease: [tumbleEase, tumbleEase, tumbleEase, easeEditorialFn, easeEditorialFn, easeEditorialFn] }
  );

  // Flight. `y` is a percentage of the phone's own height so the same
  // keyframes fit every stage size: from just under the top of the stage to
  // just above its floor. Slight shrink mid-air (further from the camera),
  // back to 1 on the floor.
  const y = useTransform(progress, [0, HOLD_IN_END, LAND, 1], ["-18%", "-18%", "22%", "22%"], { ease: tumbleEase });
  const scale = useTransform(progress, [0, HOLD_IN_END, SCREEN_CUT, LAND, 1], [0.92, 0.92, 0.86, 1, 1], { ease: tumbleEase });

  // The cut.
  const loginOpacity = useTransform(progress, (p) => (p < SCREEN_CUT ? 1 : 0));
  const homeOpacity = useTransform(progress, (p) => (p < SCREEN_CUT ? 0 : 1));

  // Landing choreography for the home screen and tab bar, 0 to 1.
  const landing = useTransform(progress, [LAND, 0.95], [0, 1]);

  // Floor glow: light spill that grows as the phone approaches the floor,
  // pulses on impact, then settles. The fall cue, in place of blur (which
  // would flatten the 3D context).
  const floorGlowOpacity = useTransform(progress, [SCREEN_CUT, LAND, 0.86, 1], [0, 0.32, 0.18, 0.18]);
  const floorGlowScaleX = useTransform(progress, [SCREEN_CUT, LAND, 0.88], [0.6, 1.15, 1]);

  // Depth shading: the edge turning away from the viewer darkens. Positive
  // rotateY turns the right edge away. Opacity only, compositor-friendly.
  const shadeLeftOpacity = useTransform(rotateY, (r) => 0.7 * Math.max(0, -Math.sin(r * DEG)));
  const shadeRightOpacity = useTransform(rotateY, (r) => 0.7 * Math.max(0, Math.sin(r * DEG)));

  // One specular band across the front glass, in percent of its own width.
  // The reverse pass happens inside BACK_WINDOW, while the back faces the
  // viewer.
  const specularX = useTransform(progress, [0.14, BACK_WINDOW[0], BACK_WINDOW[1], LAND], ["-120%", "260%", "-120%", "260%"]);

  return {
    y,
    scale,
    rotateX,
    rotateY,
    rotateZ,
    loginOpacity,
    homeOpacity,
    landing,
    floorGlowOpacity,
    floorGlowScaleX,
    shadeLeftOpacity,
    shadeRightOpacity,
    specularX,
  };
}

export type PhoneScene = ReturnType<typeof usePhoneScene>;
