import type { Metadata } from "next";
import { site } from "@/content/site";

/** Absolute URL for a site path ("/web-design/" -> "https://…/web-design/"). */
export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogImage?: { url: string; width: number; height: number; type?: string };
  ogType?: "website" | "article";
};

/**
 * Builds page metadata that mirrors the Yoast output of the WordPress site:
 * title, description, canonical, Open Graph and Twitter card.
 */
export function buildMetadata({ path, title, description, ogImage, ogType = "website" }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      siteName: site.name,
      url: path,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

/**
 * Yoast emits <meta property="article:modified_time"> on every page. Next metadata
 * "other" only renders name=, so render this tag directly (React hoists it to <head>).
 */
export function ModifiedTimeMeta({ value }: { value: string }) {
  return <meta property="article:modified_time" content={value} />;
}

/**
 * Metadata from a migrated Yoast head (src/content/generated). Title, description, canonical,
 * robots, Open Graph and Twitter values are the ones WordPress published.
 */
export function metadataFromSeo(seo: SeoHead, overrides: { path?: string } = {}): Metadata {
  const path = overrides.path ?? seo.canonical;
  const description = seo.description ?? undefined;
  const ogImage = seo.ogImage
    ? [{ url: seo.ogImage.url, width: seo.ogImage.width, height: seo.ogImage.height, type: seo.ogImage.type }]
    : undefined;
  const ogType = seo.ogType === "article" || seo.ogType === "profile" ? seo.ogType : "website";
  return {
    title: { absolute: seo.title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    openGraph: {
      type: ogType,
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: seo.title,
      description,
      images: ogImage,
      ...(ogType === "article" && seo.published ? { publishedTime: seo.published } : {}),
      ...(ogType === "article" && seo.modified ? { modifiedTime: seo.modified } : {}),
    },
    twitter: { card: "summary_large_image" },
    other: Object.keys(seo.twitter).length ? seo.twitter : undefined,
  };
}

type SeoHead = {
  title: string;
  description: string | null;
  canonical: string;
  ogType: string;
  ogImage: { url: string; width?: number; height?: number; type?: string } | null;
  published: string | null;
  modified: string | null;
  twitter: Record<string, string>;
  schema: unknown[];
};

/** The page's Yoast JSON-LD graph, exactly as WordPress published it (minus the site-search action). */
export function SchemaGraph({ graph, extra = [] }: { graph: unknown[]; extra?: unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLd({ "@context": "https://schema.org", "@graph": [...graph, ...extra] })}
    />
  );
}

/** Serialises JSON-LD safely for a <script> tag. */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
