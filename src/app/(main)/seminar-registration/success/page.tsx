/* eslint-disable @typescript-eslint/no-unused-vars */
// import { activeSeminar } from "@/queries/seminar";
import { ArrowRight, CheckCircle, PhoneCall } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FaFacebookF,
  FaMobileAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import click from "../../../../../public/img/touch.png";
import Loading from "@/src/app/loading";
import { SiteContent } from "@/types";

type Props = {
  siteData: SiteContent | null;
};



const RegistrationSuccess = async ({siteData}: Props) => {
  // const siteDatas = await siteData.siteContent.findFirst({});

  // const seminar = await activeSeminar();

  const mailSMSLinks = [
    {
      name: "ইমেইল (Inbox অথবা Spam এ দেখুন)",
      icon: <MdEmail className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2" />,
      url: "",
      isPrivate: false,
      img: "",
    },
    {
      name: "মোবাইল SMS",
      icon: <FaMobileAlt className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2" />,
      url: "",
      isPrivate: false,
      img: "",
    },
  ];
  const socialLinks = [
    {
      name: "ফ্রি সেমিনার Facebook গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaFacebookF className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#1877F2]" />,
      // url: seminar?.facebookSecretGroup || "#",
      isPrivate: true,
      img: click,
    },
    {
      name: "WhatsApp গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaWhatsapp className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#075e54]" />,
      // url: seminar?.whatsappSecretGroup || "#",
      isPrivate: true,
      img: click,
    },
    // {
    //   name: "Messenger গ্রুপে যুক্ত হতে ক্লিক করুন",
    //   icon: <FaFacebookMessenger className="h-4 w-4 mr-1 md:mr-2 text-[#0099FF]" />,
    //   url: seminar?.messengerSecretGroup || "#",
    //   isPrivate: true,
    // },

    {
      name: "Telegram গ্রুপে যুক্ত হতে ক্লিক করুন",
      icon: <FaTelegramPlane className="h-4 md:h-6 w-4 md:w-6 mr-1 md:mr-2 text-[#0088CC]" />,
      // url: seminar?.telegramGroup || "#",
      isPrivate: true,
      img: click,
    },

    // {
    //   name: "আমাদের Facebook পেইজ",
    //   icon: <FaFacebookF className="h-4 w-4 mr-1 md:mr-2 text-[#1877F2]" />,
    //   url: seminar?.facebookPublicGroup || "#",
    //   isPrivate: false,
    // },
  ];


  if (!siteData) {
    return <Loading />;
  }


  return (
    <>
      {/* <Header siteDatas={siteData} logo={siteData.logoLight || ""} /> */}

      <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-50 flex items-center justify-center p-4">
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
                রেজিস্ট্রেশন সম্পন্ন!
              </h1>
              <p className="text-purple-100">
                আপনার সেমিনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 md:p-8 space-y-6">          

            {/* Batch Links Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-3">
              <p className="text-sm md:text-lg font-semibold text-[#3C016F] text-center my-3">
                ৫ টি মাধ্যমে আপনাকে ফ্রি সেমিনার লিংক পাঠানো হবে।
              </p>
              <div className="space-y-3">
                {mailSMSLinks.map((link, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-between px-1  md:px-2 py-3 md:py-2 rounded-sm md:rounded-lg border border-purple-100 hover:bg-purple-50 transition-all"
                  >
                    <div className="flex items-center">
                      {link.icon}
                      <span className="text-gray-700 text-xs md:text-base">
                        {link.name}
                      </span>
                    </div>
                  </div>
                ))}

                {/* {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" flex items-center justify-between px-1  md:px-2 py-3 md:py-2 rounded-sm md:rounded-lg border border-purple-100 hover:bg-purple-50 transition-all"
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
                      />
                    )}
                  </Link>
                ))} */}
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
                01700999093
              </Link>
              <Link
                href="#"
                className="inline-flex items-center text-[#3C016F] hover:text-purple-800 font-medium"
              >
                <PhoneCall className="h-4 w-4 mr-1" />
                01310726000
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

export default RegistrationSuccess;

export const metadata: Metadata = {
  title: "Seminar Registration Success - Craft Institute BD",
  description: "Your registration for the seminar was successful.",
};
