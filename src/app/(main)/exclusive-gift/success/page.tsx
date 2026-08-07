"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Download,
  Gift,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ── কালেকটিভ গিফটের Google Drive লিংক (active batch থেকে ডায়নামিক) ──
const FALLBACK_GIFT_DRIVE_LINK =
  "https://drive.google.com/file/d/REPLACE_ME_GIFT/view";
// ── সের্টিফিকেটের Google Drive লিংক ──
// নোট: certificate download system পরে তৈরি হবে; এখন এই বাটনও Google Drive লিংক খুলবে।
const CERTIFICATE_DRIVE_LINK =
  "https://drive.google.com/file/d/REPLACE_ME_CERT/view";

function SuccessContent() {
  const [opening, setOpening] = useState<string | null>(null);
  const [giftLink, setGiftLink] = useState(FALLBACK_GIFT_DRIVE_LINK);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/exclusive-batches/active`)
      .then((res) => res.json())
      .then((result) => {
        if (!cancelled && result?.success && result?.data?.giftDriveLink) {
          setGiftLink(result.data.giftDriveLink);
        }
      })
      .catch(() => {
        /* কেবল fallback link থাকবে */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openDrive = useCallback((url: string, key: string) => {
    setOpening(key);
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      alert("Unable to open the link. পপ-আপ ব্লকার নয় কিনা দেখুন।");
    }
    setTimeout(() => setOpening(null), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7F2] py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          {/* Header */}
          <div className="relative bg-linear-to-r from-[#F26422] to-[#d94f1d] p-8 text-center">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-400 rounded-full opacity-20"></div>

            <div className="relative">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-12 h-12 text-[#F26422]" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                সফল হয়েছে!
              </h1>
              <p className="text-orange-100">
                অভিনন্দন{name ? `, ${name}` : ""}, এখন আপনার সের্টিফিকেট ও
                এক্সক্লুসিভ গিফট ডাউনলোড করুন
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Certificate Download */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-sky-600 p-2.5 rounded-xl text-white">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sky-900">সের্টিফিকেট</h3>
                  <p className="text-xs text-sky-700">
                    আপনার সের্টিফিকেট ডাউনলোড করুন
                  </p>
                </div>
              </div>
              <button
                onClick={() => openDrive(CERTIFICATE_DRIVE_LINK, "cert")}
                className="w-full py-3.5 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-60"
              >
                <Download className="w-5 h-5" />
                সের্টিফিকেট ডাউনলোড করুন
              </button>
            </div>

            {/* Exclusive Gift */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-[#F26422] to-amber-500 p-2.5 rounded-xl text-white shadow-md">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900">
                    এক্সক্লুসিভ গিফট
                  </h3>
                  <p className="text-xs text-orange-700">
                    গ্রুপ থেকে আপনার বিশেষ গিফটটি নিয়ে নিন
                  </p>
                </div>
              </div>
              <button
                onClick={() => openDrive(giftLink, "gift")}
                disabled={opening === "gift"}
                className="w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F26422] to-[#ff7b42] hover:from-[#e25a1c] hover:to-[#f26a2e] text-white font-black rounded-xl shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-60"
              >
                {opening === "gift" ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Download className="w-5 h-5" />
                )}
                এক্সক্লুসিভ গিফট ডাউনলোড করুন
              </button>
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h4 className="text-center font-bold text-gray-800 mb-4">
                <span className="w-8 h-0.5 bg-orange-200"></span>
                ভর্তি সংক্রান্ত যেকোনো প্রয়োজনে
                <span className="w-8 h-0.5 bg-orange-200"></span>
              </h4>
              <div className="flex gap-2 justify-center space-y-3 md:space-y-0">
                <a
                  href="https://wa.me/8801700999093"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-all"
                >
                  <div className="bg-[#25D366] p-2.5 rounded-lg text-white">
                    <FaWhatsapp className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">
                      হোয়াটসঅ্যাপ
                    </p>
                    <p className="font-bold text-gray-800">01700999093</p>
                  </div>
                </a>
                <a
                  href="tel:01310726000"
                  className="flex items-center p-3 bg-orange-50 border border-orange-100 rounded-xl hover:bg-orange-100 transition-all"
                >
                  <div className="bg-[#F26422] p-2.5 rounded-lg text-white">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">
                      সরাসরি কল করুন
                    </p>
                    <p className="font-bold text-gray-800">01310726000</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Home */}
            <Link
              href="/"
              className="w-full py-4 bg-linear-to-r from-[#F26422] to-[#d94f1d] hover:from-[#e25a1c] hover:to-[#c7440f] text-white font-bold text-center rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              হোমপেজে ফিরে যান
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t border-orange-100 p-4 flex justify-between items-center">
            <p className="text-gray-500 text-sm">ধন্যবাদ</p>
            <div className="flex space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#F26422]"></div>
              <div className="w-2 h-2 rounded-full bg-amber-300"></div>
              <div className="w-2 h-2 rounded-full bg-orange-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExclusiveGiftSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
