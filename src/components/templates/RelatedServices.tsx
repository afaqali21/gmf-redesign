import Link from "next/link";
import { mainNav, type NavLink } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";

const groups = mainNav.filter((n): n is { label: string; children: NavLink[] } => "children" in n);

/** Service discovery strip: the same groups and links as the main menu, minus the current page. */
export function RelatedServices({ current }: { current: string }) {
  return (
    <nav aria-label="Services" className="border-t border-ink-950/[0.06] bg-surface py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{g.label}</p>
            <Stagger as="ul" className="mt-5 space-y-2" stagger={0.05}>
              {g.children.map((l) => {
                const active = l.href === current;
                return (
                  <StaggerItem as="li" key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center justify-between rounded-2xl px-5 py-3.5 text-[0.95rem] font-medium ring-1 ring-inset transition-all duration-300 ${
                        active
                          ? "bg-ink-950 text-white ring-ink-950"
                          : "bg-white text-ink-950 ring-ink-950/[0.06] hover:-translate-y-0.5 hover:text-brand-700 hover:shadow-[0_18px_40px_-28px_rgb(215_13_67/0.6)] hover:ring-brand-600/30"
                      }`}
                    >
                      {l.label}
                      <ArrowRightIcon className={`size-4 transition-transform duration-300 group-hover:translate-x-1 ${active ? "text-brand-400" : "text-ink-500"}`} />
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        ))}
      </div>
    </nav>
  );
}
