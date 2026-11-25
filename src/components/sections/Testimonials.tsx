"use client";

import Image from "next/image";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { testimonials } from "@/content/home";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@/components/ui/Icons";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: track });
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 26 });

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="testimonials-title" className="grain relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 size-[32rem] animate-blob rounded-full bg-brand-700/25 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 size-[26rem] animate-blob rounded-full bg-brand-500/10 blur-[120px] [animation-delay:-8s]" />
      </div>

      <div className="container-page">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 backdrop-blur-md">
              <Image src="/images/home/google.jpg" alt="Google" width={90} height={90} className="size-7 rounded-full" />
              Google reviews
              <span className="flex text-amber-400" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="size-4" />
                ))}
              </span>
            </p>
            <h2 id="testimonials-title" className="text-[2rem] font-bold tracking-[-0.03em] text-white sm:text-5xl">
              {testimonials.title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div aria-hidden="true" className="hidden h-[3px] w-32 overflow-hidden rounded-full bg-white/10 sm:block">
              <m.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
            </div>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous testimonials"
              aria-controls="testimonial-track"
              className="inline-flex size-12 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-inset ring-white/15 backdrop-blur-md transition-all duration-300 hover:-translate-x-0.5 hover:bg-white hover:text-ink-950 active:scale-95"
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next testimonials"
              aria-controls="testimonial-track"
              className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_30px_-8px_rgb(215_13_67/0.8)] transition-all duration-300 hover:translate-x-0.5 active:scale-95"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </Reveal>
      </div>

      <div
        id="testimonial-track"
        ref={track}
        tabIndex={0}
        className="no-scrollbar mt-14 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-6 pt-2 sm:scroll-px-8 sm:px-8 xl:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
      <Stagger as="ul" stagger={0.08} className="flex w-max gap-5" aria-label="Customer testimonials">
        {testimonials.items.map((t, i) => (
          <StaggerItem as="li" key={t.name} className="flex w-[calc(100vw-4.5rem)] shrink-0 snap-start sm:w-[25rem]">
            <figure className="gradient-border group relative flex w-full flex-col rounded-[2rem] bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.07] sm:p-9">
              <span aria-hidden="true" className="absolute right-8 top-4 font-serif text-8xl leading-none text-brand-600/25 transition-colors duration-500 group-hover:text-brand-500/50">
                &ldquo;
              </span>
              <span className="flex text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, k) => (
                  <StarIcon key={k} className="size-4" />
                ))}
              </span>
              <blockquote className="relative mt-6 flex-1 text-[0.97rem] leading-relaxed text-white/80">
                <p>“{t.text}”</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3.5 border-t border-white/10 pt-6">
                <span
                  aria-hidden="true"
                  className={`flex size-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                    i % 3 === 0 ? "bg-gradient-to-br from-brand-400 to-brand-700" : i % 3 === 1 ? "bg-gradient-to-br from-ink-600 to-ink-800" : "bg-gradient-to-br from-brand-700 to-brand-900"
                  }`}
                >
                  {t.name.charAt(0).toUpperCase()}
                </span>
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-white/45">Google review</span>
                </cite>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
      </div>
    </section>
  );
}
