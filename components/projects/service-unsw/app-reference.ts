/**
 * Values ported verbatim from the real serviceUNSW source
 * (`~/Desktop/ServiceUNSW/src/constants/theme.ts` and the components
 * listed in each block below) so the phone mockup's proportions are
 * derived from the actual app, not hand-picked to "look about right."
 *
 * Every screen renders at these real point values, then the whole thing
 * is scaled uniformly by `usePhoneScale` — see that file for why.
 */

// theme.ts — Colors.light (light mode only; the portfolio has no dark mode)
export const AppColors = {
  text: "#21201F",
  background: "#ffffff",
  backgroundSelected: "#EDF0F9",
  textSecondary: "#60646C",
  accent: "#FFDC00",
  classBlue: "#DCE9F5",
  classPink: "#f6dfe8",
  link: "#3c87f7",
} as const;

// theme.ts — Spacing
export const AppSpacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

// theme.ts — Typography (fontSize / lineHeight / fontWeight)
export const AppType = {
  sectionTitle: { size: 28, lineHeight: 32, weight: 600 },
  title: { size: 24, lineHeight: 30, weight: 600 },
  subtitle: { size: 20, lineHeight: 26, weight: 600 },
  body: { size: 16, lineHeight: 22, weight: 400 },
  button: { size: 16, lineHeight: 22, weight: 500 },
  caption: { size: 14, lineHeight: 18, weight: 400 },
} as const;

// signin.tsx — styles.input / styles.submitButton / styles.formSheet / styles.hero
export const AppLogin = {
  inputHeight: 46,
  inputRadius: 12,
  inputBorderWidth: 1.5,
  buttonHeight: 48,
  buttonRadius: 14,
  sheetRadius: 34,
  logoWidth: 190,
  logoHeight: 78,
  brandTitleSize: 32,
  brandTitleLineHeight: 38,
  // heroShapePrimary / heroShapeSecondary, relative to the real 358pt-ish hero
  shapePrimary: { size: 320, radius: 32, rotate: -27, left: -88, top: 22, opacity: 0.35 },
  shapeSecondary: { size: 260, radius: 30, rotate: 24, right: -26, top: -56, opacity: 0.5 },
} as const;

// app-header.tsx
export const AppHeaderTokens = {
  logoWidth: 83.5,
  logoHeight: 35.4,
  pillIconSize: 32,
  personIconSize: 17,
  nameSize: 16,
} as const;

// student-id-card.tsx — compact (non-detailed) variant
export const AppStudentIdCard = {
  widthPercent: 60,
  aspect: 27 / 17,
  padding: AppSpacing.two,
  radius: 16,
  photoWidth: 52,
  photoHeight: 64,
  photoRadius: 8,
  photoIconSize: 30,
} as const;

// favourites-section.tsx / favourite-card.tsx
export const AppFavourites = {
  cardWidth: 200,
  cardMinHeight: 116,
  cardRadius: 16,
  iconSize: 32,
  editIconSize: 22,
  labelSize: 14,
} as const;

// class-card.tsx
export const AppClassCard = {
  radius: 16,
  minHeight: 72,
  codeSize: 15,
  timeSize: 14,
  locationSize: 13,
} as const;

// app-tab-bar.tsx
export const AppTabBar = {
  height: 60,
  radius: 25,
  indicatorHeight: 6,
  indicatorWidthPercent: 80,
  iconSize: 20,
  labelSize: 10,
} as const;

// student-id-backdrop.tsx — exact polygon points + fills, both variants,
// light mode only. viewBox is always "0 0 600 340", preserveAspectRatio
// "xMidYMid slice".
export const BACKDROP_BANNER_POLYGONS = [
  { points: "-30,10 210,0 180,170 60,210 -30,140", fill: "#FFF5A0", opacity: 0.45 },
  { points: "420,0 630,-20 640,180 510,110 390,80", fill: "#FFE84D", opacity: 0.38 },
  { points: "480,130 620,90 640,310 540,350 430,260 450,180", fill: "#FFFBE6", opacity: 0.5 },
  { points: "-20,220 160,200 200,290 130,360 -20,350", fill: "#FFE84D", opacity: 0.35 },
  { points: "200,60 370,40 410,150 340,240 190,220 150,130", fill: "#FFF3A3", opacity: 0.42 },
  { points: "300,180 430,160 450,270 370,300 280,260", fill: "#FFFFFF", opacity: 0.2 },
  { points: "240,0 420,10 400,80 260,90", fill: "#FFF9C4", opacity: 0.38 },
] as const;

export const BACKDROP_CARD_POLYGONS = [
  { points: "-40,-20 280,-10 220,160 60,200 -40,130", fill: "#FFE84D", opacity: 0.16 },
  { points: "380,-30 660,-20 650,150 480,180 340,80", fill: "#FFF3A3", opacity: 0.18 },
  { points: "420,200 660,160 670,370 480,370 360,290", fill: "#FFDC00", opacity: 0.14 },
  { points: "-40,240 200,210 240,370 -40,370", fill: "#FFF5A0", opacity: 0.15 },
] as const;
