"use client";
import Image from "next/image";
import Container from "../shared/Container";
import { usePathname } from "next/navigation";
import CtaLinkButton from "../CtaLinkButton";
import leftimg from "../../../public/img/course-logo.webp";
import bg from "../../../public/img/bg.webp";
import { BannerType, SiteContent } from "@/types";

type Props = {
  siteData: SiteContent | null;
  bannerData: BannerType | null;
};

const Banner = ({ siteData, bannerData }: Props) => {
  const pathname = usePathname();

  // পাথ অনুযায়ী বিভিন্ন টেক্সট
  const getBannerContent = () => {
    if (pathname === "/admission") {
      // অ্যাডমিশন পেজের জন্য siteData থেকে টেক্সট
      return {
        title: siteData?.admissionBannerInfo?.title || "বিশেষ ছাড়ে ভর্তি চলছে...!!",
        subtitle: siteData?.admissionBannerInfo?.subtitle || "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
        description: siteData?.admissionBannerInfo?.description || "অফার কাউন্টডাউন চলছে",
        mainTitle: "৫০ দিনের চ্যালেঞ্জ"
      };
    } else {
      // হোম পেজের জন্য siteData থেকে টেক্সট
      return {
        title: siteData?.homeBannerInfo?.title || "কথার জাদুতে মুগ্ধ করার",
        subtitle: siteData?.homeBannerInfo?.subtitle || "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
        description: siteData?.homeBannerInfo?.description || "ফ্রি সেমিনার কাউন্টডাউন চলছে",
        mainTitle: "৫০ দিনের চ্যালেঞ্জ"
      };
    }
  };

  const bannerContent = getBannerContent();

  return (
    <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center py-16 md:py-20 lg:py-28 overflow-hidden">
      <Image
        src={bg}
        alt="Banner Background"
        fill
        priority
        placeholder="blur"
        quality={80}
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            <div className="text-center md:text-left text-white md:w-1/2 order-2 md:order-1">
              <div className="animate-fade-in-up">
                {/* টাইটেল */}
                <h3 className="text-[23px] md:text-[31px] font-semibold leading-[1]">
                  {bannerContent.title}
                </h3>
                
                {/* মেইন টাইটেল */}
                <h1 className="text-[35px] md:text-[50px] font-bold text-[#DC25FF] drop-shadow-md">
                  {bannerContent.mainTitle}
                </h1>

                {/* ডেসক্রিপশন */}
                <div className="space-y-2 text-[17px] md:text-[20px] font-[400] mt-4">
                  <p className="md:drop-shadow leading-[1]">
                    {bannerContent.subtitle}
                  </p>
                  <p className="md:drop-shadow leading-[1]">
                    {bannerContent.description}
                  </p>
                  {/* Banner-specific description যদি থাকে */}
                  {bannerData?.description && (
                    <p className="md:drop-shadow leading-[1]">
                      {bannerData.description}
                    </p>
                  )}
                </div>

                {/* CTA বাটন */}
                <div className="flex justify-center md:justify-start pt-6">
                  <CtaLinkButton />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 md:w-96 h-64 md:h-96">
                {/* Banner-specific image অথবা default image */}
                <Image
                  src={bannerData?.bannerImage || leftimg}
                  alt="Banner logo"
                  height={400}
                  width={400}
                  className="object-contain drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;