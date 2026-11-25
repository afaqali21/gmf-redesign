import Image from "next/image";
import { clients } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";

// The logo files are white (made for the old dark band); invert them to dark grey for the light panel.
const logoFilter = "[filter:invert(1)_grayscale(1)_contrast(1.2)]";

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-title" className="relative z-10 bg-surface pb-4">
      <div className="container-page">
        {/* Light glass panel that floats over the bottom edge of the dark hero */}
        <Reveal className="-mt-14 sm:-mt-16" distance={40}>
          <div className="relative overflow-hidden rounded-[2rem] bg-white/90 py-8 shadow-[0_30px_80px_-30px_rgb(7_7_10/0.35)] ring-1 ring-ink-950/5 backdrop-blur-xl sm:py-10">
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-brand-100/70 blur-3xl" />
            <div className="relative flex items-center gap-5 px-6 sm:px-10">
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-950/10" />
              <h2 id="clients-title" className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink-500">
                {clients.title}
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-950/10" />
            </div>

            <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1 ? true : undefined}
                    className={`flex shrink-0 items-center gap-4 px-2 ${copy === 1 ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center"}`}
                  >
                    {clients.logos.map((logo) => (
                      <li
                        key={logo.src}
                        className="group/logo flex h-20 w-40 items-center justify-center rounded-2xl bg-surface/70 ring-1 ring-ink-950/[0.04] transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_30px_-14px_rgb(7_7_10/0.3)] hover:ring-brand-600/20"
                      >
                        <Image
                          src={logo.src}
                          alt={copy === 1 ? "" : logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className={`h-auto max-h-12 w-auto opacity-75 transition duration-500 group-hover/logo:scale-105 group-hover/logo:opacity-100 ${logoFilter}`}
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
