"use client";

import Link from "next/link";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const videoLinks = [
  "https://www.youtube.com/embed/fClHNF3176U?si=S99N5nI-aFl-tv13",
  "https://www.youtube.com/embed/yO4o0sqKwGQ?si=ELwfpWlT4PauQ7EN",
];

const OurActivitiesSlider = () => {
  return (
    <div className="md:mb-48">
    <Container>
      <SectionTitle
        text="আমাদের কার্যক্রম"
      />
      <div className="md:w-[980px] md:h-[250px] mx-auto">
        <div className="  flex justify-between items-center mb-5">
          <div className="flex space-x-2 justify-end relative z-10">
            <button className="custom-swiper-button-prev-activities flex items-center text-[#6B21A8] border border-[#6B21A8] rounded-full p-2">
              <GoArrowLeft className="h-5 w-5" />
            </button>
            <button className="custom-swiper-button-next-activities flex items-center text-[#6B21A8] border border-[#6B21A8] rounded-full p-2">
              <GoArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            nextEl: ".custom-swiper-button-next-activities",
            prevEl: ".custom-swiper-button-prev-activities",
          }}
          loop={true}
          autoplay={{ delay: 7000 }}
          speed={1200}
          modules={[Navigation, Autoplay]}
          
        >
          {videoLinks.map((link, index) => (
            <SwiperSlide key={index} className="rounded overflow-hidden">
              <div className="w-full h-[160px] md:h-[300px]">
                <iframe
                  className="w-full h-full rounded-md"
                  src={link}
                  title={`Activity ${index + 1}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-end py-5">
          <Link href="#">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] border border-white px-4 py-2 rounded text-white">
              সব দেখুন <MdArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </Container>
    </div>
  );
};

export default OurActivitiesSlider;
