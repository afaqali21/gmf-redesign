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

/** Serialises JSON-LD safely for a <script> tag. */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
