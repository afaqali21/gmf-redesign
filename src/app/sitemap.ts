import type { MetadataRoute } from "next";
import inventory from "@/content/url-inventory.json";
import { allPosts, archives } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { staticPaths } from "@/content/routes";

// /page-home/ and /form-maker/preview/ now redirect.

const lastmod = new Map(inventory.urls.map((u) => [u.path, u.lastmod]));

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, modified?: string | null) => ({ url: absoluteUrl(path), lastModified: modified ?? lastmod.get(path) });
  return [
    ...staticPaths.map((p) => entry(p)),
    ...allPosts.map((p) => entry(p.path, p.modified)),
    ...(["category", "tag", "author"] as const).flatMap((k) => Object.values(archives[k]).map((a) => entry(a.path))),
  ];
}
