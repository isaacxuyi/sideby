# sideby — Next.js site

Converted from the original static HTML site into a Next.js 15 (App Router)
project written in TypeScript/TSX.

## Structure

```
src/
  app/
    layout.tsx            root layout, loads Inter via next/font
    globals.css            reset + shared design tokens (colors)
    page.tsx / page.module.css              Home
    about/page.tsx / page.module.css        About
    how-it-works/page.tsx / page.module.css How It Works
    privacy/page.tsx                        Privacy Policy (uses legal.module.css)
    terms/page.tsx                          Terms of Service (uses legal.module.css)
    legal.module.css                        shared styles for privacy/terms
  components/
    Nav.tsx / Nav.module.css                nav bar ("home" and "simple" variants)
    Footer.tsx / Footer.module.css          footer ("full" and "simple" variants)
    HeroBackground.tsx / .module.css        client component: animated canvas
                                             bokeh background + looping bg video
    StepCard.tsx                            numbered step card (How It Works)
public/
  video/hero-bg.mp4        the background video from the original site
```

Each page reuses `Nav` and `Footer` instead of duplicating markup, and the
canvas/video animation from the original inline `<script>` tag is now a
self-contained client component (`HeroBackground`) using `useEffect`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes / things you may want to tweak

- The nav/footer/CTA links (`Log in`, `Join Sideby`, social icons) still
  point to `#` since there was no real destination in the original markup —
  wire these up to real routes/auth once you have them.
- The `--font-inter` CSS variable is set on `<body>` in `layout.tsx`; feel
  free to switch to Tailwind or another styling approach if you'd prefer —
  the components are already split up so any styling layer will drop in
  cleanly.
