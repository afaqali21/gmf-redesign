# Global Marketing Firm: website rebuild

This is the Next.js (App Router), TypeScript and Tailwind CSS v4 rebuild of https://globalmarketingfirm.co.uk/, which currently runs on WordPress.

**The rules:** keep every URL, all content and all SEO metadata. Only the UI, UX and responsiveness change. We rebuild one page at a time.

## Commands

```bash
npm run dev                              # http://localhost:3000
npm run build && npm start               # production build
node scripts/check-urls.mjs [base] --list  # how many of the 144 live URLs the new build serves
```

## Structure

```
src/
  app/                  routes (layout.tsx, page.tsx = homepage, icon.png)
  components/
    layout/             Header (mega-menu + mobile drawer), Footer
    sections/           homepage sections, one file each
    ui/                 Button, SectionHeading, Icons, CountUp
  content/
    site.ts             nav, contact details, social links, footer links
    home.ts             all homepage copy and SEO values
    url-inventory.json  every URL from the WordPress Yoast sitemaps (pages, posts, categories, tags, author)
  lib/seo.tsx           buildMetadata() (mirrors Yoast output), JSON-LD helper
public/
  images/               migrated images
  wp-content/uploads/   files that must keep their original WordPress URL (e.g. the OG image)
```

## Design and motion

The full design system is in [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md).


- Animations use [Motion](https://motion.dev) (Framer Motion). `MotionProvider` loads only the DOM feature set through `LazyMotion` and respects the visitor's reduced-motion setting.
- `components/motion/Reveal.tsx` provides `Reveal` and `Stagger`/`StaggerItem` for scroll-in effects, and `TiltCard.tsx` the 3D tilt and cursor spotlight on cards (mouse only).
- The 3D objects in the hero (glass cube, orbit rings, orb) are pure CSS 3D transforms that follow the mouse. There is no WebGL or Three.js, so nothing heavy loads.
- Every animated element has `data-reveal`. Under `prefers-reduced-motion`, `globals.css` forces these elements visible and still, because the server HTML already contains the hidden start state.
- Animations only change opacity and transform, so they don't shift the layout.

`next.config.ts` sets `trailingSlash: true`, so `/web-design` redirects to `/web-design/`, the same as WordPress.

## Homepage changes from WordPress

These changes were approved on 2026-11-25:

- **Hero:** the five-slide Revolution Slider (three headlines, two of them repeated, and about 15 `<h1>` tags) is now one hero with a single `<h1>` and three pillar cards. Every slide's copy is kept.
- **Typos fixed:**
  - "QET QUOTE" is now "Get a Quote"
  - "Vission" is now "Vision"
  - "Tranasparency" is now "Transparency"
  - "Satisfication" is now "Satisfaction"
  - "optimizied" is now "optimised"
  - "varity" is now "variety"
  - "utilities" is now "utilises"
  - "many of clients" is now "many clients"
  - "what have to offer" is now "what we have to offer"
  - "UI/UX That Intuitive" is now "UI/UX with Intuitive"
- **Duplicates removed:** "Software Installation & Configuration" appeared twice. The paragraphs of "Our Marketing Specialities" and "Design and Marketing Impact" were near-identical, so they are now one section that keeps both headings and both images.
- **Services (brief of 2026-11-25):** 9 services, with GMF's supplied headings and copy. The 28 original service bullet points are regrouped under the matching service, behind a "What's included" toggle. **AI & Human Call Center** and **Taxi & Minicab** are featured cards, and each has its own spotlight section (`#call-center`, `#taxi-dispatch`).
- **Taxi Dispatching Services:** the original six features now sit inside the Taxi & Minicab spotlight, next to an illustrated dispatch dashboard. Law Firm SEO, Travel SEO and Dry Cleaning form the "Industry solutions" section.
- **Facts from GMF:** address 312b Eastcote Lane, HA2 9AH, London (footer and Organization JSON-LD). Stat "99%+ Client Satisfaction". Operating since 2019, with 10+ years of team experience.
- **Testimonials:** repaired scraping damage only. Faiza Khan's review ended at "in the U", now "in the UK.". Qasim Khan's began "LTRULY IMPRESSE!!!!", now "TRULY IMPRESSED!!!!".
- **Added:** alt text on every image, a "Latest from the blog" section (3 existing posts) and Organization JSON-LD.
- **SEO values copied exactly:** title, meta description, canonical, robots, OG tags and `article:modified_time`.

## Open items for the owner

- The call center has no page on the current site, so links point to `#call-center` and `/contact/`. Should it get its own URL? That would be a new page.
- "More about our services" pointed to `#`. It now goes to `/about/`.
- `og:locale` and `inLanguage` stay `en_US`, as on WordPress. Change them to `en_GB` if you want.
- Cookie consent (Complianz) isn't rebuilt yet. Add it before any analytics or marketing scripts.
- `/page-home/` is a leftover demo page in the sitemap. Decide whether to 301 it to `/`.
- Before go-live, old `/wp-content/uploads/...` image URLs need redirects, or the files must be kept at the same paths.
