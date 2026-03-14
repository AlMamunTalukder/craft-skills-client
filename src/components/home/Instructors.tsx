// import Image from "next/image";
// import Container from "../shared/Container";
// import SectionTitle from "../shared/SectionTitle";
// import nesar from "../../../public/img/instructor/nesar.webp";
// import samapan from "../../../public/img/instructor/samapan.png";
// import imteaz from "../../../public/img/instructor/imteaz.webp";
// import salim from "../../../public/img/instructor/md-salim.webp";

// const Instructors = async () => {
//   const instructors = [
//   {
//     "name": "নেছার আহমাদ",
//     "image": nesar,
//     "designation": "ভয়েস ওভার আর্টিস্ট"
//   },
//   {
//     "name": "সমাপন মিশ্র",
//     "image": samapan,
//     "designation": "ভয়েস অ্যাক্টর (ইন্ডিয়া)"
//   },
//   {
//     "name": "আহমেদ ইমতিয়াজ সাব্বির",
//     "image": imteaz,
//     "designation": "ডাবিং আর্টিস্ট"
//   },
//   {
//     "name": "মোহাম্মদ সেলিম",
//     "image": salim,
//     "designation": "ভয়েস ওভার ডিরেক্টর"
//   }
// ]

//   if (!instructors.length) {
//     return (
//       <Container>
//         <div className=" my-10 md:my-20">
//           <h2 className="text-2xl md:text-3xl font-bold text-[#4F0187] text-center mb-10">
//             কোর্স প্রশিক্ষক
//           </h2>
//           <p className="text-center">কোন প্রশিক্ষক নেই</p>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <div className="md:mx-24 my-10 md:my-20">
//         <SectionTitle text="কোর্স প্রশিক্ষক" />

//         <div className="md:w-[770px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//           {instructors.map((instructor, idx) => (
//             <div
//               key={idx}
//               className="md:w-[170px] md:h-[240px] border border-dashed border-gray-300 rounded-lg overflow-hidden bg-white "
//             >
//               {/* Image Section */}
//               <div className="relative md:w-[170px] h-[180px] md:h-[190px] ">
//                 <Image
//                   src={instructor.image || "/placeholder.png"}
//                   alt={instructor.name}
//                   width={100}
//                   height={100}
//                   // objectFit="cover"
//                   className="w-full h-full rounded-t-lg"
//                 />
//               </div>

//               {/* Info Section */}
//               <div className="bg-gray-100 text-center py-2 px-0 h-[65px] md:h-auto">
//                 <h3 className="font-semibold text-gray-800 leading-[1]">
//                   {instructor.name}
//                 </h3>
//                 <p className="text-sm text-gray-700">{instructor.designation}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Instructors;

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

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
      name: "আহমেদ ইমতিয়াজ সাব্বির",
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
    <div className="bg-white py-16 md:py-28 overflow-hidden">
      <Container>
        <div className="text-center mb-16 md:mb-0">
          <SectionTitle text="কোর্স প্রশিক্ষক" />
          {/* <p className="text-slate-500 mt-4 font-medium text-lg italic">
            &quot;যাঁদের ভয়েস আইকনিক, তাঁদের থেকেই শিখুন সরাসরি&quot;
          </p> */}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10">
          {instructors.map((instructor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-[420px] md:h-[400px]"
            >
              {/* Main Card Container */}
              <div className="relative h-full rounded-[2rem] overflow-hidden bg-slate-200 shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-purple-200/50">
                {/* Background Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#4F0187]/90 z-10" />

                {/* Full Image Display - FIXED RESOLUTION SETTINGS */}
                <Image
                  src={instructor.image || "/placeholder.png"}
                  alt={instructor.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority={idx < 3}
                />

                {/* Social Floating Bar */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#DC25FF] transition-colors">
                    <FaFacebookF size={16} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#DC25FF] transition-colors">
                    <FaLinkedinIn size={16} />
                  </button>
                </div>

                {/* Content Overlay (Frosted Glass Look) */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl">
                    <h3 className="text-white text-xl md:text-2xl font-black mb-1 drop-shadow-md">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-6 bg-[#DC25FF] rounded-full" />
                      <p className="text-purple-100 font-medium text-sm md:text-base uppercase tracking-wider">
                        {instructor.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique Shadow Element behind the card */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-purple-600/10 blur-2xl rounded-full -z-10 group-hover:bg-purple-600/20 transition-all" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Instructors */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-100 bg-purple-50/50 text-[#4F0187] font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
            </span>
            সেরা মেন্টরদের সাথে স্কিল গড়ুন
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
