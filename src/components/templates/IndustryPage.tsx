import { getBlockPage, toSections, type Section } from "@/lib/content";
import { SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual, type VisualKind } from "@/components/page/Visuals";
import { Html } from "@/components/page/Html";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, PhoneIcon, PlaneIcon, ScaleIcon } from "@/components/ui/Icons";
import { BandSection, Bullets, ClosingSection, Ctas, IconPanel, Paras, SectionHeadingText, SectionNumber, SplitSection, StatementSection, displayCase } from "./SectionViews";
import { RelatedServices } from "./RelatedServices";

type Group = Section & { children: Section[] };

/** An h2 with no body followed by h3 sections ("What's Include…", "FAQs") becomes a parent with children. */
function nest(sections: Section[]): Group[] {
  const out: Group[] = [];
  for (const s of sections) {
    const parent = out[out.length - 1];
    const empty = (x: Section) => !x.paras.length && !x.list.length && !x.items.length && !x.ctas.length;
    if (s.heading?.level === 3 && parent && parent.heading?.level === 2 && (empty(parent) || parent.children.length)) {
      parent.children.push(s);
    } else out.push({ ...s, children: [] });
  }
  return out;
}

function ChildCards({ g, index }: { g: Group; index: number }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 size-[32rem] animate-blob rounded-full bg-brand-700/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[26rem] animate-blob rounded-full bg-brand-600/20 blur-[110px] [animation-delay:-8s]" />
      </div>
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <SectionNumber n={index} tone="light" />
          <SectionHeadingText s={g} tone="light" />
        </Reveal>
        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {g.children.map((c, i) => (
            <StaggerItem as="li" key={i} className="h-full">
              <TiltCard className="gradient-border h-full rounded-[2rem] bg-white/[0.04] p-8 backdrop-blur-md" glow="rgb(238 51 100 / 0.22)">
                <div className="relative [transform:translateZ(20px)]">
                  <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgb(215_13_67/0.8)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-white">{c.heading?.text}</h3>
                  <Paras paras={c.paras} tone="light" className="mt-3 !text-[0.95rem] !leading-relaxed" />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Faq({ g, index }: { g: Group; index: number }) {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionNumber n={index} />
          <SectionHeadingText s={g} />
        </Reveal>
        <Stagger className="space-y-3 lg:col-span-8" stagger={0.08}>
          {g.children.map((c, i) => (
            <StaggerItem key={i}>
              <details className="group rounded-3xl bg-surface ring-1 ring-inset ring-ink-950/[0.05] transition-all duration-300 open:bg-white open:shadow-[0_30px_60px_-40px_rgb(215_13_67/0.5)] open:ring-brand-600/25" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-ink-950">{c.heading?.text}</h3>
                  <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-xl text-brand-600 ring-1 ring-ink-950/10 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <Paras paras={c.paras} className="px-6 pb-6 !text-[0.97rem]" />
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Ordered process list rendered as a numbered track. */
function ProcessSection({ s, index }: { s: Section; index: number }) {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <SectionNumber n={index} />
          <SectionHeadingText s={s} />
        </Reveal>
        <Stagger as="ol" className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {s.list.map((li, i) => (
            <StaggerItem as="li" key={i} className="group relative rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-35px_rgb(215_13_67/0.55)]">
              <span className="text-xs font-bold tabular-nums tracking-[0.2em] text-brand-600">Step {String(i + 1).padStart(2, "0")}</span>
              <Html as="p" html={li.html} className="mt-3 text-lg font-semibold text-ink-950" />
              <span aria-hidden="true" className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-transform duration-500 group-hover:scale-x-100" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ListSection({ s, index, surface }: { s: Section; index: number; surface: boolean }) {
  return (
    <section className={`relative overflow-hidden py-24 sm:py-28 ${surface ? "bg-surface" : "bg-white"}`}>
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionNumber n={index} />
          <SectionHeadingText s={s} />
          <Paras paras={s.paras} className="mt-6" />
          <Paras paras={s.after} className="mt-6 font-medium !text-ink-950" />
          <Ctas ctas={s.ctas} />
        </Reveal>
        <div className="lg:col-span-7">
          <Bullets list={s.list} columns />
        </div>
      </div>
    </section>
  );
}

export function IndustryPage({ slug, visual }: { slug: string; visual: VisualKind }) {
  const page = getBlockPage(slug);
  const { h1, sections } = toSections(page.blocks);
  const title = h1 ?? page.seo.title;
  // A CTA placed directly under the H1 (no heading of its own) becomes the hero button.
  const lead = sections[0] && !sections[0].heading ? sections.shift() : undefined;
  const groups = nest(sections);
  const last = groups.length - 1;
  const FallbackIcon = visual === "travel" ? PlaneIcon : ScaleIcon;

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        visual={<Visual kind={visual} />}
        actions={
          <>
            {(lead?.ctas.length ? lead.ctas : [{ label: "Call Us", href: site.phone.tel }]).map((c) => (
              <ButtonLink key={c.href} href={c.href} size="lg">
                <PhoneIcon className="size-4" /> {displayCase(c.label)}
              </ButtonLink>
            ))}
            <ButtonLink href={site.bookingPath} variant="ghost-light" size="lg">
              Get a Quote <ArrowRightIcon className="size-4" />
            </ButtonLink>
          </>
        }
      />

      {groups.map((g, i) => {
        const n = i + 1;
        if (g.children.length) return /faq/i.test(g.heading?.text ?? "") ? <Faq key={i} g={g} index={n} /> : <ChildCards key={i} g={g} index={n} />;
        if (i === last && g.ctas.length) return <ClosingSection key={i} s={g} />;
        if (g.ctas.some((c) => c.href.startsWith("tel:")) && !g.images.length) return <BandSection key={i} s={g} />;
        if (/process/i.test(g.heading?.text ?? "") && g.list.length >= 4) return <ProcessSection key={i} s={g} index={n} />;
        if (g.list.length && !g.images.length) return <ListSection key={i} s={g} index={n} surface={i % 2 === 1} />;
        if (g.images.length) {
          const nth = groups.slice(0, i).filter((x) => x.images.length && !x.children.length && !x.list.length).length;
          return <SplitSection key={i} s={g} index={n} flip={nth % 2 === 1} surface={i % 2 === 1} fallback={<IconPanel icon={<FallbackIcon className="size-10" />} index={n} />} />;
        }
        return <StatementSection key={i} s={g} surface={i % 2 === 1} />;
      })}

      <RelatedServices current={page.path} />
    </>
  );
}
