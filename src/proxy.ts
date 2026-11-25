import { NextResponse, type NextRequest } from "next/server";
import posts from "@/content/generated/posts-index.json";
import archives from "@/content/generated/archives.json";
import { pageCount } from "@/lib/paging";

/*
 * Blog posts, archives and listing pages are dynamic segments. With Partial Prefetching an unknown
 * slug would be answered with the prerendered shell (HTTP 200 + noindex). This proxy returns a real
 * 404 instead, so search engines and link checkers see the correct status.
 */
type Kind = "category" | "tag" | "author";
const postSlugs = new Set(posts.map((p) => p.slug));
const countFor = (kind: Kind, slug: string) =>
  kind === "author"
    ? posts.length
    : posts.filter((p) => (kind === "category" ? p.categories : p.tags).some((x) => x.slug === slug)).length;
const archivePages: Record<Kind, Map<string, number>> = {
  category: new Map(Object.keys(archives.category).map((s) => [s, pageCount(countFor("category", s))])),
  tag: new Map(Object.keys(archives.tag).map((s) => [s, pageCount(countFor("tag", s))])),
  author: new Map(Object.keys(archives.author).map((s) => [s, pageCount(countFor("author", s))])),
};
const blogPages = pageCount(posts.length);
const validPage = (n: string | undefined, max: number) => n === undefined || (/^[0-9]+$/.test(n) && Number(n) >= 2 && Number(n) <= max);

function isKnown(parts: string[]) {
  const [first, second, third, fourth] = parts;
  if (first === "blog") return parts.length === 1 || (second === "page" && parts.length === 3 && validPage(third, blogPages));
  if (first === "category" || first === "tag" || first === "author") {
    const max = archivePages[first].get(second ?? "");
    if (!max) return false;
    return parts.length === 2 || (third === "page" && parts.length === 4 && validPage(fourth, max));
  }
  // Any other single segment reaching this proxy (static pages are excluded by the matcher) is a post.
  return parts.length === 1 && postSlugs.has(first);
}

export function proxy(request: NextRequest) {
  if (isKnown(request.nextUrl.pathname.split("/").filter(Boolean))) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  // Single-segment paths except static pages (keep in sync with src/content/routes.ts), files and
  // Next internals, plus blog pagination and archives. Matcher values must be literals.
  matcher: [
    "/((?!(?:_next|api|wp-content|images|about|booking|contact|case-studies|minicabs-solutions|dry-cleaning-solutions|search-engine-marketing|social-media-marketing|search-engine-optimization|email-marketing|google-ads|branding|app-development|web-development|app-design|graphic-design|web-design|law-firm-seo|travel-seo-services|terms|privacy-policy|blog|category|tag|author|page-home|form-maker)(?:/|$))[^/.]+)/",
    "/blog/page/:n*",
    "/(category|tag|author)/:slug/:rest*",
  ],
};
