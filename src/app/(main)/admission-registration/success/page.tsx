// app/admission-registration/success/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, PhoneCall } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getActiveBatch, getCourseById } from "@/lib/api";
import AdmissionSuccessTracker from "../AdmissionSuccessTracker";


interface PageProps {
  searchParams: Promise<{
    name?: string;
    amount?: string;
    courseId?: string;
    phone?: string;
    email?: string;
  }>;
}

export default async function AdmissionSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { name, amount, courseId, phone, email } = params;

  // Fetch data on the server
  const [batch, course] = await Promise.all([
    getActiveBatch(),
    courseId ? getCourseById(courseId) : null,
  ]);

  if (!batch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No active batch found</p>
        </div>
      </div>
    );
  }

  const socialLinks = [
    {
      name: "Facebook সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookF className="h-5 w-5 text-[#1877F2]" />,
      url: batch.facebookSecretGroup || "#",
    },
    {
      name: "Messenger সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookMessenger className="h-5 w-5 text-[#1877F2]" />,
      url: batch.messengerSecretGroup || "#",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="relative bg-linear-to-r from-[#3C016F] to-purple-800">
            <div className="absolute inset-0 bg-[url('/api/placeholder/800/300')] opacity-10 bg-cover bg-center"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>

            <div className="relative p-8 text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-12 h-12 text-[#3C016F]" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                ভর্তি নিশ্চিত হয়েছে!
              </h1>
              {name && (
                <p className="text-xl font-medium text-purple-200 mb-1">
                  অভিনন্দন, {decodeURIComponent(name)}
                </p>
              )}
              <p className="text-purple-100">
                আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* User Info Summary */}
            {(phone || email) && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">আপনার তথ্য:</h4>
                {name && <p className="text-sm text-gray-600">নাম: {decodeURIComponent(name)}</p>}
                {phone && <p className="text-sm text-gray-600">মোবাইল: {phone}</p>}
                {email && <p className="text-sm text-gray-600">ইমেইল: {email}</p>}
              </div>
            )}

            {/* Group Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">
                আমাদের গ্রুপগুলোতে যুক্ত হয়ে নিন
              </h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-gray-100 mr-3">
                        {link.icon}
                      </div>
                      <span className="font-medium text-gray-700 hover:text-purple-600">
                        {link.name}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 opacity-50"></div>

              <h4 className="font-bold text-gray-800 mb-5 text-lg flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-purple-200"></span>
                কোন সাহায্য প্রয়োজন?
                <span className="w-8 h-0.5 bg-purple-200"></span>
              </h4>

              <div className="space-y-4 relative">
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 justify-start border-purple-100 hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group"
                  asChild
                >
                  <Link href="tel:01700999093" className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors">
                      <PhoneCall className="h-5 w-5 text-purple-600 group-hover:text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        সরাসরি কল করুন
                      </span>
                      <span className="text-gray-800 font-bold">
                        01700999093
                      </span>
                    </div>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-auto py-3 justify-start border-green-100 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  asChild
                >
                  <Link
                    href="https://wa.me/8801700999093"
                    target="_blank"
                    className="flex items-center"
                  >
                    <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover:bg-[#25D366] transition-colors">
                      <FaWhatsapp className="h-5 w-5 text-[#25D366] group-hover:text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        হোয়াটসঅ্যাপ ম্যাসেজ
                      </span>
                      <span className="text-gray-800 font-bold">
                        01700999093
                      </span>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back to Home */}
            <Link href="/">
              <Button className="w-full py-6 text-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                হোমপেজে ফিরে যান
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>

          <div className="border-t border-gray-100 p-4 flex justify-between items-center text-sm">
            <p className="text-gray-500">ধন্যবাদ</p>
            <div className="flex space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#3C016F]"></div>
              <div className="w-2 h-2 rounded-full bg-purple-300"></div>
              <div className="w-2 h-2 rounded-full bg-purple-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Client component for GTM tracking */}
      <Suspense fallback={null}>
        <AdmissionSuccessTracker
          batch={batch}
          course={course}
          amount={amount}
          name={name}
          phone={phone}
          email={email}
        />
      </Suspense>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { CheckCircle, ArrowRight, PhoneCall } from "lucide-react";
// import { FaFacebookF, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

// import { Button } from "@/components/ui/button";
// import { Batch, Course } from "@/types";
// import { pushEvent } from "@/src/utils/dataLayer";

// export default function AdmissionSuccessPage() {
//   const searchParams = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [batch, setBatch] = useState<Batch | null>(null);
//   const [course, setCourse] = useState<Course | null>(null);

//   const participantName = searchParams.get("name");
//   const amount = searchParams.get("amount");
//   const courseId = searchParams.get("courseId");
//   const phone = searchParams.get("phone");
//   const email = searchParams.get("email");
//   // ❌ NO address field in admission form

//   // ✅ FETCH DATA
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [batchResponse, courseResponse] = await Promise.all([
//           fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/course-batches/active`),
//           courseId ? fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/courses/${courseId}`) : Promise.resolve(null)
//         ]);
        
//         const batchResult = await batchResponse.json();
//         if (batchResult.success) setBatch(batchResult.data);
        
//         if (courseResponse && courseResponse.ok) {
//           const courseResult = await courseResponse.json();
//           if (courseResult.success) setCourse(courseResult.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   // 🔥 FIRE PURCHASE EVENT (ONLY ONCE - REAL CONVERSION)
//   useEffect(() => {
//     if (!batch || loading) return;

//     const alreadyTracked = sessionStorage.getItem(`purchase_admission_${batch.id}`);
    
//     if (!alreadyTracked && amount && parseFloat(amount) > 0) {
//       // GA4 Purchase Event with User Information
//       pushEvent('purchase', {
//         ecommerce: {
//           transaction_id: `ADM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//           value: parseFloat(amount),
//           currency: 'BDT',
//           tax: 0,
//           shipping: 0,
//           affiliation: 'Craft Skills',
//           coupon: searchParams.get("coupon") || '',
//           items: [{
//             item_id: course?.id || batch.id,
//             item_name: course?.name || batch.name,
//             item_category: 'admission',
//             price: parseFloat(amount),
//             quantity: 1,
//             item_brand: 'Craft Skills',
//             item_variant: batch?.name || '',
//           }],
//         },
//         // User Information for GA4
//         user_id: phone || email,
//         user_phone: phone,
//         user_email: email,
//         user_name: participantName,
//       });
      
//       // Also track as custom event for backup
//       pushEvent("admission_registration_success", {
//         batch_id: batch.id,
//         batch_name: batch.name,
//         course_id: course?.id,
//         course_name: course?.name,
//         amount: parseFloat(amount),
//         transaction_id: `ADM_${Date.now()}`,
//         user_name: participantName,
//         user_phone: phone,
//         user_email: email,
//       });

//       sessionStorage.setItem(`purchase_admission_${batch.id}`, "true");
//     }
//   }, [batch, loading, amount, course, participantName, phone, email]);

//   const socialLinks = [
//     {
//       name: "Facebook সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
//       icon: <FaFacebookF className="h-5 w-5 text-[#1877F2]" />,
//       url: batch?.facebookSecretGroup || "#",
//     },
//     {
//       name: "Messenger সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
//       icon: <FaFacebookMessenger className="h-5 w-5 text-[#1877F2]" />,
//       url: batch?.messengerSecretGroup || "#",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4">
//       <div className="max-w-xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//           <div className="relative bg-linear-to-r from-[#3C016F] to-purple-800">
//             <div className="absolute inset-0 bg-[url('/api/placeholder/800/300')] opacity-10 bg-cover bg-center"></div>
//             <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
//             <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>

//             <div className="relative p-8 text-center">
//               <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <CheckCircle className="w-12 h-12 text-[#3C016F]" />
//               </div>
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 ভর্তি নিশ্চিত হয়েছে!
//               </h1>
//               {participantName && (
//                 <p className="text-xl font-medium text-purple-200 mb-1">
//                   অভিনন্দন, {decodeURIComponent(participantName)}
//                 </p>
//               )}
//               <p className="text-purple-100">
//                 আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে
//               </p>
//             </div>
//           </div>

//           <div className="p-6 md:p-8 space-y-6">
//             {/* User Info Summary */}
//             {(phone || email) && (
//               <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//                 <h4 className="font-semibold text-gray-700 mb-2 text-sm">আপনার তথ্য:</h4>
//                 {participantName && <p className="text-sm text-gray-600">নাম: {decodeURIComponent(participantName)}</p>}
//                 {phone && <p className="text-sm text-gray-600">মোবাইল: {phone}</p>}
//                 {email && <p className="text-sm text-gray-600">ইমেইল: {email}</p>}
//               </div>
//             )}

//             {/* Group Links */}
//             <div className="bg-white border border-gray-200 rounded-xl p-4">
//               <h4 className="font-bold text-gray-800 mb-4 text-lg">
//                 আমাদের গ্রুপগুলোতে যুক্ত হয়ে নিন
//               </h4>
//               <div className="space-y-3">
//                 {socialLinks.map((link, index) => (
//                   <Link
//                     key={index}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all hover:shadow-sm"
//                   >
//                     <div className="flex items-center">
//                       <div className="p-2 rounded-lg bg-gray-100 mr-3">
//                         {link.icon}
//                       </div>
//                       <span className="font-medium text-gray-700 hover:text-purple-600">
//                         {link.name}
//                       </span>
//                     </div>
//                     <ArrowRight className="h-5 w-5 text-gray-400" />
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 opacity-50"></div>

//               <h4 className="font-bold text-gray-800 mb-5 text-lg flex items-center justify-center gap-2">
//                 <span className="w-8 h-0.5 bg-purple-200"></span>
//                 কোন সাহায্য প্রয়োজন?
//                 <span className="w-8 h-0.5 bg-purple-200"></span>
//               </h4>

//               <div className="space-y-4 relative">
//                 <Button
//                   variant="outline"
//                   className="w-full h-auto py-3 justify-start border-purple-100 hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group"
//                   asChild
//                 >
//                   <Link href="tel:01700999093" className="flex items-center">
//                     <div className="bg-purple-100 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors">
//                       <PhoneCall className="h-5 w-5 text-purple-600 group-hover:text-white" />
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
//                         সরাসরি কল করুন
//                       </span>
//                       <span className="text-gray-800 font-bold">
//                         01700999093
//                       </span>
//                     </div>
//                   </Link>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="w-full h-auto py-3 justify-start border-green-100 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
//                   asChild
//                 >
//                   <Link
//                     href="https://wa.me/8801700999093"
//                     target="_blank"
//                     className="flex items-center"
//                   >
//                     <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover:bg-[#25D366] transition-colors">
//                       <FaWhatsapp className="h-5 w-5 text-[#25D366] group-hover:text-white" />
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
//                         হোয়াটসঅ্যাপ ম্যাসেজ
//                       </span>
//                       <span className="text-gray-800 font-bold">
//                         01700999093
//                       </span>
//                     </div>
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             {/* Back to Home */}
//             <Link href="/">
//               <Button className="w-full py-6 text-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
//                 হোমপেজে ফিরে যান
//                 <ArrowRight className="ml-3 h-6 w-6" />
//               </Button>
//             </Link>
//           </div>

//           <div className="border-t border-gray-100 p-4 flex justify-between items-center text-sm">
//             <p className="text-gray-500">ধন্যবাদ</p>
//             <div className="flex space-x-3">
//               <div className="w-2 h-2 rounded-full bg-[#3C016F]"></div>
//               <div className="w-2 h-2 rounded-full bg-purple-300"></div>
//               <div className="w-2 h-2 rounded-full bg-purple-100"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }