import Link from "next/link";
import { getActiveSeminar, getSiteData } from "@/src/lib/api";
import Header from "@/src/components/shared/Header";
import { currentUser } from "@/src/lib/currentUser";
import SeminarPDFDownloadForm from "@/src/components/Forms/SeminarConfirmationForm";

export const dynamic = "force-dynamic";

export default async function SeminarConfirmationPage() {
  const [siteData, user, seminar] = await Promise.all([
    getSiteData(),
    currentUser(),
    getActiveSeminar(),
  ]);

  return (
    <>
      <Header user={user} siteData={siteData} />
      <div className="min-h-screen">
        {seminar ? (
          <SeminarPDFDownloadForm seminar={seminar} />
        ) : (
          <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  সেমিনার PDF ডাউনলোড
                </h2>
                <p className="text-gray-600 mb-6">
                  বর্তমানে কোনো সক্রিয় সেমিনার নেই। পরবর্তী সেমিনারের জন্য
                  অপেক্ষা করুন।
                </p>
                <Link
                  href="/"
                  className="text-[#4f0187] hover:underline font-medium"
                >
                  হোমপেজে ফিরে যান
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
