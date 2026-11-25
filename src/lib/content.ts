// Typed access to the content migrated from WordPress (src/content/generated, built by the
// migration script from archived pages). Copy is used as-is; only the presentation changes.
import fs from "node:fs";
import path from "node:path";
import postsIndex from "@/content/generated/posts-index.json";
import archivesJson from "@/content/generated/archives.json";
import servicePhotos from "@/content/service-photos.json";

export type SchemaNode = Record<string, unknown>;

export type PageSeo = {
  title: string;
  description: string | null;
  canonical: string;
  ogType: string;
  ogImage: { url: string; width?: number; height?: number; type?: string } | null;
  published: string | null;
  modified: string | null;
  twitter: Record<string, string>;
  schema: SchemaNode[];
};

export type Block =
  | { t: "h"; level: number; text: string; step?: boolean }
  | { t: "p"; html: string; step?: boolean }
  | { t: "li"; html: string; depth: number }
  | { t: "img" | "bg"; src: string; alt: string; link?: string }
  | { t: "cta"; label: string; href: string }
  | { t: "iframe"; src: string };

export type BlockPage = { path: string; seo: PageSeo; blocks: Block[] };
export type HtmlPage = { path: string; h1: string; seo: PageSeo; html: string };

export type PostSummary = {
  slug: string;
  path: string;
  title: string;
  date: string;
  modified: string;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  thumbnail: { src: string; alt: string } | null;
  excerpt: string | null;
  readingMinutes: number;
};

export type Comment = { id: string; author: string; date: string; dateText: string; html: string; replies?: Comment[] };

export type Post = PostSummary & {
  toc: { label: string; href: string; children: { label: string; href: string }[] }[];
  tocTitle: string | null;
  html: string;
  contentSchemas: string[];
  comments: Comment[];
  seo: PageSeo;
};

export type Archive = { path: string; name: string; seo: PageSeo | null; archivedListing: string[]; archived: boolean };

const GEN = path.join(process.cwd(), "src/content/generated");
const read = <T,>(file: string): T => JSON.parse(fs.readFileSync(path.join(GEN, file), "utf8")) as T;

type ServicePhoto = { file: string; description: string };

/**
 * New photography for the service pages (scripts/fetch-service-photos.mjs, Unsplash License).
 * The migrated WordPress images are swapped in order; each alt text describes the new photo
 * and keeps the original alt phrase (e.g. "… – Search Engine Marketing in UK").
 */
function withServicePhotos(slug: string, page: BlockPage): BlockPage {
  const photos = (servicePhotos as Record<string, ServicePhoto[]>)[slug];
  if (!photos?.length) return page;
  let i = 0;
  const blocks = page.blocks.map((b) => {
    // Decorative parallax backgrounds (empty alt) use the page's new photography as well.
    if (b.t === "bg") return { ...b, src: photos[photos.length - 1].file };
    if (b.t !== "img" || i >= photos.length) return b;
    const p = photos[i++];
    return { ...b, src: p.file, alt: b.alt ? `${p.description} – ${b.alt}` : p.description };
  });
  return { ...page, blocks };
}

export const getBlockPage = (slug: string) => withServicePhotos(slug, read<BlockPage>(`pages/${slug}.json`));
export const getHtmlPage = (slug: string) => read<HtmlPage>(`pages/${slug}.json`);

/** Newest first. */
export const allPosts = postsIndex as PostSummary[];
export const postSlugs = allPosts.map((p) => p.slug);
export const getPost = (slug: string): Post | null => (postSlugs.includes(slug) ? read<Post>(`posts/${slug}.json`) : null);

export const archives = archivesJson as unknown as Record<"category" | "tag" | "author", Record<string, Archive>>;

export const postsInCategory = (slug: string) => allPosts.filter((p) => p.categories.some((c) => c.slug === slug));
export const postsWithTag = (slug: string) => allPosts.filter((p) => p.tags.some((t) => t.slug === slug));

export const categories = Object.entries(archives.category).map(([slug, a]) => ({ slug, name: a.name, count: postsInCategory(slug).length }));

