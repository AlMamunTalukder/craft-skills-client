import { getActiveExclusiveBatch, getSiteData } from "@/lib/api";
import Header from "@/src/components/shared/Header";
import ExclusiveGiftForm from "@/src/components/Forms/ExclusiveGiftForm";

export const dynamic = "force-dynamic";

export default async function ExclusiveGiftPage() {
  const [siteData, activeBatch] = await Promise.all([
    getSiteData(),
    getActiveExclusiveBatch(),
  ]);

  return (
    <>
      <Header siteData={siteData} />
      <div className="min-h-screen">
        <ExclusiveGiftForm batchId={activeBatch?.id} />
      </div>
    </>
  );
}
