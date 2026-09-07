"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import { BASE_PATH } from "@/lib/base-path";

interface BackPlateProps {
  /** Darkening for the edge turning away, computed in use-phone-scene.ts. */
  shadeLeft: MotionValue<number>;
  shadeRight: MotionValue<number>;
}

/**
 * The back of the device, shown while the phone tumbles through its
 * back-facing window. The chassis is the page's `device` token; inside it
 * sits a photoreal matte-black back (public/phone-back.jpg, generated with
 * Higgsfield from the brief in DESIGN.md 7.10, cropped to the body) under a
 * static satin sheen. No logo, no wordmark: it should read as an object,
 * not a badge. If the texture is ever removed the chassis alone stands in.
 *
 * Shading is mirrored relative to the front face on purpose. This element
 * sits inside a rotateY(180deg) face, so its local left is the viewer's
 * right; the "left edge turning away" overlay therefore has to be painted
 * on the local right.
 */
export function BackPlate({ shadeLeft, shadeRight }: BackPlateProps) {
  return (
    <div className="absolute inset-0 rounded-[44px] border-[6px] border-device bg-device">
      <div className="absolute inset-[3px] overflow-hidden rounded-[38px] bg-device">
        <Image
          src={`${BASE_PATH}/phone-back.jpg`}
          alt=""
          fill
          sizes="280px"
          className="object-cover"
          unoptimized
        />
        {/* Satin sheen */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_15%,rgba(255,255,255,0.06),transparent_60%)]"
        />
      </div>

      {/* Depth shading, mirrored (see the note above) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-r from-black/70 to-transparent to-45%"
        style={{ opacity: shadeRight }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-l from-black/70 to-transparent to-45%"
        style={{ opacity: shadeLeft }}
      />
    </div>
  );
}
