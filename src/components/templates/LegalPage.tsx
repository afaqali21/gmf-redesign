import { getHtmlPage } from "@/lib/content";
import { SchemaGraph } from "@/lib/seo";
import { legalNav } from "@/content/site";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { displayCase } from "./SectionViews";

const decode = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&nbsp;/g, " ").trim();

/** Policy documents: comfortable measure, sticky in-page index built from the document's own headings. */
export function LegalPage({ slug }: { slug: string }) {
  const page = getHtmlPage(slug);
  const title = displayCase(page.h1);
  const toc = [...page.html.matchAll(/<h3 id="([^"]+)">([\s\S]*?)<\/h3>/g)].map((m) => ({ id: m[1], label: decode(m[2]) })).filter((t) => t.label);
  const updated = page.seo.modified ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(page.seo.modified)) : null;

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        size="md"
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        intro={updated && <p className="text-sm uppercase tracking-[0.18em] text-white/50">Last updated {updated}</p>}
      />
      <div className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 space-y-8">
              {toc.length > 0 && (
                <nav aria-label="On this page">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">On this page</p>
                  <ol className="mt-4 space-y-1 border-l border-ink-950/10 text-sm">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-ink-500 transition-colors hover:border-brand-600 hover:text-ink-950">
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <nav aria-label="Policies">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Policies</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {legalNav.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} aria-current={l.href === page.path ? "page" : undefined} className="text-ink-500 transition-colors hover:text-brand-700 aria-[current=page]:font-semibold aria-[current=page]:text-ink-950">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
          <Reveal className="min-w-0 lg:col-span-8 lg:col-start-5">
            <article className="prose-gmf prose-doc max-w-[70ch]" dangerouslySetInnerHTML={{ __html: page.html }} />
          </Reveal>
        </div>
      </div>
    </>
  );
}
