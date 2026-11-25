import Image from "next/image";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { footerNav, legalNav, site } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MailIcon, MapPinIcon, PhoneIcon, SocialIcon, WhatsAppIcon } from "@/components/ui/Icons";

const company = [
  { label: "About", href: "/about/" },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
  { label: "Get a Quote", href: "/booking/" },
];

async function Copyright() {
  "use cache";
  cacheLife("days");
  return (
    <p>
      ©{new Date().getFullYear()} {site.name}
    </p>
  );
}

const contactCard =
  "group flex h-full items-center gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06] hover:ring-brand-500/40";

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink-950 text-white/60">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
        <div className="absolute -top-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-brand-700/20 blur-[120px]" />
      </div>

      <div className="container-page relative pt-20 lg:pt-24">
        {/* Contact strip */}
        <h3 id="reach-us" className="sr-only">
          Contact us
        </h3>
        <Stagger as="ul" className="grid gap-4 md:grid-cols-3" aria-labelledby="reach-us">
          <StaggerItem as="li">
            <a href="tel:+4402071831099" className={contactCard}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_25px_-8px_rgb(215_13_67/0.8)] transition-transform duration-500 group-hover:-rotate-6">
                <PhoneIcon className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/40">Call us</span>
                <span className="block text-base font-semibold text-white">{site.phone.display}</span>
              </span>
            </a>
          </StaggerItem>
          <StaggerItem as="li">
            <a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className={contactCard}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25d366]/15 text-[#25d366] ring-1 ring-inset ring-[#25d366]/30 transition-transform duration-500 group-hover:-rotate-6">
                <WhatsAppIcon className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/40">WhatsApp</span>
                <span className="block text-base font-semibold text-white">{site.phone.display}</span>
              </span>
            </a>
          </StaggerItem>
          <StaggerItem as="li">
            <a href={`mailto:${site.email}`} className={contactCard}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-brand-300 ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:-rotate-6">
                <MailIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-widest text-white/40">Email</span>
                <span className="block truncate text-base font-semibold text-white">{site.email}</span>
              </span>
            </a>
          </StaggerItem>
        </Stagger>

        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:py-20">
          <Reveal className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="inline-block rounded-2xl bg-white px-5 py-3.5 shadow-[0_10px_30px_-10px_rgb(255_255_255/0.2)] transition-transform duration-500 hover:-translate-y-0.5"
            >
              <Image src="/images/brand/gmf-logo.png" alt={site.name} width={400} height={98} className="h-8 w-auto" />
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed">{site.blurb}</p>
            <address className="mt-5 flex items-start gap-2.5 text-sm not-italic leading-relaxed text-white/70">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand-400" />
              {site.address.display}
            </address>

            <h3 id="follow-us" className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Follow us
            </h3>
            <ul className="mt-4 flex gap-2.5" aria-labelledby="follow-us">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/75 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-brand-500 hover:to-brand-700 hover:text-white hover:shadow-[0_10px_25px_-8px_rgb(215_13_67/0.8)] hover:ring-transparent"
                  >
                    <SocialIcon name={s.label} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-10 sm:grid-cols-[1.3fr_1fr_1fr_1fr] lg:col-span-8" stagger={0.08}>
            {[...footerNav, { heading: "Company", links: company }].map((col) => (
              <StaggerItem key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{col.heading}</h3>
                <ul className="mt-5 space-y-3.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-white">
                        <span aria-hidden="true" className="h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-3" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="container-page whitespace-nowrap bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-[min(8.6vw,7.4rem)] font-bold leading-[0.85] tracking-[-0.05em] text-transparent">
          Global Marketing
        </p>
      </div>

      <div className="relative border-t border-white/[0.08]">
        <div className="container-page flex flex-col gap-4 py-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <Copyright />
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
