import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/base-path";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only — no Node server, no Image
  // Optimization API, no API routes/ISR. `output: "export"` makes
  // `next build` emit a fully static `out/` directory instead.
  output: "export",

  // The repo is kjnickel07/portfolio (a project repo, not
  // kjnickel07.github.io), so GitHub Pages serves it from
  // kjnickel07.github.io/portfolio/ — every internal asset/link needs
  // that subpath baked in. next/link and *optimized* next/image usages
  // pick this up automatically; unoptimized <Image> src values and the
  // metadata manifest field don't (see lib/base-path.ts) and are
  // prefixed by hand at those call sites using the same BASE_PATH.
  basePath: BASE_PATH,
  assetPrefix: `${BASE_PATH}/`,

  // Static export has no server to run the Image Optimization API — a
  // safety net alongside the per-image `unoptimized` props already set
  // on the two <Image> usages, so any future <Image> doesn't silently
  // fail the export build.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
