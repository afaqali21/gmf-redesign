"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { competitive } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function Competitive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section aria-labelledby="competitive-title" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="left" className="relative order-last lg:order-first">
          <div ref={ref} className="relative">
            <m.div
              aria-hidden="true"
              style={{ rotate: frameRotate }}
              className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-br from-brand-400/30 via-brand-600/10 to-transparent"
            />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-[0_40px_80px_-30px_rgb(7_7_10/0.45)]">
              <m.div style={{ y: imageY }} className="scale-[1.18]">
                <Image
                  src={competitive.image.src}
                  alt="Two colleagues celebrating a successful campaign with a fist bump"
                  width={competitive.image.width}
                  height={competitive.image.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </m.div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-6 -right-6 size-24 animate-float-slow rounded-3xl bg-gradient-to-br from-brand-500 to-brand-800 shadow-[0_20px_40px_-10px_rgb(215_13_67/0.6)] sm:size-28" />
            <div aria-hidden="true" className="absolute -left-5 -top-5 size-12 animate-float rounded-full border-2 border-dashed border-brand-600/40" />
          </div>
        </Reveal>

        <Reveal direction="right">
          <h2 id="competitive-title" className="text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
            {competitive.title}
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-ink-500 sm:text-[1.05rem]">
            {competitive.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 0 ? "border-l-2 border-brand-600 pl-5 text-ink-700" : ""}>
                {p}
              </p>
            ))}
          </div>
          <ButtonLink href={competitive.cta.href} size="lg" className="mt-10">
            {competitive.cta.label} <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
