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
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Video,
  Target,
  Settings,
  HelpCircle,
} from "lucide-react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const WhyCourse = () => {
  const problems = [
    {
      title: "কথা বলার জড়তা ও আঞ্চলিকতা?",
      desc: "মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না? আঞ্চলিক টানের কারণে মানুষ হাসাহাসি করবে—এই ভয়ে কি নিজেকে গুটিয়ে রাখছেন?",
    },
    {
      title: "উচ্চারণ ও কণ্ঠস্বরের দুর্বলতা?",
      desc: "শুদ্ধ উচ্চারণে কথা বলতে গিয়ে কি আটকে যান? কণ্ঠে গভীরতা (Base) না থাকায় কথায় কি কোনো আকর্ষণ থাকে না? শুধু 'গলা ভালো না'—এই ভয়ে কি মিডিয়া বা কনটেন্ট ক্রিয়েশনের স্বপ্ন বারবার পিছিয়ে দিচ্ছেন?",
    },
    {
      title: "স্টেজে গেলেই কি বুক ধড়ফড় করে?",
      desc: "মঞ্চে বা অনেক মানুষের সামনে কথা বলতে গেলেই কি হাত-পা কাঁপে আর গলা শুকিয়ে আসে? আত্মবিশ্বাসের অভাবে কি আপনার মেধা চাপা পড়ে থাকছে?",
    },
    {
      title: "স্মার্টলি কথা বলতে না পারায় কি ক্যারিয়ার পিছিয়ে যাচ্ছে?",
      desc: "সব যোগ্যতা থাকা সত্ত্বেও শুধু সুন্দরভাবে প্রেজেন্ট করতে না পারায় কি স্বপ্নের চাকরি বা প্রোমোশন হাতছাড়া হয়ে যাচ্ছে? ভাইভা বোর্ডে কি নিজেকে প্রমাণ করতে পারছেন না?",
    },
    {
      title: "ক্যামেরার সামনে এলেই কি সব ভুলে যান?",
      desc: "ভিডিও বানাতে চাইলে লেন্সের দিকে তাকালেই কি সব কথা গুলিয়ে যায়? নিজের রেকর্ড করা ভয়েস শুনে কি লজ্জা পান এবং তা আপলোড করার সাহস পান না?",
    },
    {
      title: "আপনার বডি ল্যাঙ্গুয়েজ কি রোবটের মতো?",
      desc: "কথা বলার সময় হাত কীভাবে রাখবেন বা শ্রোতার চোখের দিকে কীভাবে তাকাবেন তা কি বুঝতে পারেন না? বডি ল্যাঙ্গুয়েজের জড়তার কারণে কি আপনাকে ব্যক্তিত্বহীন মনে হয়?",
    },
    {
      title: "ভয়েস ওভার কি প্রাণহীন ও একঘেয়ে শোনায়?",
      desc: "নিউজ বা স্টোরি টেলিংয়ের সময় গলার সঠিক ওঠানামা (Modulation) ধরে রাখতে পারেন না? ইমোশন অনুযায়ী কণ্ঠ পরিবর্তন করতে কষ্ট হয়, নাকি কোথায় থামতে আর কোথায় জোর দিতে হবে (Pause & Punch) তা না জানায় আপনার কথা 'মনোটোনাস' শোনাচ্ছে?",
    },
    {
      title: "সঠিক গাইডলাইন না পেয়ে ক্যারিয়ারে আটকে আছেন?",
      desc: "ভয়েস আর্টিস্ট হওয়ার স্বপ্ন আছে, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না? ইউটিউব টিউটোরিয়াল দেখে দেখে ক্লান্ত? সঠিক কোনো গাইডেড স্ট্রাকচার না থাকায় ভয়েস আর্টিস্ট বা ডাবিংয়ের স্বপ্নগুলো কি শুধু স্বপ্নই থেকে যাচ্ছে?",
    },
    {
      title: "ভুল ধরিয়ে দেওয়ার মতো কেউ নেই বলে কি হতাশ হচ্ছেন?",
      desc: "একা একা আয়নার সামনে বা ইউটিউব দেখে চর্চা করলেও আপনার ভুলগুলো সুধরে দেওয়ার মতো কি কেউ নেই? সঠিক প্র্যাকটিসের পরিবেশ এবং প্রেজেন্টেশন রিভিউ করার মতো এক্সপার্ট না থাকায় কি আপনার উন্নতি থমকে আছে?",
    },
    {
      title: "দামী স্টুডিও নেই বলে কি রেকর্ডিং শুরু করতে পারছেন না?",
      desc: "দামী মাইক্রোফোন বা সাউন্ডপ্রুফ রুম ছাড়া কি প্রফেশনাল ভয়েস ওভার সম্ভব নয়? কোন গ্যাজেটটি আপনার বাজেটের মধ্যে সেরা আউটপুট দেবে আর কীভাবে সাধারণ ঘরেই স্টুডিওর মতো সাউন্ড পাওয়া যায়—সেই কৌশল না জানায় কি আপনার স্বপ্নগুলো থমকে আছে?",
    },
    {
      title: "স্ক্রিপ্ট লিখতে গেলেই কি কলম আটকে যায়?",
      desc: "মাথায় চমৎকার সব পরিকল্পনা থাকলেও কাগজে-কলমে সেগুলো সাজাতে গিয়ে কি সব গুলিয়ে ফেলছেন? নিউজ, বিজ্ঞাপন, ইউটিউব কন্টেন্ট নাকি ডাবিং কোনটির জন্য স্ক্রিপ্ট কেমন হবে তা কি বুঝতে পারছেন না?",
    },
    {
      title: "আয়ের পথ কি খুঁজে পাচ্ছেন না?",
      desc: "ভয়েস ওভার বা ডাবিংয়ের কাজ শিখলেও তা দিয়ে কীভাবে ইনকাম করবেন তা বুঝতে পারছেন না? দক্ষতা থাকলেও প্রফেশনাল পোর্টফোলিও কীভাবে বানাতে হয় বা মার্কেটপ্লেস থেকে কীভাবে ক্লায়েন্ট পেতে হয়, তা কি জানেন না? সঠিক গাইডলাইনের অভাবে কি আপনার স্বপ্ন অপূর্ণ থেকে যাচ্ছে?",
    },
  ];

  return (
    <section className="relative py-16 lg:py-28 bg-[#F9F7FF] overflow-hidden">
      {/* Decorative Background Icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 text-purple-600/5 hidden lg:block pointer-events-none"
      >
        <Settings size={400} />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 text-purple-600/5 hidden lg:block pointer-events-none"
      >
        <Target size={450} />
      </motion.div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Section 1: Portfolio Video */}
          <div className="text-center mb-12">
            <SectionTitle
              text="শিক্ষার্থীদের কাজের পোর্টফোলিও"
              lineWidth="lg"
              hasLineBreak={true}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mb-20 relative"
          >
            <div className="absolute -inset-10 bg-purple-200/30 blur-[100px] rounded-full z-0" />
            <div className="relative z-10 rounded-3xl overflow-hidden border-[6px] md:border-[12px] border-white shadow-2xl bg-black">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0"
                title="Student Success"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Section 2: Problem Grid */}
          <div className="w-full max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block relative"
              >
                <div className="bg-[#4F0187] text-white px-3 md:px-14 py-3 md:py-6 rounded-2xl md:rounded-[2rem] text-xl md:text-4xl font-black shadow-2xl border-b-4 border-purple-900">
                  আপনিও কি এই সমস্যাগুলোতে ভুগছেন?
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {problems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex flex-col p-6 bg-white border border-purple-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-500 overflow-hidden  "
                >
                  {/* Visual Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-4 -mt-4 group-hover:bg-purple-600 transition-colors duration-500" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                      <HelpCircle size={22} />
                    </div>
                    <span className="text-xs font-black text-purple-300 tracking-widest">
                      সমস্যা {index + 1}
                    </span>
                  </div>

                  <h4 className="text-[#2D0B5A] text-lg md:text-xl font-black leading-tight mb-3 group-hover:text-[#F300E7] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Section 3: Final Call to Action Box */}
            {/* Bottom CTA / Closing Signature */}
            <div className="mt-10 md:mt-24 text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-4 bg-white px-6 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-full shadow-xl border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#4F0187] font-black text-xs md:text-base leading-tight">
                    মাত্র ৫০ দিনে এই সকল সমস্যা দূর করে
                    <span className="text-[#F300E7]">
                      {" "}
                      প্র্যাকটিক্যাল চ্যালেঞ্জে{" "}
                    </span>
                    হয়ে উঠুন প্রফেশনাল পাবলিক স্পিকার ও ভয়েস আর্টিস্ট।
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyCourse;
