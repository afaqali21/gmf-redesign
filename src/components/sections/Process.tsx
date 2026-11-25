"use client";

import Image from "next/image";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  // The connector line draws itself as the steps scroll through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-brand-100/60 blur-[120px]" />
      <div className="container-page relative">
        <SectionHeading id="process-title" eyebrow="How we work" title={process.title}>
          <p>{process.intro}</p>
        </SectionHeading>

        <ol ref={ref} className="relative mt-20 grid gap-12 lg:grid-cols-5 lg:gap-6">
          {/* Track + animated fill: horizontal on desktop, vertical on mobile */}
          <span aria-hidden="true" className="absolute left-12 top-12 hidden h-[2px] w-[calc(100%-6rem)] bg-ink-950/[0.06] lg:block" />
          <m.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute left-12 top-12 hidden h-[2px] w-[calc(100%-6rem)] origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800 lg:block"
          />
          <span aria-hidden="true" className="absolute bottom-12 left-12 top-12 w-[2px] bg-ink-950/[0.06] lg:hidden" />
          <m.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-12 left-12 top-12 w-[2px] origin-top bg-gradient-to-b from-brand-400 via-brand-600 to-brand-800 lg:hidden"
          />

          {process.steps.map((step, i) => (
            <m.li
              key={step.title}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group relative flex items-center gap-6 lg:flex-col lg:gap-0 lg:text-center"
            >
              <div className="relative flex size-24 shrink-0 items-center justify-center">
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-700/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-[0_20px_40px_-20px_rgb(7_7_10/0.35)] ring-1 ring-ink-950/[0.07] transition-all duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:ring-brand-600/30">
                  <Image src={step.icon} alt="" width={103} height={103} className="size-11 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white shadow-[0_8px_20px_-6px_rgb(215_13_67/0.8)] ring-4 ring-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold uppercase tracking-[0.12em] lg:mt-7">{step.title}</h3>
            </m.li>
          ))}
        </ol>

        <Reveal className="mx-auto mt-20 max-w-3xl">
          <p className="rounded-[2rem] bg-surface p-8 text-center text-base leading-relaxed text-ink-600 ring-1 ring-ink-950/5 sm:p-10 sm:text-lg">
            {process.outro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
