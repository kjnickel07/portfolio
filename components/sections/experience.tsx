import { experience } from "@/lib/content";
import { Section } from "@/components/layout/section";
import { Hairline } from "@/components/layout/hairline";
import { StaggerGroup } from "@/components/motion/stagger-group";

/**
 * Editorial CV — typography only, no logos. Hairlines draw between roles
 * instead of a table or card grid.
 */
export function Experience() {
  return (
    <Section id="experience" heading={experience.heading} hairlineTop>
      <StaggerGroup className="flex flex-col" amount={0.06} y={16}>
        {experience.roles.map((role, i) => (
          <div key={role.title} className="grid grid-cols-1 gap-[8px] py-[32px] md:grid-cols-[minmax(0,320px)_1fr]">
            <div>
              <p className="text-body-sm font-semibold text-ink">{role.title}</p>
              <p className="text-caption text-ink/70">
                {role.org} · {role.period}
              </p>
            </div>
            <p className="reading-measure text-body-sm text-ink">{role.description}</p>
            {i < experience.roles.length - 1 && (
              <div className="md:col-span-2">
                <Hairline />
              </div>
            )}
          </div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
