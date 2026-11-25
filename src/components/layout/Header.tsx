"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { mainNav, site, type NavItem } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

const hasChildren = (item: NavItem): item is Extract<NavItem, { children: unknown }> => "children" in item;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="relative z-[51] bg-ink-950 text-xs text-white/70">
        <div className="container-page flex h-10 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a href={site.phone.tel} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <PhoneIcon className="size-3.5 text-brand-400" />
              {site.phone.display}
            </a>
            <a
              href={site.phone.whatsapp}
              className="hidden items-center gap-2 transition-colors hover:text-white sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-3.5 text-[#25d366]" />
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href={site.phone.tel} className="hidden transition-colors hover:text-white md:inline">
              Talk to us now
            </a>
            <Link href={site.bookingPath} className="group inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-300">
              Get an instant quote
              <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar: transparent glass that firms up on scroll */}
      <header className="sticky top-0 z-50">
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled
              ? "bg-white/75 shadow-[0_1px_0_rgb(7_7_10/0.06),0_12px_40px_-12px_rgb(7_7_10/0.12)] backdrop-blur-xl backdrop-saturate-150"
              : "bg-white"
          }`}
        >
          <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
            <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-[1.02]" aria-label={`${site.name} home`}>
              <Image
                src="/images/brand/gmf-logo.png"
                alt={site.name}
                width={400}
                height={98}
                className="h-9 w-auto lg:h-10"
                preload
              />
            </Link>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 rounded-full bg-surface/80 p-1 ring-1 ring-ink-950/5">
                {mainNav.map((item) => (
                  <li key={item.label} className="relative">
                    {hasChildren(item) ? (
                      <DesktopDropdown item={item} />
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-all duration-300 hover:bg-white hover:text-brand-600 hover:shadow-sm"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex">
                <ButtonLink href={site.bookingPath}>
                  Get a Quote <ArrowRightIcon className="size-4" />
                </ButtonLink>
              </span>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink-950 ring-1 ring-ink-950/5 transition hover:bg-ink-950 hover:text-white lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Reading progress */}
        <m.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="h-0.5 origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800"
        />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function DesktopDropdown({ item }: { item: Extract<NavItem, { children: unknown }> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = `menu-${item.label.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        // Keyboard activation (detail 0) toggles; a pointer click after hover-open keeps it open.
        onClick={(e) => setOpen((v) => (e.detail === 0 ? !v : true))}
        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
          open ? "bg-white text-brand-600 shadow-sm" : "text-ink-700 hover:bg-white hover:text-brand-600 hover:shadow-sm"
        }`}
      >
        {item.label}
        <ChevronDownIcon className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Kept in the DOM (hidden) so links stay crawlable and focusable states are predictable. */}
      <div id={id} className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${open ? "" : "pointer-events-none"}`}>
        <m.ul
          initial={false}
          animate={open ? { opacity: 1, y: 0, scale: 1, visibility: "visible" } : { opacity: 0, y: -8, scale: 0.97, transitionEnd: { visibility: "hidden" } }}
          transition={{ duration: 0.28, ease: EASE }}
          className="w-72 origin-top rounded-3xl bg-white/90 p-2 shadow-[0_24px_60px_-15px_rgb(7_7_10/0.25)] ring-1 ring-ink-950/5 backdrop-blur-xl"
        >
          {item.children.map((child, i) => (
            <m.li
              key={child.href}
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.3, delay: open ? 0.03 * i : 0, ease: EASE }}
            >
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {child.label}
                <ArrowRightIcon className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </m.li>
          ))}
        </m.ul>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-hidden bg-white shadow-2xl"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="relative flex h-18 items-center justify-between border-b border-ink-950/5 px-5">
              <Image src="/images/brand/gmf-logo.png" alt={site.name} width={400} height={98} className="h-8 w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                autoFocus
                className="inline-flex size-11 items-center justify-center rounded-full bg-surface transition hover:bg-ink-950 hover:text-white"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-3 py-4">
              <m.ul
                className="space-y-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              >
                {mainNav.map((item) => (
                  <m.li
                    key={item.label}
                    variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }}
                  >
                    {hasChildren(item) ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={expanded === item.label}
                          onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                          className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-lg font-semibold text-ink-950 transition-colors hover:bg-surface"
                        >
                          {item.label}
                          <span
                            className={`flex size-8 items-center justify-center rounded-full transition-all duration-300 ${
                              expanded === item.label ? "rotate-180 bg-brand-600 text-white" : "bg-surface"
                            }`}
                          >
                            <ChevronDownIcon className="size-4" />
                          </span>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-400 ease-out-expo ${
                            expanded === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <ul className="overflow-hidden pl-4">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  tabIndex={expanded === item.label ? undefined : -1}
                                  className="block rounded-xl px-4 py-2.5 text-[0.95rem] text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-600"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-2xl px-4 py-3.5 text-lg font-semibold text-ink-950 transition-colors hover:bg-surface"
                      >
                        {item.label}
                      </Link>
                    )}
                  </m.li>
                ))}
              </m.ul>
            </nav>

            <div className="relative space-y-3 border-t border-ink-950/5 p-5">
              <ButtonLink href={site.bookingPath} size="lg" className="w-full" onClick={onClose}>
                Get a Quote <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.phone.tel} variant="outline" size="lg" className="w-full">
                <PhoneIcon className="size-4" /> {site.phone.display}
              </ButtonLink>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
