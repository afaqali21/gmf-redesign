# WordPress content migration

These scripts produced `src/content/generated/` and `public/wp-content/uploads/`. The live site
blocks automated requests (Imunify360), so content was taken from Wayback Machine snapshots
of each URL. Every snapshot used is newer than the page's WordPress `lastmod`.

Run them from an empty cache folder (for example `scripts/wordpress-migration/.cache`, which is git-ignored),
with `cheerio` available (`npm i --no-save cheerio`):

1. Build `latest.json` (newest snapshot per URL) from the CDX API:
   `http://web.archive.org/cdx/search/cdx?url=globalmarketingfirm.co.uk/*&fl=original,timestamp,statuscode,mimetype&filter=statuscode:200&from=2025`
2. `node ../dl.mjs .`: downloads raw HTML into `raw/`.
3. `node ../seo.mjs`: extracts the Yoast head (title, description, canonical, OG, JSON-LD) into `seo.json`.
4. `node ../migrate.mjs`: writes pages, posts, archives and SEO into `src/content/generated/`, and `images.json`.
5. `node ../dlimg.mjs .` then `node ../recover.mjs .`: downloads images to their original
   `/wp-content/uploads/...` paths, and recovers post images from the CDN that the posts' own schema references.
6. Regenerate `src/content/generated/image-sizes.json` (width and height of every file in `public/`) with sharp.

Once the server IP is whitelisted, or a WordPress export is available, the same steps can run against fresh
HTML to bring in the posts listed in `docs/MIGRATION-STATUS.md`.
