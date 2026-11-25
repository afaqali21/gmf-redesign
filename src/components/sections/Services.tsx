import Link from "next/link";
import { services, type Service, type ServiceIcon } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CloudIcon,
  CodeIcon,
  PaletteIcon,
  SearchIcon,
  ShareIcon,
  SmartphoneIcon,
  SupportIcon,
  TargetIcon,
  TaxiIcon,
} from "@/components/ui/Icons";

export const serviceIcons: Record<ServiceIcon, typeof CodeIcon> = {
  headset: SupportIcon,
  taxi: TaxiIcon,
  code: CodeIcon,
  smartphone: SmartphoneIcon,
  search: SearchIcon,
  target: TargetIcon,
  share: ShareIcon,
  palette: PaletteIcon,
  cloud: CloudIcon,
};

function ServiceLink({ href, label, tone = "light" }: { href: string; label: string; tone?: "light" | "dark" }) {
  const cls =
    tone === "dark"
      ? "group/chip inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ink-950"
      : "group/chip inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink-800 ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-950 hover:text-white";
  const inner = (
    <>
      {label}
      <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover/chip:translate-x-0.5" />
    </>
  );
  return href.startsWith("#") ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function FeaturedCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.icon];
  return (
    <TiltCard
      max={4}
      glow="rgb(255 255 255 / 0.12)"
      className={`grain flex flex-col overflow-hidden rounded-[2rem] p-8 text-white shadow-[0_40px_80px_-35px_rgb(215_13_67/0.55)] sm:p-10 ${
        index === 0 ? "bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" : "bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover/tilt:scale-125" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="relative flex flex-1 flex-col [transform:translateZ(30px)]">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur-md transition-transform duration-500 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110">
            <Icon className="size-7" />
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ring-white/20">
            Featured
          </span>
        </div>
        <h3 className="mt-8 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-[1.75rem]">{service.title}</h3>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/75">{service.text}</p>
        {service.tags && (
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Highlights">
            {service.tags.map((t) => (
              <li key={t} className="rounded-full bg-black/15 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-inset ring-white/15">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-9">
          {service.links.map((l) => (
            <ServiceLink key={l.href} href={l.href} label={l.label} tone="dark" />
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = serviceIcons[service.icon];
  return (
    <TiltCard
      max={5}
      className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 ring-1 ring-ink-950/[0.07] shadow-[0_2px_4px_rgb(7_7_10/0.02),0_24px_50px_-30px_rgb(7_7_10/0.3)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(215_13_67/0.35)] hover:ring-brand-600/20"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800 transition-transform duration-700 ease-out-expo group-hover/tilt:scale-x-100" />
      <span aria-hidden="true" className="absolute right-6 top-6 text-4xl font-bold tracking-tighter text-ink-950/[0.05] transition-colors duration-500 group-hover/tilt:text-brand-600/15">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex flex-1 flex-col [transform:translateZ(24px)]">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-600/10 transition-all duration-500 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110 group-hover/tilt:from-brand-500 group-hover/tilt:to-brand-700 group-hover/tilt:text-white">
          <Icon className="size-6" />
        </span>
        <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{service.text}</p>

        {service.items.length > 0 && (
          <details className="group/details mt-5 rounded-2xl bg-surface/70 ring-1 ring-ink-950/[0.04] open:bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-700 [&::-webkit-details-marker]:hidden">
              What&apos;s included
              <ChevronDownIcon className="size-4 transition-transform duration-300 group-open/details:rotate-180" />
            </summary>
            <ul className="space-y-2.5 px-4 pb-4 pt-1">
              {service.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-ink-600">
                  <CheckIcon className="mt-1 size-3.5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {service.links.map((l) => (
            <ServiceLink key={l.href} href={l.href} label={l.label} />
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

// 12-column grid: 2 featured (6+6), then 4 cards (3 each) and 3 cards (4 each).
const spans = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4", "lg:col-span-4", "md:col-span-2 lg:col-span-4"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-100/60 to-transparent blur-3xl" />

      <div className="container-page relative">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} />

        <Stagger as="ul" className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12" stagger={0.07}>
          {services.items.map((service, i) => (
            <StaggerItem as="li" key={service.title} className={`h-full ${spans[i]} ${service.featured ? "md:col-span-2 lg:col-span-6" : ""}`}>
              {service.featured ? <FeaturedCard service={service} index={i} /> : <ServiceCard service={service} index={i} />}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <ButtonLink href={services.cta.href} variant="secondary" size="lg">
            {services.cta.label} <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
