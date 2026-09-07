"use client";

import Image from "next/image";
import { AppColors, AppLogin, AppSpacing, AppType } from "./app-reference";
import { usePx } from "./phone-scale-context";
import { BASE_PATH } from "@/lib/base-path";

/**
 * The login screen at rest, ported from `signin.tsx` at real point values:
 * a yellow header strip, the yellow hero with the two decorative shards,
 * the crest above the wordmark, and the white form sheet with the zID and
 * password fields and the Login button. It does not animate; the phone
 * scene cuts from this to HomeScreen while the back plate faces the viewer.
 */
export function LoginScreen() {
  const px = usePx();
  const logoWidth = px(AppLogin.logoWidth) * 0.55;
  const logoHeight = px(AppLogin.logoHeight) * 0.55;
  const gap = px(AppSpacing.two);

  return (
    <div className="absolute inset-0" style={{ backgroundColor: AppColors.background }}>
      {/* Header strip + hero share the yellow field */}
      <div className="absolute inset-x-0 top-0 h-[42%] overflow-hidden" style={{ backgroundColor: AppColors.accent }}>
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
      </div>

      {/* Crest above the wordmark, both centred on the hero's brand anchor */}
      <div
        className="absolute left-1/2"
        style={{ top: `calc(26% - ${logoHeight + gap}px)`, transform: "translateX(-50%)" }}
      >
        <Image src={`${BASE_PATH}/unsw-logo.png`} alt="" width={logoWidth} height={logoHeight} unoptimized />
      </div>
      <p
        className="pointer-events-none absolute left-1/2 top-[26%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[18px] font-semibold text-device"
      >
        ServiceUNSW
      </p>

      {/* Form sheet */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col"
        style={{
          top: "42%",
          backgroundColor: AppColors.background,
          borderTopLeftRadius: px(AppLogin.sheetRadius),
          borderTopRightRadius: px(AppLogin.sheetRadius),
          paddingInline: px(AppSpacing.five),
          paddingTop: px(AppSpacing.five),
          gap: px(AppSpacing.three),
        }}
      >
        <p style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}>
          Login
        </p>

        {["zID", "Password"].map((label) => (
          <label key={label} className="flex flex-col" style={{ gap: px(AppSpacing.two) }}>
            <span style={{ fontSize: px(AppType.caption.size), fontWeight: 600, color: AppColors.textSecondary }}>
              {label}
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
        ))}

        <span
          className="flex items-center justify-center"
          style={{
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
        </span>
      </div>
    </div>
  );
}
