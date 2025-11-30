"use client";
import Image from "next/image";
import Container from "../shared/Container";
import { usePathname } from "next/navigation";
import CtaLinkButton from "../CtaLinkButton";
import leftimg from "../../../public/img/course-logo.webp";
import bg from "../../../public/img/bg.webp";
// import { Banner as BannerType } from "@prisma/client";

// type Props = {
//   data: BannerType;
// };

// const Banner = ({ data }: Props) => {
const Banner = () => {
  const pathname = usePathname();

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
        // blurDataURL={bg}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            <div className="text-center md:text-left text-white md:w-1/2 order-2 md:order-1">
              <div className="animate-fade-in-up">
                {pathname === "/admission" ? (
                  <span className="text-sm md:text-[31px] font-semibold whitespace-nowrap text-[#EB0BFF]">
                    বিশেষ ছাড়ে ভর্তি চলছে...!!
                  </span>
                ) : (
                  <span className="text-sm md:text-base font-semibold whitespace-nowrap" />
                )}

                <h3 className="text-[23px] md:text-[31px] font-semibold leading-[1]">
                  কথার জাদুতে মুগ্ধ করার

                </h3>
                <h1 className="text-[35px] md:text-[50px] font-bold text-[#DC25FF] drop-shadow-md">
                ৫০ দিনের চ্যালেঞ্জ
                </h1>
                {/* <h3 className="text-[23px] md:text-[31px] font-[600] leading-[1]">
                  {data.title}
                </h3>
                <h1 className="text-[35px] md:text-[50px] font-[700] text-[#DC25FF] drop-shadow-md">
                  {data.subtitle}
                </h1> */}

                {pathname === "/admission" ? (
                  <span className="text-sm md:text-[20px] font-[400] whitespace-nowrap">
                    ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন
                  </span>
                ) : (
                  <div className="space-y-2 text-[17px] md:text-[20px] font-[400]">
                    <p className="md:drop-shadow leading-[1]">
                       ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন
                    </p>
                    <p className="md:drop-shadow leading-[1]">
                      ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন
                    </p>
                    {/* <p className="md:drop-shadow leading-[1]">
                      {data.description}
                    </p>
                    <p className="md:drop-shadow leading-[1]">
                      {data.dateInfo}
                    </p> */}
                  </div>
                )}

                {pathname === "/dashboard/content/banner" ? (
                  <div className="flex justify-center md:justify-start pt-6"></div>
                ) : (
                  <div className="flex justify-center md:justify-start pt-6">
                    <CtaLinkButton />
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 md:w-96 h-64 md:h-96">
                <Image
                  src={leftimg}
                  // src={data.bannerImage || "/banner-logo-left.png"}
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
