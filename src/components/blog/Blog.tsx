import Image from "next/image";
import Link from "next/link";
import { categories, publicFileExists, type PostSummary } from "@/lib/content";
import { imageSize } from "@/components/page/Html";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from "@/components/ui/Icons";

import { PER_PAGE, pageCount } from "@/lib/paging";

export { PER_PAGE, pageCount };
export const pageSlice = <T,>(items: T[], page: number) => items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => fmt.format(new Date(iso));

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#039;|&#8217;/g, "’");

/** Featured image, or a branded generated cover when the original image file is not available. */
export function Cover({ post, sizes, priority, className = "" }: { post: PostSummary; sizes: string; priority?: boolean; className?: string }) {
  const src = post.thumbnail?.src;
  const dim = src && publicFileExists(src) ? imageSize(src) : null;
  if (src && dim) {
    return (
      <Image
        src={src}
        alt={post.thumbnail?.alt || post.title}
        width={dim.width}
        height={dim.height}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05] ${className}`}
      />
    );
  }
  const cat = post.categories[0]?.name ?? "Blog";
  return (
    <div aria-hidden="true" className={`grain relative h-full w-full overflow-hidden bg-ink-950 ${className}`}>
      <div className="absolute -left-10 -top-16 size-64 rounded-full bg-brand-600/50 blur-[70px] transition-transform duration-1000 group-hover:scale-125" />
      <div className="absolute -bottom-20 -right-10 size-72 rounded-full bg-brand-900/80 blur-[80px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_80%)]" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-300">{cat}</span>
        <span className="mt-2 line-clamp-3 text-lg font-bold leading-snug tracking-tight text-white/90">{post.title}</span>
      </div>
    </div>
  );
}

export function PostMeta({ post, tone = "dark" }: { post: PostSummary; tone?: "dark" | "light" }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium ${tone === "light" ? "text-white/60" : "text-ink-500"}`}>
      <time dateTime={post.date} className={`font-semibold uppercase tracking-[0.16em] ${tone === "light" ? "text-brand-300" : "text-brand-600"}`}>
        {formatDate(post.date)}
      </time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <ClockIcon className="size-3.5" /> {post.readingMinutes} min read
      </span>
    </p>
  );
}

export function PostCard({ post, headingLevel = 3 }: { post: PostSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink-950/[0.07] shadow-[0_24px_50px_-35px_rgb(7_7_10/0.4)] transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_40px_70px_-35px_rgb(215_13_67/0.45)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        <Cover post={post} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        {post.categories.length > 0 && (
          <ul className="relative z-10 mb-4 flex flex-wrap gap-1.5">
            {post.categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}/`} className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-700 transition-colors hover:bg-brand-600 hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <PostMeta post={post} />
        <Heading className="mt-3 text-lg font-semibold leading-snug tracking-tight">
          <Link href={post.path} className="transition-colors after:absolute after:inset-0 group-hover:text-brand-600">
            {post.title}
          </Link>
        </Heading>
        {post.excerpt && <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{decode(post.excerpt)}</p>}
        <span aria-hidden="true" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-950">
          Read article
          <span className="flex size-8 items-center justify-center rounded-full bg-surface transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <ArrowRightIcon className="size-4" />
          </span>
        </span>
      </div>
    </article>
  );
}

/** Large lead story for the first blog page. */
export function FeaturedPost({ post }: { post: PostSummary }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[2.5rem] bg-ink-950 text-white shadow-[0_50px_100px_-50px_rgb(215_13_67/0.55)] lg:grid-cols-12">
      <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
        <Cover post={post} priority sizes="(min-width: 1024px) 720px, 100vw" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-950/30" />
      </div>
      <div className="grain relative flex flex-col justify-center p-8 sm:p-12 lg:col-span-5">
        <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-600/30 blur-[90px]" />
        <span className="relative mb-5 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-300 ring-1 ring-inset ring-white/15">
          Latest article
        </span>
        <PostMeta post={post} tone="light" />
        <h2 className="relative mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-[2rem]">
          <Link href={post.path} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="relative mt-4 line-clamp-4 text-[0.97rem] leading-relaxed text-white/65">{decode(post.excerpt)}</p>}
        <span aria-hidden="true" className="relative mt-8 inline-flex items-center gap-3 text-sm font-semibold">
          Read article
          <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 transition-transform duration-500 group-hover:translate-x-1">
            <ArrowRightIcon className="size-4" />
          </span>
        </span>
      </div>
    </article>
  );
}

export function PostGrid({ posts, headingLevel = 3 }: { posts: PostSummary[]; headingLevel?: 2 | 3 }) {
  return (
    <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
      {posts.map((p) => (
        <StaggerItem as="li" key={p.slug} className="h-full">
          <PostCard post={p} headingLevel={headingLevel} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Category chips, linking to the existing /category/… archives. */
export function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Blog categories" className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        <li>
          <Link
            href="/blog/"
            aria-current={!active ? "page" : undefined}
            className="inline-flex rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset ring-ink-950/10 transition-all hover:ring-brand-600/40 aria-[current=page]:bg-ink-950 aria-[current=page]:text-white aria-[current=page]:ring-ink-950"
          >
            All articles
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/category/${c.slug}/`}
              aria-current={active === c.slug ? "page" : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-inset ring-ink-950/10 transition-all hover:text-brand-700 hover:ring-brand-600/40 aria-[current=page]:bg-ink-950 aria-[current=page]:text-white aria-[current=page]:ring-ink-950"
            >
              {c.name}
              <span className="text-xs text-ink-500 [[aria-current=page]_&]:text-white/60">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** WordPress-style pagination: /base/, /base/page/2/, … */
export function Pagination({ base, page, total }: { base: string; page: number; total: number }) {
  if (total <= 1) return null;
  const href = (n: number) => (n === 1 ? base : `${base}page/${n}/`);
  const btn = "inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-inset transition-all duration-300";
  return (
    <Reveal>
      <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
        {page > 1 && (
          <Link href={href(page - 1)} rel="prev" aria-label="Previous page" className={`${btn} ring-ink-950/10 hover:ring-brand-600/50 hover:text-brand-700`}>
            <ArrowLeftIcon className="size-4" />
          </Link>
        )}
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${n === page ? "bg-ink-950 text-white ring-ink-950" : "ring-ink-950/10 hover:text-brand-700 hover:ring-brand-600/50"}`}
          >
            {n}
          </Link>
        ))}
        {page < total && (
          <Link href={href(page + 1)} rel="next" aria-label="Next page" className={`${btn} ring-ink-950/10 hover:ring-brand-600/50 hover:text-brand-700`}>
            <ArrowRightIcon className="size-4" />
          </Link>
        )}
      </nav>
    </Reveal>
  );
}
