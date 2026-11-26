import { getBlockPage, toSections } from "@/lib/content";
import { metadataFromSeo, SchemaGraph } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/forms/Forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ConsentMap } from "@/components/consent/ConsentMap";

const page = getBlockPage("contact");
export const metadata = metadataFromSeo(page.seo);

// The WordPress contact page still showed the former City Road office. The current address supplied
// by GMF (site.address, also used in the footer and Organization schema) is used here and on the map.
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${site.address.street}, ${site.address.locality} ${site.address.postcode}`)}&output=embed`;

export default function ContactPage() {
  const { h1, sections } = toSections(page.blocks);
  const title = h1 ?? "Contact";
  // "Get in Touch." intro, the four contact details (h3 labels) and "Ask a question".
  const intro = sections.find((s) => s.heading?.level === 2);
  const ask = sections.find((s) => /ask a question/i.test(s.heading?.text ?? ""));
  const labels = sections.filter((s) => s.heading?.level === 3 && s !== ask).map((s) => s.heading!.text);
  const details = [
    { label: labels[0] ?? "Phone:", value: site.phone.display, href: site.phone.tel, icon: <PhoneIcon className="size-5" /> },
    { label: labels[1] ?? "WhatsApp:", value: site.phone.display, href: site.phone.whatsapp, icon: <WhatsAppIcon className="size-5" />, external: true },
    { label: labels[2] ?? "Email:", value: site.email, href: `mailto:${site.email}`, icon: <MailIcon className="size-5" /> },
    { label: labels[3] ?? "Address:", value: site.address.display, icon: <MapPinIcon className="size-5" /> },
  ];

  return (
    <>
      <SchemaGraph graph={page.seo.schema} />
      <PageHero
        title={title}
        size="md"
        align="center"
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
        intro={
          intro && (
            <>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">{intro.heading?.text}</h2>
              <p className="mt-3">{intro.paras[0]}</p>
            </>
          )
        }
      />

      <section className="relative bg-surface pb-24 sm:pb-32">
        <div className="container-page">
          <Stagger as="ul" className="-mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {details.map((d) => {
              const body = (
                <>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_25px_-8px_rgb(215_13_67/0.8)] transition-transform duration-500 group-hover/tilt:-rotate-6">
                    {d.icon}
                  </span>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">{d.label}</h3>
                  <p className="mt-1.5 break-words font-semibold text-ink-950">{d.value}</p>
                </>
              );
              return (
                <StaggerItem as="li" key={d.label} className="h-full">
                  <TiltCard max={6} className="h-full rounded-[1.75rem] bg-white ring-1 ring-ink-950/[0.06] shadow-[0_30px_60px_-40px_rgb(7_7_10/0.45)]">
                    {d.href ? (
                      <a href={d.href} {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="relative block h-full p-6">
                        {body}
                      </a>
                    ) : (
                      <div className="relative h-full p-6">{body}</div>
                    )}
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="rounded-[2.25rem] bg-white p-7 shadow-[0_50px_100px_-50px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/[0.06] sm:p-11">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{ask?.heading?.text ?? "Ask a question"}</h3>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.12}>
              <div className="relative h-full min-h-96 overflow-hidden rounded-[2.25rem] bg-ink-950 shadow-[0_50px_100px_-50px_rgb(7_7_10/0.45)] ring-1 ring-ink-950/[0.06]">
                {/* Google Maps sets cookies, so it loads only after cookie consent. */}
                <ConsentMap
                  title={`Map showing ${site.address.display}`}
                  src={mapSrc}
                  address={site.address.display}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
