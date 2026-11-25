import { notFound } from "next/navigation";
import { archives } from "@/lib/content";
import { archivePosts, archiveSeo, type ArchiveKind } from "@/lib/archive";
import { pageCount } from "./Blog";
import { Listing } from "./Listing";

const eyebrows: Record<ArchiveKind, string> = { category: "Category", tag: "Tag", author: "Author" };

/** /category/x/, /tag/x/ and /author/x/ (and their /page/N/). */
export function ArchiveRoute({ kind, slug, page = 1 }: { kind: ArchiveKind; slug: string; page?: number }) {
  const a = archives[kind][slug];
  const posts = a ? archivePosts(kind, slug) : [];
  if (!a || !posts.length || !Number.isInteger(page) || page < 1 || page > pageCount(posts.length)) notFound();
  return (
    <Listing
      title={a.name}
      eyebrow={eyebrows[kind]}
      crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: a.name }]}
      posts={posts}
      page={page}
      base={a.path}
      activeCategory={kind === "category" ? slug : undefined}
      seo={archiveSeo(kind, slug, page)}
    />
  );
}
