import { BACKDROP_BANNER_POLYGONS, BACKDROP_CARD_POLYGONS } from "./app-reference";

interface StudentIdBackdropProps {
  /** 'banner' — large shapes behind "Student ID" on the yellow home banner.
   *  'card'   — smaller, more translucent shapes on the white ID card. */
  variant?: "banner" | "card";
}

/**
 * The real app's decorative backdrop of irregular, overlapping angular
 * shards — ported exactly (same polygon points, fills and opacities) from
 * `student-id-backdrop.tsx` in the serviceUNSW source. This one visual is
 * one of the most immediately recognisable parts of the real app.
 */
export function StudentIdBackdrop({ variant = "banner" }: StudentIdBackdropProps) {
  const polygons = variant === "banner" ? BACKDROP_BANNER_POLYGONS : BACKDROP_CARD_POLYGONS;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 600 340"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {polygons.map((polygon, i) => (
        <polygon key={i} points={polygon.points} fill={polygon.fill} fillOpacity={polygon.opacity} />
      ))}
    </svg>
  );
}
