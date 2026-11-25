import type { ReactNode } from "react";
import {
  ChartIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  DocumentIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  MegaphoneIcon,
  PaletteIcon,
  PenToolIcon,
  PhoneIcon,
  PlaneIcon,
  PlugIcon,
  ScaleIcon,
  SearchIcon,
  ShareIcon,
  SmartphoneIcon,
  SparklesIcon,
  StarIcon,
  TaxiIcon,
  TargetIcon,
  UserIcon,
} from "@/components/ui/Icons";

/*
 * Illustrations built in code for page heroes (see docs/DESIGN-SYSTEM.md, "Image art direction").
 * They show what each service does, are sharp at any size, weigh nothing to download and are
 * labelled for screen readers. Depth (translateZ) only applies from lg up, so text stays crisp on phones.
 */

export type VisualKind =
  | "search"
  | "seo"
  | "social"
  | "email"
  | "ads"
  | "brand"
  | "app"
  | "web"
  | "webdesign"
  | "graphic"
  | "appdesign"
  | "law"
  | "travel"
  | "minicab"
  | "laundry"
  | "about"
  | "portfolio"
  | "quote"
  | "contact";

const glass = "gradient-border rounded-3xl bg-white/[0.06] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl";
const chip =
  "gradient-border inline-flex items-center gap-2 rounded-2xl bg-ink-900/80 px-3.5 py-2.5 text-xs font-semibold text-white shadow-[0_20px_40px_-15px_rgb(0_0_0/0.8)] backdrop-blur-xl";
const iconTile = "flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white";

const labels: Record<VisualKind, string> = {
  search: "Illustration: a search results page with a paid listing in first position and a click-through chart",
  seo: "Illustration: a search results page where the website climbs to position one, with an organic traffic chart",
  social: "Illustration: a phone showing a social media post with likes, comments and shares",
  email: "Illustration: an email inbox with a campaign and its open and click rates",
  ads: "Illustration: a Google Ads dashboard with a conversion chart and cost per click",
  brand: "Illustration: a brand board with a logo mark, colour palette and typeface",
  app: "Illustration: two smartphones showing a native app with a loyalty card and push notification",
  web: "Illustration: a browser window with a custom-built website and its code",
  webdesign: "Illustration: a responsive website shown on a desktop browser and a phone",
  graphic: "Illustration: a design artboard with a pen tool, layers and colour swatches",
  appdesign: "Illustration: a phone wireframe with user flow arrows and interface components",
  law: "Illustration: a search results page for a law firm with a local map pack and reviews",
  travel: "Illustration: a travel website ranking for destination searches with a flight route",
  minicab: "Illustration: a three-step minicab booking engine on a phone with a live journey",
  laundry: "Illustration: an online dry cleaning booking form with collection slots",
  about: "Illustration: the Global Marketing Firm services orbiting a central hub",
  portfolio: "Illustration: a stack of client project cards",
  quote: "Illustration: a quote request with selected services",
  contact: "Illustration: contact cards for phone, WhatsApp and email",
};

function Frame({ kind, children }: { kind: VisualKind; children: ReactNode }) {
  return (
    <div role="img" aria-label={labels[kind]} className="preserve-3d relative mx-auto w-full max-w-md select-none py-6">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/30 blur-[90px]" />
      <div aria-hidden="true" className="absolute -right-4 -top-2 size-28 animate-spin-slow rounded-full border border-dashed border-white/15" />
      <div aria-hidden="true" className="preserve-3d relative">
        {children}
      </div>
    </div>
  );
}

const Float = ({ className = "", depth = 60, children }: { className?: string; depth?: number; children: ReactNode }) => (
  <div className={`absolute ${className}`}>
    <div style={{ ["--z" as string]: `${depth}px` }} className="lg:[transform:translateZ(var(--z))]">
      {children}
    </div>
  </div>
);

function Browser({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`${glass} overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-brand-500" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex-1 truncate rounded-full bg-white/[0.06] px-3 py-1 text-[0.65rem] text-white/50">{url}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${glass} relative w-48 rounded-[2.2rem] p-2.5 ${className}`}>
      <div className="relative h-[22rem] overflow-hidden rounded-[1.75rem] bg-ink-950/80 ring-1 ring-white/10">
        <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <div className="px-3.5 pb-4 pt-9">{children}</div>
      </div>
    </div>
  );
}

