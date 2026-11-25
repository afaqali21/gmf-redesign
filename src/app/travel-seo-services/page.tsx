import { pageMetadata } from "@/components/templates/ServicePage";
import { IndustryPage } from "@/components/templates/IndustryPage";

const SLUG = "travel-seo-services";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <IndustryPage slug={SLUG} visual="travel" />;
}
