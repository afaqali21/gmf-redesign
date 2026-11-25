import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "app-design";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="appdesign" />;
}
