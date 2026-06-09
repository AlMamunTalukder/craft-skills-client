import RefundPolicy from "@/src/components/RefundPolicy";
import Header from "@/src/components/shared/Header";
import { getSiteData } from "@/lib/api";

export default async function page() {
  const siteData = await getSiteData();
  return (
    <div>
      <Header siteData={siteData} />
      <RefundPolicy />
    </div>
  );
}
