import Image from "next/image";
import Link from "next/link";
import { getBlockPage, toSections } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual } from "@/components/page/Visuals";
import { Html, imageSize } from "@/components/page/Html";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, MailIcon, MegaphoneIcon, PaletteIcon, PhoneIcon, SearchIcon, ShareIcon, SparklesIcon, TargetIcon } from "@/components/ui/Icons";
import { Ctas, displayCase, h2Class, H, Paras, SectionHeadingText } from "@/components/templates/SectionViews";
import { FinalCta } from "@/components/sections/FinalCta";

const page = getBlockPage("about");
export const metadata = metadataFromSeo(page.seo);

// The six service cards on the WordPress About page, linked to their own pages.
const serviceLinks: Record<string, { href: string; Icon: typeof SearchIcon }> = {
  "Search Engine Marketing": { href: "/search-engine-marketing/", Icon: SearchIcon },
  "Graphic Design": { href: "/graphic-design/", Icon: PaletteIcon },
  "Social Media Marketing": { href: "/social-media-marketing/", Icon: ShareIcon },
  "Google Ads": { href: "/google-ads/", Icon: TargetIcon },
  "Email Marketing": { href: "/email-marketing/", Icon: MailIcon },
  Branding: { href: "/branding/", Icon: SparklesIcon },
};

export default function AboutPage() {
  const { h1, sections } = toSections(page.blocks);
  const [who, create, services, aboutUs, clients] = sections;
  const title = displayCase(h1 ?? "About");

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        visual={<Visual kind="about" />}
        intro={
          who && (
            <>
              {who.heading && <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">{who.heading.text}</h2>}
              <Html as="div" html={who.paras[0] ?? ""} className="[&_strong]:font-medium [&_strong]:text-white/80" />
            </>
          )
        }
        actions={
          <ButtonLink href={site.bookingPath} size="lg">
            Get a Quote <ArrowRightIcon className="size-4" />
          </ButtonLink>
        }
      />

      {/* Story */}
      {create && (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[34rem] rounded-full bg-brand-100/70 blur-[120px]" />
          <div className="container-page relative grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p aria-hidden="true" className="text-[7rem] font-bold leading-none tracking-tighter text-brand-600/10 sm:text-[10rem]">
                10+
              </p>
              <SectionHeadingText s={create} className="-mt-10 sm:-mt-16 sm:!text-5xl" />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
              <Paras paras={create.paras} className="sm:text-lg" />
              <Ctas ctas={create.ctas} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Services */}
      {services && (
        <section className="grain relative isolate overflow-hidden bg-ink-950 py-24 sm:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 top-0 size-[32rem] animate-blob rounded-full bg-brand-700/25 blur-[120px]" />
            <div className="absolute -right-32 bottom-0 size-[26rem] animate-blob rounded-full bg-brand-600/20 blur-[110px] [animation-delay:-8s]" />
          </div>
          <div className="container-page">
            <Reveal className="max-w-2xl">
              <SectionHeadingText s={services} tone="light" />
            </Reveal>
            <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {services.items.map((it) => {
                const link = it.title ? serviceLinks[it.title] : undefined;
                const Icon = link?.Icon ?? MegaphoneIcon;
                return (
                  <StaggerItem as="li" key={it.title} className="h-full">
                    <TiltCard className="gradient-border h-full overflow-hidden rounded-[2rem] bg-white/[0.04] backdrop-blur-md" glow="rgb(238 51 100 / 0.22)">
                      <div className="relative flex h-full flex-col p-8 [transform:translateZ(20px)]">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_10px_30px_-8px_rgb(215_13_67/0.8)] transition-transform duration-500 group-hover/tilt:-rotate-6">
                          <Icon className="size-5" />
                        </span>
                        <H level={it.titleLevel ?? 4} className="mt-6 text-xl font-semibold text-white">
                          {link ? (
                            <Link href={link.href} className="after:absolute after:inset-0">
                              {it.title}
                            </Link>
                          ) : (
                            it.title
                          )}
                        </H>
                        {it.html && <Html html={it.html} className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-white/60" />}
                        {link && (
                          <span aria-hidden="true" className="mt-7 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover/tilt:translate-x-1 group-hover/tilt:bg-brand-600">
                            <ArrowRightIcon className="size-4" />
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
      )}

      {/* About us statement */}
      {aboutUs && (
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <SectionHeadingText s={aboutUs} />
              <span aria-hidden="true" className="mt-8 block h-1 w-20 rounded-full bg-gradient-to-r from-brand-500 to-brand-800" />
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <Paras paras={aboutUs.paras} className="text-lg !leading-[1.75] text-ink-600 sm:text-[1.35rem] [&_b]:text-ink-950" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Clients */}
      {clients && (
        <section className="bg-surface py-20 sm:py-24">
          <div className="container-page">
            <Reveal className="text-center">
              <SectionHeadingText s={clients} className={`${h2Class} sm:!text-4xl`} />
            </Reveal>
            <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.08}>
              {clients.images.map((img) => {
                const dim = imageSize(img.src);
                if (!dim) return null;
                const name = img.link ? new URL(img.link).hostname.replace(/^www\./, "") : "";
                return (
                  <StaggerItem as="li" key={img.src}>
                    <a
                      href={img.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-28 items-center justify-center rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(215_13_67/0.5)]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || name}
                        width={dim.width}
                        height={dim.height}
                        className="max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      <FinalCta
        actions={
          <>
            <ButtonLink href={site.bookingPath} variant="light" size="lg">
              Free consultation <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={site.phone.tel} variant="ghost-light" size="lg">
              <PhoneIcon className="size-4" /> {site.phone.display}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
