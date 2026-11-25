import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPost, postSlugs, publicFileExists, withoutMissingImages, type Post } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ReadingProgress, Toc, type TocItem } from "@/components/blog/ArticleChrome";
import { Cover, PostGrid, PostMeta, formatDate } from "@/components/blog/Blog";
import { CommentForm } from "@/components/forms/Forms";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ChevronRightIcon, PhoneIcon, TagIcon, UserIcon } from "@/components/ui/Icons";

/*
 * Blog articles live at the site root (e.g. /what-is-organic-seo/), exactly as on WordPress.
 * Static routes such as /about/ take precedence over this dynamic segment.
 */

export const generateStaticParams = () => postSlugs.map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const post = getPost((await params).slug);
  return post ? metadataFromSeo(post.seo) : {};
}

const decode = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&nbsp;/g, " ").trim();

/** Uses the article's own table of contents when it had one, otherwise its H2s. */
function tocFor(post: Post, html: string): TocItem[] {
  if (post.toc.length) return post.toc;
  return [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({ href: `#${m[1]}`, label: decode(m[2]) })).filter((t) => t.label);
}

export default async function PostPage({ params }: PageProps<"/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const html = withoutMissingImages(post.html);
  const toc = tocFor(post, html);
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.some((pc) => pc.slug === c.slug)))
    .slice(0, 3);
  const hasImage = !!post.thumbnail && publicFileExists(post.thumbnail.src);
  const updated = post.modified && post.modified.slice(0, 10) !== post.date.slice(0, 10) ? post.modified : null;

  return (
    <>
      <SchemaGraph graph={post.seo.schema} />
      {post.contentSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: s.replace(/</g, "\\u003c") }} />
      ))}
      <ReadingProgress />

      {/* Header */}
      <section aria-labelledby="page-title" className={`grain relative isolate overflow-hidden bg-ink-950 pt-12 text-white sm:pt-16 ${hasImage ? "pb-44" : "pb-20"}`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-48 -top-56 size-[36rem] animate-blob rounded-full bg-brand-600/25 blur-[130px]" />
          <div className="absolute -right-40 top-1/4 size-[28rem] animate-blob rounded-full bg-brand-800/35 blur-[120px] [animation-delay:-7s]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        </div>
        <Reveal className="container-page max-w-4xl text-center">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-white/50">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="size-3.5 text-white/30" />
              </li>
              <li>
                <Link href="/blog/" className="hover:text-white">
                  Blog
                </Link>
              </li>
              {post.categories[0] && (
                <>
                  <li aria-hidden="true">
                    <ChevronRightIcon className="size-3.5 text-white/30" />
                  </li>
                  <li>
                    <Link href={`/category/${post.categories[0].slug}/`} className="hover:text-white">
                      {post.categories[0].name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <h1 id="page-title" className="mx-auto mt-8 text-[2.1rem] font-bold leading-[1.1] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.4rem]">
            {post.title}
          </h1>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <Link href="/author/admin/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800">
                <UserIcon className="size-4" />
              </span>
              {site.name}
            </Link>
            <PostMeta post={post} tone="light" />
          </div>
          {updated && <p className="mt-3 text-xs text-white/40">Updated {formatDate(updated)}</p>}
        </Reveal>
      </section>

      {/* Featured image (skipped when the original file is not available) */}
      {hasImage && (
      <div className="container-page -mt-36 max-w-5xl">
        <Reveal direction="scale">
          <div className="relative aspect-[2/1] overflow-hidden rounded-[2rem] bg-ink-900 shadow-[0_50px_100px_-40px_rgb(7_7_10/0.6)] ring-1 ring-white/10">
            <Cover post={post} priority sizes="(min-width: 1024px) 1024px, 100vw" />
          </div>
        </Reveal>
      </div>
      )}

      {/* Body */}
      <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12">
        {toc.length > 1 && (
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <Toc items={toc} title={post.tocTitle ?? "Table of Contents"} />
            </div>
          </aside>
        )}
        <div className={`min-w-0 ${toc.length > 1 ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-8 lg:col-start-3"}`}>
          <article className="prose-gmf max-w-[70ch]" dangerouslySetInnerHTML={{ __html: html }} />

          {post.tags.length > 0 && (
            <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-ink-950/[0.07] pt-8">
              <h2 className="mr-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                <TagIcon className="size-4" /> Tags:
              </h2>
              {post.tags.map((t) => (
                <Link key={t.slug} href={`/tag/${t.slug}/`} rel="tag" className="rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink-700 ring-1 ring-inset ring-ink-950/[0.06] transition-all hover:bg-brand-600 hover:text-white">
                  {t.name}
                </Link>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="grain relative isolate mt-14 overflow-hidden rounded-[2rem] bg-ink-950 p-8 sm:p-10">
            <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-brand-600/40 blur-[80px]" />
            <p className="text-xl font-bold text-white sm:text-2xl">Book your free consultation today.</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/65">
              We start off with a free consultation where we can introduce ourselves and get to know you and your business.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.bookingPath} variant="light">
                Free consultation <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.phone.tel} variant="ghost-light">
                <PhoneIcon className="size-4" /> {site.phone.display}
              </ButtonLink>
            </div>
          </div>

          {/* Comments */}
          <section aria-labelledby="comments-title" className="mt-16">
            {post.comments.length > 0 && (
              <>
                <h2 id="comments-title" className="text-2xl font-bold tracking-tight">
                  Comments.
                </h2>
                <ol className="mt-6 space-y-4">
                  {post.comments.map((c) => (
                    <li key={c.id} id={c.id} className="rounded-3xl bg-surface p-6">
                      <CommentBody c={c} />
                      {c.replies?.length ? (
                        <ol className="mt-4 space-y-3 border-l-2 border-brand-600/30 pl-5">
                          {c.replies.map((r) => (
                            <li key={r.id} id={r.id} className="rounded-2xl bg-white p-5">
                              <CommentBody c={r} />
                            </li>
                          ))}
                        </ol>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </>
            )}
            <h2 id={post.comments.length ? undefined : "comments-title"} className="mt-12 text-2xl font-bold tracking-tight">
              Leave a Comment.
            </h2>
            <div className="mt-6">
              <CommentForm postPath={post.path} />
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-surface py-20 sm:py-24">
          <div className="container-page">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-title" className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                Latest from the blog
              </h2>
              <ButtonLink href="/blog/" variant="outline">
                View all articles <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
            <PostGrid posts={related} />
          </div>
        </section>
      )}
    </>
  );
}

function CommentBody({ c }: { c: Post["comments"][number] }) {
  return (
    <>
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-semibold text-ink-950">{c.author}</span>
        <time dateTime={c.date} className="text-xs text-ink-500">
          {c.dateText}
        </time>
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600" dangerouslySetInnerHTML={{ __html: c.html }} />
    </>
  );
}
