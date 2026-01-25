// app/admission/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, PhoneCall } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

import { Button } from "@/components/ui/button";
// import { Batch, SiteContent } from "@/types";
import { Batch } from "@/types";

export default function AdmissionSuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState<Batch | null>(null);
  // const [siteData, setSiteData] = useState<SiteContent | null>(null);

  const participantName = searchParams.get("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active batch
        const batchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/course-batches/active`,
        );
        const batchResult = await batchResponse.json();

        // Fetch site data
        // const siteResponse = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL || ""}/site`,
        // );
        // const siteResult = await siteResponse.json();

        if (batchResult.success) setBatch(batchResult.data);
        // if (siteResult.success) setSiteData(siteResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const socialLinks = [
    {
      name: "Facebook সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookF className="h-5 w-5 text-[#1877F2]" />,
      url: batch?.facebookSecretGroup || "#",
    },
    {
      name: "Messenger সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookMessenger className="h-5 w-5 text-[#1877F2]" />,
      url: batch?.messengerSecretGroup || "#",
    },
  ];

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 px-4">
        <div className="max-w-xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header */}

            <div className="relative bg-linear-to-r from-[#3C016F] to-purple-800">
              {/* <div className="absolute inset-0 bg-[#3C016F] opacity-90"></div> */}
              <div className="absolute inset-0 bg-[url('/api/placeholder/800/300')] opacity-10 bg-cover bg-center"></div>

              {/* Purple circles decoration */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>

              <div className="relative p-8 text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-[#3C016F]" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  ভর্তি নিশ্চিত হয়েছে!
                </h1>
                {participantName && (
                  <p className="text-xl font-medium text-purple-200 mb-1">
                    অভিনন্দন, {decodeURIComponent(participantName)}
                  </p>
                )}
                <p className="text-purple-100">
                  আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
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
                {/* Subtle decorative background element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 opacity-50"></div>

                <h4 className="font-bold text-gray-800 mb-5 text-lg flex items-center justify-center gap-2">
                  <span className="w-8 h-[2px] bg-purple-200"></span>
                  কোন সাহায্য প্রয়োজন?
                  <span className="w-8 h-[2px] bg-purple-200"></span>
                </h4>

                <div className="space-y-4 relative">
                  {/* Direct Call Button */}
                  <Button
                    variant="outline"
                    className="w-full h-auto py-3 justify-start border-purple-100 hover:border-purple-600 hover:bg-purple-50 transition-all duration-300 group"
                    asChild
                  >
                    <Link href="tel:01310726000" className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3 group-hover:bg-purple-600 transition-colors">
                        <PhoneCall className="h-5 w-5 text-purple-600 group-hover:text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                          সরাসরি কল করুন
                        </span>
                        <span className="text-gray-800 font-bold">
                          01310726000
                        </span>
                      </div>
                    </Link>
                  </Button>

                  {/* WhatsApp Button */}
                  <Button
                    variant="outline"
                    className="w-full h-auto py-3 justify-start border-green-100 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                    asChild
                  >
                    <Link
                      href="https://wa.me/8801310726000"
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
                          01310726000
                        </span>
                        <span className="text-[10px] md:text-xs text-green-700 mt-1 leading-tight">
                          স্ক্রিনশট সহ আমাদের ম্যাসেজ করুন
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

            {/* Footer */}
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
      </div>
    </>
  );
}
