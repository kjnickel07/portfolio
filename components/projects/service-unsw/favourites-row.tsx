import { IoBookOutline, IoChevronForward, IoCreateOutline, IoPlanetOutline } from "react-icons/io5";
import { AppColors, AppFavourites, AppSpacing, AppType } from "./app-reference";
import { usePx } from "./phone-scale-context";

const FAVOURITES = [
  { label: "Handbook", Icon: IoBookOutline },
  { label: "Nucleus", Icon: IoPlanetOutline },
] as const;

/**
 * The Favourites section — ported from `favourites-section.tsx` +
 * `favourite-card.tsx`: a sectionTitle header row with the edit icon, a
 * horizontal row of 200×116 cards, and the floating scroll-forward pill.
 * The real placeholder favourites (Handbook, Nucleus) with their real
 * icons, not generic stand-ins.
 */
export function FavouritesRow() {
  const px = usePx();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: px(AppSpacing.three) }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: px(AppType.sectionTitle.size), fontWeight: AppType.sectionTitle.weight, color: AppColors.text }}>
          Favourites
        </span>
        <IoCreateOutline size={px(AppFavourites.editIconSize)} color={AppColors.text} />
      </div>

      <div className="relative">
        <div className="flex" style={{ gap: px(AppSpacing.two) }}>
          {FAVOURITES.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center justify-center"
              style={{
                backgroundColor: AppColors.backgroundSelected,
                borderRadius: px(AppFavourites.cardRadius),
                paddingBlock: px(AppSpacing.three),
                paddingInline: px(AppSpacing.three),
                minHeight: px(AppFavourites.cardMinHeight),
                gap: px(AppSpacing.two),
              }}
            >
              <Icon size={px(AppFavourites.iconSize)} color={AppColors.text} />
              <span style={{ fontSize: px(AppFavourites.labelSize), fontWeight: 500, color: AppColors.text }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="absolute flex items-center justify-center bg-white"
          style={{
            right: 0,
            top: "50%",
            transform: `translateY(-50%)`,
            borderRadius: px(10),
            padding: px(AppSpacing.one),
            boxShadow: "0 1px 8px rgba(0,0,0,0.14)",
          }}
        >
          <IoChevronForward size={px(18)} color={AppColors.text} />
        </div>
      </div>
    </div>
  );
}
