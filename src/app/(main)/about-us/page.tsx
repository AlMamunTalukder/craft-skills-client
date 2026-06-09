import { getSiteData } from "@/lib/api";
import AboutUs from "@/src/components/AboutUs";
import Header from "@/src/components/shared/Header";

export default async function page() {
  const siteData = await getSiteData();
  return (
    <div>
      <Header siteData={siteData} />
      <AboutUs />
    </div>
  );
}
