import Link from "next/link";
import { industries } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading id="industries-title" eyebrow={industries.eyebrow} title={industries.title} />

        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {industries.items.map((ind, i) => (
            <StaggerItem as="li" key={ind.href} className="h-full">
              <TiltCard className="overflow-hidden rounded-[2rem] bg-ink-950 text-white shadow-[0_30px_60px_-35px_rgb(7_7_10/0.6)]" glow="rgb(238 51 100 / 0.25)">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand-600/30 blur-2xl transition-transform duration-700 group-hover/tilt:scale-150" />
                <Link href={ind.href} className="relative flex h-full flex-col p-8 [transform:translateZ(24px)]">
                  <span className="text-xs font-bold tabular-nums tracking-widest text-brand-400">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{ind.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{ind.text}</p>
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
