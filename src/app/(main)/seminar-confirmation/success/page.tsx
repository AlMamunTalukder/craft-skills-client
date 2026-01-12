// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { CheckCircle, Download, ArrowRight, PhoneCall } from "lucide-react";

// export const dynamic = "force-dynamic";

// export default function SeminarPDFSuccessPage() {
//   const searchParams = useSearchParams();
//   const [isDownloading, setIsDownloading] = useState(false);

//   const participantName = searchParams.get("name");
//   const seminarTitle = searchParams.get("seminar");

//   const pdfDownloadLink =
//     "https://drive.google.com/file/d/1_15yE0kN3j3RIShS7_DlH5S7IdCRbqeM/view";

//   const handleDownload = () => {
//     setIsDownloading(true);

//     window.open(pdfDownloadLink, "_blank");
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4">
//       <div className="max-w-md mx-auto">
//         {/* Success Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//           {/* Header */}
//           <div className="relative bg-linear-to-r from-[#4f0187] to-purple-800 p-8 text-center">
//             {/* Decorative circles */}
//             <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
//             <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>

//             <div className="relative">
//               <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <CheckCircle className="w-12 h-12 text-[#4f0187]" />
//               </div>
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 সফল হয়েছে!
//               </h1>
//               {participantName && (
//                 <p className="text-xl font-medium text-purple-200 mb-1">
//                   অভিনন্দন, {decodeURIComponent(participantName)}
//                 </p>
//               )}
//               <p className="text-purple-100">এখন PDF ফাইল ডাউনলোড করুন</p>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-6">
//             {/* Download Button Section */}
//             <div className="text-center">
//               <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 mb-4">
//                 <h3 className="font-bold text-green-800 mb-2 text-lg">
//                   {seminarTitle ? decodeURIComponent(seminarTitle) : "সেমিনার"}{" "}
//                   PDF
//                 </h3>
//                 <p className="text-gray-600 mb-4 text-sm">
//                   নিচের বাটনে ক্লিক করে PDF ফাইল ডাউনলোড করুন
//                 </p>

//                 <button
//                   onClick={handleDownload}
//                   disabled={isDownloading}
//                   className="w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isDownloading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       ডাউনলোড হচ্ছে...
//                     </>
//                   ) : (
//                     <>
//                       <Download className="w-5 h-5" />
//                       PDF ডাউনলোড করুন
//                     </>
//                   )}
//                 </button>

//                 <p className="text-xs text-gray-500 mt-3">
//                   ফাইল সাইজ: ~5MB • ফরম্যাট: PDF
//                 </p>
//               </div>

//               <p className="text-gray-600 text-sm">
//                 PDF ফাইলটি Google Drive থেকে ডাউনলোড হবে
//               </p>
//             </div>

//             {/* Contact Info */}
//             <div className="border border-gray-200 rounded-xl p-6">
//               <h4 className="font-bold text-gray-800 mb-4 text-center">
//                 কোন সাহায্য প্রয়োজন?
//               </h4>
//               <div className="space-y-3">
//                 <a
//                   href="tel:01310726000"
//                   className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
//                   <span>01310726000</span>
//                 </a>
//                 <a
//                   href="tel:01700999093"
//                   className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
//                   <span>01700999093</span>
//                 </a>
//               </div>
//             </div>

//             {/* Back to Home */}
//             <Link
//               href="/"
//               className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               হোমপেজে ফিরে যান
//               <ArrowRight className="w-5 h-5" />
//             </Link>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-gray-100 p-4 flex justify-between items-center">
//             <p className="text-gray-500 text-sm">ধন্যবাদ</p>
//             <div className="flex space-x-3">
//               <div className="w-2 h-2 rounded-full bg-[#4f0187]"></div>
//               <div className="w-2 h-2 rounded-full bg-purple-300"></div>
//               <div className="w-2 h-2 rounded-full bg-purple-100"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, PhoneCall } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SeminarPDFSuccessPage() {
  // const searchParams = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);

  // const participantName = searchParams.get("name") || "";
  // const seminarTitle = searchParams.get("seminar") || "সেমিনার";

  const pdfDownloadLink =
    "https://drive.google.com/file/d/1_15yE0kN3j3RIShS7_DlH5S7IdCRbqeM/view";

  const handleDownload = () => {
    setIsDownloading(true);
    // Open PDF in new tab safely
    const newWindow = window.open(pdfDownloadLink, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      alert("Unable to open PDF. Please check your popup blocker.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="relative bg-linear-to-r from-[#4f0187] to-purple-800 p-8 text-center">
            {/* Decorative circles */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>

            <div className="relative">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-12 h-12 text-[#4f0187]" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">সফল হয়েছে!</h1>
              {/* {participantName && (
                <p className="text-xl font-medium text-purple-200 mb-1">
                  অভিনন্দন, {decodeURIComponent(participantName)}
                </p>
              )} */}
              <p className="text-purple-100"> অভিনন্দন, এখন PDF ফাইল ডাউনলোড করুন</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Download Button Section */}
            <div className="text-center">
              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 mb-4">
                {/* <h3 className="font-bold text-green-800 mb-2 text-lg">
                  {decodeURIComponent(seminarTitle)} PDF
                </h3> */}
                <p className="text-gray-600 mb-4 text-sm">
                  নিচের বাটনে ক্লিক করে PDF ফাইল ডাউনলোড করুন
                </p>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ডাউনলোড হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      PDF ডাউনলোড করুন
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  ফাইল সাইজ: ~5MB • ফরম্যাট: PDF
                </p>
              </div>

              <p className="text-gray-600 text-sm">
                PDF ফাইলটি Google Drive থেকে ডাউনলোড হবে
              </p>
            </div>

            {/* Contact Info */}
            <div className="border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4 text-center">
                কোন সাহায্য প্রয়োজন?
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:01310726000"
                  className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
                  <span>01310726000</span>
                </a>
                <a
                  href="tel:01700999093"
                  className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
                  <span>01700999093</span>
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <Link
              href="/"
              className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              হোমপেজে ফিরে যান
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 flex justify-between items-center">
            <p className="text-gray-500 text-sm">ধন্যবাদ</p>
            <div className="flex space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#4f0187]"></div>
              <div className="w-2 h-2 rounded-full bg-purple-300"></div>
              <div className="w-2 h-2 rounded-full bg-purple-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
