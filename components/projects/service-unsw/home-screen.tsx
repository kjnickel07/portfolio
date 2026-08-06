"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { FiChevronUp } from "react-icons/fi";
import { AppColors, AppSpacing, AppType } from "./app-reference";
import { StudentIdCard } from "./student-id-card";
import { FavouritesRow } from "./favourites-row";
import { ClassCard } from "./class-card";
import { usePx } from "./phone-scale-context";

interface HomeScreenProps {
  progress: MotionValue<number>;
  /** Home content splits across the same two shared containers as LoginScreen. */
  slot: "hero" | "sheet";
}

// The real placeholder classes from constants/home-placeholder.ts.
const CLASSES = [
  { code: "COMP1111", type: "Tutorial", time: "1–2pm", location: "SEB 100", color: AppColors.classBlue },
  { code: "COMP2222", type: "Lecture", time: "4–6pm", location: "Mathews\nTheatre A", color: AppColors.classPink },
];

/**
 * Home-only content, ported from `index.tsx` at real point values —
 * the student ID card, Favourites, and a Daily Overview collapsible
 * header (default open, per the real `ScheduleDay`/`Collapsible`) over
 * the real placeholder classes. Springs in on the same progress ranges
 * as before; only the visual content changed.
 */
export function HomeScreen({ progress, slot }: HomeScreenProps) {
  const px = usePx();
  const headingOpacity = useTransform(progress, [0.4, 0.5], [0, 1]);
  const cardOpacity = useTransform(progress, [0.44, 0.56], [0, 1]);
  const cardY = useTransform(progress, [0.44, 0.58], [28, 0]);
  const cardScale = useTransform(progress, [0.44, 0.58, 0.64], [0.85, 1.04, 1]);

  const favOpacity = useTransform(progress, [0.56, 0.66], [0, 1]);
  const favY = useTransform(progress, [0.56, 0.68], [20, 0]);
  const classOpacity = useTransform(progress, [0.62, 0.72], [0, 1]);
  const classY = useTransform(progress, [0.62, 0.74], [20, 0]);

  if (slot === "hero") {
    return (
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap: px(AppSpacing.three), paddingBlock: px(AppSpacing.two) }}
      >
        <motion.p
          style={{
            opacity: headingOpacity,
            fontSize: px(AppType.sectionTitle.size),
            fontWeight: AppType.sectionTitle.weight,
            color: AppColors.text,
          }}
        >
          Student ID
        </motion.p>
        <motion.div style={{ opacity: cardOpacity, y: cardY, scale: cardScale }} className="w-full">
          <StudentIdCard />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-x-0 top-0 flex flex-col"
      style={{ paddingTop: px(AppSpacing.four), paddingInline: px(AppSpacing.four), gap: px(AppSpacing.five) }}
    >
      <motion.div style={{ opacity: favOpacity, y: favY }}>
        <FavouritesRow />
      </motion.div>

      <motion.div style={{ opacity: classOpacity, y: classY, display: "flex", flexDirection: "column", gap: px(AppSpacing.three) }}>
        <div className="flex items-center justify-between">
          <span
            style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}
          >
            Daily Overview
          </span>
          <FiChevronUp size={px(20)} color={AppColors.text} />
        </div>
        <div className="flex flex-col" style={{ gap: px(AppSpacing.three) }}>
          {CLASSES.map((c) => (
            <ClassCard key={c.code} {...c} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
