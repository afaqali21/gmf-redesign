import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
};

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === "light"
          ? "bg-white/[0.06] text-brand-300 ring-1 ring-inset ring-white/10"
          : "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/10"
      }`}
    >
      <span aria-hidden="true" className="relative flex size-1.5">
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand-500" />
        <span className="relative size-1.5 rounded-full bg-brand-500" />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, children, align = "center", tone = "dark", id }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl ${tone === "light" ? "text-white" : "text-ink-950"}`}
      >
        {title}
      </h2>
      {children && (
        <div className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-white/65" : "text-ink-500"}`}>
          {children}
        </div>
      )}
    </Reveal>
  );
}
