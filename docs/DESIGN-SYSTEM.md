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

## Inner-page components (phase 2)

- **`PageHero`** (`components/page`): dark hero matching the homepage. It has a breadcrumb, a word-by-word animated H1 (the last word in the brand gradient), optional eyebrow, intro and CTAs, and a right-hand visual that tilts in 3D with the mouse. It also has the same blobs, cursor spotlight and perspective grid floor as the homepage hero.
- **`Visual`** (`components/page/Visuals.tsx`): hero illustrations built in code, one per service family (search, SEO, social, email, ads, brand, app, web, design, law, travel, minicab, laundry, about, portfolio, quote, contact). They're glass panels with floating chips, labelled with `role="img"` and an `aria-label`. Chips use qualitative labels only, never invented metrics.
- **`RevealImage`**: a clip-path wipe as the image enters the viewport, then a ±5% parallax drift. Every image goes through `next/image` (AVIF/WebP), with sizes from `content/generated/image-sizes.json`.
- **`SectionViews`** (`components/templates`): the section layouts every template shares:
  - `SplitSection`: text and image, alternating sides
  - `CardsSection`: numbered tilt cards, dark or light
  - `BandSection`: mid-page CTA over the original parallax photo
  - `StatementSection`
  - `ClosingSection`: a `FinalCta` that keeps the page's own heading, text and buttons
  - `Bullets`
  - `IconPanel`: an illustrated stand-in for a missing photo

  Headings keep the level WordPress used (`H`).
- **Section numbering:** small `01 ——` markers give long pages a sense of progress without adding copy.
- **Blog:** `PostCard` (16:9 cover, category chips, date, reading time), `FeaturedPost` (lead story), `CategoryNav` chips, `Pagination`, `Toc` (scroll-spy, sticky on desktop, collapsible on mobile) and `ReadingProgress`.
- **Long-form typography:** the `prose-gmf` utility in `globals.css` covers a ~70ch measure, 1.8 leading, brand bullets, tables, blockquotes and FAQ `<details>`. `prose-doc` adds section rules for policies.
- **Forms:** floating-label inputs, chip-style checkboxes, inline errors linked with `aria-describedby`, and a live status region that takes focus after each submit.

### Page rhythm

Each template alternates white, `surface` and `ink-950`, as the homepage does, but the order differs per page so pages don't feel identical:

- Services: split → split → dark cards → band or closing.
- Industry pages: they also add a process track, checklist grids and an FAQ.
- Case studies: a chapter index with a sticky sidebar.
- About: a story split, dark service cards, a statement, then client logos.

### Service-page photography (added 2026-11-25)

The 11 service pages, Law Firm SEO and Travel SEO each have two new photos. There are 26 photos in all, and no page reuses another page's photo. Each was chosen to show the service itself: search and analytics screens, social feeds, email workflows, code, wireframes, design tools, legal and travel scenes.

- **Source and licence:** [Unsplash](https://unsplash.com/license), free for commercial use with no attribution required. Every photo was downloaded through Unsplash's official download link, which refuses paid Unsplash+ images, so all of them are free-licensed. Photos showing third-party brand names (other companies' business cards, airline logos) were rejected.
- **Files:** `public/images/services/<slug>-1.webp` and `-2.webp`, 1600×1200 WebP between 18 and 226 KB. `next/image` then serves AVIF/WebP at the right size for each device.
- **Credits:** IDs, photographers and source URLs are in `src/content/service-photos.json`. `scripts/fetch-service-photos.mjs` downloads them again or swaps a photo: edit the ID and rerun.
- **Wiring:** `getBlockPage()` swaps the migrated images in order, and the decorative band backgrounds use the page's own photo. Alt text describes the photo and keeps the original WordPress alt phrase, for example "Google search page on a laptop screen – Search Engine Marketing in UK".
- Heroes keep their code-built 3D illustrations, so each page pairs one illustrated hero with two photos.
