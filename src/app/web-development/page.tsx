import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "web-development";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="web" />;
}
