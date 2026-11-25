import Link from "next/link";
import { services, type ServiceGroup } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArrowRightIcon, CheckIcon, CodeIcon, MegaphoneIcon, PaletteIcon, ServerIcon, SupportIcon } from "@/components/ui/Icons";

const icons: Record<ServiceGroup["icon"], typeof CodeIcon> = {
  code: CodeIcon,
  palette: PaletteIcon,
  megaphone: MegaphoneIcon,
  support: SupportIcon,
  server: ServerIcon,
};

export function Services() {
  return (
    <section aria-labelledby="services-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-100/60 to-transparent blur-3xl" />

      <div className="container-page relative">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} />

        <Stagger as="ul" className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-6" stagger={0.1}>
          {services.groups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <StaggerItem as="li" key={group.title} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <TiltCard
                  max={5}
                  className="flex flex-col overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-ink-950/[0.07] shadow-[0_2px_4px_rgb(7_7_10/0.02),0_24px_50px_-30px_rgb(7_7_10/0.3)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(215_13_67/0.35)] hover:ring-brand-600/20 sm:p-9"
                >
                  {/* Top accent line that grows on hover */}
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800 transition-transform duration-700 ease-out-expo group-hover/tilt:scale-x-100" />
                  <span aria-hidden="true" className="absolute right-7 top-7 text-5xl font-bold tracking-tighter text-ink-950/[0.04] transition-colors duration-500 group-hover/tilt:text-brand-600/10 sm:right-9 sm:top-9">
                    0{i + 1}
                  </span>

                  <div className="relative flex flex-1 flex-col [transform:translateZ(30px)]">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-600/10 transition-all duration-500 group-hover/tilt:-rotate-6 group-hover/tilt:scale-110 group-hover/tilt:from-brand-500 group-hover/tilt:to-brand-700 group-hover/tilt:text-white group-hover/tilt:shadow-[0_12px_30px_-8px_rgb(215_13_67/0.7)]">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-7 text-xl font-semibold tracking-tight sm:text-[1.35rem]">{group.title}</h3>
                    <ul className="mt-6 flex-1 space-y-3.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.925rem] leading-relaxed text-ink-600">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <CheckIcon className="size-3" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-2 border-t border-dashed border-ink-950/10 pt-6">
                      {group.links.map((l) => (
                        <Link
                          key={l.href + l.label}
                          href={l.href}
                          className="group/chip inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink-800 ring-1 ring-ink-950/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-950 hover:text-white"
                        >
                          {l.label}
                          <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover/chip:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
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
