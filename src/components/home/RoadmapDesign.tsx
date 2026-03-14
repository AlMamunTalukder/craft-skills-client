// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { AlertCircle, CheckCircle2, ArrowRight, Star, MessageSquare, Users, Video, PlayCircle, Sparkles } from 'lucide-react';
// import { Card, CardContent } from "@/components/ui/card";

// const ProblemSolutionFocus = () => {
//   const problems = [
//     "উচ্চারণগত", "আঞ্চলিকতা", "মুখের জড়তা", 
//     "কণ্ঠ শ্রুতিমধুর না থাকা", "বডি ল্যাঙ্গুয়েজ", 
//     "ক্যামেরা ভীতি", "জনসম্মুখে কথা বলা"
//   ];

//   const solutions = [
//     { title: "মেইন ক্লাস", desc: "পাঠ্যক্রমে উল্লেখিত বিষয় শেখানো হয়", icon: <Star /> },
//     { title: "প্রবলেম সলভিং ক্লাস", desc: "সমস্যা সমাধান করা হয়", icon: <MessageSquare /> },
//     { title: "প্র্যাক্টিস ক্লাস", desc: "চর্চা করানো হয়", icon: <Users /> },
//     { title: "স্পেশাল ক্লাস", desc: "দুর্বলদের আলাদা করে শেখানো হয়", icon: <CheckCircle2 /> },
//     { title: "ভিডিও প্রেজেন্টেশন", desc: "৩,০০০ মিনিট প্রেজেন্টেশনের মাধ্যমে প্রয়োগ করানো হয়", icon: <Video /> },
//     { title: "প্রেজেন্টেশন রিভিউ ক্লাস", desc: "প্রয়োগের সমস্যাগুলো সমাধান করা হয়", icon: <PlayCircle /> },
//   ];

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 md:p-10 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-inner">
      
//       {/* --- PROBLEM SECTION: THE CHALLENGE --- */}
//       <section className="mb-16">
//         <div className="flex flex-col items-center text-center mb-10">
//           <motion.div 
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="bg-rose-100 p-3 rounded-2xl mb-4"
//           >
//             <AlertCircle className="w-8 h-8 text-rose-600" />
//           </motion.div>
//           <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 pt-1">আপনি কি এই বাধাগুলোর সম্মুখীন?</h2>
//           <p className="text-slate-500 font-medium">আপনার আত্মবিশ্বাসকে যা পিছিয়ে দিচ্ছে</p>
//         </div>

//         <div className="flex flex-wrap justify-center gap-4">
//           {problems.map((text, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="px-6 py-4 bg-white border-2 border-rose-50 shadow-sm rounded-2xl flex items-center gap-3 hover:border-rose-200 hover:shadow-md transition-all group"
//             >
//               <div className="w-2 h-2 rounded-full bg-rose-400 group-hover:scale-150 transition-transform" />
//               <span className="text-slate-700 font-bold text-lg pt-1">{text}</span>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* --- TRANSITION ARROW --- */}
//       <div className="flex justify-center mb-16">
//         <motion.div 
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="bg-[#6d28d9] text-white p-4 rounded-full shadow-lg shadow-purple-200"
//         >
//           <ArrowRight className="w-8 h-8 rotate-90 md:rotate-0" />
//         </motion.div>
//       </div>

//       {/* --- SOLUTION SECTION: THE TRANSFORMATION --- */}
//       <section>
//         <div className="flex items-center gap-4 mb-12">
//           <div className="bg-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-200">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-black text-[#2e1065] pt-1">আমাদের সমাধান</h2>
//             <div className="h-1.5 w-24 bg-purple-600 rounded-full mt-1" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {solutions.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -8 }}
//             >
//               <Card className="h-full border-none shadow-sm bg-white overflow-hidden relative group">
//                 {/* Decorative background number */}
//                 <div className="absolute -right-4 -bottom-4 text-9xl font-black text-slate-50 group-hover:text-purple-50 transition-colors pointer-events-none">
//                   {index + 1}
//                 </div>
                
