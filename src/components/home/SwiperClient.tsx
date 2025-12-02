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
      {images.length > 4 ? null : (
        <div className="flex justify-center mt-3">
          <Link href={"/reviews"}>
            <button className="rounded bg-white flex items-center justify-center gap-2 p-3">
              {" "}
              <FaHandPointRight /> আরও পড়ুন
            </button>
          </Link>
        </div>
      )}

      {/* Swiper Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl z-50"
            onClick={() => setOpen(false)}
          >
            <IoMdClose />
          </button>

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
