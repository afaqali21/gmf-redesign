import type { PostSummary, PageSeo } from "@/lib/content";
import { SchemaGraph } from "@/lib/seo";
import { PageHero, type Crumb } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CategoryNav, FeaturedPost, Pagination, PostGrid, pageCount, pageSlice } from "./Blog";

type Props = {
  title: string;
  eyebrow?: string;
  intro?: string | null;
  crumbs: Crumb[];
  posts: PostSummary[];
  page: number;
  /** Base path for pagination, e.g. "/blog/" or "/category/ai/". */
  base: string;
  activeCategory?: string;
  /** Show the newest post as a large lead story on page 1. */
  feature?: boolean;
  seo: PageSeo | null;
};

/** Editorial listing shared by /blog/, categories, tags and the author archive. */
export function Listing({ title, eyebrow, intro, crumbs, posts, page, base, activeCategory, feature = false, seo }: Props) {
  const total = pageCount(posts.length);
  const items = pageSlice(posts, page);
  const lead = feature && page === 1 ? items[0] : undefined;
  const rest = lead ? items.slice(1) : items;
  const pageCrumbs = page > 1 ? [...crumbs.slice(0, -1), { ...crumbs[crumbs.length - 1], href: base }, { label: `Page ${page}` }] : crumbs;

  return (
    <>
      {seo && <SchemaGraph graph={seo.schema} />}
      <PageHero title={title} eyebrow={eyebrow} size="md" crumbs={pageCrumbs} intro={intro ?? undefined} />
      <section aria-label="Articles" className="relative bg-surface py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mb-12">
            <CategoryNav active={activeCategory} />
          </Reveal>
          {lead && (
            <Reveal className="mb-12" direction="scale">
              <FeaturedPost post={lead} />
            </Reveal>
          )}
          <PostGrid posts={rest} headingLevel={2} />
          <Pagination base={base} page={page} total={total} />
        </div>
      </section>
    </>
  );
}
