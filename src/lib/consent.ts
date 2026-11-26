/*
 * Cookie consent, kept in one first-party cookie (gmf_consent) so the choice survives visits.
 *   "all"       visitor accepted optional cookies (third-party embeds such as Google Maps)
 *   "essential" visitor rejected them
 * With no cookie yet the banner is shown and optional embeds stay off. Client-only helpers;
 * components read the value through useConsent() (useSyncExternalStore), so the server HTML
 * never depends on it.
 */
import { useSyncExternalStore } from "react";

export type Consent = "all" | "essential";
/** "unset": no choice yet. "pending": server render / before hydration, so nothing optional loads. */
export type ConsentState = Consent | "unset" | "pending";

const COOKIE = "gmf_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 months, then we ask again
const CHANGE = "gmf-consent-change";
const OPEN = "gmf-consent-open";

function read(): ConsentState {
  const m = document.cookie.match(/(?:^|;\s*)gmf_consent=(all|essential)(?:;|$)/);
  return (m?.[1] as Consent | undefined) ?? "unset";
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  return () => window.removeEventListener(CHANGE, cb);
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, read, () => "pending");
}

export function setConsent(value: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE));
}

/** Re-opens the banner (footer "Cookie settings" link). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN));
export const onOpenConsentSettings = (cb: () => void) => {
  window.addEventListener(OPEN, cb);
  return () => window.removeEventListener(OPEN, cb);
};
