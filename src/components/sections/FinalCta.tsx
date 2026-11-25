import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRightIcon, PhoneIcon } from "@/components/ui/Icons";
import type { ReactNode } from "react";

type Props = {
  /** Defaults to the homepage copy. Inner pages pass their own closing heading and text. */
  title?: ReactNode;
  text?: ReactNode;
  actions?: ReactNode;
  /** Heading tag; inner pages keep the level WordPress used. */
  as?: "h2" | "h3" | "p";
  className?: string;
};

export function FinalCta({ title = finalCta.title, text = finalCta.text, actions, as: Heading = "h2", className = "bg-white pb-24 sm:pb-32" }: Props = {}) {
  return (
    <section aria-labelledby="cta-title" className={className}>
      <div className="container-page">
        <Reveal direction="scale">
          <div className="grain relative isolate overflow-hidden rounded-[2.75rem] px-8 py-16 text-center shadow-[0_50px_100px_-40px_rgb(215_13_67/0.6)] sm:px-16 sm:py-24">
            {/* Animated gradient field */}
            <div aria-hidden="true" className="absolute inset-0 -z-20 animate-gradient bg-[linear-gradient(120deg,#5c0620,#b40a38,#d70d43,#ee3364,#8f0b2f)] bg-[size:300%_300%]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
            {/* Floating shapes */}
            <div aria-hidden="true" className="absolute -left-10 top-10 size-40 animate-float-slow rounded-full border border-white/20" />
            <div aria-hidden="true" className="absolute -right-6 bottom-8 size-28 animate-float rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur-sm [animation-delay:-2s]" />
            <div aria-hidden="true" className="absolute right-1/4 top-8 size-3 animate-float rounded-full bg-white/70 shadow-[0_0_20px_white]" />
            <div aria-hidden="true" className="absolute bottom-12 left-1/4 size-2 animate-float-slow rounded-full bg-white/60" />

            <Heading id="cta-title" className="mx-auto max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-6xl">
              {title}
            </Heading>
            {typeof text === "string" ? (
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
            ) : (
              text && <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-white/80">{text}</div>
            )}
            <div className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
              {actions ?? (
                <>
                  <ButtonLink href={site.bookingPath} variant="light" size="lg">
                    Free consultation <ArrowRightIcon className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={site.phone.tel} variant="ghost-light" size="lg">
                    <PhoneIcon className="size-4" /> {site.phone.display}
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
