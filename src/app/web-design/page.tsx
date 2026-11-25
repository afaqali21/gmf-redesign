import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "web-design";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="webdesign" promote={["What we do"]} />;
}
