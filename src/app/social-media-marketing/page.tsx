import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "social-media-marketing";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="social" />;
}
