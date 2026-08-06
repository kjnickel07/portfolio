"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { FiBookOpen, FiCalendar, FiHome, FiLink, FiMapPin } from "react-icons/fi";
import { AppColors, AppTabBar } from "./app-reference";
import { usePx } from "./phone-scale-context";

interface TabBarProps {
  progress: MotionValue<number>;
}

// The real TAB_CONFIG from app-tab-bar.tsx.
const TABS = [
  { label: "Home", Icon: FiHome },
  { label: "Schedule", Icon: FiCalendar },
  { label: "Map", Icon: FiMapPin },
  { label: "Bookings", Icon: FiBookOpen },
  { label: "Links", Icon: FiLink },
];

/**
 * Ported from `app-tab-bar.tsx`: a floating pill, real Feather icons, a
 * sliding accent indicator. Rises last as the home content settles,
 * closing the scene with the Home tab already active — same entrance
 * timing as before, real icons and proportions.
 */
export function TabBar({ progress }: TabBarProps) {
  const px = usePx();
  const opacity = useTransform(progress, [0.58, 0.68], [0, 1]);
  const y = useTransform(progress, [0.58, 0.68], [24, 0]);
  const indicatorWidth = useTransform(progress, [0.66, 0.76], ["0%", `${AppTabBar.indicatorWidthPercent}%`]);

  return (
    <motion.div
      className="absolute overflow-hidden bg-white"
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
                    backgroundColor: AppColors.accent,
                    borderBottomLeftRadius: px(4),
                    borderBottomRightRadius: px(4),
                    width: indicatorWidth,
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
