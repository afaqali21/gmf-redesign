import { pageMetadata } from "@/components/templates/ServicePage";
import { IndustryPage } from "@/components/templates/IndustryPage";

const SLUG = "law-firm-seo";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <IndustryPage slug={SLUG} visual="law" />;
}
