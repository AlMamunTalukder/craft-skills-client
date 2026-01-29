"use client";

import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const videoLinks = [
  "https://www.youtube.com/embed/fClHNF3176U?si=S99N5nI-aFl-tv13",
  "https://www.youtube.com/embed/yO4o0sqKwGQ?si=ELwfpWlT4PauQ7EN",
];

const OurActivitiesSlider = () => {
  return (
    <div className="md:mb-24">
    <Container>
      <SectionTitle
        text="আমাদের কার্যক্রম"
      />
      <div className="grid grid-cols-2 gap-3 md:w-full md:h-full mx-auto">
        {videoLinks.map((link, index) => (
            <div key={index} className="rounded overflow-hidden">
              <div className="w-full h-40 md:h-[300px]">
                <iframe
                  className="w-full h-full rounded-md"
                  src={link}
                  title={`Activity ${index + 1}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        

        
      </div>
      <div className="flex justify-end py-5">
          <Link href="#">
            <button className="flex items-center gap-2 bg-linear-to-r from-[#DC25FF] to-[#3C016F] border border-white px-4 py-2 rounded text-white cursor-pointer">
              সব দেখুন <MdArrowForward />
            </button>
          </Link>
        </div>
    </Container>
    </div>
  );
};

export default OurActivitiesSlider;
