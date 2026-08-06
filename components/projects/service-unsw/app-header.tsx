import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { AppColors, AppHeaderTokens, AppSpacing } from "./app-reference";
import { usePx } from "./phone-scale-context";
import { BASE_PATH } from "@/lib/base-path";

/**
 * The real app's header: UNSW crest + wordmark on the left (the actual
 * asset, not redrawn), a profile pill on the right — ported from
 * `app-header.tsx` at real point sizes × the measured phone scale. Owns
 * its own real `paddingHorizontal: Spacing.four` / `paddingVertical:
 * Spacing.three`, exactly like the source component.
 */
export function AppHeader() {
  const px = usePx();

  return (
    <div
      className="flex h-full items-center justify-between"
      style={{ paddingInline: px(AppSpacing.four), paddingBlock: px(AppSpacing.three) }}
    >
      <Image
        src={`${BASE_PATH}/unsw-logo.png`}
        alt="UNSW Sydney"
        width={px(AppHeaderTokens.logoWidth)}
        height={px(AppHeaderTokens.logoHeight)}
        style={{ width: px(AppHeaderTokens.logoWidth), height: px(AppHeaderTokens.logoHeight), objectFit: "contain" }}
        unoptimized
      />

      <div
        className="flex items-center rounded-full bg-white"
        style={{
          gap: px(8),
          paddingBlock: px(4),
          paddingInlineStart: px(4),
          paddingInlineEnd: px(8),
          boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: px(AppHeaderTokens.pillIconSize),
            height: px(AppHeaderTokens.pillIconSize),
            backgroundColor: AppColors.backgroundSelected,
          }}
        >
          <IoPerson size={px(AppHeaderTokens.personIconSize)} color={AppColors.textSecondary} />
        </div>
        <span
          style={{ fontSize: px(AppHeaderTokens.nameSize), fontWeight: 500, color: AppColors.text }}
          className="whitespace-nowrap"
        >
          Karl
        </span>
      </div>
    </div>
  );
}
