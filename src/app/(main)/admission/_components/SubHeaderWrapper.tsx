// app/admission/_components/SubHeaderWrapper.tsx
import SubHeaderAdmission from "@/src/components/shared/SubHeaderAdmission";
import { getActiveBatch, getSiteData } from "@/lib/api";

export default async function SubHeaderWrapper() {
  const [batch, siteData] = await Promise.all([
    getActiveBatch(),
    getSiteData(),
  ]);

  return <SubHeaderAdmission batch={batch} siteData={siteData || {}} />;
}