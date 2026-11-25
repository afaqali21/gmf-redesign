import Image from "next/image";
import Link from "next/link";
import { industries } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";

export function Industries() {
  const { featured } = industries;
  return (
    <section aria-labelledby="industries-title" className="grain relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 size-[34rem] animate-blob rounded-full bg-brand-700/25 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 size-[28rem] animate-blob rounded-full bg-brand-500/15 blur-[120px] [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container-page">
        <SectionHeading id="industries-title" eyebrow={industries.eyebrow} title={industries.title} tone="light" />

        {/* Featured: taxi dispatching */}
        <Reveal className="mt-16" direction="scale">
          <article className="gradient-border grid overflow-hidden rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7 lg:p-14">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-600/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-300 ring-1 ring-inset ring-brand-500/30">
                Featured
              </p>
              <h3 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">{featured.title}</h3>
              <Stagger as="ul" className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2" stagger={0.07}>
                {featured.features.map((f) => (
                  <StaggerItem as="li" key={f.title} className="group flex gap-4">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-brand-800/30 text-brand-300 ring-1 ring-inset ring-brand-500/30 transition-all duration-500 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white">
                      <CheckIcon className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-[0.95rem] font-semibold text-white">{f.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{f.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <ButtonLink href={featured.href} size="lg" className="mt-12">
                {featured.linkLabel} <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
            <div className="relative min-h-80 overflow-hidden lg:col-span-5">
              <div aria-hidden="true" className="absolute inset-0 animate-gradient bg-[linear-gradient(135deg,#5c0620,#d70d43,#ee3364,#8f0b2f)] bg-[size:300%_300%]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(255_255_255/0.25),transparent_50%)]" />
              <div aria-hidden="true" className="absolute left-8 top-8 size-20 animate-spin-slow rounded-full border border-dashed border-white/30" />
              <div className="absolute inset-0 animate-float-slow">
                <Image
                  src={featured.image.src}
                  alt="Call handler providing 24/7 taxi dispatch support"
                  width={featured.image.width}
                  height={featured.image.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="absolute inset-0 h-full w-full object-contain object-bottom p-6 pb-0 drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]"
                />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Other sectors */}
        <Stagger as="ul" className="mt-5 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {industries.others.map((ind, i) => (
            <StaggerItem as="li" key={ind.href} className="h-full">
              <TiltCard glow="rgb(238 51 100 / 0.22)" className="gradient-border rounded-[2rem] bg-white/[0.03] backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.06]">
                <Link href={ind.href} className="relative flex h-full flex-col p-8">
                  <span className="text-xs font-bold tabular-nums tracking-widest text-brand-400">0{i + 2}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{ind.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{ind.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Learn more
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover/tilt:translate-x-1 group-hover/tilt:bg-brand-600">
                      <ArrowRightIcon className="size-4" />
                    </span>
                  </span>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
