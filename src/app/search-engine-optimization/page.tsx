import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "search-engine-optimization";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="seo" />;
}
