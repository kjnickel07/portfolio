"use client";

import { diseaseMcp } from "@/lib/content";
import { useSectionProgress } from "@/lib/use-section-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ModelGraph } from "./model-graph";
import { Hairline } from "@/components/layout/hairline";

/**
 * A quieter 200vh scene, deliberately understated so the two flagship
 * case studies keep the spotlight — a diagram in ink and hairlines, not
 * another chart.
 */
export function DiseaseMcpScene() {
  const reduced = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>();

  const content = (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-[48px] lg:grid-cols-[minmax(0,480px)_1fr]">
      <div>
        <p className="mb-[8px] text-caption text-link">{diseaseMcp.eyebrow}</p>
        <h2 className="mb-[8px] text-heading font-bold text-ink">{diseaseMcp.name}</h2>
        <p className="mb-[24px] text-body-sm text-ink/60">{diseaseMcp.role}</p>
        <Hairline className="mb-[24px] max-w-[320px]" />
        <p className="reading-measure mb-[24px] text-body-sm text-ink">{diseaseMcp.summary}</p>
        <ul className="flex flex-col gap-[4px]">
          {diseaseMcp.tools.map((tool) => (
            <li key={tool} className="text-caption text-ink/60">
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <div>{reduced ? <StaticGraph /> : <ModelGraph progress={progress} />}</div>
    </div>
  );

  // A single, persistently-mounted section carries `ref` regardless of the
  // reduced-motion branch — useScroll's target must never unmount/remount
  // as `reduced` resolves after hydration, or it briefly observes a null
  // ref. See motion.dev/troubleshooting/use-scroll-ref.
  return (
    <section
      id={diseaseMcp.id}
      ref={ref}
      aria-label={diseaseMcp.name}
      className={reduced ? "px-[24px] py-[64px] md:px-[32px]" : "relative h-[200vh]"}
    >
      {reduced ? content : <div className="sticky top-0 flex h-screen items-center px-[24px] md:px-[32px]">{content}</div>}
    </section>
  );
}

function StaticGraph() {
  const policy = diseaseMcp.policies[1];
  return (
    <div className="mx-auto flex max-w-[360px] flex-col items-center gap-[8px] text-center">
      <p className="text-caption font-semibold text-ink">{policy.label}</p>
      <p className="text-caption text-ink/60">{policy.note}</p>
    </div>
  );
}
