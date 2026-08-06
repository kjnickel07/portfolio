"use client";

import { terracast } from "@/lib/content";
import { useSectionProgress } from "@/lib/use-section-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useVineGrowth } from "./use-vine-growth";
import { Vine, STEM_SEGMENTS, BRANCHES, TENDRILS, LEAVES, GRAPES } from "./vine";
import { LEAF_PATH } from "./leaf";
import { GRAPE_LAYOUT } from "./grapes";
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
          <li key={s} className="text-caption text-ink/60">
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
            <path d={LEAF_PATH} fill={VinePalette.leaf} fillOpacity={0.9} />
            <path d={LEAF_PATH} fill={VinePalette.leafDark} fillOpacity={0.22} transform="translate(1.2 0.8)" />
          </g>
        ))}

        {GRAPES.map((grape, i) => (
          <g key={i} transform={`translate(${grape.x} ${grape.y}) rotate(${grape.rotate})`}>
            {GRAPE_LAYOUT.map((dot, j) => (
              <g key={j} transform={`translate(${dot.x} ${dot.y})`}>
                <circle
                  r={dot.r}
                  fill={dot.tone === "back" ? VinePalette.grapeBack : dot.tone === "mid" ? VinePalette.grapeMid : VinePalette.grapeFront}
                  fillOpacity={dot.tone === "back" ? 0.85 : 0.95}
                />
                {dot.tone === "front" && (
                  <ellipse
                    cx={-dot.r * 0.32}
                    cy={-dot.r * 0.38}
                    rx={dot.r * 0.34}
                    ry={dot.r * 0.24}
                    fill={VinePalette.grapeHighlight}
                    fillOpacity={0.4}
                  />
                )}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
