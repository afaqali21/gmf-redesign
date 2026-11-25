import { pageMetadata, ServicePage } from "@/components/templates/ServicePage";

const SLUG = "email-marketing";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} visual="email" />;
}
