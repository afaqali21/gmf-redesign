import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "google-ads";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="ads" />;
}
