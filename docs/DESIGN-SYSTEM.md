# Global Marketing Firm: design system

These are the shared visual rules for every page we rebuild. The tokens live in `src/app/globals.css` (Tailwind v4 `@theme`), and the reusable parts live in `src/components/ui` and `src/components/motion`.

## Colour

| Token | Hex | Use |
|---|---|---|
| `brand-600` | `#d70d43` | Primary brand crimson, taken from the existing site: CTAs, accents, focus rings |
| `brand-500` / `brand-700` | `#ee3364` / `#b40a38` | Gradient stops for buttons and featured cards |
| `brand-300` / `brand-400` | `#ff9ab4` / `#fd658e` | Accents on dark backgrounds (eyebrows, icons) |
| `brand-50` / `brand-100` | `#fff1f4` / `#ffe3e9` | Soft tints for icon tiles, chips, and the glows behind sections |
| `ink-950` | `#07070a` | Dark sections (hero, call center, testimonials, footer) |
| `ink-500` / `ink-600` | `#62626c` / `#46464f` | Body text on light backgrounds |
| `surface` | `#f6f6f8` | Alternating light section background |

Sections alternate dark → light → surface, which gives the page a steady rhythm. Body text meets WCAG AA contrast. On dark backgrounds, secondary text uses `white/55`–`white/75`.

## Typography

- **Poppins**, loaded through `next/font`: the brand font from the old site, with no layout shift.
- **Display / H1:** 44–70 px, weight 700, tracking `-0.04em`, leading 1.04.
- **Section H2:** 32–48 px, weight 700, tracking `-0.03em`.
- **Card H3:** 18–28 px, weight 600.
- **Eyebrow:** 12 px uppercase, tracking `0.2em`, in a pill with a pulsing dot.
- **Body:** 15–18 px, leading 1.65.

## Layout rhythm

- The container is `max-w-7xl` (1280 px), with 20 px side padding on mobile and 32 px from `sm` up.
- Section padding is 96 px on mobile and 128 px on desktop.
- Grids are built on 12 columns. Cards use 20 px gaps and 28–40 px inner padding.
- Corner radius: 28–40 px for cards, 16 px for tiles, full pills for buttons and chips.
- Shadows are soft and very spread out (`0 24px 50px -30px`). Featured cards get a brand-tinted shadow.

## Components

- `ButtonLink`: primary (crimson gradient), secondary (ink), outline, light, and ghost-light (glass) variants. All of them lift on hover, show a light sweep, nudge the arrow, and shrink slightly on press.
- `SectionHeading` / `Eyebrow`: heading blocks that reveal on scroll.
- `TiltCard`: 3D tilt plus a cursor spotlight for mouse users only. It stays static on touch and under reduced motion.
- `Reveal`, `Stagger`, `StaggerItem`: entrance animations that run once, when the element scrolls into view.

## Motion

- The library is Motion (Framer Motion) through `LazyMotion` with the DOM feature set, about 15 kB.
- Easing is `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out), with durations of 0.6–0.9 s and staggers of 60–120 ms.
- Animations change only `opacity` and `transform`, so they cause no layout shift. Scroll reveals fire once (`viewport={{ once: true }}`).
- Ambient motion (floating shapes, blobs, waveform, dashed routes) is pure CSS and costs almost no CPU.
- **Reduced motion:** every animated element has `data-reveal`. Under `prefers-reduced-motion`, CSS forces these elements visible and still, and the ambient loops stop.

## Image art direction

- **Avoid generic stock clichés** such as handshakes, headsets on white, or fist bumps.
- **Spotlights use UI illustrations built in code**, not photos: the AI-to-human call console and the dispatch dashboard. They're sharp at any size, cost nothing to download, show what the service actually does, and are labelled for screen readers (`role="img"` with a descriptive `aria-label`).
- **Photography:** for any new photos, use real UK settings. Good subjects are London streets at dusk, private-hire vehicles, and real control rooms and teams. Use natural light and brand-crimson accents. Brief:
  - Hero/spotlight photos: 16:10 or 4:3, at least 1600 px wide.
  - Card photos: 4:3.
  - Every image needs alt text that describes what it shows.
- All images use `next/image`, which serves AVIF or WebP (set in `next.config.ts`) with `sizes` set to match the layout.
- The existing homepage photos are kept for now: the competitive section image and the two "impact" images. They're the first candidates to replace once new photography is available.
