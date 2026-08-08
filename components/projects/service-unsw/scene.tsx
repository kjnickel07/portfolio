"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { FiBookOpen, FiCalendar, FiHome, FiLink, FiMapPin } from "react-icons/fi";
import { serviceUnsw } from "@/lib/content";
import { useSectionProgress } from "@/lib/use-section-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Phone } from "./phone";
import { AppHeader } from "./app-header";
import { StudentIdCard } from "./student-id-card";
import { FavouritesRow } from "./favourites-row";
import { ClassCard } from "./class-card";
import { AppColors, AppSpacing, AppTabBar, AppType } from "./app-reference";
import { usePhoneScale } from "./use-phone-scale";
import { PhoneScaleProvider, usePx } from "./phone-scale-context";
import { LineReveal } from "@/components/motion/line-reveal";
import { Hairline } from "@/components/layout/hairline";

/**
 * The centrepiece: a 500vh scroll-driven scene. A sticky stage pins the
 * phone and a caption column while the user scrolls through five beats —
 * arrival, turn, morph, settle, release — documented in use-phone-scene.ts.
 *
 * Under reduced motion the phone renders its fully-settled home state and
 * nothing here subscribes to scroll.
 */
export function ServiceUnswScene() {
  const reduced = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>();

  // A single, persistently-mounted section carries `ref` regardless of the
  // reduced-motion branch — useScroll's target must never unmount/remount
  // as `reduced` resolves after hydration, or it briefly observes a null
  // ref. See motion.dev/troubleshooting/use-scroll-ref.
  return (
    <section
      id={serviceUnsw.id}
      ref={ref}
      aria-label={`Case study: ${serviceUnsw.name}`}
      className={reduced ? "px-[24px] py-[64px] md:px-[32px]" : "relative h-[500vh]"}
    >
      {reduced ? (
        <StaticSummary />
      ) : (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-[24px] md:px-[32px]">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-[48px] lg:grid-cols-[minmax(0,440px)_1fr]">
            <div>
              <p className="mb-[8px] text-caption text-link">{serviceUnsw.eyebrow}</p>
              <h2 className="mb-[8px] text-heading font-bold text-ink">{serviceUnsw.name}</h2>
              <p className="mb-[32px] text-body-sm text-ink/70">{serviceUnsw.role}</p>
              <Hairline className="mb-[32px] max-w-[320px]" />
              <Beats progress={progress} />
            </div>
            <div>
              <Phone progress={progress} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Each beat's visible range, matched directly to the phone's own beats in
 * use-phone-scene.ts (arrival/turn, morph, settle/release) — stops/values
 * pairs for opacity, a small y-drift and a blur-to-sharp settle, so the
 * caption column reads as driven by the same instrument as the phone
 * rather than three discrete slides crossfading on their own timeline.
 */
const BEAT_RANGES: { stops: number[]; opacity: number[]; y: number[]; blur: number[] }[] = [
  { stops: [0, 0.22, 0.3], opacity: [1, 1, 0], y: [0, 0, -10], blur: [0, 0, 3] },
  { stops: [0.18, 0.26, 0.34, 0.42], opacity: [0, 1, 1, 0], y: [10, 0, 0, -10], blur: [3, 0, 0, 3] },
  { stops: [0.36, 0.46, 1], opacity: [0, 1, 1], y: [10, 0, 0], blur: [3, 0, 0] },
];

function Beats({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative min-h-[160px]">
      {serviceUnsw.beats.map((beat, i) => (
        <Beat key={beat.title} beat={beat} progress={progress} range={BEAT_RANGES[i]} />
      ))}
    </div>
  );
}

function Beat({
  beat,
  progress,
  range,
}: {
  beat: (typeof serviceUnsw.beats)[number];
  progress: MotionValue<number>;
  range: (typeof BEAT_RANGES)[number];
}) {
  const opacity = useTransform(progress, range.stops, range.opacity);
  const y = useTransform(progress, range.stops, range.y);
  const blur = useTransform(progress, range.stops, range.blur);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y, filter }}>
      <p className="mb-[8px] text-caption text-link">{beat.range}</p>
      <p className="mb-[8px] text-subheading font-semibold text-ink">{beat.title}</p>
      <p className="reading-measure text-body-sm text-ink">{beat.body}</p>
    </motion.div>
  );
}

function StaticSummary() {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[48px] lg:grid-cols-[minmax(0,440px)_1fr]">
      <div>
        <p className="mb-[8px] text-caption text-link">{serviceUnsw.eyebrow}</p>
        <LineReveal as="h2" className="mb-[8px] text-heading font-bold text-ink">
          {serviceUnsw.name}
        </LineReveal>
        <p className="mb-[32px] text-body-sm text-ink/70">{serviceUnsw.role}</p>
        <Hairline className="mb-[32px] max-w-[320px]" />
        <p className="reading-measure mb-[24px] text-body-sm text-ink">{serviceUnsw.summary}</p>
        <ul className="flex flex-col gap-[8px]">
          {serviceUnsw.beats.map((beat) => (
            <li key={beat.title}>
              <p className="text-caption text-link">{beat.range}</p>
              <p className="text-body-sm font-semibold text-ink">{beat.title}</p>
              <p className="text-body-sm text-ink/75">{beat.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="opacity-100">
        <PhoneStatic />
      </div>
    </div>
  );
}

const STATIC_CLASSES = [
  { code: "COMP1111", type: "Tutorial", time: "1–2pm", location: "SEB 100", color: AppColors.classBlue },
  { code: "COMP2222", type: "Lecture", time: "4–6pm", location: "Mathews\nTheatre A", color: AppColors.classPink },
];

const STATIC_TABS = [
  { label: "Home", Icon: FiHome, active: true },
  { label: "Schedule", Icon: FiCalendar, active: false },
  { label: "Map", Icon: FiMapPin, active: false },
  { label: "Bookings", Icon: FiBookOpen, active: false },
  { label: "Links", Icon: FiLink, active: false },
];

/**
 * Reduced-motion path never mounts a scroll-linked Phone; a plain,
 * non-animated replica of the settled home screen stands in, reusing the
 * same real components as the animated Phone (AppHeader, StudentIdCard,
 * FavouritesRow, ClassCard) so the accessible fallback is equally
 * faithful to the real app, not a separate lower-fidelity mockup.
 */
function PhoneStatic() {
  const screenRef = useRef<HTMLDivElement>(null);
  const scale = usePhoneScale(screenRef);

  return (
    <div className="mx-auto w-[clamp(220px,26vw,300px)] overflow-hidden rounded-[44px] border-[6px] border-device bg-white">
      <div ref={screenRef}>
        <PhoneScaleProvider scale={scale}>
          <AppHeader />

          <div
            className="flex flex-col items-center"
            style={{ backgroundColor: AppColors.accent, gap: 16 * scale, paddingBlock: 24 * scale }}
          >
            <p style={{ fontSize: AppType.sectionTitle.size * scale, fontWeight: 600, color: AppColors.text }}>
              Student ID
            </p>
            <div className="w-full">
              <StudentIdCard />
            </div>
          </div>

          <div
            className="flex flex-col"
            style={{ paddingInline: AppSpacing.four * scale, paddingBlock: AppSpacing.four * scale, gap: AppSpacing.five * scale }}
          >
            <FavouritesRow />

            <div className="flex flex-col" style={{ gap: AppSpacing.three * scale }}>
              <p style={{ fontSize: AppType.sectionTitle.size * scale, fontWeight: 600, color: AppColors.text }}>
                Daily Overview
              </p>
              <div className="flex flex-col" style={{ gap: AppSpacing.three * scale }}>
                {STATIC_CLASSES.map((c) => (
                  <ClassCard key={c.code} {...c} />
                ))}
              </div>
            </div>
          </div>

          <StaticTabBar scale={scale} />
        </PhoneScaleProvider>
      </div>
    </div>
  );
}

function StaticTabBar({ scale }: { scale: number }) {
  const px = usePx();
  return (
    <div
      className="mx-auto flex overflow-hidden bg-white"
      style={{
        width: `calc(100% - ${40 * scale}px)`,
        marginBottom: 20 * scale,
        height: px(AppTabBar.height),
        borderRadius: px(AppTabBar.radius),
        boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
      }}
    >
      {STATIC_TABS.map(({ label, Icon, active }) => (
        <div key={label} className="relative flex flex-1 flex-col items-center justify-center" style={{ gap: px(2) }}>
          {active && (
            <div
              className="absolute top-0"
              style={{
                height: px(AppTabBar.indicatorHeight),
                width: `${AppTabBar.indicatorWidthPercent}%`,
                backgroundColor: AppColors.accent,
                borderBottomLeftRadius: px(4),
                borderBottomRightRadius: px(4),
              }}
            />
          )}
          <Icon size={px(AppTabBar.iconSize)} color={active ? AppColors.text : AppColors.textSecondary} />
          <span style={{ fontSize: px(AppTabBar.labelSize), fontWeight: active ? 600 : 400, color: active ? AppColors.text : AppColors.textSecondary }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
