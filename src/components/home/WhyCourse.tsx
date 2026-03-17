// "use client";
// import { motion } from "framer-motion";
// import { CheckCircle2, Video, Target, Settings } from "lucide-react";
// import Container from "../shared/Container";
// import SectionTitle from "../shared/SectionTitle";

// const WhyCourse = () => {
//   const whycourse = [
//     "আঞ্চলিকতা দূর করে বিশুদ্ধ বাংলা ভাষায় অনর্গল কথা বলতে পারবেন।",
//     "মুখের জড়তা কাটাতে পারবেন।",
//     "কণ্ঠস্বর শ্রুতিমধুর করতে পারবেন।",
//     "সুন্দর বাচনভঙ্গির মাধ্যমে নিজেকে দক্ষ আলোচক হিসেবে তৈরি করতে পারবেন।",
//     "জনসম্মুখে নির্ভয়ে কথা বলতে পারবেন।",
//     "ক্যামেরা ভীতি দূর করতে পারবেন।",
//     "কর্পোরেট, শিক্ষকতা এবং যেকোন পেশায় নিজেকে সমৃদ্ধ করে ফুটিয়ে তুলতে পারবেন।",
//     "মিডিয়ার বিভিন্ন পেশায় নিজেকে প্রতিষ্ঠিত করতে পারবেন।",
//   ];

//   return (
//     <section className="relative py-16 lg:py-28 md:bg-[#fcfaff] overflow-hidden">
//       {/* --- LARGE ROTATING FOCUS ELEMENTS (FRAME THE SECTION) --- */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//         className="absolute -top-24 -right-24 text-purple-600/5 hidden lg:block pointer-events-none"
//       >
//         <Settings size={400} strokeWidth={1} />
//       </motion.div>

//       <motion.div
//         animate={{ rotate: -360 }}
//         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//         className="absolute -bottom-32 -left-32 text-purple-600/5 hidden lg:block pointer-events-none"
//       >
//         <Target size={450} strokeWidth={1} />
//       </motion.div>

//       {/* --- SMALLER FLOATING ELEMENTS --- */}
//       <motion.div
//         animate={{ y: [0, -20, 0] }}
//         transition={{ duration: 5, repeat: Infinity }}
//         className="absolute top-1/4 left-10 text-purple-400/20 hidden lg:block"
//       >
//         <Video size={60} />
//       </motion.div>

//       <Container className="relative z-10">
//         <div className="flex flex-col items-center">
//           {/* Section Header */}
//           <div className="text-center mb-12">
//             <SectionTitle
//               text="শিক্ষার্থীদের কাজের পোর্টফোলিও"
//               lineWidth="lg"
//               hasLineBreak={true}
//             />
//           </div>

//           {/* 1. Priority Video Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="w-full max-w-4xl mb-10 md:mb-24 relative"
//           >
//             {/* Soft Glow behind video */}
//             <div className="absolute -inset-10 bg-purple-200/30 blur-[100px] rounded-full z-0" />

//             <div className="relative z-10 rounded-2xl md:rounded-[2rem] overflow-hidden md:border-[10px] md:border-white shadow-2xl bg-black group">
//               <iframe
//                 className="w-full aspect-video"
//                 src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0"
//                 title="Student Success"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </motion.div>

