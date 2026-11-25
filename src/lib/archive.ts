import type { Metadata } from "next";
import { allPosts, archives, postsInCategory, postsWithTag, type PageSeo, type PostSummary } from "@/lib/content";
import { metadataFromSeo } from "@/lib/seo";
import blogSeo from "@/content/generated/blog-seo.json";
import { pageCount } from "@/components/blog/Blog";

export type ArchiveKind = "category" | "tag" | "author";

export const archivePosts = (kind: ArchiveKind, slug: string): PostSummary[] =>
  kind === "category" ? postsInCategory(slug) : kind === "tag" ? postsWithTag(slug) : allPosts;

/** Re-points a page-1 SEO record at page N (canonical, schema ids), with Yoast's " - Page N of M" title. */
export function seoForPage(seo: PageSeo, base: string, page: number, total: number, titleSuffix = true): PageSeo {
  if (page === 1) return seo;
  const path = `${base}page/${page}/`;
  const schema = JSON.parse(JSON.stringify(seo.schema).replaceAll(`https://globalmarketingfirm.co.uk${base}"`, `https://globalmarketingfirm.co.uk${path}"`).replaceAll(`https://globalmarketingfirm.co.uk${base}#`, `https://globalmarketingfirm.co.uk${path}#`));
  return { ...seo, title: titleSuffix ? `${seo.title} - Page ${page} of ${total}` : seo.title, canonical: path, schema };
}

export function archiveSeo(kind: ArchiveKind, slug: string, page = 1): PageSeo | null {
  const a = archives[kind][slug];
  if (!a?.seo) return null;
  return seoForPage(a.seo, a.path, page, pageCount(archivePosts(kind, slug).length));
}

export const archiveMetadata = (kind: ArchiveKind, slug: string, page = 1): Metadata => {
  const seo = archiveSeo(kind, slug, page);
  return seo ? metadataFromSeo(seo) : {};
};

/** Params for /…/page/N/ routes: every archive with more than one page. */
export function pagedParams(kind: ArchiveKind) {
  return Object.keys(archives[kind]).flatMap((slug) =>
    Array.from({ length: pageCount(archivePosts(kind, slug).length) - 1 }, (_, i) => ({ slug, page: String(i + 2) })),
  );
}

export const blogPageSeo = (page: number): PageSeo => {
  const base = blogSeo.blog as unknown as PageSeo;
  if (page === 1) return base;
  // WordPress kept the same title on /blog/page/N/ (no "Page N of M" suffix).
  return seoForPage(base, "/blog/", page, pageCount(allPosts.length), false);
};
