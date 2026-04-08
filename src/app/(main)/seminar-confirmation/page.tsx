/* eslint-disable @typescript-eslint/no-explicit-any */
// app/seminar-confirmation/page.tsx
import Link from "next/link";
import { getSiteData } from "@/lib/api";
import Header from "@/src/components/shared/Header";
import { currentUser } from "@/lib/currentUser";
import SeminarPDFDownloadForm from "@/src/components/Forms/SeminarConfirmationForm";

export const dynamic = "force-dynamic";

async function fetchSeminar(endpoint: string): Promise<any | null> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        return null;
    }
    const url = `${API_URL}${endpoint}`;
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        const json = await res.json();
        return json?.data || null;
    } catch (err) {
        console.error(`Fetch error for ${endpoint}:`, err);
        return null;
    }
}

async function getPdfSeminar() {
    // First try to get the latest batch (by sl)
    let seminar = await fetchSeminar("/seminars/pdf-seminar");
    if (seminar) return seminar;
    
    // Fallback to the active seminar (the one with the countdown)
    seminar = await fetchSeminar("/seminars/active");
    if (seminar) return seminar;
    
    // Last resort: get any seminar (e.g., first one)
    const all = await fetchSeminar("/seminars");
    if (all && Array.isArray(all) && all.length > 0) return all[0];
    
    return null;
}

export default async function SeminarConfirmationPage() {
    const [siteData, pdfSeminar] = await Promise.all([
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">PDF ডাউনলোড বন্ধ আছে</h2>
                            <p className="text-gray-600 mb-6">বর্তমানে PDF ডাউনলোড সুবিধা বন্ধ রয়েছে। পরে আবার চেষ্টা করুন।</p>
                            <Link href="/" className="text-[#4f0187] hover:underline font-medium">হোমপেজে ফিরে যান</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!pdfSeminar) {
        // Log the failure for debugging
        console.error("No seminar found after trying all endpoints");
        return (
            <>
                <Header siteData={siteData} />
                <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">কোনো সেমিনার পাওয়া যায়নি</h2>
                            <p className="text-gray-600 mb-6">দয়া করে পরে আবার চেষ্টা করুন।</p>
                            <Link href="/" className="text-[#4f0187] hover:underline font-medium">হোমপেজে ফিরে যান</Link>
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