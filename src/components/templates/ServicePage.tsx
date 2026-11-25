import Image from "next/image";
import type { Metadata } from "next";
import { getBlockPage, toSections, type Section } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual, type VisualKind } from "@/components/page/Visuals";
import { imageSize } from "@/components/page/Html";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";
import { BandSection, CardsSection, ClosingSection, SplitSection, StatementSection } from "./SectionViews";
import { RelatedServices } from "./RelatedServices";

export const pageMetadata = (slug: string): Metadata => metadataFromSeo(getBlockPage(slug).seo);

/** Decorative full-bleed background from the WordPress parallax rows (alt is empty on the original too). */
export function BgImage({ src }: { src: string }) {
  if (!imageSize(src)) return null;
  return <Image src={src} alt="" fill sizes="100vw" className="object-cover" />;
}

const isClosing = (s: Section) => s.ctas.some((c) => c.href.startsWith("tel:"));

type Plan = { kind: "closing" | "band" | "statement" } | { kind: "cards"; first: boolean } | { kind: "split"; flip: boolean };

/** Each section's layout: closing CTA, benefit cards, CTA band, image split (alternating sides) or statement. */
function layoutPlan(sections: Section[]): Plan[] {
  let splits = 0;
  let cards = 0;
  return sections.map((s, i): Plan => {
    if (i === sections.length - 1 && isClosing(s)) return { kind: "closing" };
    if (s.items.length >= 2) return { kind: "cards", first: cards++ === 0 };
    if (isClosing(s)) return { kind: "band" };
    if (s.images.length || i === 0) return { kind: "split", flip: splits++ % 2 === 1 };
    return { kind: "statement" };
  });
}

/**
 * Service pages (marketing, development, design). Every heading, paragraph, list and button comes
 * from the WordPress page; the template only decides how each section is laid out.
 */
export function ServicePage({ slug, visual, promote }: { slug: string; visual: VisualKind; promote?: string[] }) {
  const page = getBlockPage(slug);
  const { h1, sections } = toSections(page.blocks, { promote });
  const title = h1 ?? page.seo.title;
  const plan = layoutPlan(sections);

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        visual={<Visual kind={visual} />}
        actions={
          <>
            <ButtonLink href={site.bookingPath} size="lg">
              Instant Quote <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={site.phone.tel} variant="ghost-light" size="lg">
              <PhoneIcon className="size-4" /> Call Us {site.phone.display}
            </ButtonLink>
          </>
        }
      />

      {sections.map((s, i) => {
        const n = i + 1;
        const bg = s.bg ? <BgImage src={s.bg.src} /> : undefined;
        const p = plan[i];
        if (p.kind === "closing") return <ClosingSection key={i} s={s} />;
        if (p.kind === "cards") return <CardsSection key={i} s={s} index={n} tone={p.first ? "dark" : "light"} bg={bg} />;
        if (p.kind === "band") return <BandSection key={i} s={s} bg={bg} />;
        if (p.kind === "split") return <SplitSection key={i} s={s} index={n} flip={p.flip} surface={i % 2 === 1} />;
        return <StatementSection key={i} s={s} surface={i % 2 === 1} />;
      })}

      <RelatedServices current={page.path} />
    </>
  );
}
