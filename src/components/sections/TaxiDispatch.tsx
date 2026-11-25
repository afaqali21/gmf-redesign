import { taxi } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArrowRightIcon, CheckIcon, GlobeIcon, MapPinIcon, PhoneIcon, SmartphoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

export function TaxiDispatch() {
  return (
    <section id={taxi.id} aria-labelledby="taxi-title" className="relative scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[34rem] rounded-full bg-brand-200/40 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(7_7_10/0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_65%)]" />

      <div className="container-page relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal direction="scale" className="order-last lg:order-first lg:col-span-7">
            <DispatchDashboard />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{taxi.eyebrow}</Eyebrow>
              <h2 id="taxi-title" className="text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                {taxi.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-500 sm:text-lg">{taxi.text}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Booking channels</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {taxi.channels.map((c) => (
                    <li key={c} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-800 shadow-sm ring-1 ring-ink-950/5">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">Dispatch systems</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {taxi.integrations.map((c) => (
                    <li key={c} className="rounded-full bg-ink-950 px-3.5 py-1.5 text-sm font-semibold text-white">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <ButtonLink href={taxi.cta.href} size="lg">
                {taxi.cta.label} <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Original "Taxi Dispatching Services" content */}
        <Reveal className="mt-24 flex items-center gap-5">
          <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{taxi.featuresTitle}</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-ink-950/15 to-transparent" />
        </Reveal>
        <Stagger as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {taxi.features.map((f, i) => (
            <StaggerItem as="li" key={f.title} className="h-full">
              <TiltCard className="rounded-[1.75rem] bg-white p-7 ring-1 ring-ink-950/[0.06] shadow-[0_24px_50px_-35px_rgb(7_7_10/0.35)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-35px_rgb(215_13_67/0.4)]">
                <div className="relative flex gap-4 [transform:translateZ(20px)]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-sm font-bold text-brand-700 ring-1 ring-brand-600/10 transition-all duration-500 group-hover/tilt:from-brand-500 group-hover/tilt:to-brand-700 group-hover/tilt:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-base font-semibold">{f.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.text}</p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// Two routes across the illustrative map (SVG viewBox 400 x 260).
const ROUTES = [
  "M30 220 C 90 220, 110 150, 170 140 S 260 60, 370 50",
  "M40 40 C 120 60, 150 120, 210 150 S 320 230, 380 210",
];

const BOOKINGS = [
  { channel: "Phone", Icon: PhoneIcon, route: "Harrow → Heathrow T5", time: "08:15", status: "En route", tone: "bg-emerald-50 text-emerald-700 ring-emerald-600/15" },
  { channel: "WhatsApp", Icon: WhatsAppIcon, route: "Wembley → Euston", time: "08:30", status: "Dispatched", tone: "bg-brand-50 text-brand-700 ring-brand-600/15" },
  { channel: "Web", Icon: GlobeIcon, route: "Pinner → Gatwick", time: "09:05", status: "Booked", tone: "bg-sky-50 text-sky-700 ring-sky-600/15" },
  { channel: "App", Icon: SmartphoneIcon, route: "Ealing → King's Cross", time: "09:20", status: "Booked", tone: "bg-sky-50 text-sky-700 ring-sky-600/15" },
];

/** Illustrative dispatch dashboard: live map, multi-channel bookings, system integrations. */
function DispatchDashboard() {
  return (
    <div
      role="img"
      aria-label="Illustration of a taxi dispatch dashboard showing a live map with drivers en route and a list of bookings received by phone, WhatsApp, web and mobile app."
      className="relative"
    >
      <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-300/30 via-transparent to-ink-950/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_50px_100px_-40px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/[0.06]">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-ink-950/[0.06] bg-surface/60 px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-ink-950/10" />
            <span className="size-2.5 rounded-full bg-ink-950/10" />
            <span className="size-2.5 rounded-full bg-ink-950/10" />
          </div>
          <span className="text-xs font-medium text-ink-500">Dispatch dashboard</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-500" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
          {/* Map */}
          <div className="relative aspect-[400/260] overflow-hidden bg-ink-950 md:aspect-auto md:min-h-80">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:26px_26px]" />
            <div className="absolute -left-10 top-1/3 h-16 w-[140%] -rotate-12 bg-white/[0.03]" />
            <div className="absolute left-1/3 top-0 h-full w-10 rotate-6 bg-white/[0.03]" />
            <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ROUTES.map((d, i) => (
                <g key={d}>
                  <path d={d} fill="none" stroke={i === 0 ? "#ee3364" : "#fd658e"} strokeOpacity="0.25" strokeWidth="8" strokeLinecap="round" />
                  <path d={d} fill="none" stroke={i === 0 ? "#ee3364" : "#ffc9d6"} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 4" className="animate-dash" />
                </g>
              ))}
              {/* Cars travelling along the routes (scale with the SVG; hidden for reduced motion) */}
              <g className="motion-reduce:hidden">
                {ROUTES.map((d, i) => (
                  <g key={d}>
                    <circle r="13" fill="#ee3364" opacity="0.3" />
                    <circle r="9" fill="#ffffff" />
                    <circle r="4" fill="#d70d43" />
                    <animateMotion dur="9s" repeatCount="indefinite" path={d} begin={`${i * -4.5}s`} />
                  </g>
                ))}
              </g>
            </svg>
            <span className="absolute right-[6%] top-[13%] flex size-7 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
              <MapPinIcon className="size-4" />
            </span>
            <span className="absolute bottom-3 left-3 rounded-lg bg-white/10 px-2.5 py-1 text-[0.65rem] font-medium text-white/70 backdrop-blur-md">
              Real-time driver tracking
            </span>
          </div>

          {/* Bookings feed */}
          <div className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-950">Incoming bookings</p>
              <span className="text-[0.65rem] font-medium uppercase tracking-wider text-ink-500">All channels</span>
            </div>
            <Stagger as="ul" className="space-y-2.5" stagger={0.12} delay={0.3}>
              {BOOKINGS.map((b) => (
                <StaggerItem as="li" key={b.route}>
                  <div className="flex items-center gap-3 rounded-xl bg-surface/70 p-2.5 ring-1 ring-ink-950/[0.04]">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-ink-700 shadow-sm ring-1 ring-ink-950/5">
                      <b.Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.78rem] font-semibold text-ink-900">{b.route}</p>
                      <p className="text-[0.68rem] text-ink-500">
                        {b.channel} · {b.time}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.62rem] font-semibold ring-1 ring-inset ${b.tone}`}>{b.status}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-ink-950 px-3 py-2.5 text-[0.7rem] text-white/70">
              <CheckIcon className="size-3.5 text-emerald-400" />
              Synced with {taxi.integrations.join(" · ")}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div aria-hidden="true" className="absolute -left-4 -top-6 hidden animate-float-slow items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_24px_50px_-18px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/5 sm:flex">
        <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
          <PhoneIcon className="size-4" />
        </span>
        <span className="text-xs font-semibold text-ink-900">24/7 live dispatch</span>
      </div>
    </div>
  );
}
