"use client"
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Mic2, 
  BookOpen, 
  Music, 
  Languages, 
  MonitorPlay,
  Settings
} from "lucide-react";

const CourseOutline = () => {
 const courseData = [
    {
      title: "শুদ্ধ উচ্চারণ কোর্স",
      icon: <Languages className="w-8 h-8" />,
      items: [
        "শুদ্ধ উচ্চারণ",
        "আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা",
        "কণ্ঠস্বর চর্চা ও শ্রুতিমধুর করা",
        "মুখের জড়তা কাটানোর কৌশল",
        "ব্যায়াম ও মেডিটেশন",
        "কণ্ঠ ভরাট কৌশল",
        "আবৃত্তি নির্মাণ ও ভাবের ব্যবহার",
        "মাইক্রোফোন ও সাউন্ড কনসোল ব্যবহার",
        "দক্ষ আলোচক হওয়ার কৌশল",
        "পাবলিক স্পিকিং",
        "ক্যামেরা ও মঞ্চ ভীতি কাটানো",
        "বডি ল্যাঙ্গুয়েজ ও বাচনভঙ্গি"
      ],
    },
    {
      title: "ভয়েস আর্টিস্ট কোর্স",
      icon: <Mic2 className="w-8 h-8" />,
      items: [
        "ভয়েস ওভার টেকনিক",
        "সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং ধারণা",
        "ক্যারেক্টার ও এনিমেশন ভয়েস কৌশল",
        "ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন",
        "স্ক্রিপ্ট রাইটিং ও এনালাইসিস",
        "রেকর্ডিং ও এডিটিং কাজের প্রক্রিয়া",
        "অডিও ইন্সট্রুমেন্ট ও স্টুডিও সেটআপ",
        "ভয়েস ওভার পোর্টফোলিও মেকিং",
        "মার্কেটিং ও ইনকামের উপায়",
        "ক্লায়েন্ট ওয়ার্ক"
      ],
    }
  ];

  return (
    <section className="py-16 bg-[#4F0187]/40 bg-opacity-20 relative z-10 mt-5 lg:mt-0 overflow-hidden">
      <Container>
        <SectionTitle text="কোর্সে যা শেখানো হবে" />

        <div className="grid md:grid-cols-2 gap-8 w-[280px] md:w-[900px] mx-auto">
            {courseData.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group h-full"
            >
              {/* Card Background with hover glow */}
              <div className="absolute inset-0 bg-[#4F0187] rounded-3xl translate-x-2 translate-y-2 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              <div className="relative h-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] group-hover:border-purple-200 transition-all duration-300">
                
                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-purple-50 text-[#4F0187] rounded-2xl group-hover:bg-[#4F0187] group-hover:text-white transition-all duration-500">
                    {course.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#4F0187]">
                    {course.title}
                  </h3>
                </div>

                {/* List Items */}
                <ul className="space-y-4">
                  {course.items.map((item, itemIndex) => (
                    <motion.li 
                      key={itemIndex} 
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-slate-700 group/item"
                    >
                      <div className="mt-1.5 flex-shrink-0 transition-transform group-hover/item:scale-110">
                        <CheckCircle2 size={18} className="text-[#4F0187]" />
                      </div>
                      <span className="text-[17px] md:text-[18px] leading-relaxed font-medium">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative Bottom Corner Icon */}
                <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity text-[#4F0187]">
                  {index === 0 ? <MonitorPlay size={60} /> : <BookOpen size={60} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseOutline;
// import { GoDotFill } from "react-icons/go";
// import Container from "../shared/Container";
// import SectionTitle from "../shared/SectionTitle";

// const CourseOutline = () => {
//   const courseData = [
//     {
//       title: "শুদ্ধ উচ্চারণ কোর্স",
//       items: [
//         "শুদ্ধ উচ্চারণ",
//         "আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা",
//         "কণ্ঠস্বর চর্চা ও শ্রুতিমধুর করা",
//         "মুখের জড়তা কাটানোর কৌশল",
//         "ব্যায়াম ও মেডিটেশন",
//         "কণ্ঠ ভরাট কৌশল",
//         "আবৃত্তি নির্মাণ ও ভাবের ব্যবহার",
//         "মাইক্রোফোন ও সাউন্ড কনসোল ব্যবহার",
//         "দক্ষ আলোচক হওয়ার কৌশল",
//         "পাবলিক স্পিকিং",
//         "ক্যামেরা ও মঞ্চ ভীতি কাটানো",
//         "বডি ল্যাঙ্গুয়েজ ও বাচনভঙ্গি"
//       ],
//     },
//     {
//       title: "ভয়েস আর্টিস্ট কোর্স",
//       items: [
//         "ভয়েস ওভার টেকনিক",
//         "সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং, ক্যারেক্টার ভয়েস এনিমেশন ভয়েস, গল্প পাঠ, শ্রুতি নাটক ইত্যাদি সম্পর্কে বিশেষ ধারণা",
//         "ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন",
//         "স্ক্রিপ্ট রাইটিং ও এনালাইসিস",
//         "রেকর্ডিং ও এডিটিংয়ের পুরো কাজের প্রক্রিয়া দেখানো",
//         "অডিও ইন্সট্রুমেন্ট,সফটওয়্যার ও স্টুডিও সেটআপ সম্পর্কে ধারণা",
//         "ভয়েস ওভার পোর্টফোলিও মেকিং",
//         "মার্কেটিং",
//         "ইনকামের উপায়",
//         "ক্লায়েন্ট ওয়ার্ক"
//       ],
//     }
//   ];

//   return (
//     <section className="py-16 bg-[#4F0187]/40 bg-opacity-20 relative z-10 mt-5 lg:mt-0 overflow-hidden">
//       <Container>
//         <SectionTitle text="কোর্সে যা শেখানো হবে" />

//         <div className="grid md:grid-cols-2 gap-8 w-[280px] md:w-[770px] mx-auto">
//           {courseData.map((course, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-lg"
//             >
//               <h3 className="text-[28px] md:text-[36px] font-[400] text-[#4F0187] mb-4">
//                 {course.title}
//               </h3>

//               <ul className="">
//                 {course.items.map((item, itemIndex) => (
//                     <li key={itemIndex} className="flex content-center gap-2 text-[17px] md:text-[18px] text-black">  
//                     <GoDotFill className="text-gray-700 mt-[6px] flex-shrink-0 h-3 w-3" />              
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default CourseOutline;