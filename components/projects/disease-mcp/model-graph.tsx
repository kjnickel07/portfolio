"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { diseaseMcp } from "@/lib/content";

interface ModelGraphProps {
  progress: MotionValue<number>;
}

const MODELS = [
  { label: "Aggressive", x: 40 },
  { label: "Balanced", x: 160 },
  { label: "Conservative", x: 280 },
] as const;

/**
 * Three model nodes on hairlines. As the decision policy steps through
 * minimize_misses → balanced → minimize_false_alarms, the edge to the
 * matching model thickens while the others thin — a diagram, not a chart,
 * deliberately quieter than the phone and the vines.
 */
export function ModelGraph({ progress }: ModelGraphProps) {
  const steppedIndex = useTransform(progress, (v): number => (v < 0.36 ? 0 : v < 0.64 ? 1 : 2));

  return (
    <div className="mx-auto w-full max-w-[360px]">
      <svg viewBox="0 0 320 140" className="w-full" aria-hidden>
        <circle cx="160" cy="16" r="5" fill="#222222" />
        {MODELS.map((model, i) => (
          <Edge key={model.label} x={model.x} index={i} steppedIndex={steppedIndex} />
        ))}
        {MODELS.map((model) => (
          <g key={model.label}>
            <circle cx={model.x} cy="120" r="5" fill="#222222" />
            <text x={model.x} y="138" textAnchor="middle" fontSize="9" fill="#222222">
              {model.label}
            </text>
          </g>
        ))}
      </svg>
      <PolicyLabel steppedIndex={steppedIndex} />
    </div>
  );
}

function Edge({ x, index, steppedIndex }: { x: number; index: number; steppedIndex: MotionValue<number> }) {
  const strokeWidth = useTransform(steppedIndex, (v) => (v === index ? 2.5 : 0.75));
  const opacity = useTransform(steppedIndex, (v) => (v === index ? 1 : 0.3));

  return <motion.line x1="160" y1="16" x2={x} y2="120" stroke="#222222" style={{ strokeWidth, opacity }} />;
}

function PolicyLabel({ steppedIndex }: { steppedIndex: MotionValue<number> }) {
  return (
    <div className="relative mt-[16px] min-h-[40px] text-center">
      {diseaseMcp.policies.map((policy, i) => (
        <PolicyNote key={policy.key} policy={policy} index={i} steppedIndex={steppedIndex} />
      ))}
    </div>
  );
}

function PolicyNote({
  policy,
  index,
  steppedIndex,
}: {
  policy: (typeof diseaseMcp.policies)[number];
  index: number;
  steppedIndex: MotionValue<number>;
}) {
  const opacity = useTransform(steppedIndex, (v) => (v === index ? 1 : 0));

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity }}>
      <p className="text-caption font-semibold text-ink">{policy.label}</p>
      <p className="text-caption text-ink/60">{policy.note}</p>
    </motion.div>
  );
}
