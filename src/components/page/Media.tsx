"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Subtle vertical drift while the image scrolls through the viewport. */
  parallax?: boolean;
  rounded?: string;
};

/** Image that unveils with a clip-path wipe when scrolled into view, then drifts slightly (parallax). */
export function RevealImage({ src, alt, width, height, sizes, className = "", priority, parallax = true, rounded = "rounded-[2rem]" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <m.div
      ref={ref}
      data-reveal
      initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className={`relative overflow-hidden ${rounded} bg-surface shadow-[0_40px_80px_-40px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/[0.06] ${className}`}
    >
      <m.div style={parallax && !reduce ? { y, scale: 1.1 } : undefined} className="h-full w-full">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="h-full w-full object-cover" />
      </m.div>
    </m.div>
  );
}
