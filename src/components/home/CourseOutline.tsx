// import Container from "../shared/Container";

// import React from "react";
// import { BsCheckLg } from "react-icons/bs";
// import SectionTitle from "../shared/SectionTitle";
// import { GoDotFill } from "react-icons/go";

// const ListItem = ({ children }: { children: React.ReactNode }) => (
//   <li className="flex items-start gap-2 text-gray-800 leading-relaxed">
//     <GoDotFill className="text-[#4F0187] text-base min-w-[1rem] mt-[5px]" />
//     <span>{children}</span>
//   </li>
// );

// const CourseOutline = () => {
//   return (
//     <section className="py-16 bg-[#FBF5F2] relative z-10 mt-5 lg:mt-20 overflow-hidden">
//       <Container>
//         <SectionTitle text="কোর্সে যা শেখানো হবে" />

//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 rounded-2xl lg:border-l-4 lg:border-[#4F0187]">
//             <h3 className="text-2xl font-bold text-[#4F0187] mb-4">
//               শুদ্ধ উচ্চারণ কোর্স
//             </h3>
//             <ul className="space-y-2 text-lg">
//               <ListItem>শুদ্ধ উচ্চারণ</ListItem>
//               <ListItem>আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা</ListItem>
//               <ListItem>কণ্ঠস্বর চর্চা ও শ্রুতিমধুর করা</ListItem>
//               <ListItem>মুখের জড়তা কাটানোর কৌশল</ListItem>
//               <ListItem>ব্যায়াম ও মেডিটেশন</ListItem>
//               <ListItem>কণ্ঠ ভরাট কৌশল</ListItem>
//               <ListItem>আবৃত্তি নির্মাণ ও ভাবের ব্যবহার</ListItem>
//               <ListItem>মাইক্রোফোন ও সাউন্ড কনসোল ব্যবহার</ListItem>
//               <ListItem>দক্ষ আলোচক হওয়ার কৌশল </ListItem>
//               <ListItem>পাব্লিক স্পিকিং</ListItem>
//               <ListItem>ক্যামেরা ও মঞ্চ ভীতি কাটানো</ListItem>
//               <ListItem>বডি ল্যাঙ্গুয়েজ ও বাচনভঙ্গি</ListItem>
//             </ul>
//           </div>

//           <div className="bg-white p-6 rounded-2xl lg:border-r-4 lg:border-[#4F0187]">
//             <h3 className="text-2xl font-bold text-[#4F0187] mb-4">
//               ভয়েস আর্টিস্ট কোর্স
//             </h3>
//             <ul className="space-y-2 text-lg">
//               <ListItem>ভয়েস ওভার টেকনিক</ListItem>
//               <ListItem>
//               সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং, ক্যারেক্টার ভয়েস এনিমেশন ভয়েস, গল্প পাঠ, শ্রুতি নাটক ইত্যাদি সম্পর্কে বিশেষ ধারণা
//               </ListItem>
//               <ListItem>ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন</ListItem>
//               <ListItem>স্ক্রিপ্ট রাইটিং ও এনালাইসিস</ListItem>
//               <ListItem>
//               রেকর্ডিং ও এডিটিংয়ের পুরো কাজের প্রক্রিয়া দেখানো
//               </ListItem>
//               <ListItem>
//               অডিও ইন্সট্রুমেন্ট,সফটওয়্যার ও স্টুডিও সেটআপ সম্পর্কে ধারণা
//               </ListItem>
//               <ListItem>ভয়েস ওভার পোর্টফোলিও মেকিং</ListItem>
//               <ListItem>মার্কেটিং</ListItem>
//               <ListItem>ইনকামের উপায়</ListItem>
//               <ListItem>ক্লায়েন্ট ওয়ার্ক</ListItem>
//             </ul>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default CourseOutline;


import Container from "../shared/Container";
import React from "react";
import { BsCheckLg } from "react-icons/bs";
import SectionTitle from "../shared/SectionTitle";
import { GoDotFill } from "react-icons/go";

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-gray-800 leading-relaxed">
    <GoDotFill className="text-black text-base min-w-[1rem] mt-[5px]" />
    <span>{children}</span>
  </li>
);

const CourseOutline = () => {
  const courseData = [
    {
      title: "শুদ্ধ উচ্চারণ কোর্স",
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
        "পাব্লিক স্পিকিং",
        "ক্যামেরা ও মঞ্চ ভীতি কাটানো",
        "বডি ল্যাঙ্গুয়েজ ও বাচনভঙ্গি"
      ],
      // borderClass: "lg:border-l-4"
    },
    {
      title: "ভয়েস আর্টিস্ট কোর্স",
      items: [
        "ভয়েস ওভার টেকনিক",
        "সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং, ক্যারেক্টার ভয়েস এনিমেশন ভয়েস, গল্প পাঠ, শ্রুতি নাটক ইত্যাদি সম্পর্কে বিশেষ ধারণা",
        "ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন",
        "স্ক্রিপ্ট রাইটিং ও এনালাইসিস",
        "রেকর্ডিং ও এডিটিংয়ের পুরো কাজের প্রক্রিয়া দেখানো",
        "অডিও ইন্সট্রুমেন্ট,সফটওয়্যার ও স্টুডিও সেটআপ সম্পর্কে ধারণা",
        "ভয়েস ওভার পোর্টফোলিও মেকিং",
        "মার্কেটিং",
        "ইনকামের উপায়",
        "ক্লায়েন্ট ওয়ার্ক"
      ],
      // borderClass: "lg:border-r-4"
    }
  ];

  return (
    <section className="py-16 bg-[#4F0187]/40 bg-opacity-20 relative z-10 mt-5 lg:mt-20 overflow-hidden">
      <Container>
        <SectionTitle text="কোর্সে যা শেখানো হবে" />

        <div className="grid md:grid-cols-2 gap-8 w-[280px] md:w-[770px] mx-auto">
          {courseData.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg"
            >
              <h3 className="text-[28px] md:text-[36px] font-[400] text-[#4F0187] mb-4">
                {course.title}
              </h3>

              <ul className="">
                {course.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex content-center gap-2 text-[17px] md:text-[18px] text-black">  
                    <GoDotFill className="text-gray-700 mt-[6px] flex-shrink-0 h-3 w-3" />              
                    <span>{item}</span>
                  </li>
                  // <ListItem key={itemIndex}>{item}</ListItem>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseOutline;