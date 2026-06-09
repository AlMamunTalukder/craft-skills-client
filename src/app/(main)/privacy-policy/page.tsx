import PrivacyPolicy from "@/src/components/PrivacyPolicy";
import Header from "@/src/components/shared/Header";
import { getSiteData } from "@/lib/api";

export default async function page() {
  const siteData = await getSiteData();
  return (
    <div>
      <Header siteData={siteData} />
      <PrivacyPolicy />
    </div>
  );
}
