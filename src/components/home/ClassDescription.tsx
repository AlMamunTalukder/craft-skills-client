// import Container from "../shared/Container";

// const departments = [
//   {
//     name: "মেইন ক্লাস",
//     description:
//       "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
//   },
//   {
//     name: "প্রবলেম সলভিং ক্লাস",
//     description:
//       "অর্থাৎ সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে, প্রত্যেককে আলাদা ভাবে সময় দিয়ে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
//   },
//   {
//     name: "প্রাক্টিস ক্লাস",
//     description:
//       "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে প্রয়োগ করানো হয়",
//   },
//   {
//     name: "স্পেশাল ক্লাস",
//     description:
//       "এই ক্লাসটি মূলত দূর্বল শিক্ষার্থীদের জন্য। যাদের মেইন, প্রবলেম সলভিং ও প্রাক্টিস এই তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকবে , তাদের জন্য রয়েছে স্পেশাল ক্লাস।",
//   },
//   {
//     name: "প্রেজেন্টেশন রিভিউ",
//     description:
//       "শিক্ষার্থীদের ভিডিও প্রেজেন্টেশনে প্রয়োগের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে ত্রুটিগুলো সমাধান করা হয়।",
//   },
//   {
//     name: "ভিডিও প্রেজেন্টেশন",
//     description:
//       "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
//   },
// ];

// const ClassDescription = () => {
//   return (
//     <Container>
//       <div className="border-dashed border-b border-gray-400 pb-10 md:pb-20">
//         <div className="lg:w-[850px] mx-auto lg:px-0 px-5 mt-5 md:mt-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {departments.map((dept, index) => (
//               <div
//                 key={index}
//                 className={`p-2 md:p-[35px] text-justify border-b  md:border-b-0 ${
//                   index < departments.length - 3 ? "lg:border-b" : ""
//                 } ${index % 3 !== 2 ? "md:border-r" : ""}`}
//               >
//                 <h3 className="text-[22px] font-[400] text-[#4F0187] ">
//                   {dept.name}
//                 </h3>
//                 <p className="text-[15px] font-[400] text-gray-600 tracking-wider ">{dept.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default ClassDescription;



"use client";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  HelpCircle, 
  Dumbbell, 
  Star, 
  Video, 
  MonitorCheck,
  CircleDot,
  GraduationCap
} from "lucide-react";
import Container from "../shared/Container";

const departments = [
  {
    name: "মেইন ক্লাস",
    icon: <BookOpen className="w-6 h-6" />,
    description: "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
  },
  {
    name: "প্রবলেম সলভিং ক্লাস",
    icon: <HelpCircle className="w-6 h-6" />,
    description: "সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
  },
  {
    name: "প্রাক্টিস ক্লাস",
    icon: <Dumbbell className="w-6 h-6" />,
    description: "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে বাস্তব প্রয়োগ করানো হয়।",
  },
  {
    name: "স্পেশাল ক্লাস",
    icon: <Star className="w-6 h-6" />,
    description: "মূলত দূর্বল শিক্ষার্থীদের জন্য। তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকলে তাদের জন্য এই ব্যবস্থা।",
  },
  {
    name: "প্রেজেন্টেশন রিভিউ",
    icon: <MonitorCheck className="w-6 h-6" />,
    description: "ভিডিও প্রেজেন্টেশনের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে সমাধান করা হয়।",
  },
  {
    name: "ভিডিও প্রেজেন্টেশন",
    icon: <Video className="w-6 h-6" />,
    description: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
  },
];

const ClassDescription = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      
      {/* --- LARGE ROTATING BACKGROUND ICON (Consistency with other sections) --- */}
      <motion.div 
        // animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600/5 pointer-events-none"
      >
        <GraduationCap size={600} strokeWidth={0.5} />
      </motion.div>

      <Container>
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-[32px] bg-slate-50 border border-purple-100 transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(79,1,135,0.1)] hover:border-purple-200"
              >
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-white text-[#4F0187] rounded-2xl shadow-sm group-hover:bg-[#4F0187] group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg]">
                    {dept.icon}
                  </div>
                  <h3 className="text-xl md:text-[22px] font-bold text-slate-800 group-hover:text-[#4F0187] transition-colors">
                    {dept.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[15px] md:text-[16px] leading-relaxed text-slate-600 font-medium tracking-tight">
                  {dept.description}
                </p>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 text-purple-200 group-hover:text-purple-100 transition-colors">
                   <span className="text-4xl font-black opacity-40">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClassDescription;