import { notFound } from "next/navigation";
import { allPosts } from "@/lib/content";
import { blogPageSeo } from "@/lib/archive";
import { metadataFromSeo } from "@/lib/seo";
import { Listing } from "@/components/blog/Listing";
import { pageCount } from "@/components/blog/Blog";

const total = pageCount(allPosts.length);

export const generateStaticParams = () => Array.from({ length: total - 1 }, (_, i) => ({ page: String(i + 2) }));

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">) {
  const n = Number((await params).page);
  return n >= 2 && n <= total ? metadataFromSeo(blogPageSeo(n)) : {};
}

export default async function BlogPaged({ params }: PageProps<"/blog/page/[page]">) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2 || n > total) notFound();
  const seo = blogPageSeo(n);
  return (
    <Listing
      title="Blog"
      intro={seo.description}
      crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      posts={allPosts}
      page={n}
      base="/blog/"
      seo={seo}
    />
  );
}
