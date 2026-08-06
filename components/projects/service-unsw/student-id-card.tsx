import { IoPersonOutline } from "react-icons/io5";
import { AppColors, AppStudentIdCard } from "./app-reference";
import { StudentIdBackdrop } from "./student-id-backdrop";
import { usePx } from "./phone-scale-context";

/**
 * The compact student ID card shown on the home banner — ported from the
 * real `student-id-card.tsx` (non-detailed variant): 60% width, 27:17
 * aspect ratio, the card-variant backdrop, a person-icon photo box on the
 * left, student number / name / faculty stacked on the right.
 */
export function StudentIdCard() {
  const px = usePx();

  return (
    <div
      className="relative mx-auto flex overflow-hidden bg-white"
      style={{
        width: "60%",
        aspectRatio: AppStudentIdCard.aspect,
        padding: px(AppStudentIdCard.padding),
        borderRadius: px(AppStudentIdCard.radius),
        boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
      }}
    >
      <StudentIdBackdrop variant="card" />

      <div className="relative z-10 flex items-center justify-center" style={{ width: "40%" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: px(AppStudentIdCard.photoWidth),
            height: px(AppStudentIdCard.photoHeight),
            borderRadius: px(AppStudentIdCard.photoRadius),
            backgroundColor: AppColors.backgroundSelected,
          }}
        >
          <IoPersonOutline size={px(AppStudentIdCard.photoIconSize)} color={AppColors.textSecondary} />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center" style={{ gap: px(8) }}>
        <p style={{ fontSize: px(10), color: AppColors.textSecondary }} className="truncate">
          STUDENT{" "}
          <span style={{ fontWeight: 700, color: AppColors.text }}>z1234567</span>
        </p>
        <p style={{ fontSize: px(13), lineHeight: `${px(17)}px`, fontWeight: 700, color: AppColors.text }}>
          John William
          <br />
          SMITH
        </p>
        <p style={{ fontSize: px(10), color: AppColors.textSecondary }}>ENG UG</p>
      </div>
    </div>
  );
}
