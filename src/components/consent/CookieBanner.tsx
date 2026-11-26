"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { onOpenConsentSettings, openConsentSettings, setConsent, useConsent, type Consent } from "@/lib/consent";

const btn =
  "inline-flex flex-1 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap transition-[transform,background-color,color,box-shadow] duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-none";

/**
 * Non-blocking cookie banner, bottom of the screen. Accept and reject are equally prominent
 * (UK GDPR / PECR). Optional embeds stay off until the visitor accepts.
 */
export function CookieBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => onOpenConsentSettings(() => setReopened(true)), []);
  // When opened from the footer link, move focus into the banner so keyboard users land on it.
  useEffect(() => {
    if (reopened) panel.current?.focus();
  }, [reopened]);

  const open = consent === "unset" || reopened;
  const choose = (value: Consent) => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="cookie-banner"
          ref={panel}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-text"
          tabIndex={-1}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-x-3 bottom-3 z-[70] outline-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[26rem]"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-950/95 p-6 text-white shadow-[0_40px_80px_-30px_rgb(7_7_10/0.8)] ring-1 ring-white/10 backdrop-blur-xl sm:p-7">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-600/30 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                  <CookieIcon className="size-5 text-brand-300" />
                </span>
                <h2 id="cookie-banner-title" className="text-lg font-semibold tracking-tight text-white">
                  We value your privacy
                </h2>
              </div>
              <p id="cookie-banner-text" className="mt-4 text-sm leading-relaxed text-white/70">
                We only use strictly necessary cookies by default. With your permission we’ll also load Google Maps on our
                Contact page, which may set Google’s own cookies. You can change your choice at any time under “Cookie settings”
                at the bottom of the page.{" "}
                <Link href="/cookie-policy-uk/" className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-brand-400">
                  Read our Cookie Policy
                </Link>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => choose("essential")} className={`${btn} bg-white/[0.08] text-white ring-1 ring-inset ring-white/25 hover:bg-white/[0.14] focus-visible:outline-white`}>
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={() => choose("all")}
                  className={`${btn} bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white shadow-[0_10px_30px_-10px_rgb(215_13_67/0.7)] hover:-translate-y-0.5 focus-visible:outline-brand-400`}
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Footer link that re-opens the banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}

function CookieIcon(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3Z" />
      <circle cx="8.5" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="13" r="0.6" fill="currentColor" />
    </svg>
  );
}
