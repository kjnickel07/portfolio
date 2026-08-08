import { colophon, site } from "@/lib/content";
import { Section } from "@/components/layout/section";
import { BlurIn } from "@/components/motion/blur-in";

/**
 * Closing section — contact links and a short note on how the site was
 * built. The last word is typographic, same as the first.
 */
export function Colophon() {
  return (
    <Section id="colophon" heading={colophon.heading} hairlineTop aria-label="Contact and colophon">
      <div className="flex flex-col gap-[32px] md:flex-row md:justify-between">
        <BlurIn className="reading-measure">
          {colophon.paragraphs.map((p) => (
            <p key={p} className="text-body-sm text-ink">
              {p}
            </p>
          ))}
        </BlurIn>

        <nav aria-label="Contact" className="flex flex-col gap-[8px]">
          {colophon.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm text-link underline decoration-1 underline-offset-4 hover:text-stamp"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="mt-[64px] text-caption text-ink/60">
        © {new Date().getFullYear()} {site.name}. {site.location}.
      </p>
    </Section>
  );
}
