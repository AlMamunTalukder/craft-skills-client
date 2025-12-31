// app/admission/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, PhoneCall, Mail, Users } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Header from "@/src/components/shared/Header";
import { Batch, SiteContent } from "@/types";

export default function AdmissionSuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [siteData, setSiteData] = useState<SiteContent | null>(null);

  const participantName = searchParams.get("name");
  const batchName = searchParams.get("batch");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active batch
        const batchResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/course-batches/active`);
        const batchResult = await batchResponse.json();

        // Fetch site data
        const siteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/site`);
        const siteResult = await siteResponse.json();

        if (batchResult.success) setBatch(batchResult.data);
        if (siteResult.success) setSiteData(siteResult.data);
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
    {
      name: "WhatsApp গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaWhatsapp className="h-5 w-5 text-[#25D366]" />,
      url: batch?.whatsappSecretGroup || "#",
    },
  ];

  if (loading) {
    return (
      <>
        {/* {siteData && <Header siteData={siteData} logo={siteData.logoLight || ""} />} */}
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
      {/* {siteData && <Header siteData={siteData} logo={siteData.logoLight || ""} />} */}
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white/10"></div>
              <div className="relative">
                <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-16 h-16 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  ভর্তি নিশ্চিত হয়েছে!
                </h1>
                {participantName && (
                  <p className="text-xl text-purple-100 mb-1">
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
              {/* Batch Info */}
              {batch && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h3 className="font-bold text-lg text-purple-800 mb-2">
                    {batch.name}
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    <p className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-purple-600" />
                      <span>ব্যাচ: {batch.code}</span>
                    </p>
                    <p className="text-sm">
                      {batch.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-3 text-lg">
                  পরবর্তী ধাপসমূহ:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>আমাদের টিম আপনার সাথে যোগাযোগ করবে</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>ক্লাসের বিস্তারিত তথ্য নিচের গ্রুপগুলোতে পাবেন</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>পেমেন্ট প্রক্রিয়া সম্পন্ন করার নির্দেশনা পাবেন</span>
                  </li>
                </ul>
              </div>

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
              <div className="border border-gray-200 rounded-xl p-6 text-center">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">
                  কোন সাহায্য প্রয়োজন?
                </h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="tel:01310726000">
                      <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
                      01310726000
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="tel:01700999093">
                      <PhoneCall className="h-5 w-5 mr-3 text-purple-600" />
                      01700999093
                    </a>
                  </Button>
                  {siteData?.email && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={`mailto:${siteData.email}`}>
                        <Mail className="h-5 w-5 mr-3 text-purple-600" />
                        {siteData.email}
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Back to Home */}
              <Link href="/">
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  হোমপেজে ফিরে যান
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 text-center text-sm text-gray-500">
              <p>ধন্যবাদ, Craft Institute বাংলাদেশ</p>
              <p className="mt-1">আপনার শিক্ষা যাত্রা শুভ হোক!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}