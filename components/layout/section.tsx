import type { ReactNode } from "react";
import { LineReveal } from "@/components/motion/line-reveal";
import { Hairline } from "@/components/layout/hairline";

interface SectionProps {
  id?: string;
  heading?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  hairlineTop?: boolean;
  "aria-label"?: string;
}

/**
 * Standard vertical rhythm wrapper — 64–135px of padding stands in for a
 * divider, per the reference's "whitespace, not chrome" rule. `hairlineTop`
 * opts into a single drawn rule above the heading for sections that want a
 * beat of separation without introducing a second visual device.
 */
export function Section({
  id,
  heading,
  eyebrow,
  children,
  className = "",
  hairlineTop = false,
  "aria-label": ariaLabel,
}: SectionProps) {
  const headingId = heading && id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      className={`py-[64px] px-[24px] md:px-[32px] md:py-[96px] lg:py-[135px] ${className}`}
      aria-labelledby={headingId}
      aria-label={!headingId ? ariaLabel : undefined}
    >
      <div className="mx-auto max-w-[1200px]">
        {hairlineTop && <Hairline className="mb-[64px]" />}
        {(eyebrow || heading) && (
          <div className="mb-[32px]">
            {eyebrow && <p className="text-caption text-link mb-[8px]">{eyebrow}</p>}
            {heading && (
              <LineReveal as="h2" id={headingId} className="text-heading font-bold text-ink">
                {heading}
              </LineReveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