//                 <CardContent className="p-8 relative z-10">
//                   <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
//                     {React.cloneElement(item.icon, { className: "w-6 h-6" })}
//                   </div>
//                   <h4 className="text-xl font-extrabold text-[#2e1065] mb-3 pt-1 border-b border-purple-100 pb-2">
//                     {item.title}
//                   </h4>
//                   <p className="text-slate-600 leading-relaxed pt-1 font-medium">
//                     {item.desc}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProblemSolutionFocus;


import React from 'react';
import { CheckCircle2, XCircle, PlayCircle, Users, MessageSquare, Video, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RoadmapDesign = () => {
  const problems = [
    "উচ্চারণগত", "আঞ্চলিকতা", "মুখের জড়তা", 
    "কণ্ঠ শ্রুতিমধুর না থাকা", "বডি ল্যাঙ্গুয়েজ", 
    "ক্যামেরা ভীতি", "জনসম্মুখে কথা বলা"
  ];

  const solutions = [
    { title: "মেইন ক্লাস", desc: "পাঠ্যক্রমে উল্লেখিত বিষয় শেখানো হয়", icon: <Star className="w-5 h-5" /> },
    { title: "প্রবলেম সলভিং ক্লাস", desc: "সমস্যা সমাধান করা হয়", icon: <MessageSquare className="w-5 h-5" /> },
    { title: "প্র্যাক্টিস ক্লাস", desc: "চর্চা করানো হয়", icon: <Users className="w-5 h-5" /> },
    { title: "স্পেশাল ক্লাস", desc: "দুর্বলদের আলাদা করে শেখানো হয়", icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: "ভিডিও প্রেজেন্টেশন", desc: "৩,০০০ মিনিট প্রেজেন্টেশনের মাধ্যমে প্রয়োগ করানো হয়", icon: <Video className="w-5 h-5" /> },
    { title: "প্রেজেন্টেশন রিভিউ ক্লাস", desc: "প্রয়োগের সমস্যাগুলো সমাধান করা হয়", icon: <PlayCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-8 p-6 bg-purple-50/50 rounded-3xl overflow-hidden shadow-sm border border-purple-100">
      
      {/* --- PROBLEM SECTION (Purple Tune) --- */}
      <div className="md:w-1/3 bg-[#2e1065] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
        {/* Branding Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/30 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-fuchsia-600/20 rounded-full -ml-12 -mb-12 blur-2xl" />
        
        <div className="relative z-10">
          <Badge variant="outline" className="mb-4 border-purple-400 text-purple-200 px-4 py-1 rounded-full text-lg font-bold">
            সমস্যা
          </Badge>
          <ul className="space-y-4 mt-6">
            {problems.map((text, index) => (
              <li key={index} className="flex items-center gap-3 text-purple-100/90 border-b border-purple-800/50 pb-2 text-md">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {/* pt-1 for optical Bengali centering */}
                <span className="leading-relaxed pt-1">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- SOLUTION SECTION (Purple Tune) --- */}
      <div className="md:w-2/3 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-extrabold text-[#2e1065] pt-1">সমাধান</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full opacity-30" />
        </div>

        <div className="relative space-y-4">
          {/* The Purple Roadmap Vertical Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-purple-100 hidden sm:block" />

          {solutions.map((item, index) => (
            <Card key={index} className="border-none bg-white shadow-sm hover:shadow-md hover:shadow-purple-100 transition-all duration-300 group">
              <CardContent className="p-4 flex items-center gap-4">
                {/* Step Indicator - Purple branding */}
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xl border-2 border-white group-hover:bg-purple-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="pt-1">{index + 1}</span>
                </div>

                {/* Content Box */}
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-2 sm:gap-6 ml-2">
                  <div className="sm:w-40 shrink-0">
                    <h4 className="text-[#2e1065] font-bold text-lg leading-tight pt-1 group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="hidden sm:block h-8 w-[1px] bg-purple-50" />

                  <p className="text-slate-500 text-sm leading-relaxed flex-1 pt-1 font-medium">
                    {item.desc}
                  </p>
                  
                  <div className="hidden md:flex text-purple-200 group-hover:text-purple-600 transition-colors">
                    {item.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDesign;