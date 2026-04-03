"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../shared/Container";
import { Button } from "@/components/ui/button";

const ImageGalleryWithSlider = ({ images }: { images: string[] }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  return (
    <>
      <Container>
        <div className="grid grid-cols-2 gap-4 p-4 max-w-3xl mx-auto mt-5 bg-white rounded-lg ">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="cursor-pointer border rounded-lg overflow-hidden group"
              onClick={() => handleImageClick(idx)}
            >
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                width={400}
                height={500}
                className="object-cover w-full h-full transition duration-300 group-hover:grayscale group-hover:brightness-75"
              />
            </div>
          ))}
        </div>
      </Container>
      <div className="flex justify-center mt-16">
        <Link href="/reviews">
          <Button className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white rounded-full transition-all duration-500 hover:border-purple-400/50 hover:bg-white/5 shadow-2xl overflow-hidden cursor-pointer">
            {/* Glowing background effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <FaHandPointRight className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="relative z-10 font-bold tracking-wide">
              আরও দেখুন
            </span>

            {/* Animated Shine */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000" />
          </Button>
        </Link>
      </div>

      {/* Swiper Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <Button
            className="absolute top-5 right-5 text-white text-3xl z-50"
            onClick={() => setOpen(false)}
          >
            <IoMdClose />
          </Button>

          <div className="w-full max-w-4xl px-4">
            <Swiper
              initialSlide={activeIndex}
              slidesPerView={1}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="rounded overflow-hidden"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Image
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    width={800}
                    height={500}
                    className="object-contain w-full h-[60vh] mx-auto rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGalleryWithSlider;
