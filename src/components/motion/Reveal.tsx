"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type Direction = "up" | "left" | "right" | "scale";

const offset = (dir: Direction, distance: number) =>
  dir === "up" ? { y: distance } : dir === "left" ? { x: -distance } : dir === "right" ? { x: distance } : { scale: 0.94 };

// Every animated element carries data-reveal; globals.css forces these visible and static
// for prefers-reduced-motion (the server HTML already holds the hidden start state).

/** Fades and slides its children in once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  return (
    <m.div
      className={className}
      data-reveal
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type GroupTag = "ul" | "ol" | "div" | "dl";
const groupTags = { ul: m.ul, ol: m.ol, div: m.div, dl: m.dl };

/** Container that staggers the entrance of its <StaggerItem> children. */
export function Stagger({
  as = "div",
  children,
  className,
  stagger = 0.09,
  delay = 0,
  ...rest
}: {
  as?: GroupTag;
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const Tag = groupTags[as];
  return (
    <Tag
      data-reveal
      className={className}
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const itemTags = { li: m.li, div: m.div };

export function StaggerItem({
  as = "div",
  children,
  className,
}: {
  as?: "li" | "div";
  children: ReactNode;
  className?: string;
}) {
  const Tag = itemTags[as];
  return (
    <Tag data-reveal className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}
