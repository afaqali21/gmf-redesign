import Image from "next/image";
import Link from "next/link";
import { getBlockPage, toSections } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual } from "@/components/page/Visuals";
import { Html, imageSize } from "@/components/page/Html";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { FinalCta } from "@/components/sections/FinalCta";

const page = getBlockPage("case-studies");
export const metadata = metadataFromSeo(page.seo);

export default function CaseStudiesPage() {
  const { h1, sections } = toSections(page.blocks);
  const s = sections[0];
  const title = h1 ?? "Case Studies";
  // WordPress pairs each project image with the h4 + "Industry" line that follows it.
  const projects = s.items.map((it, i) => ({ ...it, image: s.images[i] }));

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        intro={s.paras.map((p, i) => (
          <Html key={i} html={p} />
        ))}
        visual={<Visual kind="portfolio" />}
        actions={
          <ButtonLink href={site.bookingPath} size="lg">
            Get a Quote <ArrowRightIcon className="size-4" />
          </ButtonLink>
        }
      />

      <section aria-label="Projects" className="relative bg-white py-24 sm:py-32">
        <div className="container-page">
          <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {projects.map((p, i) => {
              const dim = p.image ? imageSize(p.image.src) : null;
              const href = p.image?.link;
              const industry = (p.html ?? "").replace(/^Industry:\s*/, "");
              return (
                <StaggerItem as="li" key={i} className="h-full">
                  <TiltCard max={5} className="h-full overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink-950/[0.07] shadow-[0_30px_60px_-45px_rgb(7_7_10/0.5)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-35px_rgb(215_13_67/0.45)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      {dim && p.image ? (
                        <Image
                          src={p.image.src}
                          alt={p.image.alt}
                          width={dim.width}
                          height={dim.height}
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-1000 ease-out-expo group-hover/tilt:scale-[1.06]"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-500 to-ink-950" />
                      )}
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100" />
                      {href && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand-700 backdrop-blur">
                          Case study
                        </span>
                      )}
                    </div>
                    <div className="relative p-7">
                      <h4 className="text-lg font-semibold tracking-tight text-ink-950">
                        {href ? (
                          <Link href={href} className="transition-colors after:absolute after:inset-0 group-hover/tilt:text-brand-600">
                            {p.title}
                          </Link>
                        ) : (
                          p.title
                        )}
                      </h4>
                      {p.html && (
                        <p className="mt-2 text-sm text-ink-500">
                          <span className="font-medium text-ink-600">Industry:</span> {industry}
                        </p>
                      )}
                      {href && (
                        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-950">
                          Read case study
                          <span className="flex size-8 items-center justify-center rounded-full bg-surface transition-all duration-500 group-hover/tilt:translate-x-1 group-hover/tilt:bg-brand-600 group-hover/tilt:text-white">
                            <ArrowRightIcon className="size-4" />
                          </span>
                        </span>
                      )}
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
