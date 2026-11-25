import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every WordPress URL ends in "/" (e.g. /web-design/). Keep them identical.
  trailingSlash: true,
  images: {
    // Serve modern formats; next/image picks the smallest the browser supports.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Leftover WordPress pages that duplicated other content (see README, "Open items").
      { source: "/page-home/", destination: "/", permanent: true },
      { source: "/form-maker/preview/", destination: "/booking/", permanent: true },
      // Yoast sitemap URLs that search engines already know -> the single Next.js sitemap.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/:type(page|post|category|post_tag|author|form-maker)-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
