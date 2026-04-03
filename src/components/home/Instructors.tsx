"use client";
import Image from "next/image";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

// Actual imports from your project
import salim from "../../../public/img/instructor/md-salim.webp";
import samapan from "../../../public/img/instructor/samapan.png";
import imteaz from "../../../public/img/instructor/imteaz.webp";
import toukir1 from "../../../public/img/instructor/tou.webp";
import sahrin from "../../../public/img/instructor/sahrin.jpeg";
import nesar from "../../../public/img/instructor/nesar.webp";

const Instructors = () => {
  const instructors = [
    {
      name: "মোহাম্মদ সেলিম",
      image: salim,
      designation: "ভয়েস ওভার ডিরেক্টর",
    },
    {
      name: "ইমতিয়াজ সাব্বির",
      image: imteaz,
      designation: "ডাবিং আর্টিস্ট",
    },
    {
      name: "সমাপন মিশ্র",
      image: samapan,
      designation: "ভয়েস অ্যাক্টর (ইন্ডিয়া)",
    },
    {
      name: "তৌকির আনোয়ার",
      image: toukir1,
      designation: "ভয়েস ওভার আর্টিস্ট",
    },
    {
      name: "শাহরিন চৌধুরী",
      image: sahrin,
      designation: "ভয়েস ওভার আর্টিস্ট",
    },
    { name: "নেছার আহমাদ", image: nesar, designation: "ভয়েস ওভার আর্টিস্ট" },
  ];

  return (
    <div className="bg-white py-7 md:py-28 overflow-hidden">
      <Container>
        <div className="text-center mb-6 md:mb-0">
          <SectionTitle text="কোর্স প্রশিক্ষক" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 max-w-5xl mx-auto">
          {instructors.map((instructor, idx) => (
            <div key={idx} className="relative group h-[220px] md:h-[350px]">
              {/* Main Card Container */}
              <div className="relative h-full rounded-xl md:rounded-4xl overflow-hidden bg-slate-200 shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-purple-200/50">
                {/* Background Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#4F0187]/90 z-10" />

              
                <Image
                  src={instructor.image || "/placeholder.png"}
                  alt={instructor.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority={idx < 3}
                />

               

                {/* Content Overlay (Frosted Glass Look) */}
                <div className="absolute bottom-2 md:bottom-6 left-2 md:left-6 right-2 md:right-6 z-20">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 md:p-5 rounded-lg md:rounded-3xl shadow-2xl">
                    <h3 className="text-white text-[15px] md:text-2xl font-black mb-1 drop-shadow-md">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-6 bg-[#DC25FF] rounded-full" />
                      <p className="text-purple-100 font-medium text-[10px] md:text-base uppercase tracking-wider">
                        {instructor.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique Shadow Element behind the card */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-purple-600/10 blur-2xl rounded-full -z-10 group-hover:bg-purple-600/20 transition-all" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
