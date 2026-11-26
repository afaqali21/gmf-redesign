import { metadataFromSeo } from "@/lib/seo";
import { LegalPage } from "@/components/templates/LegalPage";
import { cookiePolicyPage } from "@/content/legal/cookie-policy-uk";

export const metadata = metadataFromSeo(cookiePolicyPage.seo);

export default function Page() {
  return <LegalPage page={cookiePolicyPage} />;
}
