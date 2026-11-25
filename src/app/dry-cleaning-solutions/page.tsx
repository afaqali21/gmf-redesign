import { pageMetadata } from "@/components/templates/ServicePage";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";

const SLUG = "dry-cleaning-solutions";

export const metadata = pageMetadata(SLUG);

export default function Page() {
  return <CaseStudyPage slug={SLUG} visual="laundry" />;
}
