import { getSiteData } from "@/lib/api";
import { currentUser } from "@/lib/currentUser"; 
import FbReview from "@/src/components/home/FbReview";


export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  // 1. Fetch the data on the Server
  const [user, siteData] = await Promise.all([
    currentUser(),
    getSiteData(),
  ]);

  // 2. Pass the data to the Client Component
  return (
    <FbReview user={user} siteData={siteData} />
  );
}