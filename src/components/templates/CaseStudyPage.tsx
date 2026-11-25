import { getBlockPage, toSections, type Section } from "@/lib/content";
import { SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual, type VisualKind } from "@/components/page/Visuals";
import { Html, imageSize } from "@/components/page/Html";
import { RevealImage } from "@/components/page/Media";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  CodeIcon,
  DatabaseIcon,
  DocumentIcon,
  ExternalLinkIcon,
  PlugIcon,
  SearchIcon,
  ShareIcon,
  ShieldIcon,
  SmartphoneIcon,
  TargetIcon,
} from "@/components/ui/Icons";
import { displayCase, IconPanel } from "./SectionViews";
import { BgImage } from "./ServicePage";
import { FinalCta } from "@/components/sections/FinalCta";

const chapterIcon = (title: string) => {
  const t = title.toLowerCase();
  const cls = "size-10";
  if (t.includes("document")) return <DocumentIcon className={cls} />;
  if (t.includes("api")) return <PlugIcon className={cls} />;
  if (t.includes("backend")) return <DatabaseIcon className={cls} />;
  if (t.includes("app")) return <SmartphoneIcon className={cls} />;
  if (t.includes("social")) return <ShareIcon className={cls} />;
  if (t.includes("organic")) return <SearchIcon className={cls} />;
  if (t.includes("paid")) return <TargetIcon className={cls} />;
  if (t.includes("web")) return <CodeIcon className={cls} />;
  return <ShieldIcon className={cls} />;
};

const slugId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Chapter visual: the original photo when we have it, otherwise an illustrated panel. */
function ChapterVisual({ s, index }: { s: Section; index: number }) {
  const img = [...s.images, ...(s.bg ? [s.bg] : [])].find((i) => imageSize(i.src));
  if (img) {
    const dim = imageSize(img.src)!;
    return <RevealImage src={img.src} alt={img.alt} width={dim.width} height={dim.height} sizes="(min-width: 1024px) 420px, 100vw" className="aspect-[4/3]" />;
  }
  return <IconPanel icon={chapterIcon(s.heading?.text ?? "")} index={index} />;
}

export function CaseStudyPage({ slug, visual }: { slug: string; visual: VisualKind }) {
  const page = getBlockPage(slug);
  const { h1, sections } = toSections(page.blocks);
  const title = h1 ?? page.seo.title;
  const [intro, ...chapters] = sections;
  const headerImg = page.blocks.find((b) => b.t === "bg");
  const liveSite = intro.ctas.find((c) => /^https?:/.test(c.href));

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies/" }, { label: title }]}
        visual={<Visual kind={visual} />}
        backgroundImage={headerImg && "src" in headerImg ? <BgImage src={headerImg.src} /> : undefined}
        actions={
          <>
            <ButtonLink href={site.bookingPath} size="lg">
              Get a Quote <ArrowRightIcon className="size-4" />
            </ButtonLink>
            {liveSite && (
              <ButtonLink href={liveSite.href} variant="ghost-light" size="lg" target="_blank" rel="noopener noreferrer">
                {liveSite.label} <ExternalLinkIcon className="size-4" />
              </ButtonLink>
            )}
          </>
        }
      />

      {/* Overview */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 size-[34rem] rounded-full bg-brand-100/70 blur-[120px]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            {intro.heading && (
              <h3 className="text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">{displayCase(intro.heading.text)}</h3>
            )}
          </Reveal>
          <Reveal className="space-y-5 text-base leading-[1.8] text-ink-500 sm:text-lg lg:col-span-7" delay={0.1}>
            {intro.paras.map((p, i) => (
              <Html key={i} html={p} />
            ))}
            {liveSite && (
              <a href={liveSite.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline decoration-brand-600/30 underline-offset-4 hover:decoration-current">
                {liveSite.label} <ExternalLinkIcon className="size-4" />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      <section aria-label="Project chapters" className="relative bg-surface py-24 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <nav aria-label="Chapters" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-ink-950/10">
              {chapters.map((c, i) => (
                <li key={i}>
                  <a href={`#${slugId(c.heading?.text ?? String(i))}`} className="-ml-px block border-l-2 border-transparent py-2 pl-5 text-sm text-ink-500 transition-colors hover:border-brand-600 hover:text-ink-950">
                    <span className="mr-2 font-semibold tabular-nums text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                    {c.heading?.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-24 lg:col-span-9">
            {chapters.map((c, i) => {
              const callouts = c.paras.filter((p) => p.length < 60);
              const body = c.paras.filter((p) => p.length >= 60);
              return (
                <article key={i} id={slugId(c.heading?.text ?? String(i))} className="grid scroll-mt-28 items-start gap-10 md:grid-cols-12">
                  <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                    <ChapterVisual s={c} index={i + 1} />
                  </div>
                  <Reveal className="md:col-span-7">
                    <span aria-hidden="true" className="mb-4 flex items-center gap-3 text-xs font-bold tabular-nums tracking-[0.2em] text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                      <span className="h-px w-10 bg-brand-600/40" />
                    </span>
                    {c.heading && <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">{displayCase(c.heading.text)}</h3>}
                    <div className="mt-6 space-y-5 text-base leading-[1.8] text-ink-500">
                      {body.map((p, j) => (
                        <Html key={j} html={p} />
                      ))}
                    </div>
                    {callouts.map((p, j) => (
                      <p key={j} className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-ink-950 ring-1 ring-brand-600/20 shadow-[0_20px_40px_-30px_rgb(215_13_67/0.6)]">
                        <ShieldIcon className="size-5 text-brand-600" />
                        <span dangerouslySetInnerHTML={{ __html: p }} />
                      </p>
                    ))}
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
