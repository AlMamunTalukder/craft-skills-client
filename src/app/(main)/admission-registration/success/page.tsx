import { getActiveBatch } from "@/queries/course/batch";
import { ArrowRight, CheckCircle, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaFacebookMessenger } from "react-icons/fa";
import click from "@/public/touch.png";
import Header from "@/components/shared/Header";
import Loading from "@/app/loading";
import { db } from "@/prisma/db";

const AdmissionSuccess = async () => {
  const siteData = await db.siteContent.findFirst({});
  const batch = await getActiveBatch();

  // Social links from batch data
  const socialLinks = [   
    {
      name: "Facebook সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookF className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#1877F2]" />,
      url: batch?.facebookSecretGroup || "#",
      isPrivate: true,
      img: click,
    },
    // {
    //   name: "WhatsApp গ্রুপে যুক্ত হতে ক্লিক করুন",
    //   icon: <FaWhatsapp className="h-4 w-4 mr-1 md:mr-2 text-[#075e54]" />,
    //   url: batch?.whatsappSecretGroup || "#",
    //   isPrivate: true,
    // },
    {
      name: "Messenger সিক্রেট গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookMessenger className="h-4 md:h-6 w-4 md:w-6 mr-2 text-[#1877F2]" />,
      url: batch?.messengerSecretGroup || "#",
      isPrivate: true,
      img: click,
    },

    // {
    //   icon: <FaTelegramPlane className="h-4 w-4 mr-1 md:mr-2 text-[#0088CC]" />,
    //   name: "Telegram গ্রুপে যুক্ত হতে ক্লিক করুন",
    //   url: batch?.telegramGroup || "#",
    //   color: "#0088cc",
    //   isPrivate: true,
    // },

    // {
    //   name: "আমাদের Facebook পেইজ",
    //   icon: <FaFacebookF className="h-4 w-4 mr-1 md:mr-2 text-[#1877F2]" />,
    //   url: batch?.facebookPublicGroup || "#",
    //   isPrivate: false,
    // },
  ];

    if (!siteData) {
    return <Loading />;
  }


  return (
    <>
      <Header siteData={siteData} logo={siteData.logoLight || ""} />
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl overflow-hidden border border-purple-100">
        {/* Header with decorative elements */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#3C016F] opacity-90"></div>
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
            <p className="text-purple-100">
              আপনার ভর্তি প্রক্রিয়া সফলভাবে সম্পন্ন হয়েছে
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              ক্র্যাফট ইন্সটিটিউটে আপনাকে স্বাগতম
            </h2>
            <p className="text-gray-600">
              খুব দ্রুতই আমাদের টিম আপনার সাথে যোগাযোগ করবে।
            </p>
          </div>

          {/* Batch Links Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-4">
            <p className=" md:text-lg font-semibold text-[#3C016F] text-center my-3">
              আমাদের গ্রুপ গুলোতে যুক্ত হয়ে নিন
            </p>

            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-1  md:px-2 py-3 md:py-2 rounded-lg border border-purple-100 hover:bg-purple-50 transition-all"
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="text-gray-700 text-xs md:text-base hover:underline">
                      {link.name}
                    </span>
                  </div>
                  {/* {link.isPrivate && (
                    <span className="bg-purple-100 text-[8px] md:text-xs text-purple-700 px-1 md:px-2 py-1 rounded-md md:rounded-full">
                      Private
                    </span>
                  )} */}

                  {link.img && (
                    <Image
                      src={link?.img}
                      alt="click img"
                      className="h-6 w-6"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Need Help Section */}
          <div className="border border-gray-200 rounded-lg p-2 md:p-4 text-center flex flex-col items-center">
            <h4 className="font-medium text-gray-800 mb-2">
              কোন সাহায্য প্রয়োজন?
            </h4>
            <Link
              href="#"
              className="inline-flex items-center text-[#3C016F] hover:text-purple-800 font-medium"
            >
              <PhoneCall className="h-4 w-4 mr-1" />
              01310726000
            </Link>
            <Link
              href="#"
              className="inline-flex items-center text-[#3C016F] hover:text-purple-800 font-medium"
            >
              <PhoneCall className="h-4 w-4 mr-1" />
              01700999093
            </Link>
          </div>

          <Link
            href="/"
            className="w-full py-4 bg-[#3C016F] hover:bg-purple-900 text-white rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            হোমপেজে ফিরে যান
            <ArrowRight className="ml-2 h-5 w-5" />
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
    </>
  );
};

export default AdmissionSuccess;

export const metadata = {
  title: "Admission Confirmation - Craft Institute BD",
  description: "Your admission has been successfully confirmed.",
};
