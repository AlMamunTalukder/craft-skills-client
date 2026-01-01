/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/seminar-registration/success/page.tsx
"use client";

import click from "@/public/img/touch.png";
import Container from "@/src/components/shared/Container";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  PhoneCall,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SeminarRegistrationSuccessPage() {
  const searchParams = useSearchParams();
  const [seminar, setSeminar] = useState<any>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const seminarId = searchParams.get("seminarId");
  const participantName = searchParams.get("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active seminar
        const seminarResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/seminars/active`,
        );
        const seminarResult = await seminarResponse.json();

        // Fetch site data
        const siteResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/api/v1/site`,
        );
        const siteResult = await siteResponse.json();

        if (seminarResult.success) setSeminar(seminarResult.data);
        if (siteResult.success) setSiteData(siteResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mailSMSLinks = [
    {
      name: "ইমেইল (Inbox অথবা Spam এ দেখুন)",
      icon: <Mail className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2" />,
      isPrivate: false,
    },
    {
      name: "মোবাইল SMS",
      icon: <Smartphone className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2" />,
      isPrivate: false,
    },
  ];

  const socialLinks = [
    {
      name: "ফ্রি সেমিনার Facebook গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: (
        <FaFacebookF className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#1877F2]" />
      ),
      url: seminar?.facebookSecretGroup || "#",
      isPrivate: true,
      img: click,
    },
    {
      name: "WhatsApp গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: (
        <FaWhatsapp className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#075e54]" />
      ),
      url: seminar?.whatsappSecretGroup || "#",
      isPrivate: true,
      img: click,
    },
    {
      name: "Telegram গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: (
        <FaTelegramPlane className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#0088CC]" />
      ),
      url: seminar?.telegramGroup || "#",
      isPrivate: true,
      img: click,
    },
  ];

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3C016F] mx-auto mb-4"></div>
            <p className="text-gray-600">লোড হচ্ছে...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 py-8 px-4">
        <Container>
          <div className="max-w-2xl mx-auto"> 
            {/* Success Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-lg">
              {/* Header with decorative elements */}

              {/* Header with decorative elements */}
              <div className="relative bg-gradient-to-r from-[#3C016F] to-purple-800">
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
                    রেজিস্ট্রেশন সম্পন্ন!
                  </h1>
                  {participantName && (
                    <p className="text-xl font-medium text-purple-200 mb-1">
                      ধন্যবাদ, {decodeURIComponent(participantName)}
                    </p>
                  )}
                  <p className="text-purple-100">
                    আপনার সেমিনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Seminar Info */}

                <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-3">
                  <p className="text-sm md:text-lg font-semibold text-[#3C016F] text-center my-3">
                    ৫ টি মাধ্যমে আপনাকে ফ্রি সেমিনার লিংক পাঠানো হবে।
                  </p>
                  <div className="space-y-3">
                    {/* Mail/SMS links - these don't have URLs, so use div instead of Link */}
                    {mailSMSLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-1 md:px-2 py-3 md:py-2 rounded-sm md:rounded-lg border border-purple-100 hover:bg-purple-50 transition-all"
                      >
                        <div className="flex items-center">
                          {link.icon}
                          <span className="text-gray-700 text-xs md:text-base">
                            {link.name}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Social links - these have URLs, so use Link */}
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url || "#"} // Provide fallback URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-1 md:px-2 py-3 md:py-2 rounded-sm md:rounded-lg border border-purple-100 hover:bg-purple-50 transition-all"
                      >
                        <div className="flex items-center">
                          {link.icon}
                          <span className="text-gray-700 text-xs md:text-base hover:underline">
                            {link.name}
                          </span>
                        </div>

                        {link.img && (
                          <Image
                            src={link?.img}
                            alt="click img"
                            className="h-6 w-6"
                            width={24}
                            height={24}
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg">
                    কোন সাহায্য প্রয়োজন?
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:01700999093"
                      className="inline-flex items-center justify-center text-[#3C016F] hover:text-purple-800 font-medium text-lg hover:underline"
                    >
                      <PhoneCall className="h-5 w-5 mr-2" />
                      01700999093
                    </a>
                    <br />
                    <a
                      href="tel:01310726000"
                      className="inline-flex items-center justify-center text-[#3C016F] hover:text-purple-800 font-medium text-lg hover:underline"
                    >
                      <PhoneCall className="h-5 w-5 mr-2" />
                      01310726000
                    </a>
                  </div>

                  {siteData?.email && (
                    <div className="mt-4">
                      <a
                        href={`mailto:${siteData.email}`}
                        className="inline-flex items-center justify-center text-[#3C016F] hover:text-purple-800 font-medium hover:underline"
                      >
                        <MdEmail className="h-5 w-5 mr-2" />
                        {siteData.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Back to Home Button */}
                <Link
                  href="/"
                  className="block w-full py-4 bg-[#3C016F] hover:bg-purple-900 text-white rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg text-lg font-semibold"
                >
                  হোমপেজে ফিরে যান
                  <ArrowRight className="ml-3 h-6 w-6" />
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
        </Container>
      </div>
    </>
  );
}
