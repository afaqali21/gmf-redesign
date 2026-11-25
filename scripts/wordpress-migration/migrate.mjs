// Converts archived WordPress HTML (raw/) into JSON content for the Next.js site.
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replace(/\\/g, "/");

// Run from the cache folder that holds raw/ (archived HTML) and seo.json (from seo.mjs).
const S = process.cwd();
const OUT = ROOT + "src/content/generated";
const SITE = "https://globalmarketingfirm.co.uk";
const inv = JSON.parse(fs.readFileSync(ROOT + "src/content/url-inventory.json", "utf8")).urls;
const seoAll = JSON.parse(fs.readFileSync(S + "/seo.json", "utf8"));
const images = new Set();

fs.mkdirSync(OUT + "/pages", { recursive: true });
fs.mkdirSync(OUT + "/posts", { recursive: true });

const fileOf = (p) => (p === "/" ? "_home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "__"));
const load = (p) => cheerio.load(fs.readFileSync(`${S}/raw/${fileOf(p)}.html`, "utf8"));
const has = (p) => fs.existsSync(`${S}/raw/${fileOf(p)}.html`);
const clean = (s) => s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

/** Strip Wayback prefixes; make site URLs root-relative; fix the stale /Demo-backup/demo/dev/ prefix. */
function fixUrl(u) {
  if (!u) return u;
  u = u.trim().replace(/^(https?:)?\/\/web\.archive\.org\/web\/\d+[a-z_]*\//, "");
  u = u.replace(/^\/\/globalmarketingfirm/, "https://globalmarketingfirm");
  u = u.replace(/^https?:\/\/(www\.)?globalmarketingfirm\.co\.uk(:80)?/, "");
  if (u === "") u = "/";
  u = u.replace(/^\/Demo-backup\/demo\/dev(\/|$)/, "/");
  if (u.startsWith("/wp-content/uploads/")) images.add(u.split("?")[0]);
  return u;
}

// ---------- SEO ----------
function seoFor(key) {
  const s = seoAll[key];
  if (!s) return null;
  const graph = JSON.parse(
    JSON.stringify(s.graph).replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\//g, ""),
  ).map((g) => {
    // Site search (/?s=) is not part of the rebuild; drop the SearchAction like the homepage does.
    if ([].concat(g["@type"]).includes("WebSite")) delete g.potentialAction;
    return g;
  });
  const ogImage = s.ogImage ? fixUrl(s.ogImage) : undefined;
  return {
    title: clean(cheerio.load(`<i>${s.title}</i>`)("i").text()),
    description: s.description ?? null,
    canonical: fixUrl(s.canonical),
    ogType: s.ogType ?? "article",
    ogImage: ogImage
      ? { url: ogImage, width: Number(s.ogImageW) || undefined, height: Number(s.ogImageH) || undefined, type: s.ogImageType || undefined }
      : null,
    published: s.published ?? null,
    modified: s.modified ?? null,
    twitter: Object.fromEntries(s.twitter.map((t) => t.split("=")).filter(([k]) => k !== "twitter:card")),
    schema: graph,
  };
}

// ---------- Inline HTML (paragraph content) ----------
function inlineHtml($, el) {
  const c = $(el).clone();
  c.find("script,style").remove();
  c.find("*").each((_, n) => {
    const t = n.tagName;
    if (t === "a") {
      const href = fixUrl($(n).attr("href"));
      const attrs = { href };
      if (/^https?:/.test(href)) Object.assign(attrs, { target: "_blank", rel: "noopener noreferrer" });
      n.attribs = attrs;
    } else if (["strong", "b", "em", "i", "br", "u", "sup", "sub"].includes(t)) {
      n.attribs = {};
    } else {
      $(n).replaceWith($(n).contents());
    }
  });
  return c.html().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

// ---------- Page blocks ----------
const PAGE_SLUGS = [
  "about", "booking", "contact", "case-studies", "minicabs-solutions", "dry-cleaning-solutions",
  "search-engine-marketing", "social-media-marketing", "search-engine-optimization", "email-marketing",
  "google-ads", "branding", "app-development", "web-development", "app-design", "graphic-design", "web-design",
  "law-firm-seo", "travel-seo-services",
];

function pageBlocks(slug) {
  const $ = load(`/${slug}/`);
  const main = $(".vlt-main");
  main.find("script,style,noscript,form,.vlt-scroll-to-arrow").remove();
  const blocks = [];
  const seen = new Set();
  main.find("*").each((_, el) => {
    if (seen.has(el)) return;
    const t = el.tagName;
    const $el = $(el);
    const step = $el.closest(".vlt-process-step");
    const inStep = step.length > 0;
    const mark = (x) => $(x).find("*").each((_, d) => seen.add(d));
    if (/^h[1-6]$/.test(t)) {
      mark(el);
      const text = clean($el.text());
      if (text) blocks.push({ t: "h", level: Number(t[1]), text, ...(inStep ? { step: true } : {}) });
    } else if (t === "p") {
      mark(el);
      const html = inlineHtml($, el);
      if (clean($el.text())) blocks.push({ t: "p", html, ...(inStep ? { step: true } : {}) });
    } else if (t === "li") {
      // Nested lists: record depth, keep only the li's own text (children recorded separately).
      const own = $el.clone();
      own.children("ul,ol").remove();
      const depth = $el.parents("li").length;
      const html = inlineHtml($, own);
      if (clean(own.text())) blocks.push({ t: "li", html, depth });
      $el.children("ul,ol").length || mark(el);
    } else if (t === "img") {
      const src = fixUrl($el.attr("data-src") || $el.attr("src"));
      if (!src || /particle-0|dummy\.png|attachment-54\.png/.test(src)) return;
      const cls = $el.attr("class") || "";
      blocks.push({ t: cls.includes("jarallax-img") ? "bg" : "img", src, alt: $el.attr("alt") || "", link: fixUrl($el.closest("a").attr("href")) || undefined });
    } else if (t === "a") {
      const href = fixUrl($el.attr("href"));
      const text = clean($el.text());
      const cls = $el.attr("class") || "";
      if (text && (/vlthemes_custom|vc_btn3/.test(cls) || $el.parent().is(".vlt-btn,div,.wpb_wrapper")) && !$el.closest("p,li,h1,h2,h3,h4,h5").length) {
        blocks.push({ t: "cta", label: text, href });
        mark(el);
      }
    } else if (t === "iframe") {
      blocks.push({ t: "iframe", src: $el.attr("src") });
    }
  });
  return blocks;
}

for (const slug of PAGE_SLUGS) {
  const page = { path: `/${slug}/`, seo: seoFor(slug), blocks: pageBlocks(slug) };
  fs.writeFileSync(`${OUT}/pages/${slug}.json`, JSON.stringify(page, null, 1));
}

// ---------- Rich HTML sanitiser (posts, legal pages) ----------
const ALLOWED = new Set(["p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "b", "em", "i", "u", "br", "blockquote", "figure", "figcaption", "img", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "hr", "code", "pre", "sup", "sub", "details", "summary", "div", "iframe", "cite", "mark", "dl", "dt", "dd"]);
const slugify = (s) => s.toLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function sanitize($, root) {
  root.find("script,style,noscript,.g-recaptcha,.wptb-table-container-matrix").remove();
  // Ultimate Blocks accordion -> <details>
  root.find(".wp-block-ub-content-toggle-accordion").each((_, acc) => {
    const title = $(acc).find(".wp-block-ub-content-toggle-accordion-title").first();
    const body = $(acc).find(".wp-block-ub-content-toggle-accordion-content-wrap").first();
    $(acc).replaceWith(`<details class="faq"><summary>${title.html() || ""}</summary><div>${body.html() || ""}</div></details>`);
  });
  root.find(".wp-block-ub-content-toggle-block, .wp-block-ub-content-toggle").each((_, b) => {
    $(b).replaceWith(`<div class="faq-group">${$(b).html()}</div>`);
  });
  // Buttons
  root.find(".wp-block-button__link").each((_, a) => $(a).attr("data-button", "1"));
  root.find("*").each((_, n) => {
    const t = n.tagName;
    if (!ALLOWED.has(t)) {
      if (t === "h1") { n.tagName = "h2"; } else { $(n).replaceWith($(n).contents()); return; }
    }
    const a = n.attribs || {};
    const keep = {};
    if (a.id) keep.id = a.id;
    if (t === "a") {
      keep.href = fixUrl(a.href || "#");
      if (/^https?:/.test(keep.href)) { keep.target = "_blank"; keep.rel = "noopener noreferrer"; }
      if (a["data-button"]) keep.class = "btn";
    }
    if (t === "img") {
      keep.src = fixUrl(a["data-src"] || a.src);
      keep.alt = a.alt || "";
      if (a.width && a.height) { keep.width = a.width; keep.height = a.height; }
      keep.loading = "lazy";
      keep.decoding = "async";
    }
    if (t === "iframe") {
      const src = a.src || "";
      if (!/youtube|youtu\.be|vimeo|google\.com\/maps/.test(src)) { $(n).remove(); return; }
      Object.assign(keep, { src, title: a.title || "Embedded video", loading: "lazy", allowfullscreen: "" });
    }
    if (t === "td" || t === "th") { if (a.colspan) keep.colspan = a.colspan; if (a.rowspan) keep.rowspan = a.rowspan; }
    if (t === "details" || t === "div") { if (/\bfaq(-group)?\b/.test(a.class || "")) keep.class = a.class; }
    if (t === "figure" && /wp-block-table/.test(a.class || "")) keep.class = "table";
    n.attribs = keep;
  });
  // Collapse purposeless divs
  for (let i = 0; i < 4; i++) root.find("div:not([class])").each((_, d) => { if (!$(d).attr("id")) $(d).replaceWith($(d).contents()); });
  root.find("p").each((_, p) => { if (!clean($(p).text()) && !$(p).find("img,iframe").length) $(p).remove(); });
  // Heading ids (for TOC + deep links): keep existing, add missing ones.
  const used = new Set();
  root.find("[id]").each((_, e) => used.add($(e).attr("id")));
  root.find("h2,h3").each((_, h) => {
    if ($(h).attr("id")) return;
    let id = slugify(clean($(h).text())).slice(0, 70) || "section";
    while (used.has(id)) id += "-x";
    used.add(id);
    $(h).attr("id", id);
  });
  return root.html().replace(/\n{3,}/g, "\n\n").replace(/\u00a0/g, " ").trim();
}

// ---------- Legal pages ----------
for (const slug of ["terms", "privacy-policy"]) {
  const $ = load(`/${slug}/`);
  const h1 = clean($(".vlt-page-title-hero__title").first().text());
  const rows = $(".vlt-main .vc_section").slice(1);
  const wrap = $("<div></div>");
  rows.each((_, r) => wrap.append($(r).clone()));
  const html = sanitize($, wrap);
  fs.writeFileSync(`${OUT}/pages/${slug}.json`, JSON.stringify({ path: `/${slug}/`, h1, seo: seoFor(slug), html }, null, 1));
}

// ---------- Posts ----------
const posts = [];
const postPaths = inv.filter((u) => u.type === "post" && u.path !== "/blog/");
const missingPosts = [];
for (const u of postPaths) {
  if (!has(u.path)) { missingPosts.push(u.path); continue; }
  const $ = load(u.path);
  const slug = u.path.replace(/\//g, "");
  const art = $("article.vlt-single-post");
  const title = clean(art.find(".vlt-post-title").first().text());
  const date = art.find(".vlt-post-meta time").attr("datetime");
  const categories = art.find(".vlt-post-meta a[href*='/category/']").map((_, a) => ({ name: clean($(a).text()), slug: fixUrl($(a).attr("href")).split("/").filter(Boolean).pop() })).get();
  const tags = art.find(".vlt-post-tags a").map((_, a) => ({ name: clean($(a).text()), slug: fixUrl($(a).attr("href")).split("/").filter(Boolean).pop() })).get();
  const thumbEl = $(".vlt-single-post-thumbnail img").first();
  const thumbnail = thumbEl.length ? { src: fixUrl(thumbEl.attr("data-src") || thumbEl.attr("src")), alt: thumbEl.attr("alt") || "" } : null;
  const content = art.find(".vlt-single-post__content .vlt-content-markup").first();
  const contentSchemas = content.find('script[type="application/ld+json"]').map((_, s) => $(s).html().trim()).get();
  // Table of contents: rebuild from the plugin's list so labels stay identical.
  const tocEl = content.find(".ub_table-of-contents").first();
  const toc = [];
  tocEl.find(".ub_table-of-contents-container > ul > li").each((_, li) => {
    const a = $(li).children("a").first();
    toc.push({ label: clean(a.text()), href: "#" + (a.attr("href") || "").split("#").pop(), children: $(li).find("ul li > a").map((_, c) => ({ label: clean($(c).text()), href: "#" + ($(c).attr("href") || "").split("#").pop() })).get() });
  });
  const tocTitle = clean(tocEl.find(".ub_table-of-contents-title").text()) || null;
  tocEl.remove();
  const html = sanitize($, content);
  const comments = [];
  $(".vlt-comments__list > li.comment").each((_, li) => {
    const parse = (el) => ({
      id: $(el).attr("id"),
      author: clean($(el).find(".vlt-comment-header h5").first().text()),
      date: $(el).find("time").first().attr("datetime"),
      dateText: clean($(el).find("time").first().text()),
      html: inlineHtml($, $(el).find(".vlt-comment-text").first()),
    });
    const c = parse($(li).children(".vlt-comment-item__inner").first());
    c.replies = $(li).find("ul.children > li").map((_, r) => parse($(r).children(".vlt-comment-item__inner").first())).get();
    comments.push(c);
  });
  const seo = seoFor(slug);
  const words = clean(content.text()).split(" ").length;
  const post = { slug, path: u.path, title, date, modified: seo?.modified ?? u.lastmod, categories, tags, thumbnail, excerpt: seo?.description ?? null, toc, tocTitle, html, contentSchemas, comments, readingMinutes: Math.max(1, Math.round(words / 220)), seo };
  fs.writeFileSync(`${OUT}/posts/${slug}.json`, JSON.stringify(post, null, 1));
  posts.push({ slug, path: u.path, title, date, modified: post.modified, categories, tags, thumbnail, excerpt: post.excerpt, readingMinutes: post.readingMinutes });
}
posts.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(`${OUT}/posts-index.json`, JSON.stringify(posts, null, 1));

// ---------- Archives ----------
const archives = { category: {}, tag: {}, author: {} };
for (const u of inv.filter((x) => ["category", "tag", "author"].includes(x.type))) {
  const key = fileOf(u.path);
  const slug = u.path.split("/").filter(Boolean).pop();
  const seo = seoFor(key);
  const name = seo ? seo.title.replace(/ Archives - Global Marketing Firm$/, "").replace(/, Author at Global Marketing Firm$/, "") : slug;
  // Posts the archived listing showed, so archives that only list unmigrated posts can say so.
  let listed = [];
  if (has(u.path)) {
    const $ = load(u.path);
    listed = $(".vlt-post-title a, a.vlt-post-thumbnail__link").map((_, a) => fixUrl($(a).attr("href"))).get();
    listed = [...new Set(listed)];
  }
  archives[u.type][slug] = { path: u.path, name, seo, archivedListing: listed, archived: has(u.path) };
}
fs.writeFileSync(`${OUT}/archives.json`, JSON.stringify(archives, null, 1));
fs.writeFileSync(`${OUT}/blog-seo.json`, JSON.stringify({ blog: seoFor("blog"), blogPage2: seoFor("blog__page__2") }, null, 1));

// Post thumbnails shown on the archived listing (for cards); featured images of posts.
fs.writeFileSync(S + "/images.json", JSON.stringify([...images].sort(), null, 1));
fs.writeFileSync(S + "/missing-posts.json", JSON.stringify(missingPosts, null, 1));
console.log("pages", PAGE_SLUGS.length + 2, "posts", posts.length, "missing posts", missingPosts.length, "images", images.size);
