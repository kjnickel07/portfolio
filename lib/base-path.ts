/**
 * The GitHub Pages project-page subpath this site deploys under
 * (kjnickel07.github.io/portfolio). Single source of truth — imported by
 * `next.config.ts` (basePath/assetPrefix) and by any app code that
 * references a `public/` asset outside next/image's normal pipeline,
 * since unoptimized `<Image>` `src` values and the metadata `manifest`
 * field are *not* auto-prefixed by Next's basePath handling (verified
 * against the actual `out/` build output — both rendered bare, without
 * the prefix, until fixed here).
 */
export const BASE_PATH = "/portfolio";
