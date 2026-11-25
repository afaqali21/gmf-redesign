"use client";

import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

/**
 * 3D tilt + cursor spotlight on fine pointers. Touch devices and reduced-motion
 * users get a static card (the children render identically).
 */
export function TiltCard({
  children,
  className = "",
  max = 7,
  glow = "rgb(215 13 67 / 0.14)",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, ${glow}, transparent 65%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="h-full [perspective:1100px]">
      <m.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group/tilt relative h-full ${className}`}
      >
        <m.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
        {children}
      </m.div>
    </div>
  );
}
