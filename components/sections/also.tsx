import { also } from "@/lib/content";
import { Section } from "@/components/layout/section";
import { Hairline } from "@/components/layout/hairline";
import { Parallax } from "@/components/motion/parallax";

/**
 * A short index of smaller work. Each row drifts horizontally at its own
 * rate as it crosses the viewport — alternating direction — so the list
 * reads as layered rather than stacked.
 */
export function Also() {
  return (
    <Section id="also" heading={also.heading} hairlineTop>
      <div className="flex flex-col">
        {also.items.map((item, i) => (
          <div key={item.title}>
            <Parallax rate={i % 2 === 0 ? 18 : -18} axis="x" className="py-[24px]">
              {item.href ? (
                <a href={item.href} className="grid grid-cols-1 gap-[8px] md:grid-cols-[minmax(0,320px)_1fr]">
                  <p className="text-body-sm font-semibold text-link underline decoration-1 underline-offset-4">
                    {item.title}
                  </p>
                  <p className="reading-measure text-body-sm text-ink">{item.description}</p>
                </a>
              ) : (
                <div className="grid grid-cols-1 gap-[8px] md:grid-cols-[minmax(0,320px)_1fr]">
                  <p className="text-body-sm font-semibold text-ink">{item.title}</p>
                  <p className="reading-measure text-body-sm text-ink">{item.description}</p>
                </div>
              )}
            </Parallax>
            {i < also.items.length - 1 && <Hairline />}
          </div>
        ))}
      </div>
    </Section>
  );
}
