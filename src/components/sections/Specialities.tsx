import Image from "next/image";
import { specialities } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Specialities() {
  return (
    <section aria-labelledby="specialities-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 size-[30rem] rounded-full bg-brand-100/50 blur-[130px]" />
      <div className="container-page relative">
        <SectionHeading id="specialities-title" title={specialities.title}>
          <p>{specialities.text}</p>
        </SectionHeading>

        <Stagger as="ul" className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8" stagger={0.06}>
          {specialities.platforms.map((p) => (
            <StaggerItem as="li" key={p.name}>
              <div className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white px-3 py-7 ring-1 ring-ink-950/[0.06] shadow-[0_16px_40px_-28px_rgb(7_7_10/0.35)] transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_30px_50px_-25px_rgb(7_7_10/0.35)] hover:ring-brand-600/20">
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative flex size-16 items-center justify-center rounded-2xl bg-surface transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
                  <Image src={p.src} alt="" width={150} height={150} className="size-10 object-contain" />
                </span>
                <h3 className="relative text-sm font-medium text-ink-800">{p.name}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-24 grid items-end gap-5 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <h3 className="text-[1.75rem] font-bold leading-tight tracking-[-0.03em] sm:text-4xl">{specialities.impactTitle}</h3>
            </Reveal>
            <Reveal direction="up" delay={0.1} className="mt-8">
              <div className="group overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(7_7_10/0.4)]">
                <Image
                  src={specialities.images[0].src}
                  alt={specialities.images[0].alt}
                  width={specialities.images[0].width}
                  height={specialities.images[0].height}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
          <Reveal direction="scale" delay={0.2} className="md:col-span-7">
            <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgb(7_7_10/0.4)]">
              <Image
                src={specialities.images[1].src}
                alt={specialities.images[1].alt}
                width={specialities.images[1].width}
                height={specialities.images[1].height}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
