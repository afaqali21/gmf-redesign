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
  app/                  one folder per WordPress URL (about/, web-design/, …), [slug]/ = blog posts,
                        blog/, category/, tag/, author/ (+ page/[page]/), sitemap.ts, robots.ts,
                        not-found.tsx, actions/enquiry.ts (form server actions)
  proxy.ts              real 404s for unknown post slugs, archives and page numbers
  components/
    layout/             Header (mega-menu + mobile drawer), Footer
    sections/           homepage sections, one file each (FinalCta is shared with inner pages)
    page/               PageHero, Visuals (code-built hero illustrations), Media (RevealImage), Html
    templates/          ServicePage, CaseStudyPage, IndustryPage, LegalPage, SectionViews, RelatedServices
    blog/               cards, listing, pagination, article chrome (TOC, reading progress)
    forms/              QuoteForm, ContactForm, CommentForm
    ui/                 Button, SectionHeading, Icons, CountUp
  content/
    site.ts             nav, contact details, social links, footer links
    home.ts             all homepage copy and SEO values
    routes.ts           static (non-blog) routes, used by the sitemap
    forms.ts            quote-form service options
    generated/          content migrated from WordPress (pages, posts, archives, Yoast SEO, image sizes)
    url-inventory.json  every URL from the WordPress Yoast sitemaps (pages, posts, categories, tags, author)
  lib/
    seo.tsx             buildMetadata(), metadataFromSeo() (migrated Yoast values), SchemaGraph, JSON-LD helper
    content.ts          typed loaders for generated content, toSections() block grouping
    archive.ts          archive/pagination SEO helpers
public/
  images/               homepage images
  wp-content/uploads/   migrated WordPress uploads, kept at their original URLs
scripts/
  check-urls.mjs        URL coverage against the inventory
  wordpress-migration/  how src/content/generated was produced (see its README)
docs/
  DESIGN-SYSTEM.md      visual rules and components
  MIGRATION-STATUS.md   content and images still to be supplied
```

## Inner pages (phase 2)

Every page in the WordPress sitemap is rebuilt at its original URL with its original copy, title, meta description, canonical, Open Graph tags and Yoast JSON-LD graph. Copy comes from `src/content/generated/`, which the migration scripts produced from archived snapshots of the live site. Only the layout changes.

| Template | Routes | Layout |
|---|---|---|
| `ServicePage` | 11 services (SEM, SMM, SEO, Email, Google Ads, Branding, App/Web Development, App/Graphic/Web Design) | Hero with a code-built 3D illustration, image-reveal splits, dark tilt cards for the "4 ways" steps, CTA bands, closing CTA, service navigation |
| `IndustryPage` | `/law-firm-seo/`, `/travel-seo-services/` | Service cards, process track, checklist grids, FAQ accordion |
| `CaseStudyPage` | `/minicabs-solutions/`, `/dry-cleaning-solutions/` | Overview plus chapters with a sticky chapter index |
| Own page | `/about/`, `/case-studies/`, `/contact/`, `/booking/` | Storytelling layout, portfolio grid, contact cards and map, quote form |
| `LegalPage` | `/terms/`, `/privacy-policy/` | Reading layout with an "On this page" index |
| Blog | `/blog/` (+ `/page/N/`), posts at `/<slug>/`, `/category/…`, `/tag/…`, `/author/admin/` | Lead story, category chips, cards, pagination, articles with TOC, reading progress, comments |

### Forms

The quote form (`/booking/`), contact form (`/contact/`) and blog comment form use the same fields as on WordPress. They submit to server actions in `src/app/actions/enquiry.ts`, which validate the input and replace reCAPTCHA with a honeypot field and a minimum fill time. Set one delivery method in the hosting environment:

- `RESEND_API_KEY` (plus optional `ENQUIRY_TO`, default `info@globalmarketingfirm.co.uk`, and `ENQUIRY_FROM`): sends email through the Resend API. No extra package is needed.
- or `ENQUIRY_WEBHOOK_URL`: sends a JSON POST to a webhook (Zapier, Make, a CRM).

Without either, development logs each enquiry to the server console. Production shows the visitor a message asking them to phone or email instead, so no enquiry is lost silently. Comments are emailed for moderation; they aren't published automatically.

### Inner-page changes from WordPress

- **Casing:** headings and buttons set in capitals (for example "INSTANT QUOTE", "4 WAYS …") are shown in title case. "ABOUT" and "GET QUOTE" become "About" and "Get Quote". The words are unchanged.
- **Archives:** the H1 on category, tag and author pages was "Archive". It is now the archive's name (for example "AI").
- **Contact address:** the WordPress contact page still listed 124 City Road. It now uses the current address (312b Eastcote Lane), as do the footer and schema, and the map points there.
- **Broken links:** links that pointed to `/Demo-backup/demo/dev/…` were rewritten to the matching live URL.
- **Redirects:** `/page-home/` (a duplicate of the homepage) and `/form-maker/preview/` (an empty plugin preview) redirect permanently to `/` and `/booking/`. Yoast sitemap URLs redirect to `/sitemap.xml`.
- **Images:** the 11 service pages, Law Firm SEO and Travel SEO have new photography: 26 Unsplash-licensed photos, two per page. See `docs/DESIGN-SYSTEM.md` and `src/content/service-photos.json`. The case studies still show illustrated panels where their photos couldn't be recovered. Posts without a featured image get a generated cover.
- **Typos kept as published (need approval to fix):**
  - the H1 of `/search-engine-optimization/` reads "Social Engine Optimization"
  - "seacrh" in the "4 ways" heading on the same page
  - "Designig" on `/app-design/`
  - "anda" on `/branding/`
  - "Duane" and "organise SEO" on `/dry-cleaning-solutions/`
  - "What's Include" on `/law-firm-seo/`
  - "£1000 to £15,00" on `/travel-seo-services/`

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
- `/page-home/` now redirects to `/` (308). Revert it in `next.config.ts` if you want to keep it.
- **31 posts and `/cookie-policy-uk/` aren't migrated yet.** Their text was never archived and the live site blocks automated access, so these URLs return 404. Three of these posts are linked from the homepage "Latest from the blog" section, and the cookie policy is linked from the footer. Supply a WordPress export (Tools → Export) or whitelist the server's IP, then rerun the migration. The list is in `docs/MIGRATION-STATUS.md`.
- **Copy `wp-content/uploads` from the WordPress server** into `public/wp-content/uploads`, then rebuild. Some image references (case-study photos, 11 post thumbnails, images inside older posts) are missing. They reappear automatically once the files are in place.
- Replace the placeholder `/wp-content/uploads/2024/05/global-marketing-firm.png` (the Open Graph image) with the original.
- Configure form delivery (`RESEND_API_KEY` or `ENQUIRY_WEBHOOK_URL`) before go-live.
- Decide whether to fix the typos listed under "Inner-page changes from WordPress".
