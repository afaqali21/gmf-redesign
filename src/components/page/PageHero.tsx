"use client";

import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { Fragment, type PointerEvent, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  actions?: ReactNode;
  /** Right-hand visual (illustration or image). Tilts in 3D with the pointer. */
  visual?: ReactNode;
  /** Background photo shown under a dark wash (e.g. the WordPress page header image). */
  backgroundImage?: ReactNode;
  size?: "lg" | "md";
  align?: "left" | "center";
  children?: ReactNode;
};

/** Dark hero shared by every inner page: breadcrumb, animated H1, intro, CTAs and an optional 3D visual. */
export function PageHero({ title, eyebrow, intro, crumbs, actions, visual, backgroundImage, size = "lg", align = "left", children }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 70, damping: 18, mass: 0.8 };
  const rotateY = useTransform(useSpring(mx, spring), [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(useSpring(my, spring), [-0.5, 0.5], [8, -8]);
  const px = useMotionValue(70);
  const py = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${px}% ${py}%, rgb(238 51 100 / 0.15), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    px.set(x * 100);
    py.set(y * 100);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const words = title.split(/\s+/);
  const center = align === "center" && !visual;

  return (
    <section
      aria-labelledby="page-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="grain relative isolate overflow-hidden bg-ink-950 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {backgroundImage && (
          <div className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_95%)]">{backgroundImage}</div>
        )}
        <div className="absolute -left-48 -top-56 size-[36rem] animate-blob rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="absolute -right-40 top-1/4 size-[28rem] animate-blob rounded-full bg-brand-800/35 blur-[120px] [animation-delay:-7s]" />
        <m.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-[60%] [perspective:600px]">
          <div className="absolute inset-0 origin-bottom animate-grid bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_top,black,transparent_80%)] [transform:rotateX(62deg)_scale(2.2)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      </div>

      <div
        className={`container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8 ${
          size === "lg" ? "pb-24 pt-12 sm:pt-16 lg:pb-32 lg:pt-20" : "pb-20 pt-12 sm:pt-14 lg:pb-24"
        }`}
      >
        <div className={`relative z-10 ${visual ? "lg:col-span-7" : center ? "lg:col-span-10 lg:col-start-2 text-center" : "lg:col-span-9"}`}>
          <m.nav
            aria-label="Breadcrumb"
            data-reveal
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/50 ${center ? "justify-center" : ""}`}>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRightIcon className="size-3.5 text-white/30" />}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="line-clamp-1 text-white/80">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </m.nav>

          {eyebrow && (
            <m.p
              data-reveal
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
              className="gradient-border mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:text-xs"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand-500" />
                <span className="relative size-2 rounded-full bg-brand-500" />
              </span>
              {eyebrow}
            </m.p>
          )}

          <h1
            id="page-title"
            className={`${eyebrow ? "mt-6" : "mt-8"} font-bold leading-[1.05] tracking-[-0.04em] text-white ${
              size === "lg" ? "text-[2.5rem] sm:text-6xl lg:text-[4.2rem]" : "text-[2.25rem] sm:text-5xl lg:text-[3.6rem]"
            }`}
          >
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <m.span
                    className={`inline-block ${i === words.length - 1 && words.length > 1 ? "text-gradient-brand" : ""}`}
                    data-reveal
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.12 + i * 0.06, ease: EASE }}
                  >
                    {w}
                  </m.span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          {intro && (
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/65 ${center ? "mx-auto" : ""}`}
            >
              {intro}
            </m.div>
          )}

          {actions && (
            <m.div
              data-reveal
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className={`mt-9 flex flex-col gap-3 sm:flex-row ${center ? "justify-center" : ""}`}
            >
              {actions}
            </m.div>
          )}
          {children}
        </div>

        {visual && (
          <m.div
            data-reveal
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="relative lg:col-span-5"
          >
            <div className="[perspective:1400px]">
              <m.div style={reduce ? undefined : { rotateX, rotateY }} className="preserve-3d relative">
                {visual}
              </m.div>
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}
