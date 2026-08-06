import { AppClassCard, AppColors, AppSpacing } from "./app-reference";
import { usePx } from "./phone-scale-context";

interface ClassCardProps {
  code: string;
  type: string;
  time: string;
  location: string;
  color: string;
}

/**
 * Ported from `class-card.tsx`: coloured background per course, code +
 * italic class-type on one line, time below, location as an underlined
 * `linkPrimary` link on the right.
 */
export function ClassCard({ code, type, time, location, color }: ClassCardProps) {
  const px = usePx();

  return (
    <div
      className="flex items-start justify-between"
      style={{
        backgroundColor: color,
        borderRadius: px(AppClassCard.radius),
        padding: px(AppSpacing.three),
        minHeight: px(AppClassCard.minHeight),
        gap: px(AppSpacing.two),
      }}
    >
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: px(AppClassCard.codeSize), fontWeight: 700, color: AppColors.text }}>
          {code} <span style={{ fontWeight: 400, fontStyle: "italic" }}>{type}</span>
        </p>
        <p style={{ fontSize: px(AppClassCard.timeSize), color: AppColors.text, marginTop: px(2) }}>{time}</p>
      </div>

      <p
        style={{
          fontSize: px(AppClassCard.locationSize),
          color: AppColors.link,
          textDecorationLine: "underline",
          textAlign: "right",
          maxWidth: "40%",
          whiteSpace: "pre-line",
        }}
      >
        {location}
      </p>
    </div>
  );
}
