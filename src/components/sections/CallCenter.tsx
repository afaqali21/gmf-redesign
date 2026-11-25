import type { ReactNode } from "react";
import { callCenter } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowRightIcon, CheckIcon, GlobeIcon, MailIcon, PhoneIcon, SparklesIcon, UserIcon, WhatsAppIcon } from "@/components/ui/Icons";

export function CallCenter() {
  return (
    <section
      id={callCenter.id}
      aria-labelledby="call-center-title"
      className="grain relative isolate scroll-mt-24 overflow-hidden bg-ink-950 py-24 text-white sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 size-[34rem] animate-blob rounded-full bg-brand-700/30 blur-[140px]" />
        <div className="absolute -right-24 bottom-0 size-[26rem] animate-blob rounded-full bg-fuchsia-700/10 blur-[120px] [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow tone="light">{callCenter.eyebrow}</Eyebrow>
            <h2 id="call-center-title" className="text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              {callCenter.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">{callCenter.text}</p>
          </Reveal>

          <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {callCenter.points.map((p, i) => (
              <StaggerItem as="li" key={p.title} className={i === callCenter.points.length - 1 ? "sm:col-span-2" : ""}>
                <div className="group flex h-full gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/[0.08] transition-colors duration-500 hover:bg-white/[0.07]">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-brand-800/30 text-brand-300 ring-1 ring-inset ring-brand-500/30 transition-colors duration-500 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white">
                    <CheckIcon className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{p.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <ButtonLink href={callCenter.cta.href} size="lg">
              {callCenter.cta.label} <ArrowRightIcon className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={0.15} className="lg:col-span-6">
          <CallConsole />
        </Reveal>
      </div>
    </section>
  );
}

/** Illustrative UI: an AI assistant answers, then hands the caller to a human agent. */
function CallConsole() {
  return (
    <div
      role="img"
      aria-label="Illustration of a call center console: an AI assistant answers a customer call and hands it over to a human agent, with phone, WhatsApp, web chat and email channels."
      className="relative mx-auto max-w-lg"
    >
      <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand-500/25 via-transparent to-brand-900/30 blur-2xl" />

      <div className="gradient-border relative overflow-hidden rounded-[2rem] bg-ink-900/80 shadow-[0_40px_100px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl">
        {/* Window bar */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-xs font-medium text-white/50">Live call desk</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400" />
              <span className="relative size-1.5 rounded-full bg-emerald-400" />
            </span>
            24/7
          </span>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {/* Incoming call */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/[0.07]">
            <span className="relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand-500/50" />
              <PhoneIcon className="relative size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">Incoming call</p>
              <p className="text-xs text-white/45">Answered instantly</p>
            </div>
            <Waveform />
          </div>

          {/* Transcript */}
          <Stagger className="space-y-3" stagger={0.35} delay={0.3}>
            <StaggerItem>
              <Bubble who="ai">Hello, thanks for calling. How can I help you today?</Bubble>
            </StaggerItem>
            <StaggerItem>
              <Bubble who="caller">I&apos;d like to book for tomorrow morning, please.</Bubble>
            </StaggerItem>
            <StaggerItem>
              <Bubble who="ai">Of course. I&apos;ll connect you with an agent to confirm the details.</Bubble>
            </StaggerItem>
            <StaggerItem>
              <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-600/25 to-brand-900/20 p-3.5 ring-1 ring-inset ring-brand-500/30">
                <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                  <SparklesIcon className="size-4 text-brand-200" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-brand-400/60 via-white/40 to-emerald-300/60" />
                <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-400/15 ring-1 ring-inset ring-emerald-300/30">
                  <UserIcon className="size-4 text-emerald-200" />
                </span>
                <p className="text-xs font-semibold text-white">Human agent joined</p>
              </div>
            </StaggerItem>
          </Stagger>

          {/* Channels */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[
              { label: "Phone", Icon: PhoneIcon },
              { label: "WhatsApp", Icon: WhatsAppIcon },
              { label: "Web chat", Icon: GlobeIcon },
              { label: "Email", Icon: MailIcon },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] py-3 ring-1 ring-inset ring-white/[0.06]">
                <Icon className="size-4 text-white/70" />
                <span className="text-[0.65rem] font-medium text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div aria-hidden="true" className="absolute -left-6 -top-6 hidden animate-float rounded-2xl bg-white px-4 py-3 text-ink-950 shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)] sm:block">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <SparklesIcon className="size-4 text-brand-600" /> AI voice &amp; chat
        </p>
      </div>
      <div aria-hidden="true" className="absolute -bottom-6 -right-6 hidden animate-float-slow rounded-2xl bg-white px-4 py-3 text-ink-950 shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)] sm:block">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <UserIcon className="size-4 text-brand-600" /> Trained human agents
        </p>
      </div>
    </div>
  );
}

function Bubble({ who, children }: { who: "ai" | "caller"; children: ReactNode }) {
  const ai = who === "ai";
  return (
    <div className={`flex items-end gap-2.5 ${ai ? "" : "flex-row-reverse"}`}>
      <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${ai ? "bg-brand-600/25 text-brand-200" : "bg-white/10 text-white/70"}`}>
        {ai ? <SparklesIcon className="size-3.5" /> : <UserIcon className="size-3.5" />}
      </span>
      <p
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[0.8rem] leading-relaxed ${
          ai ? "rounded-bl-md bg-white/[0.07] text-white/85" : "rounded-br-md bg-gradient-to-br from-brand-500 to-brand-700 text-white"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

const BARS = [0.35, 0.7, 0.5, 0.95, 0.6, 0.8, 0.4, 0.65, 0.3];

function Waveform() {
  return (
    <span className="flex h-8 items-center gap-[3px]">
      {BARS.map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-center animate-wave rounded-full bg-gradient-to-t from-brand-500 to-brand-300"
          style={{ height: `${h * 100}%`, animationDelay: `${i * -0.13}s` }}
        />
      ))}
    </span>
  );
}
