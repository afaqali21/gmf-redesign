import type { Metadata } from "next";
import { homeSeo } from "@/content/home";
import { site } from "@/content/site";
import { absoluteUrl, buildMetadata, jsonLd, ModifiedTimeMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Trusted } from "@/components/sections/Trusted";
import { Services } from "@/components/sections/Services";
import { Commitments } from "@/components/sections/Commitments";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Competitive } from "@/components/sections/Competitive";
import { Specialities } from "@/components/sections/Specialities";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  path: homeSeo.path,
  title: homeSeo.title,
  description: homeSeo.description,
  ogImage: homeSeo.ogImage,
});

// Yoast's graph (WebPage, ImageObject, BreadcrumbList, WebSite) plus Organization.
const home = absoluteUrl("/");
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": home,
      url: home,
      name: homeSeo.title,
      isPartOf: { "@id": `${home}#website` },
      about: { "@id": `${home}#organization` },
      primaryImageOfPage: { "@id": `${home}#primaryimage` },
      image: { "@id": `${home}#primaryimage` },
      thumbnailUrl: absoluteUrl(homeSeo.ogImage.url),
      datePublished: homeSeo.datePublished,
      dateModified: homeSeo.dateModified,
      description: homeSeo.description,
      breadcrumb: { "@id": `${home}#breadcrumb` },
      inLanguage: "en-US",
      potentialAction: [{ "@type": "ReadAction", target: [home] }],
    },
    {
      "@type": "ImageObject",
      inLanguage: "en-US",
      "@id": `${home}#primaryimage`,
      url: absoluteUrl(homeSeo.ogImage.url),
      contentUrl: absoluteUrl(homeSeo.ogImage.url),
      width: homeSeo.ogImage.width,
      height: homeSeo.ogImage.height,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${home}#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home" }],
    },
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      url: home,
      name: site.name,
      description: site.tagline,
      publisher: { "@id": `${home}#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${home}#organization`,
      name: site.name,
      url: home,
      logo: absoluteUrl("/images/brand/gmf-logo.png"),
      email: site.email,
      telephone: "+44 20 7183 1099",
      address: { "@type": "PostalAddress", addressCountry: "GB" },
      sameAs: site.social.map((s) => s.href),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <ModifiedTimeMeta value={homeSeo.dateModified} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Hero />
      <ClientLogos />
      <Trusted />
      <Services />
      <Commitments />
      <Industries />
      <Process />
      <Competitive />
      <Specialities />
      <Testimonials />
      <LatestPosts />
      <FinalCta />
    </>
  );
}
