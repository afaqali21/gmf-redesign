import Image from "next/image";
import { trusted } from "@/content/home";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

const statStyles = [
  "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-[0_30px_60px_-20px_rgb(215_13_67/0.55)]",
  "bg-white text-ink-950 ring-1 ring-ink-950/5 shadow-[0_20px_50px_-25px_rgb(7_7_10/0.25)]",
  "bg-white text-ink-950 ring-1 ring-ink-950/5 shadow-[0_20px_50px_-25px_rgb(7_7_10/0.25)]",
  "bg-ink-950 text-white shadow-[0_30px_60px_-20px_rgb(7_7_10/0.6)]",
];

export function Trusted() {
  return (
    <section aria-labelledby="trusted-title" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 size-[36rem] rounded-full bg-brand-200/40 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(7_7_10/0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />

      <div className="container-page relative grid gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{trusted.since}</Eyebrow>
            <h2 id="trusted-title" className="text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              {trusted.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{trusted.lead}</p>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" delay={0.15}>
            {[trusted.vision, trusted.mission].map((card) => (
              <StaggerItem key={card.title} className="h-full">
                <TiltCard className="overflow-hidden rounded-3xl bg-white/70 p-7 ring-1 ring-ink-950/5 shadow-[0_20px_50px_-30px_rgb(7_7_10/0.35)] backdrop-blur-xl">
                  <div className="relative">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-white ring-1 ring-brand-600/10">
                      <Image src={card.icon.src} alt="" width={card.icon.width} height={card.icon.height} className="h-8 w-auto" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{card.text}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger as="dl" className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-6 lg:col-start-7" stagger={0.12}>
          {trusted.stats.map((s, i) => {
            const dark = i === 0 || i === 3;
            return (
              <StaggerItem key={s.label} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
                <div className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 ${statStyles[i]}`}>
                  <span
                    aria-hidden="true"
                    className={`absolute -right-10 -top-10 size-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 ${dark ? "bg-white/15" : "bg-brand-200/50"}`}
                  />
                  <dt className={`relative order-2 mt-4 text-sm font-medium sm:text-base ${dark ? "text-white/75" : "text-ink-500"}`}>{s.label}</dt>
                  <dd className="relative order-1 text-[2.6rem] font-bold leading-none tracking-[-0.04em] sm:text-6xl">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                  <span aria-hidden="true" className={`relative order-3 mt-6 h-1 w-12 rounded-full ${dark ? "bg-white/40" : "bg-brand-600"} transition-all duration-500 group-hover:w-20`} />
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
