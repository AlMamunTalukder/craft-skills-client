import Link from "next/link";
import { getSiteData } from "@/lib/api";
import Header from "@/src/components/shared/Header";
import { currentUser } from "@/lib/currentUser";
import SeminarPDFDownloadForm from "@/src/components/Forms/SeminarConfirmationForm";

export const dynamic = "force-dynamic";

async function getPdfSeminar() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  try {
    const res = await fetch(`${API_URL}/seminars/pdf-seminar`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export default async function SeminarConfirmationPage() {
  const [siteData, user, pdfSeminar] = await Promise.all([
    getSiteData(),
    currentUser(),
    getPdfSeminar(),
  ]);

  const showPdfMenu = siteData?.showPdfMenu ?? true;

  if (!showPdfMenu) {
    return (
      <>
        <Header siteData={siteData} />
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                PDF ডাউনলোড বন্ধ আছে
              </h2>
              <p className="text-gray-600 mb-6">
                বর্তমানে PDF ডাউনলোড সুবিধা বন্ধ রয়েছে। পরে আবার চেষ্টা করুন।
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
      </>
    );
  }

  if (!pdfSeminar) {
    return (
      <>
        <Header siteData={siteData} />
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                কোনো সেমিনার পাওয়া যায়নি
              </h2>
              <p className="text-gray-600 mb-6">
                দয়া করে পরে আবার চেষ্টা করুন।
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
      </>
    );
  }

  return (
    <>
      <Header siteData={siteData} />
      <div className="min-h-screen">
        <SeminarPDFDownloadForm seminar={pdfSeminar} />
      </div>
    </>
  );
}
