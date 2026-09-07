"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { FiChevronUp } from "react-icons/fi";
import { AppColors, AppLogin, AppSpacing, AppType } from "./app-reference";
import { AppHeader } from "./app-header";
import { StudentIdCard } from "./student-id-card";
import { FavouritesRow } from "./favourites-row";
import { ClassCard } from "./class-card";
import { usePx } from "./phone-scale-context";

/** The real placeholder classes from constants/home-placeholder.ts. Shared
 * with the reduced-motion PhoneStatic so the two can never drift apart.
 * The en-dash times are ported app text. */
export const CLASSES = [
  { code: "COMP1111", type: "Tutorial", time: "1–2pm", location: "SEB 100", color: AppColors.classBlue },
  { code: "COMP2222", type: "Lecture", time: "4–6pm", location: "Mathews\nTheatre A", color: AppColors.classPink },
];

interface HomeScreenProps {
  /** 0 to 1 across the landing window (use-phone-scene.ts). */
  landing: MotionValue<number>;
}

/**
 * The home screen at rest, ported from `index.tsx` at real point values:
 * white header, yellow Student ID banner, and the sheet with Favourites and
 * the Daily Overview. Present in full from the cut onward (the front face is
 * visible again mid-air, and a missing card would read as a hole); the only
 * motion is an impact settle on the card as the phone lands.
 */
export function HomeScreen({ landing }: HomeScreenProps) {
  const px = usePx();
  const cardScale = useTransform(landing, [0, 0.3, 0.65, 1], [1, 0.97, 1.02, 1]);
  const cardY = useTransform(landing, [0, 0.3, 0.65, 1], [0, 3, -2, 0]);
  const sheetOverlap = px(27);

  return (
    <div className="absolute inset-0" style={{ backgroundColor: AppColors.background }}>
      <div className="absolute inset-x-0 top-0 z-20 h-[8%]" style={{ backgroundColor: AppColors.background }}>
        <AppHeader />
      </div>

      {/* Student ID banner */}
      <div className="absolute inset-x-0 top-[8%] z-0 h-[30%] overflow-hidden" style={{ backgroundColor: AppColors.accent }}>
        <div
          className="flex h-full flex-col items-center justify-center"
          style={{ gap: px(AppSpacing.three), paddingBlock: px(AppSpacing.two) }}
        >
          <p style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}>
            Student ID
          </p>
          <motion.div className="w-full" style={{ scale: cardScale, y: cardY }}>
            <StudentIdCard />
          </motion.div>
        </div>
      </div>

      {/* Sheet, overlapping the banner's lower edge as in the real app */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col"
        style={{
          top: `calc(38% - ${sheetOverlap}px)`,
          backgroundColor: AppColors.background,
          borderTopLeftRadius: px(AppLogin.sheetRadius),
          borderTopRightRadius: px(AppLogin.sheetRadius),
          paddingTop: px(AppSpacing.four),
          paddingInline: px(AppSpacing.four),
          gap: px(AppSpacing.five),
        }}
      >
        <FavouritesRow />

        <div className="flex flex-col" style={{ gap: px(AppSpacing.three) }}>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}>
              Daily Overview
            </span>
            <FiChevronUp size={px(20)} color={AppColors.text} />
          </div>
          <div className="flex flex-col" style={{ gap: px(AppSpacing.three) }}>
            {CLASSES.map((c) => (
              <ClassCard key={c.code} {...c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
