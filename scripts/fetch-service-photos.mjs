#!/usr/bin/env node
// Downloads the service-page photos (Unsplash License: free for commercial use, no attribution
// required) through Unsplash's official download link, converts them to WebP and records credits.
// Usage: node scripts/fetch-service-photos.mjs
import fs from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(ROOT + "package.json");
const sharp = require("sharp");
const OUT = ROOT + "public/images/services/";
fs.mkdirSync(OUT, { recursive: true });

// slug -> [Unsplash photo id, description used at the start of the alt text]
const photos = {
  "search-engine-marketing": [["c4aT8MfEzdw", "Google search page on a laptop screen"], ["rgKX4o2xSqI", "Marketing team planning a campaign at a whiteboard"]],
  "social-media-marketing": [["7ljc7nkjNcc", "Hands holding a phone showing a social media feed"], ["4lKFi3KqnD8", "Social media post analytics on a smartphone"]],
  "search-engine-optimization": [["Q4iYWsWbR90", "SEO agency desk with a laptop showing search performance"], ["oMe_FjZnHGU", "Website analytics dashboard on a computer screen"]],
  "email-marketing": [["Ymb6h8gUk3o", "Email marketing platform open on a laptop"], ["8F4EX4Nw1yY", "Email automation workflow drawn on a whiteboard"]],
  "google-ads": [["JKUTrJ4vK00", "Campaign performance graphs on a laptop screen"], ["ykgLX_CwtDw", "Reviewing advertising performance charts with a stylus"]],
  branding: [["h_ZcSwuyowg", "Brand mood board with photos and colour samples"], ["UfKsb8GF4FA", "Blank business card ready for a new brand identity"]],
  "app-development": [["08TJqR3mSrE", "Person holding a smartphone ready for a new app"], ["A6JxK37IlPo", "Hand holding a smartphone with mobile apps"]],
  "web-development": [["5sLNGV2EFRM", "Website source code in an editor on a monitor"], ["wAZ8pS2D_OA", "Developer building a website on a laptop"]],
  "app-design": [["Cg60_WXjvC4", "Designer sketching mobile app wireframes in a notebook"], ["_dJCBtdUu74", "App and website wireframe sketches"]],
  "graphic-design": [["CGpifH3FjOA", "Graphic designer working with a pen tablet and colour swatches"], ["eQux_nmDew0", "Design sketches with coloured markers"]],
  "web-design": [["4UGmm3WRUoQ", "Hand-drawn website wireframe on paper"], ["tZc3vjPCk-Q", "Watercolour sketches of website page layouts"]],
  "law-firm-seo": [["ozS0tPf8QT0", "Judge's gavel and an open law book"], ["FaTLrG5-ViE", "Wooden gavel beside a book on a dark desk"]],
  "travel-seo-services": [["AX6s7zREtZE", "Planning a trip with a world map, passport and camera"], ["GsVO12cQrzA", "Airport terminal with a plane at the gate"]],
};

const credits = {};
for (const [slug, list] of Object.entries(photos)) {
  credits[slug] = [];
  for (const [i, [id, description]] of list.entries()) {
    const file = `${OUT}${slug}-${i + 1}.webp`;
    const res = await fetch(`https://unsplash.com/photos/${id}/download?force=true&w=2000`);
    if (!res.ok || !(res.headers.get("content-type") || "").startsWith("image")) throw new Error(`${id}: ${res.status} (not a free Unsplash photo?)`);
    const dl = new URL(res.url).searchParams.get("dl") ?? "";
    const author = dl.replace(new RegExp(`-${id}-unsplash\\.\\w+$`), "");
    const buf = Buffer.from(await res.arrayBuffer());
    const info = await sharp(buf).rotate().resize({ width: 1600, height: 1200, fit: "cover", position: "attention" }).webp({ quality: 78 }).toFile(file);
    credits[slug].push({ file: `/images/services/${slug}-${i + 1}.webp`, id, url: `https://unsplash.com/photos/${id}`, author, description, width: info.width, height: info.height, bytes: info.size });
    console.log(`${slug}-${i + 1}.webp  ${Math.round(info.size / 1024)} KB  @${author}`);
  }
}
fs.writeFileSync(ROOT + "src/content/service-photos.json", JSON.stringify(credits, null, 2) + "\n");
