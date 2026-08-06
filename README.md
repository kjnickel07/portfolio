# Portfolio — Karl Nickel

A scroll-driven personal portfolio. At rest it reads as a flat, printed
document — system font stack, `#222222` on `#ffffff`, sharp corners, no
shadows on chrome. Motion is the only thing that isn't printed: two
case-study scenes (serviceUNSW, TerraCast) carry the site's colour,
gradients and shadow as sanctioned illustration content.

See `design.md` for the visual token system and `plan.md` for the original
brief. `lib/content.ts` holds every piece of copy on the site — start there
to correct anything.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
[Motion](https://motion.dev) (Framer Motion) · [Lenis](https://lenis.darkroom.engineering)

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run type-check   # tsc --noEmit
npm run lint          # eslint
npm run build         # production build
```

## Structure

```
app/                  layout, page, global styles + design tokens
components/
  providers/           Lenis smooth-scroll provider
  layout/               header, stamp, section rhythm, hairlines
  motion/               reusable scroll/reveal primitives
  sections/             hero, about, experience, also, colophon
  projects/
    service-unsw/        the phone scene (login → home morph)
    terracast/            the growing-vine scene
    disease-mcp/           the model-comparison diagram
lib/
  content.ts            all site copy
  motion.ts              spring presets
  use-section-progress.ts   shared scroll-progress hook
  use-reduced-motion.ts      prefers-reduced-motion hook
```

Every scroll-driven scene has a first-class `prefers-reduced-motion`
fallback — a fully static, complete rendition of the same content, not a
degraded placeholder.
