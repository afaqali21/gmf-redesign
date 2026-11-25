import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light" | "outline" | "light";
type Size = "md" | "lg";

// Shared: press feedback, a light sweep across the button on hover, trailing arrow nudges right.
const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-out-expo active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/2 before:-translate-x-[120%] before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent hover:before:animate-shine " +
  "[&>svg:last-child]:transition-transform [&>svg:last-child]:duration-300 hover:[&>svg:last-child]:translate-x-1";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white shadow-[0_10px_30px_-10px_rgb(215_13_67/0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(215_13_67/0.8)] focus-visible:outline-brand-600",
  secondary:
    "bg-ink-950 text-white shadow-[0_10px_30px_-12px_rgb(7_7_10/0.6)] hover:-translate-y-0.5 hover:bg-ink-800 focus-visible:outline-ink-950",
  "ghost-light":
    "bg-white/[0.06] text-white ring-1 ring-inset ring-white/20 backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/[0.12] hover:ring-white/40 focus-visible:outline-white",
  outline:
    "bg-white text-ink-950 ring-1 ring-inset ring-ink-950/10 shadow-sm hover:-translate-y-0.5 hover:text-brand-600 hover:ring-brand-600/40 hover:shadow-md",
  light: "bg-white text-ink-950 shadow-lg shadow-ink-950/20 hover:-translate-y-0.5 hover:text-brand-700",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Link styled as a button. Internal paths use next/link; tel:, mailto: and external URLs use <a>. */
export function ButtonLink({ href, variant = "primary", size = "md", className = "", children, ...rest }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}
