"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Video, Target, Settings } from "lucide-react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const WhyCourse = () => {
  const whycourse = [
    "আঞ্চলিকতা দূর করে বিশুদ্ধ বাংলা ভাষায় অনর্গল কথা বলতে পারবেন।",
    "মুখের জড়তা কাটাতে পারবেন।",
    "কণ্ঠস্বর শ্রুতিমধুর করতে পারবেন।",
    "সুন্দর বাচনভঙ্গির মাধ্যমে নিজেকে দক্ষ আলোচক হিসেবে তৈরি করতে পারবেন।",
    "জনসম্মুখে নির্ভয়ে কথা বলতে পারবেন।",
    "ক্যামেরা ভীতি দূর করতে পারবেন।",
    "কর্পোরেট, শিক্ষকতা এবং যেকোন পেশায় নিজেকে সমৃদ্ধ করে ফুটিয়ে তুলতে পারবেন।",
    "মিডিয়ার বিভিন্ন পেশায় নিজেকে প্রতিষ্ঠিত করতে পারবেন।",
  ];

  return (
    <section className="relative py-16 lg:py-28 bg-[#fcfaff] overflow-hidden">
      {/* --- LARGE ROTATING FOCUS ELEMENTS (FRAME THE SECTION) --- */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 text-purple-600/5 hidden lg:block pointer-events-none"
      >
        <Settings size={400} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 text-purple-600/5 hidden lg:block pointer-events-none"
      >
        <Target size={450} strokeWidth={1} />
      </motion.div>

      {/* --- SMALLER FLOATING ELEMENTS --- */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-10 text-purple-400/20 hidden lg:block"
      >
        <Video size={60} />
      </motion.div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionTitle
              text="শিক্ষার্থীদের কাজের পোর্টফোলিও"
              lineWidth="lg"
              hasLineBreak={true}
            />
          </div>

          {/* 1. Priority Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mb-24 relative"
          >
            {/* Soft Glow behind video */}
            <div className="absolute -inset-10 bg-purple-200/30 blur-[100px] rounded-full z-0" />

            <div className="relative z-10 rounded-[2rem] overflow-hidden border-[10px] border-white shadow-2xl bg-black group">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0"
                title="Student Success"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* 2. Focused Text Cards */}
          <div className="w-full max-w-5xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative inline-block"
              >
                <div className="bg-[#4F0187] text-white px-12 py-5 rounded-2xl text-xl md:text-3xl font-extrabold shadow-2xl">
                  কোর্সটি কেন প্রয়োজন?
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whycourse.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="flex items-start gap-3 md:gap-5 p-3 md:p-4 bg-white border border-purple-100 rounded-2xl md:rounded-[20px] shadow-[0_10px_40px_rgba(79,1,135,0.04)] hover:shadow-[0_20px_50px_rgba(79,1,135,0.1)] transition-all duration-500 group"
                >
                  <div className="mt-1 flex-shrink-0 bg-purple-50 p-2.5 rounded-2xl group-hover:bg-[#4F0187]  transition-all duration-700">
                    <CheckCircle2 className="text-[#4F0187] group-hover:text-white h-6 w-6" />
                  </div>
                  <p className="text-[#2D2D2D] md:text-[18px] leading-relaxed font-semibold group-hover:text-[#4F0187] transition-colors duration-300">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyCourse;
