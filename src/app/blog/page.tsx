import { allPosts } from "@/lib/content";
import { blogPageSeo } from "@/lib/archive";
import { metadataFromSeo } from "@/lib/seo";
import { Listing } from "@/components/blog/Listing";

const seo = blogPageSeo(1);
export const metadata = metadataFromSeo(seo);

export default function BlogPage() {
  return (
    <Listing
      title="Blog"
      intro={seo.description}
      crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      posts={allPosts}
      page={1}
      base="/blog/"
      feature
      seo={seo}
    />
  );
}
