import type { ReactNode } from "react";
import type { Section } from "@/lib/content";
import { Html, imageSize } from "@/components/page/Html";
import { RevealImage } from "@/components/page/Media";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/ui/Icons";
import { FinalCta } from "@/components/sections/FinalCta";

/* Building blocks shared by the service, case-study, industry and about templates. */

/** "INSTANT QUOTE" -> "Instant Quote". WordPress set these in capitals; here casing is presentation. */
export const displayCase = (s: string) =>
  s === s.toUpperCase() && /[A-Z]{3}/.test(s)
    ? s.toLowerCase().replace(/(^|[\s(/-])([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase()).replace(/\b(Ppc|Seo|Sem|Ui|Ux|Roi)\b/g, (w) => w.toUpperCase())
    : s;

type HeadingProps = { level: number; children: ReactNode; className?: string; id?: string };
/** Keeps the heading level WordPress used (h2/h3, or a styled <p> where the original was a paragraph). */
export function H({ level, children, className = "", id }: HeadingProps) {
  const Tag = level === 2 ? "h2" : level === 3 ? "h3" : level === 4 ? "h4" : "p";
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}

export const h2Class = "text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink-950 sm:text-[2.6rem]";

export function SectionHeadingText({ s, tone = "dark", className = "" }: { s: Section; tone?: "dark" | "light"; className?: string }) {
  if (!s.heading) return null;
  const lines = s.headingLines ?? [s.heading.text];
  return (
    <H level={s.heading.level} className={`${h2Class} ${tone === "light" ? "!text-white" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className={i > 0 ? "block text-gradient-brand" : lines.length > 1 ? "block" : ""}>
          {displayCase(l)}
        </span>
      ))}
    </H>
  );
}

export function Paras({ paras, tone = "dark", className = "" }: { paras: string[]; tone?: "dark" | "light"; className?: string }) {
  if (!paras.length) return null;
  return (
    <div className={`space-y-5 text-base leading-[1.8] sm:text-[1.05rem] ${tone === "light" ? "text-white/70 [&_strong]:text-white" : "text-ink-500 [&_strong]:text-ink-950"} ${className}`}>
      {paras.map((p, i) => (
        <Html key={i} html={p} />
      ))}
    </div>
  );
}

export function Ctas({ ctas, tone = "dark" }: { ctas: Section["ctas"]; tone?: "dark" | "light" }) {
  if (!ctas.length) return null;
  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      {ctas.map((c, i) => {
        const tel = c.href.startsWith("tel:");
        const variant = tone === "light" ? (tel ? "ghost-light" : "light") : i === 0 && !tel ? "primary" : "outline";
        return (
          <ButtonLink key={c.href + i} href={c.href} variant={variant} size="lg">
            {tel && <PhoneIcon className="size-4" />}
            {displayCase(c.label)}
            {!tel && <ArrowRightIcon className="size-4" />}
          </ButtonLink>
        );
      })}
    </div>
  );
}

/** Bulleted list from WordPress <li> blocks (nested items indent). */
export function Bullets({ list, tone = "dark", columns = false }: { list: Section["list"]; tone?: "dark" | "light"; columns?: boolean }) {
  if (!list.length) return null;
  return (
    <Stagger as="ul" className={`mt-7 grid gap-3 ${columns ? "sm:grid-cols-2" : ""}`} stagger={0.05}>
      {list.map((li, i) => (
        <StaggerItem
          as="li"
          key={i}
          className={`flex gap-3.5 rounded-2xl p-4 text-[0.95rem] leading-relaxed ${li.depth ? "ml-8" : ""} ${
            tone === "light" ? "bg-white/[0.04] text-white/75 ring-1 ring-inset ring-white/10" : "bg-white text-ink-600 ring-1 ring-ink-950/[0.06] shadow-[0_16px_40px_-32px_rgb(7_7_10/0.5)]"
          }`}
        >
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <CheckIcon className="size-3.5" />
          </span>
          <Html as="span" html={li.html} className="[&_strong]:font-semibold [&_strong]:text-current" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function SectionImage({ img, priority, sizes = "(min-width: 1024px) 560px, 100vw" }: { img: Section["images"][number]; priority?: boolean; sizes?: string }) {
  const dim = imageSize(img.src);
  if (!dim) return null;
  return <RevealImage src={img.src} alt={img.alt} width={dim.width} height={dim.height} sizes={sizes} priority={priority} className="aspect-[4/3]" />;
}

/** Text + image split. `flip` puts the image on the right. A fallback visual replaces missing photos. */
export function SplitSection({
  s,
  index,
  flip = false,
  surface = false,
  fallback,
  extra,
}: {
  s: Section;
  index: number;
  flip?: boolean;
  surface?: boolean;
  fallback?: ReactNode;
  extra?: ReactNode;
}) {
  const imgs = s.images.filter((i) => imageSize(i.src));
  const visual = imgs.length ? (
    <div className="relative">
      <div aria-hidden="true" className={`absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-100 to-transparent ${flip ? "rotate-2" : "-rotate-2"}`} />
      <SectionImage img={imgs[0]} />
      {imgs[1] && (
        <div className={`mt-5 sm:absolute sm:-bottom-10 sm:mt-0 sm:w-1/2 ${flip ? "sm:-left-8" : "sm:-right-8"}`}>
          <SectionImage img={imgs[1]} sizes="(min-width: 1024px) 280px, 100vw" />
        </div>
      )}
    </div>
  ) : (
    fallback
  );
  return (
    <section className={`relative overflow-hidden py-24 sm:py-28 ${surface ? "bg-surface" : "bg-white"}`}>
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {visual && (
          <Reveal direction={flip ? "right" : "left"} className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
            {visual}
          </Reveal>
        )}
        <div className={visual ? "lg:col-span-6" : "lg:col-span-8 lg:col-start-3"}>
          <Reveal>
            <SectionNumber n={index} />
            <SectionHeadingText s={s} />
            <Paras paras={s.paras} className="mt-6" />
            <Bullets list={s.list} />
            {s.items.length > 0 && <ItemList items={s.items} />}
            <Paras paras={s.after} className="mt-6" />
            <Ctas ctas={s.ctas} />
            {extra}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export const SectionNumber = ({ n, tone = "dark" }: { n: number; tone?: "dark" | "light" }) => (
  <span aria-hidden="true" className={`mb-5 flex items-center gap-3 text-xs font-bold tabular-nums tracking-[0.2em] ${tone === "light" ? "text-brand-300" : "text-brand-600"}`}>
    {String(n).padStart(2, "0")}
    <span className={`h-px w-10 ${tone === "light" ? "bg-brand-400/50" : "bg-brand-600/40"}`} />
  </span>
);

function ItemList({ items }: { items: Section["items"] }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4">
          <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{i + 1}</span>
          <div>
            {it.title && <H level={it.titleLevel ?? 4} className="font-semibold text-ink-950">{it.title}</H>}
            {it.html && <Html html={it.html} className="mt-1 text-[0.95rem] leading-relaxed text-ink-500" />}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Numbered benefit cards with 3D tilt. Dark variant sits over the page's original parallax photo. */
export function CardsSection({ s, index, tone = "dark", bg }: { s: Section; index: number; tone?: "dark" | "light"; bg?: ReactNode }) {
  const dark = tone === "dark";
  const cols = s.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <section className={`relative isolate overflow-hidden py-24 sm:py-32 ${dark ? "grain bg-ink-950" : "bg-surface"}`}>
      {dark && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {bg && <div className="absolute inset-0 opacity-[0.12]">{bg}</div>}
          <div className="absolute -left-40 top-0 size-[32rem] animate-blob rounded-full bg-brand-700/25 blur-[120px]" />
          <div className="absolute -right-32 bottom-0 size-[26rem] animate-blob rounded-full bg-brand-600/20 blur-[110px] [animation-delay:-8s]" />
        </div>
      )}
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <SectionNumber n={index} tone={dark ? "light" : "dark"} />
          <SectionHeadingText s={s} tone={dark ? "light" : "dark"} />
          <Paras paras={s.paras} tone={dark ? "light" : "dark"} className="mt-6" />
        </Reveal>
        <Stagger as="ol" className={`mt-14 grid gap-5 ${cols}`} stagger={0.1}>
          {s.items.map((it, i) => (
            <StaggerItem as="li" key={i} className="h-full">
              <TiltCard
                className={`h-full overflow-hidden rounded-[2rem] p-8 sm:p-9 ${
                  dark ? "gradient-border bg-white/[0.04] backdrop-blur-md" : "bg-white ring-1 ring-ink-950/[0.06] shadow-[0_30px_60px_-45px_rgb(7_7_10/0.5)]"
                }`}
                glow={dark ? "rgb(238 51 100 / 0.22)" : "rgb(215 13 67 / 0.1)"}
              >
                <div className="relative [transform:translateZ(20px)]">
                  <span className={`text-5xl font-bold tabular-nums tracking-tighter ${dark ? "text-white/10" : "text-brand-600/15"}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {it.title && (
                    <H level={it.titleLevel ?? 4} className={`mt-4 text-xl font-semibold ${dark ? "text-white" : "text-ink-950"}`}>
                      {it.title}
                    </H>
                  )}
                  {it.html && <Html html={it.html} className={`${it.title ? "mt-3" : "mt-4"} text-[0.97rem] leading-relaxed ${dark ? "text-white/65" : "text-ink-500"}`} />}
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Paras paras={s.after} tone={dark ? "light" : "dark"} className="mt-10 max-w-3xl" />
        <Ctas ctas={s.ctas} tone={dark ? "light" : "dark"} />
      </div>
    </section>
  );
}

/** Mid-page band for sections that end with "Call Us" (WordPress showed these over a parallax photo). */
export function BandSection({ s, bg }: { s: Section; bg?: ReactNode }) {
  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="container-page">
        <Reveal direction="scale">
          <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-ink-950 px-8 py-14 sm:px-14 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              {bg && <div className="absolute inset-0 opacity-25">{bg}</div>}
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-brand-900/60" />
              <div className="absolute -right-20 -top-20 size-80 animate-blob rounded-full bg-brand-600/30 blur-[100px]" />
            </div>
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <SectionHeadingText s={s} tone="light" />
                <Paras paras={s.paras} tone="light" className="mt-5" />
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end [&>div]:mt-0">
                <Ctas ctas={s.ctas} tone="light" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Large centred statement for short heading + paragraph sections. */
export function StatementSection({ s, surface = false }: { s: Section; surface?: boolean }) {
  return (
    <section className={`relative overflow-hidden py-24 sm:py-32 ${surface ? "bg-surface" : "bg-white"}`}>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100/60 blur-[120px]" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeadingText s={s} className="sm:!text-5xl" />
          <Paras paras={s.paras} className="mx-auto mt-7 max-w-2xl sm:text-lg" />
          <Bullets list={s.list} />
          <Paras paras={s.after} className="mt-6" />
          <div className="flex justify-center">
            <Ctas ctas={s.ctas} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Closing call to action that keeps the page's own heading, text and buttons. */
export function ClosingSection({ s }: { s: Section }) {
  return (
    <FinalCta
      className="bg-white py-24 sm:py-28"
      as={s.heading ? (s.heading.level === 2 ? "h2" : s.heading.level === 3 ? "h3" : "p") : "p"}
      title={s.heading ? displayCase(s.heading.text) : ""}
      text={
        s.paras.length ? (
          <>
            {s.paras.map((p, i) => (
              <Html key={i} html={p} />
            ))}
          </>
        ) : undefined
      }
      actions={s.ctas.map((c, i) => (
        <ButtonLink key={i} href={c.href} variant={c.href.startsWith("tel:") ? "ghost-light" : "light"} size="lg">
          {c.href.startsWith("tel:") && <PhoneIcon className="size-4" />}
          {displayCase(c.label)}
          {!c.href.startsWith("tel:") && <ArrowRightIcon className="size-4" />}
        </ButtonLink>
      ))}
    />
  );
}

/** Illustrated stand-in for a photo that is not available (decorative; the text carries the meaning). */
export function IconPanel({ icon, index }: { icon: ReactNode; index?: number }) {
  return (
    <Reveal direction="scale">
      <div
        aria-hidden="true"
        className="grain relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-ink-950 shadow-[0_40px_80px_-40px_rgb(7_7_10/0.6)]"
      >
        <div className="absolute -left-10 -top-10 size-56 animate-blob rounded-full bg-brand-600/40 blur-[70px]" />
        <div className="absolute -bottom-16 -right-10 size-60 animate-blob rounded-full bg-brand-800/50 blur-[80px] [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        {index !== undefined && <span className="absolute right-6 top-5 text-6xl font-bold tracking-tighter text-white/10">{String(index).padStart(2, "0")}</span>}
        <span className="gradient-border flex size-24 animate-float items-center justify-center rounded-[1.75rem] bg-white/[0.06] text-brand-300 backdrop-blur-xl">
          {icon}
        </span>
      </div>
    </Reveal>
  );
}