const Bar = ({ w, tone = "white" }: { w: string; tone?: "white" | "brand" }) => (
  <span className={`block h-2 rounded-full ${tone === "brand" ? "bg-brand-500/80" : "bg-white/15"}`} style={{ width: w }} />
);

function Results({ highlight }: { highlight: "ad" | "organic" | "local" }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2 ring-1 ring-white/10">
        <SearchIcon className="size-3.5 text-brand-300" />
        <Bar w="55%" />
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-2xl p-3 ${i === 0 ? "bg-gradient-to-br from-brand-500/25 to-brand-800/20 ring-1 ring-brand-400/40" : "bg-white/[0.03]"}`}
        >
          <div className="flex items-center gap-2">
            {i === 0 && (
              <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                {highlight === "ad" ? "Ad" : highlight === "local" ? "Top" : "#1"}
              </span>
            )}
            <Bar w={i === 0 ? "60%" : "50%"} tone={i === 0 ? "brand" : "white"} />
          </div>
          <div className="mt-2 space-y-1.5">
            <Bar w="90%" />
            <Bar w="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniChart() {
  return (
    <svg viewBox="0 0 120 48" className="h-12 w-28">
      <defs>
        <linearGradient id="vchart" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ee3364" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ee3364" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 40 L20 34 L40 36 L60 24 L80 26 L100 12 L120 6 L120 48 L0 48 Z" fill="url(#vchart)" />
      <path d="M0 40 L20 34 L40 36 L60 24 L80 26 L100 12 L120 6" fill="none" stroke="#ff9ab4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const Stat = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <div className={chip}>
    <span className={iconTile}>{icon}</span>
    <span>
      <span className="block text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/50">{label}</span>
      <span className="text-sm">{value}</span>
    </span>
  </div>
);

export function Visual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "search":
    case "seo":
    case "law":
    case "travel":
      return (
        <Frame kind={kind}>
          <Browser url={kind === "law" ? "google.co.uk/search?q=solicitors+near+me" : kind === "travel" ? "google.co.uk/search?q=airport+transfer+heathrow" : "google.co.uk/search"}>
            <Results highlight={kind === "search" ? "ad" : kind === "law" ? "local" : "organic"} />
          </Browser>
          <Float className="-left-4 top-1/3 animate-float sm:-left-10" depth={80}>
            {kind === "law" ? (
              <Stat icon={<ScaleIcon className="size-4" />} label="Enquiries" value="More calls & cases" />
            ) : kind === "travel" ? (
              <Stat icon={<PlaneIcon className="size-4" />} label="Bookings" value="Destination #1" />
            ) : (
              <Stat icon={<TargetIcon className="size-4" />} label={kind === "search" ? "Paid search" : "Organic"} value={kind === "search" ? "Top of SERP" : "Position 1"} />
            )}
          </Float>
          <Float className="-bottom-6 -right-2 animate-float-slow sm:-right-8" depth={110}>
            <div className={`${chip} flex-col items-start`}>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/50">{kind === "search" ? "Click-through" : "Organic traffic"}</span>
              <MiniChart />
            </div>
          </Float>
          {(kind === "law" || kind === "travel") && (
            <Float className="-top-6 right-6 animate-float [animation-delay:-3s]" depth={50}>
              <div className={chip}>
                {kind === "law" ? <MapPinIcon className="size-4 text-brand-300" /> : <GlobeIcon className="size-4 text-brand-300" />}
                <span className="flex gap-0.5 text-brand-300">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} className="size-3" />
                  ))}
                </span>
              </div>
            </Float>
          )}
        </Frame>
      );

    case "social":
      return (
        <Frame kind={kind}>
          <div className="flex justify-center">
            <Phone>
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-700" />
                <span className="space-y-1">
                  <Bar w="4.5rem" />
                  <Bar w="3rem" />
                </span>
              </div>
              <div className="mt-3 aspect-square rounded-2xl bg-[radial-gradient(circle_at_30%_30%,#fd658e,#8f0b2f_70%)]">
                <div className="flex h-full items-center justify-center">
                  <MegaphoneIcon className="size-12 text-white/80" />
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-white/70">
                <span className="text-brand-400">♥</span>
                <ShareIcon className="size-4" />
              </div>
              <div className="mt-2 space-y-1.5">
                <Bar w="90%" />
                <Bar w="60%" />
              </div>
            </Phone>
          </div>
          <Float className="left-0 top-10 animate-float sm:-left-6" depth={90}>
            <div className={chip}>
              <span className="text-brand-400">♥</span> New likes
            </div>
          </Float>
          <Float className="right-0 top-1/2 animate-float-slow sm:-right-4" depth={120}>
            <Stat icon={<UserIcon className="size-4" />} label="Audience" value="Engaged followers" />
          </Float>
          <Float className="bottom-4 left-2 animate-float [animation-delay:-2s]" depth={60}>
            <div className={chip}>💬 New comment</div>
          </Float>
        </Frame>
      );

    case "email":
      return (
        <Frame kind={kind}>
          <div className={`${glass} p-5`}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <MailIcon className="size-4 text-brand-300" /> Inbox
              </span>
              <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[0.6rem] font-bold text-white">3 new</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className={`flex items-center gap-3 rounded-2xl p-3 ${i === 0 ? "bg-gradient-to-r from-brand-500/25 to-transparent ring-1 ring-brand-400/30" : "bg-white/[0.03]"}`}>
                  <span className={`size-8 shrink-0 rounded-full ${i === 0 ? "bg-gradient-to-br from-brand-400 to-brand-700" : "bg-white/10"}`} />
                  <span className="flex-1 space-y-1.5">
                    <Bar w={i === 0 ? "70%" : "55%"} tone={i === 0 ? "brand" : "white"} />
                    <Bar w="85%" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Float className="-left-4 -top-4 animate-float sm:-left-10" depth={90}>
            <Stat icon={<MailIcon className="size-4" />} label="Campaign" value="Delivered to inbox" />
          </Float>
          <Float className="-bottom-6 -right-2 animate-float-slow sm:-right-8" depth={120}>
            <Stat icon={<ChartIcon className="size-4" />} label="Engagement" value="Opens & clicks" />
          </Float>
        </Frame>
      );

    case "ads":
      return (
        <Frame kind={kind}>
          <div className={`${glass} p-5`}>
            <div className="flex items-center justify-between text-sm font-semibold text-white">
              <span>Campaign performance</span>
              <span className="text-xs text-brand-300">Last 30 days</span>
            </div>
            <div className="mt-5 flex h-36 items-end gap-2.5">
              {[38, 52, 44, 66, 58, 80, 72, 94].map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-lg ${i > 5 ? "bg-gradient-to-t from-brand-700 to-brand-400" : "bg-white/15"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {["Impressions", "Clicks", "Conversions"].map((l) => (
                <div key={l} className="rounded-xl bg-white/[0.04] p-2">
                  <span className="block text-[0.55rem] uppercase tracking-wider text-white/45">{l}</span>
                  <Bar w="70%" tone="brand" />
                </div>
              ))}
            </div>
          </div>
          <Float className="-left-4 top-8 animate-float sm:-left-10" depth={90}>
            <Stat icon={<TargetIcon className="size-4" />} label="Keywords" value="Refined & relevant" />
          </Float>
          <Float className="-bottom-6 right-0 animate-float-slow sm:-right-6" depth={120}>
            <Stat icon={<ChartIcon className="size-4" />} label="Spend" value="Cost optimised" />
          </Float>
        </Frame>
      );

    case "brand":
    case "graphic":
      return (
        <Frame kind={kind}>
          <div className={`${glass} grid grid-cols-2 gap-3 p-5`}>
            <div className="col-span-2 flex aspect-[2/1] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-700 to-ink-950">
              <span className="text-5xl font-bold tracking-tighter text-white">{kind === "brand" ? "GM" : "Aa"}</span>
            </div>
            <div className="flex gap-1.5 rounded-2xl bg-white/[0.04] p-3">
              {["#ee3364", "#b40a38", "#5c0620", "#ffffff"].map((c) => (
                <span key={c} className="h-14 flex-1 rounded-lg ring-1 ring-white/10" style={{ background: c }} />
              ))}
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <span className="block text-2xl font-bold text-white">Aa</span>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/45">Poppins</span>
            </div>
          </div>
          <Float className="-left-4 -top-4 animate-float sm:-left-10" depth={100}>
            <div className={chip}>
              {kind === "brand" ? <SparklesIcon className="size-4 text-brand-300" /> : <PenToolIcon className="size-4 text-brand-300" />}
              {kind === "brand" ? "Brand identity" : "Pen tool"}
            </div>
          </Float>
          <Float className="-bottom-6 -right-2 animate-float-slow sm:-right-8" depth={120}>
            <Stat icon={<PaletteIcon className="size-4" />} label={kind === "brand" ? "Consistency" : "Layers"} value={kind === "brand" ? "Every touchpoint" : "Social · Print · Web"} />
          </Float>
        </Frame>
      );

    case "app":
    case "appdesign":
      return (
        <Frame kind={kind}>
          <div className="preserve-3d flex items-end justify-center gap-4">
            <Phone className="hidden -rotate-6 opacity-70 sm:block">
              <div className="space-y-2.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.05] p-2">
                    <span className="size-6 rounded-lg bg-white/10" />
                    <Bar w="70%" />
                  </div>
                ))}
              </div>
            </Phone>
            <Phone className="lg:[transform:translateZ(60px)]">
              {kind === "app" ? (
                <>
                  <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 p-3.5 text-white">
                    <span className="text-[0.6rem] uppercase tracking-widest text-white/70">Loyalty card</span>
                    <span className="mt-1 block text-lg font-bold">1,250 pts</span>
                    <span className="mt-3 flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-white" : "bg-white/30"}`} />
                      ))}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="aspect-square rounded-xl bg-white/[0.06]" />
                    ))}
                  </div>
                  <span className="mt-3 block rounded-full bg-brand-600 py-2 text-center text-[0.65rem] font-semibold text-white">Buy now</span>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <span className="block h-20 rounded-2xl border border-dashed border-white/25" />
                    <span className="block h-8 rounded-xl border border-dashed border-brand-400/60" />
                    <span className="block h-8 rounded-xl border border-dashed border-white/25" />
                  </div>
                  <svg viewBox="0 0 100 40" className="mt-2 h-10 w-full text-brand-400">
                    <path d="M10 5 C 40 5, 60 35, 90 35" fill="none" stroke="currentColor" strokeDasharray="4 4" className="animate-dash" />
                  </svg>
                  <span className="block rounded-full bg-brand-600 py-2 text-center text-[0.65rem] font-semibold text-white">Continue</span>
                </>
              )}
            </Phone>
          </div>
          <Float className="-left-2 top-6 animate-float sm:-left-8" depth={120}>
            <div className={chip}>
              <SmartphoneIcon className="size-4 text-brand-300" /> {kind === "app" ? "iOS & Android" : "User flow"}
            </div>
          </Float>
          <Float className="bottom-10 right-0 animate-float-slow sm:-right-6" depth={140}>
            <Stat icon={<SparklesIcon className="size-4" />} label={kind === "app" ? "Push" : "UX"} value={kind === "app" ? "Your order is ready" : "Easy to use"} />
          </Float>
        </Frame>
      );

    case "web":
    case "webdesign":
      return (
        <Frame kind={kind}>
          <Browser url="yourbusiness.co.uk">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 space-y-2.5">
                <Bar w="80%" tone="brand" />
                <Bar w="95%" />
                <Bar w="70%" />
                <span className="mt-2 inline-block rounded-full bg-brand-600 px-3 py-1.5 text-[0.6rem] font-semibold text-white">Get a quote</span>
              </div>
              <div className="col-span-2 aspect-square rounded-2xl bg-[radial-gradient(circle_at_30%_30%,#fd658e,#5c0620_75%)]" />
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-14 rounded-xl bg-white/[0.05] ${i === 2 ? "col-span-1" : "col-span-2"}`} />
              ))}
            </div>
          </Browser>
          {kind === "web" ? (
            <Float className="-bottom-8 -left-4 animate-float sm:-left-10" depth={110}>
              <div className={`${chip} block font-mono text-[0.65rem] font-normal leading-relaxed`}>
                <span className="text-brand-300">&lt;Booking</span> <span className="text-white/60">engine</span>
                <span className="text-brand-300">=</span>
                <span className="text-white/80">&quot;custom&quot;</span> <span className="text-brand-300">/&gt;</span>
              </div>
            </Float>
          ) : (
            <Float className="-bottom-10 -right-2 animate-float sm:-right-6" depth={120}>
              <div className={`${glass} w-24 rounded-[1.4rem] p-1.5`}>
                <div className="space-y-1.5 rounded-[1.1rem] bg-ink-950/80 p-2.5">
                  <Bar w="80%" tone="brand" />
                  <span className="block aspect-square rounded-lg bg-[radial-gradient(circle_at_30%_30%,#fd658e,#5c0620_75%)]" />
                  <Bar w="60%" />
                </div>
              </div>
            </Float>
          )}
          <Float className="-right-2 -top-6 animate-float-slow sm:-right-8" depth={80}>
            <Stat icon={kind === "web" ? <CodeIcon className="size-4" /> : <SearchIcon className="size-4" />} label={kind === "web" ? "Custom-built" : "SEO friendly"} value={kind === "web" ? "No templates" : "Mobile responsive"} />
          </Float>
        </Frame>
      );

    case "minicab":
      return (
        <Frame kind={kind}>
          <div className="flex justify-center">
            <Phone>
              <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-brand-300">Step 2 of 3</span>
              <div className="mt-2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`h-1 flex-1 rounded-full ${i < 2 ? "bg-brand-500" : "bg-white/15"}`} />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {["Pickup", "Drop-off"].map((l, i) => (
                  <div key={l} className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-2.5">
                    <span className={`size-2.5 rounded-full ${i === 0 ? "bg-brand-500" : "bg-white"}`} />
                    <span className="text-[0.65rem] text-white/70">{l}</span>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 140 70" className="mt-3 h-24 w-full rounded-xl bg-white/[0.03]">
                <path d="M15 55 C 45 55, 50 15, 80 25 S 115 20, 125 12" fill="none" stroke="#ee3364" strokeWidth="2.5" strokeDasharray="5 5" className="animate-dash" />
                <circle cx="15" cy="55" r="4" fill="#ee3364" />
                <circle cx="125" cy="12" r="4" fill="white" />
              </svg>
              <span className="mt-3 block rounded-full bg-brand-600 py-2 text-center text-[0.65rem] font-semibold text-white">Book now</span>
            </Phone>
          </div>
          <Float className="-left-2 top-10 animate-float sm:-left-8" depth={110}>
            <Stat icon={<TaxiIcon className="size-4" />} label="Driver" value="Arriving in 4 min" />
          </Float>
          <Float className="bottom-8 right-0 animate-float-slow sm:-right-8" depth={140}>
            <Stat icon={<PlugIcon className="size-4" />} label="Dispatch" value="Synced to iCabbi" />
          </Float>
        </Frame>
      );

    case "laundry":
      return (
        <Frame kind={kind}>
          <div className={`${glass} p-5`}>
            <span className="text-sm font-semibold text-white">Book a collection</span>
            <div className="mt-4 space-y-2.5">
              {["Service", "Postcode", "Collection date"].map((l, i) => (
                <div key={l} className="rounded-xl bg-white/[0.05] p-3 ring-1 ring-white/10">
                  <span className="block text-[0.55rem] uppercase tracking-wider text-white/45">{l}</span>
                  <Bar w={["60%", "35%", "50%"][i]} tone={i === 0 ? "brand" : "white"} />
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["9–11", "12–2", "5–7"].map((t, i) => (
                <span key={t} className={`rounded-lg py-1.5 text-center text-[0.6rem] font-semibold ${i === 1 ? "bg-brand-600 text-white" : "bg-white/[0.05] text-white/60"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Float className="-left-4 -top-4 animate-float sm:-left-10" depth={100}>
            <Stat icon={<CheckIcon className="size-4" />} label="Booking" value="Request received" />
          </Float>
          <Float className="-bottom-6 -right-2 animate-float-slow sm:-right-8" depth={120}>
            <Stat icon={<MapPinIcon className="size-4" />} label="Branches" value="Across London" />
          </Float>
        </Frame>
      );

    case "about":
      return (
        <Frame kind={kind}>
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-[12%] rounded-full border border-white/10" />
            <div className="absolute inset-[28%] rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-0 animate-spin-slow">
              {[SearchIcon, PaletteIcon, MegaphoneIcon, CodeIcon, SmartphoneIcon, MailIcon].map((Icon, i) => {
                const a = (i / 6) * Math.PI * 2;
                return (
                  <span
                    key={i}
                    className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/[0.07] text-brand-300 ring-1 ring-white/15 backdrop-blur-xl"
                    style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 38}%` }}
                  >
                    <Icon className="size-5" />
                  </span>
                );
              })}
            </div>
            <div className="absolute inset-[34%] flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-800 shadow-[0_30px_60px_-20px_rgb(215_13_67/0.8)] lg:[transform:translateZ(60px)]">
              <span className="text-3xl font-bold tracking-tighter text-white">GMF</span>
            </div>
          </div>
          <Float className="-bottom-2 left-0 animate-float" depth={100}>
            <Stat icon={<StarIcon className="size-4" />} label="Experience" value="10+ years" />
          </Float>
        </Frame>
      );

    case "portfolio":
      return (
        <Frame kind={kind}>
          <div className="preserve-3d relative h-80">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${glass} absolute inset-x-6 p-4`}
                style={{ top: `${i * 22}%`, transform: `rotate(${(i - 1) * 4}deg)` }}
              >
                <div className="flex items-center gap-3">
                  <span className={iconTile}>{[<TaxiIcon key="a" className="size-4" />, <GlobeIcon key="b" className="size-4" />, <DatabaseIcon key="c" className="size-4" />][i]}</span>
                  <span className="flex-1 space-y-1.5">
                    <Bar w="60%" tone={i === 2 ? "brand" : "white"} />
                    <Bar w="40%" />
                  </span>
                </div>
                <div className="mt-3 h-16 rounded-xl bg-[radial-gradient(circle_at_20%_30%,rgb(238_51_100/0.5),transparent_70%)] bg-white/[0.03]" />
              </div>
            ))}
          </div>
        </Frame>
      );

    case "quote":
      return (
        <Frame kind={kind}>
          <div className={`${glass} p-5`}>
            <span className="text-sm font-semibold text-white">Your project</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SEO", "Web Development", "Google Ads", "Branding", "App Design"].map((s, i) => (
                <span key={s} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.65rem] font-semibold ${i % 2 === 0 ? "bg-brand-600 text-white" : "bg-white/[0.06] text-white/60 ring-1 ring-white/10"}`}>
                  {i % 2 === 0 && <CheckIcon className="size-3" />} {s}
                </span>
              ))}
            </div>
            <div className="mt-5 space-y-2.5">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-xl bg-white/[0.05] p-3 ring-1 ring-white/10">
                  <Bar w={i ? "45%" : "65%"} />
                </div>
              ))}
            </div>
          </div>
          <Float className="-bottom-6 -right-2 animate-float-slow sm:-right-8" depth={120}>
            <Stat icon={<DocumentIcon className="size-4" />} label="Free" value="Tailored quote" />
          </Float>
        </Frame>
      );

    case "contact":
      return (
        <Frame kind={kind}>
          <div className="space-y-3">
            {[
              { icon: <PhoneIcon className="size-4" />, label: "Phone" },
              { icon: <span className="text-sm">✆</span>, label: "WhatsApp" },
              { icon: <MailIcon className="size-4" />, label: "Email" },
            ].map((c, i) => (
              <div key={c.label} className={`${glass} flex items-center gap-4 p-4 ${i === 1 ? "lg:translate-x-8" : ""}`}>
                <span className={iconTile}>{c.icon}</span>
                <span className="flex-1 space-y-1.5">
                  <span className="block text-xs font-semibold text-white">{c.label}</span>
                  <Bar w="60%" />
                </span>
              </div>
            ))}
          </div>
        </Frame>
      );
  }
}
