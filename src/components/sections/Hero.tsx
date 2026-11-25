"use client";

import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Fragment, type PointerEvent } from "react";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CodeIcon, MegaphoneIcon, PhoneIcon, SupportIcon } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const pillarIcons = [CodeIcon, SupportIcon, MegaphoneIcon];

// The H1 is animated word by word; the text itself is unchanged.
const TITLE_PLAIN = ["SEO-focused", "digital", "marketing", "that", "turns"];
const TITLE_ACCENT = ["clicks", "into", "customers."];

export function Hero() {
  const reduce = useReducedMotion();
  // Normalised pointer position, -0.5 … 0.5 from the section centre.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 70, damping: 18, mass: 0.8 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  const px = useMotionValue(50);
  const py = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px}% ${py}%, rgb(238 51 100 / 0.16), transparent 60%)`;

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

  return (
    <section
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="grain relative isolate overflow-hidden bg-ink-950 text-white"
    >
      <Backdrop spotlight={spotlight} />

      <div className="container-page relative grid items-center gap-16 pb-32 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-44 lg:pt-28">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-7">
          <m.p
            data-reveal initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="gradient-border inline-flex items-center gap-2.5 rounded-full bg-white/[0.04] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md sm:text-xs"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand-500" />
              <span className="relative size-2 rounded-full bg-brand-500" />
            </span>
            {hero.eyebrow}
          </m.p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.4rem]"
          >
            {[...TITLE_PLAIN.map((w) => ({ w, accent: false })), ...TITLE_ACCENT.map((w) => ({ w, accent: true }))].map(({ w, accent }, i) => (
              <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <m.span
                  className={`inline-block ${accent ? "text-gradient-brand" : ""}`}
                  data-reveal initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE }}
                >
                  {w}
                </m.span>
              </span>{" "}
              </Fragment>
            ))}
          </h1>

          <m.p
            data-reveal initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
          >
            {hero.intro}
          </m.p>

          <m.div
            data-reveal initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <span className="relative inline-flex">
              <span aria-hidden="true" className="absolute inset-0 animate-ping-slow rounded-full bg-brand-600/40" />
              <ButtonLink href={site.bookingPath} size="lg" className="w-full">
                Get a Quote <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </span>
            <ButtonLink href={site.phone.tel} variant="ghost-light" size="lg">
              <PhoneIcon className="size-4" /> Call us {site.phone.display}
            </ButtonLink>
          </m.div>

          <m.p
            data-reveal initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex max-w-xl gap-4 text-sm leading-relaxed text-white/55"
          >
            <span aria-hidden="true" className="mt-1 h-10 w-px shrink-0 bg-gradient-to-b from-brand-500 to-transparent" />
            {hero.note}
          </m.p>
        </div>

        {/* 3D scene + pillars */}
        <div className="relative lg:col-span-5">
          <div className="[perspective:1400px]">
            <m.div style={reduce ? undefined : { rotateX, rotateY }} className="preserve-3d relative">
              <Shapes />
              <ul className="preserve-3d relative grid gap-4">
                {hero.pillars.map((p, i) => {
                  const Icon = pillarIcons[i];
                  return (
                    <m.li
                      key={p.title}
                      data-reveal initial={{ opacity: 0, y: 40, rotateX: -12 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 1, delay: 0.45 + i * 0.14, ease: EASE }}
                      className={`preserve-3d ${i === 1 ? "lg:translate-x-10" : i === 2 ? "lg:-translate-x-4" : ""}`}
                    >
                      {/* Depth only on desktop: translateZ softens text on small screens. */}
                      <div className={["lg:[transform:translateZ(30px)]", "lg:[transform:translateZ(70px)]", "lg:[transform:translateZ(45px)]"][i]}>
                      <div
                        className={`gradient-border group flex gap-5 rounded-3xl bg-white/[0.05] p-6 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl transition-colors duration-500 hover:bg-white/[0.09] ${
                          i === 0 ? "animate-float" : i === 1 ? "animate-float-slow" : "animate-float [animation-delay:-3s]"
                        }`}
                      >
                        <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_10px_30px_-8px_rgb(215_13_67/0.8)] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                          <Icon className="size-6" />
                        </span>
                        <div>
                          <p className="text-base font-semibold leading-snug text-white">{p.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.text}</p>
                        </div>
                      </div>
                      </div>
                    </m.li>
                  );
                })}
              </ul>
            </m.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <m.div
        aria-hidden="true"
        data-reveal initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <m.span
            className="size-1.5 rounded-full bg-white/70"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </m.div>
    </section>
  );
}

function Backdrop({ spotlight }: { spotlight: MotionValue<string> }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-48 -top-48 size-[40rem] animate-blob rounded-full bg-brand-600/30 blur-[130px]" />
      <div className="absolute -right-40 top-1/3 size-[30rem] animate-blob rounded-full bg-brand-800/40 blur-[120px] [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 size-[22rem] animate-blob rounded-full bg-fuchsia-600/10 blur-[110px] [animation-delay:-12s]" />
      <m.div className="absolute inset-0" style={{ background: spotlight }} />
      {/* Perspective grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:600px]">
        <div className="absolute inset-0 origin-bottom animate-grid bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_top,black,transparent_85%)] [transform:rotateX(62deg)_scale(2.2)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
    </div>
  );
}

/** Decorative CSS-3D objects floating around the pillar cards (no WebGL needed). */
function Shapes() {
  return (
    <div aria-hidden="true" className="preserve-3d pointer-events-none absolute inset-0">
      {/* Glass cube */}
      <div className="preserve-3d absolute -right-2 -top-20 hidden sm:-top-24 sm:block lg:-right-10" style={{ transform: "translateZ(-60px)" }}>
        <div className="animate-float-slow preserve-3d">
          <div className="preserve-3d relative size-24 animate-cube [--half:3rem] sm:size-28 sm:[--half:3.5rem]">
            {[
              "rotateY(0deg)",
              "rotateY(90deg)",
              "rotateY(180deg)",
              "rotateY(-90deg)",
              "rotateX(90deg)",
              "rotateX(-90deg)",
            ].map((r) => (
              <span
                key={r}
                className="absolute inset-0 rounded-xl border border-white/25 bg-gradient-to-br from-brand-400/35 via-brand-600/15 to-transparent shadow-[inset_0_0_30px_rgb(255_255_255/0.08)]"
                style={{ transform: `${r} translateZ(var(--half))` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Orbit rings */}
      <div className="preserve-3d absolute -bottom-16 -left-14 sm:-left-20" style={{ transform: "translateZ(-120px)" }}>
        <div className="size-56 animate-spin-slow rounded-full border border-brand-400/30 [transform:rotateX(72deg)]" />
        <div className="absolute inset-6 animate-spin-slow rounded-full border border-dashed border-white/15 [animation-direction:reverse] [transform:rotateX(72deg)]" />
      </div>

      {/* Glowing orb */}
      <div className="absolute -left-16 top-6 hidden lg:block" style={{ transform: "translateZ(90px)" }}>
        <div className="size-14 animate-float [animation-delay:-2s] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffd0dc,#ee3364_45%,#5c0620_100%)] shadow-[0_0_60px_rgb(238_51_100/0.6)]" />
      </div>

      {/* Small accents */}
      <div className="absolute -bottom-8 right-10" style={{ transform: "translateZ(110px)" }}>
        <div className="animate-float-slow">
          <div className="size-6 rotate-45 rounded-md border border-white/30 bg-white/10" />
        </div>
      </div>
      <div className="absolute right-1/3 -top-10 size-2 animate-float rounded-full bg-brand-300 shadow-[0_0_20px_#fd658e]" />
      <div className="absolute bottom-1/3 -right-4 size-3 animate-float-slow rounded-full bg-white/60 shadow-[0_0_16px_white]" />
    </div>
  );
}
