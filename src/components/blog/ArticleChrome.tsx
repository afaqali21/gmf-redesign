"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ListIcon } from "@/components/ui/Icons";

/** Thin brand bar under the header that fills as the article is read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800"
    />
  );
}

export type TocItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Table of contents with scroll-spy. Collapsible on small screens, sticky beside the article on desktop. */
export function Toc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);
  const ids = items.flatMap((i) => [i.href, ...(i.children ?? []).map((c) => c.href)]).map((h) => h.slice(1));

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(decodeURIComponent(id))).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  const link = (h: { label: string; href: string }, nested = false) => {
    const on = active === decodeURIComponent(h.href.slice(1));
    return (
      <a
        href={h.href}
        aria-current={on ? "location" : undefined}
        className={`-ml-px block border-l-2 py-1.5 leading-snug transition-colors ${nested ? "pl-7 text-[0.8rem]" : "pl-4"} ${
          on ? "border-brand-600 font-medium text-ink-950" : "border-transparent text-ink-500 hover:border-ink-950/30 hover:text-ink-950"
        }`}
      >
        {h.label}
      </a>
    );
  };

  return (
    <details className="group rounded-3xl bg-surface p-5 ring-1 ring-inset ring-ink-950/[0.05] lg:bg-transparent lg:p-0 lg:ring-0 [&[open]_summary_svg]:text-brand-600" open>
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 lg:pointer-events-none [&::-webkit-details-marker]:hidden">
        <ListIcon className="size-4" /> {title}
      </summary>
      <ol className="mt-4 max-h-[60vh] space-y-0.5 overflow-y-auto border-l border-ink-950/10 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            {link(i)}
            {!!i.children?.length && (
              <ol className="space-y-0.5">
                {i.children.map((c) => (
                  <li key={c.href}>{link(c, true)}</li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}
