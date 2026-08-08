"use client";

import { terracast } from "@/lib/content";
import { useSectionProgress } from "@/lib/use-section-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useVineGrowth } from "./use-vine-growth";
import { Vine, STEM_SEGMENTS, BRANCHES, TENDRILS, LEAVES, GRAPES } from "./vine";
import { LeafShape } from "./leaf";
import { GrapeBunch, STALK_WIDTH } from "./grapes";
import { VinePalette } from "./vine-palette";
import { Particles } from "./particles";
import { RiskLine } from "./risk-line";
import { Hairline } from "@/components/layout/hairline";

/**
 * A 400vh scroll-driven scene: ink-line vines grow up both edges of the
 * viewport as the reading column delivers the case study, framing it
 * without ever crossing into the text.
 */
export function TerracastScene() {
  const reduced = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const growth = useVineGrowth(progress);

  const content = (
    <div className="relative z-10 mx-auto max-w-[560px] text-center">
      <p className="mb-[8px] text-caption text-link">{terracast.eyebrow}</p>
      <h2 className="mb-[24px] text-heading font-bold text-ink">{terracast.name}</h2>

      <div className="mx-auto mb-[24px] flex justify-center">
        <RiskLine progress={progress} />
      </div>

      <Hairline className="mx-auto mb-[24px] max-w-[240px]" />

      <div className="flex flex-col gap-[16px] text-left">
        {terracast.paragraphs.map((p) => (
          <p key={p} className="text-body-sm text-ink">
            {p}
          </p>
        ))}
      </div>

      <ul className="mt-[24px] flex flex-wrap justify-center gap-x-[16px] gap-y-[4px]">
        {terracast.stack.map((s) => (
          <li key={s} className="text-caption text-ink/70">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  // A single, persistently-mounted section carries `ref` regardless of the
  // reduced-motion branch — useScroll's target must never unmount/remount
  // as `reduced` resolves after hydration, or it briefly observes a null
  // ref. See motion.dev/troubleshooting/use-scroll-ref.
  return (
    <section
      id={terracast.id}
      ref={ref}
      aria-label={`Case study: ${terracast.name}`}
      className={reduced ? "relative overflow-hidden px-[24px] py-[64px] md:px-[32px]" : "relative h-[400vh]"}
    >
      {reduced ? (
        <>
          <StaticVine side="left" />
          <StaticVine side="right" />
          {content}
        </>
      ) : (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-[24px] md:px-[32px]">
          <Vine side="left" growth={growth} />
          <Vine side="right" growth={growth} />
          <Particles />
          {content}
        </div>
      )}
    </section>
  );
}

/**
 * Plain, non-animated vine for the reduced-motion path — fully grown, no
 * wind sway, no scroll dependency. Reuses the same geometry, palette and
 * grape-bunch layout as the animated Vine so the two read as the same
 * illustration.
 */
function StaticVine({ side }: { side: "left" | "right" }) {
  const allSegments = [...STEM_SEGMENTS, ...BRANCHES.flatMap((b) => b.segments)];

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-0 hidden h-full w-[76px] md:block md:w-[112px] ${side === "left" ? "left-0" : "right-0"}`}
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <svg viewBox="0 0 76 800" preserveAspectRatio="xMidYMax slice" className="h-full w-full overflow-visible">
        {allSegments.map((segment, i) => (
          <path key={i} d={segment.d} stroke={VinePalette.stem} strokeWidth={segment.width} strokeLinecap="round" fill="none" />
        ))}

        {TENDRILS.map((tendril, i) => (
          <path
            key={i}
            d="M0,0 C5,-2 8,1 7,5 C6,9 1,10 -1,7 C-3,4 -1,1 2,1 C4,1 5,3 3,4"
            stroke={VinePalette.tendril}
            strokeWidth={0.7}
            strokeLinecap="round"
            fill="none"
            transform={`translate(${tendril.x} ${tendril.y}) rotate(${tendril.rotate})`}
          />
        ))}

        {LEAVES.map((leaf, i) => (
          <g
            key={i}
            transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.flip ? -1 : 1}, 1)`}
          >
            <LeafShape />
          </g>
        ))}

        {GRAPES.map((grape, i) => (
          <g key={i} transform={`translate(${grape.x} ${grape.y})`}>
            <path
              d={grape.stalk}
              stroke={VinePalette.stem}
              strokeWidth={STALK_WIDTH}
              strokeLinecap="round"
              fill="none"
            />
            <g
              transform={`translate(${grape.bunch.dx} ${grape.bunch.dy}) rotate(${grape.bunch.rotate}) scale(${grape.bunch.scale})`}
            >
              <GrapeBunch />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
