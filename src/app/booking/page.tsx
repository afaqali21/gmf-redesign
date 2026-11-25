import { getBlockPage, toSections } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { Visual } from "@/components/page/Visuals";
import { QuoteForm } from "@/components/forms/Forms";
import { Reveal } from "@/components/motion/Reveal";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { displayCase } from "@/components/templates/SectionViews";

const page = getBlockPage("booking");
export const metadata = metadataFromSeo(page.seo);

// The form's own intro line, as on WordPress.
const FORM_TITLE = "Get Quote To Grow Your Business";

export default function BookingPage() {
  const { h1 } = toSections(page.blocks);
  const title = displayCase(h1 ?? "Get Quote");
  const quick = [
    { icon: <PhoneIcon className="size-5" />, label: "Call us", value: site.phone.display, href: site.phone.tel },
    { icon: <WhatsAppIcon className="size-5" />, label: "WhatsApp", value: site.phone.display, href: site.phone.whatsapp, external: true },
    { icon: <MailIcon className="size-5" />, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero title={title} size="md" crumbs={[{ label: "Home", href: "/" }, { label: title }]} visual={<Visual kind="quote" />} />

      <section className="relative bg-surface pb-24 sm:pb-32">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <Reveal className="-mt-16 lg:col-span-8">
            <div className="relative rounded-[2.25rem] bg-white p-7 shadow-[0_50px_100px_-50px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/[0.06] sm:p-12">
              <QuoteForm title={FORM_TITLE} />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:pt-10" delay={0.15}>
            <ul className="space-y-3">
              {quick.map((q) => (
                <li key={q.label}>
                  <a
                    href={q.href}
                    {...(q.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-ink-950/[0.06] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(215_13_67/0.5)]"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white transition-transform duration-500 group-hover:-rotate-6">
                      {q.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-widest text-ink-500">{q.label}</span>
                      <span className="block truncate font-semibold text-ink-950">{q.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
