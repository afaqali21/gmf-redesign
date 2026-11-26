"use client";

import { setConsent, useConsent } from "@/lib/consent";
import { MapPinIcon } from "@/components/ui/Icons";

/**
 * Google Maps embed that loads only after the visitor accepts optional cookies. Until then it
 * shows the address, a button to load the map, and a plain link to Google Maps.
 */
export function ConsentMap({ src, title, address, className = "" }: { src: string; title: string; address: string; className?: string }) {
  const consent = useConsent();

  if (consent === "all") {
    return <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={className} />;
  }

  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return (
    <div className={`${className} grid place-items-center overflow-hidden bg-ink-950 p-8 text-center text-white`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/25 blur-3xl" />
      <div className="relative max-w-xs">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_15px_35px_-12px_rgb(215_13_67/0.8)]">
          <MapPinIcon className="size-6" />
        </span>
        <p className="mt-5 font-semibold">{address}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/65">The map is provided by Google, which may set cookies. It loads only with your permission.</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setConsent("all")}
            disabled={consent === "pending"}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 shadow-lg transition-[transform,color] duration-300 hover:-translate-y-0.5 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] disabled:opacity-60"
          >
            Accept cookies and show map
          </button>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
