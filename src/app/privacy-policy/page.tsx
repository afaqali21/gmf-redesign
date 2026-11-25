import { getHtmlPage } from "@/lib/content";
import { metadataFromSeo } from "@/lib/seo";
import { LegalPage } from "@/components/templates/LegalPage";

const SLUG = "privacy-policy";

export const metadata = metadataFromSeo(getHtmlPage(SLUG).seo);

export default function Page() {
  return <LegalPage slug={SLUG} />;
}
