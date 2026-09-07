"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { FiBookOpen, FiCalendar, FiHome, FiLink, FiMapPin } from "react-icons/fi";
import { AppColors, AppTabBar } from "./app-reference";
import { usePx } from "./phone-scale-context";

/** The real TAB_CONFIG from app-tab-bar.tsx. Shared with PhoneStatic. */
export const TABS = [
  { label: "Home", Icon: FiHome },
  { label: "Schedule", Icon: FiCalendar },
  { label: "Map", Icon: FiMapPin },
  { label: "Bookings", Icon: FiBookOpen },
  { label: "Links", Icon: FiLink },
];

interface TabBarProps {
  /** 0 to 1 across the landing window (use-phone-scene.ts). */
  landing: MotionValue<number>;
}

/**
 * Ported from `app-tab-bar.tsx`: a floating pill, real Feather icons, an
 * accent indicator over the active tab. Rises as the phone lands and the
 * indicator draws open from its centre (scaleX, not width, so nothing
 * lays out per frame).
 */
export function TabBar({ landing }: TabBarProps) {
  const px = usePx();
  const opacity = useTransform(landing, [0.1, 0.5], [0, 1]);
  const y = useTransform(landing, [0.1, 0.55], [24, 0]);
  const indicatorScaleX = useTransform(landing, [0.55, 0.95], [0, 1]);

  return (
    <motion.div
      className="absolute z-20 overflow-hidden bg-white"
      style={{
        left: px(20),
        right: px(20),
        bottom: px(20),
        height: px(AppTabBar.height),
        borderRadius: px(AppTabBar.radius),
        boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
        opacity,
        y,
      }}
    >
      <div className="flex h-full">
        {TABS.map(({ label, Icon }, i) => {
          const active = i === 0;
          return (
            <div key={label} className="relative flex flex-1 flex-col items-center justify-center" style={{ gap: px(2) }}>
              {active && (
                <motion.div
                  className="absolute top-0"
                  style={{
                    height: px(AppTabBar.indicatorHeight),
                    width: `${AppTabBar.indicatorWidthPercent}%`,
                    backgroundColor: AppColors.accent,
                    borderBottomLeftRadius: px(4),
                    borderBottomRightRadius: px(4),
                    scaleX: indicatorScaleX,
                    originX: 0.5,
                  }}
                />
              )}
              <Icon size={px(AppTabBar.iconSize)} color={active ? AppColors.text : AppColors.textSecondary} />
              <span
                style={{
                  fontSize: px(AppTabBar.labelSize),
                  fontWeight: active ? 600 : 400,
                  color: active ? AppColors.text : AppColors.textSecondary,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
