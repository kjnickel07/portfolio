"use client";

import { useRef } from "react";
import { serviceUnsw } from "@/lib/content";
import { useSectionProgress } from "@/lib/use-section-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Phone } from "./phone";
import { AppHeader } from "./app-header";
import { StudentIdCard } from "./student-id-card";
import { FavouritesRow } from "./favourites-row";
import { ClassCard } from "./class-card";
import { CLASSES } from "./home-screen";
import { TABS } from "./tab-bar";
import { AppColors, AppSpacing, AppTabBar, AppType } from "./app-reference";
import { usePhoneScale } from "./use-phone-scale";
import { PhoneScaleProvider, usePx } from "./phone-scale-context";
import { LineReveal } from "@/components/motion/line-reveal";
import { BlurIn } from "@/components/motion/blur-in";
import { Hairline } from "@/components/layout/hairline";

/**
 * The centrepiece. The phone column stays in view for the whole section
 * (sticky) while the heading and the three captions scroll past it in
 * normal flow, so the page keeps moving as the phone drops: the copy rises,
 * the phone descends. The drop itself (hold, one smooth turn with the
 * login-to-home cut, landing, hold) is documented in use-phone-scene.ts.
 * The captions' spacing sets the section height and so the scroll
 * distance: taller caption slots read slower.
 *
 * Under reduced motion the phone renders its settled home state and
 * nothing here subscribes to scroll.
 */
export function ServiceUnswScene() {
  const reduced = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>();

  // A single, persistently-mounted section carries `ref` regardless of the
  // reduced-motion branch. useScroll's target must never unmount/remount
  // as `reduced` resolves after hydration, or it briefly observes a null
  // ref. See motion.dev/troubleshooting/use-scroll-ref.
  return (
    <section
      id={serviceUnsw.id}
      ref={ref}
      aria-label={`Case study: ${serviceUnsw.name}`}
      className={reduced ? "px-[24px] py-[64px] md:px-[32px]" : "relative"}
    >
      {reduced ? (
        <StaticSummary />
      ) : (
        <div className="mx-auto flex max-w-[1200px] flex-col px-[24px] md:px-[32px] lg:grid lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-[48px]">
          {/* Phone stage: pinned for the section's duration. On small
              screens it takes the top of the viewport and the copy scrolls
              beneath it; at lg it is the right-hand column. */}
          <div className="sticky top-0 z-10 h-[55dvh] overflow-hidden bg-paper lg:order-last lg:h-[100dvh] lg:bg-transparent">
            <Phone progress={progress} />
          </div>

          {/* Copy, in flow. Each caption sits in its own tall slot so it
              arrives as the phone reaches the matching beat. */}
          <div className="pb-[64px] pt-[24px] lg:pt-[112px]">
            <p className="mb-[8px] text-caption text-link">{serviceUnsw.eyebrow}</p>
            <LineReveal as="h2" className="mb-[8px] text-heading font-bold text-ink">
              {serviceUnsw.name}
            </LineReveal>
            <p className="mb-[32px] text-body-sm text-ink/70">{serviceUnsw.role}</p>
            <Hairline className="max-w-[320px]" />

            {serviceUnsw.beats.map((beat) => (
              <div key={beat.title} className="flex min-h-[70dvh] items-center lg:min-h-[110dvh]">
                <BlurIn>
                  <p className="mb-[8px] text-caption text-link">{beat.range}</p>
                  <p className="mb-[8px] text-subheading font-semibold text-ink">{beat.title}</p>
                  <p className="reading-measure text-body-sm text-ink">{beat.body}</p>
                </BlurIn>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
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

/**
 * Reduced-motion path never mounts a scroll-linked Phone; a plain,
 * non-animated replica of the settled home screen stands in, reusing the
 * same real components and the same class/tab data as the animated
 * HomeScreen and TabBar, so the accessible fallback is equally faithful.
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
                {CLASSES.map((c) => (
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
      {TABS.map(({ label, Icon }, i) => {
        const active = i === 0;
        return (
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
        );
      })}
    </div>
  );
}
