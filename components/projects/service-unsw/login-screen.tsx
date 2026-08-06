"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { AppColors, AppLogin, AppSpacing, AppType } from "./app-reference";
import { usePx } from "./phone-scale-context";
import { BASE_PATH } from "@/lib/base-path";

interface LoginScreenProps {
  progress: MotionValue<number>;
  /** Login content splits across two shared containers in Phone: the
   * collapsing yellow hero, and the white sheet beneath it. */
  slot: "hero" | "sheet";
}

/**
 * Login-only content, ported from `signin.tsx` at real point values. Fades
 * and slides away as the scene crosses into the home phase — these
 * progress ranges are the choreography (kept exactly as tuned); only the
 * visual content within each range was rebuilt to match the real app.
 */
export function LoginScreen({ progress, slot }: LoginScreenProps) {
  const px = usePx();
  const decorationOpacity = useTransform(progress, [0, 0.32], [1, 0]);
  const fieldsOpacity = useTransform(progress, [0.32, 0.42], [1, 0]);
  const fieldsY = useTransform(progress, [0.32, 0.46], [0, -24]);
  const buttonOpacity = useTransform(progress, [0.36, 0.46], [1, 0]);
  const buttonScale = useTransform(progress, [0.36, 0.46], [1, 0.7]);

  if (slot === "hero") {
    // The wordmark itself is a separate, persistently-morphing element in
    // phone.tsx (unchanged) — this just adds the real crest above it,
    // matching signin.tsx's brandWrap (logo above wordmark, gap 8),
    // positioned just above the wordmark's known top:26% anchor.
    const logoWidth = px(AppLogin.logoWidth) * 0.55;
    const logoHeight = px(AppLogin.logoHeight) * 0.55;
    const gap = px(AppSpacing.two);

    return (
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: decorationOpacity }}>
        <div
          className="absolute rounded-[24px] bg-white/45"
          style={{
            width: px(AppLogin.shapePrimary.size),
            height: px(AppLogin.shapePrimary.size),
            left: px(AppLogin.shapePrimary.left),
            top: px(AppLogin.shapePrimary.top),
            rotate: `${AppLogin.shapePrimary.rotate}deg`,
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        />
        <div
          className="absolute rounded-[22px] bg-white/60"
          style={{
            width: px(AppLogin.shapeSecondary.size),
            height: px(AppLogin.shapeSecondary.size),
            right: px(AppLogin.shapeSecondary.right),
            top: px(AppLogin.shapeSecondary.top),
            rotate: `${AppLogin.shapeSecondary.rotate}deg`,
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        />

        <div
          className="absolute left-1/2"
          style={{ top: `calc(26% - ${logoHeight + gap}px)`, transform: "translateX(-50%)" }}
        >
          <Image src={`${BASE_PATH}/unsw-logo.png`} alt="" width={logoWidth} height={logoHeight} unoptimized />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-x-0 top-0 flex flex-col"
      style={{
        opacity: fieldsOpacity,
        y: fieldsY,
        paddingInline: px(AppSpacing.five),
        paddingTop: px(AppSpacing.five),
        gap: px(AppSpacing.three),
      }}
    >
      <p style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}>
        Login
      </p>

      <label className="flex flex-col" style={{ gap: px(AppSpacing.two) }}>
        <span style={{ fontSize: px(AppType.caption.size), fontWeight: 600, color: AppColors.textSecondary }}>
          zID
        </span>
        <span
          style={{
            height: px(AppLogin.inputHeight),
            borderRadius: px(AppLogin.inputRadius),
            border: `${px(AppLogin.inputBorderWidth)}px solid ${AppColors.backgroundSelected}`,
            backgroundColor: AppColors.background,
          }}
        />
      </label>

      <label className="flex flex-col" style={{ gap: px(AppSpacing.two) }}>
        <span style={{ fontSize: px(AppType.caption.size), fontWeight: 600, color: AppColors.textSecondary }}>
          Password
        </span>
        <span
          style={{
            height: px(AppLogin.inputHeight),
            borderRadius: px(AppLogin.inputRadius),
            border: `${px(AppLogin.inputBorderWidth)}px solid ${AppColors.backgroundSelected}`,
            backgroundColor: AppColors.background,
          }}
        />
      </label>

      <motion.span
        className="flex items-center justify-center"
        style={{
          opacity: buttonOpacity,
          scale: buttonScale,
          marginTop: px(AppSpacing.three),
          height: px(AppLogin.buttonHeight),
          minWidth: px(116),
          paddingInline: px(18),
          borderRadius: px(AppLogin.buttonRadius),
          alignSelf: "flex-start",
          backgroundColor: AppColors.text,
          fontSize: px(AppType.button.size),
          fontWeight: AppType.button.weight,
          color: AppColors.background,
        }}
      >
        Login
      </motion.span>
    </motion.div>
  );
}
