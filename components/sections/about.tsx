import { about } from "@/lib/content";
import { Section } from "@/components/layout/section";
import { ReadingColumn } from "@/components/layout/reading-column";
import { BlurIn } from "@/components/motion/blur-in";
import { Parallax } from "@/components/motion/parallax";

const marginalia = [
  { text: "Sydney, Australia", rate: 26 },
  { text: "UNSW Software Engineering", rate: -18 },
  { text: "Service UNSW · TerraCast", rate: 20 },
];

/**
 * Editorial bio — reads as the opening page of a monograph, not a bullet
 * list. Marginalia in the right gutter drifts at its own slow parallax
 * rate, the one place the printed-page device shows up directly.
 */
export function About() {
  return (
    <Section
      id="about"
      heading={about.heading}
      hairlineTop
      aria-label="About"
    >
      <ReadingColumn
        marginalia={
          <div className="flex flex-col gap-[64px]">
            {marginalia.map((note) => (
              <Parallax key={note.text} rate={note.rate}>
                <p className="text-caption text-ink/70">{note.text}</p>
              </Parallax>
            ))}
          </div>
        }
      >
        <div className="flex flex-col gap-[16px]">
          {about.paragraphs.map((paragraph, i) => (
            <BlurIn key={paragraph} delay={i * 0.08}>
              <p className="text-body text-ink">{paragraph}</p>
            </BlurIn>
          ))}
        </div>
      </ReadingColumn>
    </Section>
  );
}
