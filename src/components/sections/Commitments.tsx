import Image from "next/image";
import { commitments } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function Commitments() {
  return (
    <section aria-labelledby="commitments-title" className="relative bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="commitments-title" title={commitments.title} />
        <Stagger as="ul" className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {commitments.items.map((c, i) => (
            <StaggerItem as="li" key={c.title} className="h-full">
              <TiltCard className="flex flex-col overflow-hidden rounded-[2rem] bg-white p-7 text-center ring-1 ring-ink-950/5 shadow-[0_24px_50px_-35px_rgb(7_7_10/0.35)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-35px_rgb(215_13_67/0.4)]">
                <div className="relative flex h-40 items-center justify-center [transform:translateZ(40px)]">
                  <span aria-hidden="true" className="absolute size-32 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 transition-transform duration-700 ease-out-expo group-hover/tilt:scale-125" />
                  <Image
                    src={c.image.src}
                    alt=""
                    width={c.image.width}
                    height={c.image.height}
                    className="relative h-full w-auto object-contain transition-transform duration-700 ease-out-expo group-hover/tilt:-translate-y-2 group-hover/tilt:scale-105"
                  />
                </div>
                <div className="relative [transform:translateZ(20px)]">
                  <span className="mx-auto mt-6 inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-[0.7rem] font-bold tabular-nums tracking-widest text-brand-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
                </div>
                <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-[3px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-700 ease-out-expo group-hover/tilt:scale-x-100" />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
