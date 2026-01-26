/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/src/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@/src/components/shared/Container";
import Header from "../shared/Header";

interface Review {
  _id: string;
  image: string;
  title?: string;
  isActive: boolean;
  createdAt: string;
}

interface ReviewsProps {
  user: any;
  siteData: any;
}

export default function FbReview({ user, siteData }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const response = await fetch(`${apiUrl}/review`);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const { data, success } = await response.json();

        if (!success) {
          throw new Error("Invalid response format");
        }

        // Filter only active reviews and sort by createdAt
        const sortedReviews = (data || [])
          .filter((review: any) => review.isActive !== false)
          .sort((a: Review, b: Review) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });

        setReviews(sortedReviews);
      } catch (error: any) {
        console.error("Error fetching reviews:", error);
        setError(error.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div id="reviews" className="bg-[#4F0187] py-20">
        <SectionTitle text="লিখিত মতামত" className="text-white" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 animate-pulse rounded-lg"
                style={{
                  height: `${Math.random() * 200 + 200}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Extract image URLs for the slider
  const imageUrls = reviews.map((review) => review.image);

  return (
    <>
    <Header user={user} siteData={siteData} />
      <div id="reviews" className="bg-[#4F0187] py-10">
        <Container>
            
          <SectionTitle text="লিখিত মতামত" className="text-white" />

          {/* Masonry Grid */}

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 px-4">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="break-inside-avoid group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 mb-4 cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                {/* Image Container */}
                <div className="relative w-full">
                  <Image
                    src={review.image}
                    alt={review.title || "Client review"}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>

                {review.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">
                      {review.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* See More Button (if less than or equal to 4 reviews) */}
          {reviews.length <= 4 && (
            <div className="flex justify-center mt-6">
              <Link href={"/reviews"}>
                <Button className="rounded bg-white flex items-center justify-center gap-2 p-3 text-black hover:text-white hover:bg-white/90">
                  আরও দেখুন
                </Button>
              </Link>
            </div>
          )}

          {/* Swiper Modal Overlay */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
              <Button
                className="absolute top-5 right-5 text-white text-3xl z-50 bg-transparent hover:bg-transparent p-2"
                onClick={() => setOpen(false)}
              >
                <IoMdClose className="w-8 h-8" />
              </Button>

              <div className="w-full max-w-5xl px-4">
                <Swiper
                  initialSlide={activeIndex}
                  slidesPerView={1}
                  loop={true}
                  navigation
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="rounded-lg overflow-hidden"
                >
                  {imageUrls.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex items-center justify-center h-[80vh]">
                        <Image
                          src={img}
                          alt={`Slide ${idx + 1}`}
                          width={1200}
                          height={800}
                          className="object-contain max-w-full max-h-full rounded-lg"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
       
        </Container>
      </div>
    </>
  );
}
