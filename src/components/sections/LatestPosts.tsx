import Link from "next/link";
import { latestPosts } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const accents = [
  "from-brand-500 via-brand-600 to-brand-800",
  "from-ink-700 via-ink-800 to-ink-950",
  "from-brand-700 via-brand-800 to-ink-950",
];

export function LatestPosts() {
  return (
    <section aria-labelledby="posts-title" className="relative bg-white py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="posts-title" className="text-[2rem] font-bold tracking-[-0.03em] sm:text-5xl">
            {latestPosts.title}
          </h2>
          <ButtonLink href={latestPosts.cta.href} variant="outline">
            {latestPosts.cta.label} <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {latestPosts.items.map((post, i) => (
            <StaggerItem as="li" key={post.href} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink-950/[0.07] shadow-[0_24px_50px_-35px_rgb(7_7_10/0.4)] transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_40px_70px_-35px_rgb(215_13_67/0.45)]">
                {/* Decorative header band */}
                <div aria-hidden="true" className={`relative h-36 overflow-hidden bg-gradient-to-br ${accents[i]}`}>
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-1000 ease-out-expo group-hover:scale-110" />
                  <div className="absolute -bottom-10 -right-10 size-36 rounded-full bg-white/15 blur-xl transition-transform duration-700 group-hover:scale-150" />
                  <span className="absolute bottom-5 left-7 text-6xl font-bold tracking-tighter text-white/15">0{i + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                    {fmt.format(new Date(post.date))}
                  </time>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                    <Link href={post.href} className="transition-colors after:absolute after:inset-0 group-hover:text-brand-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
                  <span aria-hidden="true" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink-950">
                    Read article
                    <span className="flex size-8 items-center justify-center rounded-full bg-surface transition-all duration-500 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
                      <ArrowRightIcon className="size-4" />
                    </span>
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
