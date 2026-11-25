import Link from "next/link";
import { mainNav } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export default function NotFound() {
  const links = mainNav.filter((n): n is { label: string; href: string } => "href" in n);
  return (
    <section className="grain relative isolate overflow-hidden bg-ink-950 py-28 text-center text-white sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 animate-blob rounded-full bg-brand-600/25 blur-[130px]" />
      </div>
      <div className="container-page max-w-2xl">
        <p aria-hidden="true" className="text-gradient-brand text-[7rem] font-bold leading-none tracking-tighter sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-white/60">The page you were looking for doesn&rsquo;t exist or may have moved.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home <ArrowRightIcon className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact/" variant="ghost-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/55">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