/** True when a /public file exists. Migrated pages reference WordPress upload paths; some files
 *  were not recoverable yet, so callers hide or replace those instead of showing a broken image. */
export const publicFileExists = (src: string) => {
  if (!src.startsWith("/")) return true;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", decodeURI(src.split("?")[0])));
  } catch {
    return false;
  }
};

/** Removes <img> tags (and their now-empty <figure>) whose local file is missing. */
export function withoutMissingImages(html: string) {
  return html
    .replace(/<img\b[^>]*\bsrc="(\/[^"]+)"[^>]*>/g, (tag, src: string) => (publicFileExists(src) ? tag : ""))
    .replace(/<figure>\s*(<figcaption>[\s\S]*?<\/figcaption>)?\s*<\/figure>/g, "")
    .replace(/<p>\s*<\/p>/g, "");
}

// ---------- Section grouping for block pages ----------

export type Item = { title?: string; titleLevel?: number; html?: string };
export type Section = {
  heading?: { level: number; text: string };
  /** Extra heading lines that WordPress rendered as separate tags (e.g. "Stand Out From" / "Your Competitors"). */
  headingLines?: string[];
  paras: string[];
  list: { html: string; depth: number }[];
  items: Item[];
  /** Paragraphs that follow the items (a closing line under a list). */
  after: string[];
  images: { src: string; alt: string; link?: string }[];
  bg?: { src: string; alt: string };
  ctas: { label: string; href: string }[];
  iframes: string[];
};

const emptySection = (heading?: Section["heading"]): Section => ({ heading, paras: [], list: [], items: [], after: [], images: [], ctas: [], iframes: [] });

/**
 * Groups a WordPress block stream into sections: a new section starts at every h2/h3 that is not
 * inside a process-step card. Step headings/paragraphs become items. Images join the current
 * section; images before the first heading join the first section (WPBakery puts them first).
 */
export function toSections(blocks: Block[], opts: { promote?: string[] } = {}): { h1?: string; sections: Section[] } {
  let h1: string | undefined;
  const sections: Section[] = [];
  let cur: Section | null = null;
  let pendingImages: Section["images"] = [];
  const start = (heading?: Section["heading"]) => {
    cur = emptySection(heading);
    cur.images.push(...pendingImages);
    pendingImages = [];
    sections.push(cur);
    return cur;
  };
  for (const b of blocks) {
    if (b.t === "h" && b.level === 1 && !h1) {
      h1 = b.text;
      continue;
    }
    const s = cur as Section | null;
    if (b.t === "h" && !b.step && b.level <= 3) {
      // Consecutive h2s with no content between them are one heading split over two lines.
      if (s && s.heading && s.heading.level === b.level && !s.paras.length && !s.items.length && !s.list.length) {
        s.headingLines = [...(s.headingLines ?? [s.heading.text]), b.text];
        continue;
      }
      start({ level: b.level, text: b.text });
      continue;
    }
    if (b.t === "p" && !b.step && opts.promote?.includes(b.html)) {
      start({ level: 0, text: b.html });
      continue;
    }
    if (b.t === "img") {
      if (s) s.images.push(b);
      else pendingImages.push(b);
      continue;
    }
    const sec: Section = s ?? start();
    if (b.t === "h") {
      sec.items.push({ title: b.text, titleLevel: b.level });
    } else if (b.t === "p" && b.step) {
      const last = sec.items[sec.items.length - 1];
      if (last && !last.html) last.html = b.html;
      else sec.items.push({ html: b.html });
    } else if (b.t === "p") {
      const last = sec.items[sec.items.length - 1];
      if (last && last.title && !last.html) last.html = b.html;
      else (sec.items.length || sec.list.length ? sec.after : sec.paras).push(b.html);
    } else if (b.t === "li") sec.list.push({ html: b.html, depth: b.depth });
    else if (b.t === "bg") sec.bg = { src: b.src, alt: b.alt };
    else if (b.t === "cta") sec.ctas.push({ label: b.label, href: b.href });
    else if (b.t === "iframe") sec.iframes.push(b.src);
  }
  const lastSection = cur as Section | null;
  if (pendingImages.length && lastSection) lastSection.images.push(...pendingImages);
  return { h1, sections };
}