//           {/* 2. Focused Text Cards */}
//           <div className="w-full max-w-5xl">
//             <div className="text-center mb-16">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 className="relative inline-block"
//               >
//                 <div className="bg-[#4F0187] text-white px-12 py-5 rounded-2xl text-xl md:text-3xl font-extrabold shadow-2xl">
//                   কোর্সটি কেন প্রয়োজন?
//                 </div>
//               </motion.div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
//               {whycourse.map((text, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                   whileHover={{ scale: 1.03, y: -5 }}
//                   className="flex items-start gap-3 md:gap-5 p-3 md:p-4 bg-white border border-purple-100 rounded-2xl md:rounded-[20px] shadow-[0_10px_40px_rgba(79,1,135,0.04)] hover:shadow-[0_20px_50px_rgba(79,1,135,0.1)] transition-all duration-500 group"
//                 >
//                   <div className="mt-1 flex-shrink-0 bg-purple-50 p-2.5 rounded-2xl group-hover:bg-[#4F0187]  transition-all duration-700">
//                     <CheckCircle2 className="text-[#4F0187] group-hover:text-white h-6 w-6" />
//                   </div>
//                   <p className="text-[#2D2D2D] text-[15px] md:text-[18px] leading-relaxed font-semibold group-hover:text-[#4F0187] transition-colors duration-300">
//                     {text}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default WhyCourse;

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const WhyCourse = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const problems = [
    { title: "কথা বলার জড়তা ও আঞ্চলিকতা?", desc: "মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না? আঞ্চলিক টানের কারণে মানুষ হাসাহাসি করবে—এই ভয়ে কি নিজেকে গুটিয়ে রাখছেন?" },
    { title: "উচ্চারণ ও কণ্ঠস্বরের দুর্বলতা?", desc: "শুদ্ধ উচ্চারণে কথা বলতে গিয়ে কি আটকে যান? কণ্ঠে গভীরতা (Base) না থাকায় কথায় কি কোনো আকর্ষণ থাকে না? শুধু 'গলা ভালো না'—এই ভয়ে কি মিডিয়া বা কনটেন্ট ক্রিয়েশনের স্বপ্ন বারবার পিছিয়ে দিচ্ছেন?" },
    { title: "স্টেজে গেলেই কি বুক ধড়ফড় করে?", desc: "মঞ্চে বা অনেক মানুষের সামনে কথা বলতে গেলেই কি হাত-পা কাঁপে আর গলা শুকিয়ে আসে? আত্মবিশ্বাসের অভাবে কি আপনার মেধা চাপা পড়ে থাকছে?" },
    { title: "আপনার বডি ল্যাঙ্গুয়েজ কি রোবটের মতো?", desc: "কথা বলার সময় হাত কীভাবে রাখবেন বা শ্রোতার চোখের দিকে কীভাবে তাকাবেন তা কি বুঝতে পারেন না? বডি ল্যাঙ্গুয়েজের জড়তার কারণে কি আপনাকে ব্যক্তিত্বহীন মনে হয়?" },
    { title: "ক্যামেরার সামনে এলেই কি সব ভুলে যান?", desc: "ভিডিও বানাতে চাইলে লেন্সের দিকে তাকালেই কি সব কথা গুলিয়ে যায়? নিজের রেকর্ড করা ভয়েস শুনে কি লজ্জা পান এবং তা আপলোড করার সাহস পান না?" },
    { title: "স্মার্টলি কথা বলতে না পারায় কি ক্যারিয়ার পিছিয়ে যাচ্ছে?", desc: "সব যোগ্যতা থাকা সত্ত্বেও শুধু সুন্দরভাবে প্রেজেন্ট করতে না পারায় কি স্বপ্নের চাকরি বা প্রোমোশন হাতছাড়া হয়ে যাচ্ছে? ভাইভা বোর্ডে কি নিজেকে প্রমাণ করতে পারছেন না?" },
    { title: "স্ক্রিপ্ট লিখতে গেলেই কি কলম আটকে যায়?", desc: "মাথায় চমৎকার সব পরিকল্পনা থাকলেও কাগজে-কলমে সেগুলো সাজাতে গিয়ে কি সব গুলিয়ে ফেলছেন? নিউজ, বিজ্ঞাপন, ইউটিউব কন্টেন্ট নাকি ডাবিং কোনটির জন্য স্ক্রিপ্ট কেমন হবে তা কি বুঝতে পারছেন না?" },
    { title: "ভয়েস ওভার কি প্রাণহীন ও একঘেয়ে শোনায়?", desc: "নিউজ বা স্টোরি টেলিংয়ের সময় গলার সঠিক ওঠানামা (Modulation) ধরে রাখতে পারেন না? ইমোশন অনুযায়ী কণ্ঠ পরিবর্তন করতে কষ্ট হয়, নাকি কোথায় থামতে আর কোথায় জোর দিতে হবে (Pause & Punch) না জানায় আপনার কথা বিরক্তকর শোনাচ্ছে?" },
    { title: "দামী স্টুডিও নেই বলে কি রেকর্ডিং শুরু করতে পারছেন না?", desc: "দামী মাইক্রোফোন বা সাউন্ডপ্রুফ রুম ছাড়া কি প্রফেশনাল ভয়েস ওভার সম্ভব নয়? কোন গ্যাজেটটি বাজেটের মধ্যে সেরা আউটপুট দেবে, কোন সফটওয়্যার দিয়ে প্রফেশনালি ভয়েস এডিট করবেন, আর কীভাবে সাধারণ ঘরেই স্টুডিওর মতো সাউন্ড পাওয়া যায়—সেই কৌশল না জানায় কি আপনার স্বপ্নগুলো থমকে আছে?" },
    { title: "সঠিক গাইডলাইন না পেয়ে ক্যারিয়ারে আটকে আছেন?", desc: "ভয়েস আর্টিস্ট হওয়ার স্বপ্ন আছে, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না? ইউটিউব টিউটোরিয়াল দেখে দেখে ক্লান্ত? সঠিক কোনো গাইডেড স্ট্রাকচার না থাকায় ভয়েস আর্টিস্ট বা ডাবিংয়ের স্বপ্নগুলো কি শুধু স্বপ্নই থেকে যাচ্ছে?" },
    { title: "ভুল ধরিয়ে দেওয়ার মতো কেউ নেই বলে কি হতাশ হচ্ছেন?", desc: "একা একা আয়নার সামনে বা ইউটিউব দেখে চর্চা করলেও আপনার ভুলগুলো সুধরে দেওয়ার মতো কি কেউ নেই? সঠিক প্র্যাকটিসের পরিবেশ এবং প্রেজেন্টেশন রিভিউ করার মতো এক্সপার্ট না থাকায় কি আপনার উন্নতি থমকে আছে?" },
    { title: "আয়ের পথ কি খুঁজে পাচ্ছেন না?", desc: "ভয়েস ওভার বা ডাবিংয়ের কাজ শিখলেও তা দিয়ে কীভাবে ইনকাম করবেন তা বুঝতে পারছেন না? দক্ষতা থাকলেও প্রফেশনাল পোর্টফোলিও কীভাবে বানাতে হয় বা মার্কেটপ্লেস থেকে কীভাবে ক্লায়েন্ট পেতে হয়, তা কি জানেন না? সঠিক গাইডলাইনের অভাবে কি আপনার স্বপ্ন অপূর্ণ থেকে যাচ্ছে?" },
  ];

  return (
    <section className="py-16 lg:py-28 bg-[#FDFCFE]">
      <Container>
        <div className="text-center mb-16">
          <SectionTitle text="শিক্ষার্থীদের কাজের পোর্টফোলিও" lineWidth="lg" hasLineBreak={true} />
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mt-12 w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <iframe className="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0" title="Student Success" allowFullScreen></iframe>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="inline-block relative">

              <div className="bg-[#4F0187] text-white px-6 md:px-14 py-4 md:py-6 rounded-2xl md:rounded-[2rem] text-xl md:text-3xl font-black shadow-2xl border-b-4 border-purple-900">

                আপনিও কি এই সমস্যাগুলোতে ভুগছেন?

              </div>

            </motion.div>

          </div>

          {/* UNIQUE LAYOUT: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-8 bg-white p-4 md:p-8 rounded-[3rem] shadow-xl border border-purple-50">
            
            {/* Left Side: Scrollable Problems List */}
            <div className="w-full lg:w-1/2 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {problems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    activeIndex === index 
                    ? "bg-[#4F0187] border-[#4F0187] text-white shadow-lg translate-x-2" 
                    : "bg-gray-50 border-gray-100 text-[#2D0B5A] hover:bg-purple-50"
                  }`}
                >
                  <span className={`text-lg font-bold ${activeIndex === index ? "text-white/50" : "text-purple-300"}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-bold text-sm md:text-base">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Right Side: Detailed Focus (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[#F9F7FF] rounded-[2rem] p-10 flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-purple-100">
                <HelpCircle size={120} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <span className="text-[#F300E7] font-black tracking-widest uppercase mb-4 block">Problem Focus</span>
                  <h3 className="text-3xl font-black text-[#2D0B5A] mb-6">{problems[activeIndex].title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                    &quot;{problems[activeIndex].desc}&quot;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile View Description (Shows under active button) */}
            <div className="lg:hidden p-6 bg-purple-50 rounded-2xl">
               <h3 className="font-black text-[#2D0B5A] mb-2">{problems[activeIndex].title}</h3>
               <p className="text-slate-600 text-sm leading-relaxed italic">&quot;{problems[activeIndex].desc}&quot;</p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-20 flex justify-center">
          <motion.div 
            whileInView={{ scale: [0.95, 1] }}
            className="inline-flex flex-col md:flex-row items-center gap-4 bg-[#4F0187] px-8 md:px-12 py-6 rounded-[2rem] md:rounded-full shadow-2xl border-b-4 border-purple-900"
          >
            <CheckCircle2 className="text-[#F300E7] w-8 h-8 animate-pulse" />
            <p className="text-white font-bold text-sm md:text-xl text-center">
              মাত্র ৫০ দিনে এই সকল সমস্যা দূর করে 
              <span className="text-[#F300E7]"> প্র্যাকটিক্যাল চ্যালেঞ্জে </span> 
              হয়ে উঠুন প্রফেশনাল পাবলিক স্পিকার ও ভয়েস আর্টিস্ট।
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhyCourse;