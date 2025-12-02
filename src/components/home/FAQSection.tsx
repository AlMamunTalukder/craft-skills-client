"use client";
import Container from "../shared/Container";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SectionTitle from "../shared/SectionTitle";

interface FAQ {
  question: string;
  answer: string;
}

const faqsLeft: FAQ[] = [
  {
    question: "এটি কি লাইভ কোর্স নাকি রেকর্ডেড?",
    answer: "এটি সম্পূর্ণ অনলাইন লাইভ কোর্স। \n নিয়মিত ক্লাস Google Meet এর মাধ্যমে অনুষ্ঠিত হবে।",
  },
  {
    question: "কোর্সটি করার জন্য আগে থেকে কি কি জানতে হবে?",
    answer:
      "কোর্স করার জন্য আগে থেকে তেমন কিছু জানতে হবে না। শুধু দেখে দেখে রিডিং পড়া ও অনলাইন সম্পর্কে প্রাথমিক ধারণা থাকলেই হবে। অন্য কোনো যোগ্যতার প্রয়োজন নেই।",
  },
  {
    question: "কোর্সে ভর্তির জন্য কোন বয়সসীমা আছে?",
    answer: "জি, ১০ বছরের উর্ধ্বে যে কেউ কোর্সে যুক্ত হতে পারবে। তবে দেখে দেখে স্পষ্ট বাংলা পড়তে জানতে হবে।",
  },
  {
    question: "কোর্স শেষে কি সাপোর্ট থাকবে?",
    answer: "জি অবশ্যই, কোর্স শেষ করার পরেও আমাদের সাপোর্ট অব্যাহত থাকবে। উচ্চারণগত সমস্যা, স্টুডিও সেটাপ, কাজ পাওয়া, ভয়েস ওভার পোর্টফোলিও তৈরিসহ সব ধরনের সমস্যা সমাধানে আমাদের সাপোর্ট থাকবে।",
  },
  {
    question: "মাত্র ৫০টি ক্লাস করেই কি শুদ্ধ ভাষায় কথা বলা সম্ভব?",
    answer: "প্রবল ইচ্ছাশক্তি ও কঠোর চেষ্টা থাকলে কোন কিছুই অসম্ভব নয়। \nআমাদের ৫টি ক্যাটাগরিতে মোট ৫০টি ক্লাস, দৈনিক ভিডিও প্রেজেন্টেশন (৩০০০মিনিট) কমপ্লিট, এবং ট্রেইনারের দেখানো পদ্ধতি অনুসরণ করে নিয়মিত চর্চা করলে অবশ্যই ৫০টি ক্লাস করে শুদ্ধ ভাষায় কথা বলা সম্ভব। এবং আমরা তা নিশ্চিতভাবেই বলতে পারি।",
  },
  {
    question: "কোর্সটি শেষ করে কি ইনকাম করতে পারবো?",
    answer:
      "আমরা আশাবাদী আপনি যদি ভালোভাবে কোর্সটি সম্পন্ন করে নিজেকে দক্ষ করে গড়ে তোলেন, তাহলে অবশ্যই মার্কেট প্লেসে কাজ করে ইনকাম করতে পারবেন। কাজ পাওয়ার ক্ষেত্রে আমরা আপনাকে সর্বোচ্চ সহযোগিতা করবো।",
  },
  {
    question: "শুধুমাত্র মোবাইল দিয়ে কি কোর্সটি করতে পারবো?",
    answer: "হ্যাঁ শুধুমাত্র একটি স্মার্টফোন থাকলেই কোর্সটি করতে পারবেন। অন্য কোনো ডিভাইসের প্রয়োজন হবে না।",
  },
  {
    question: "ক্লাস কিভাবে হবে? ক্লাসের লিংক কোথায় পাবো?",
    answer:
      "ক্লাস অনলাইনে গুগল মিটের (Google Meet) মাধ্যমে অনুষ্ঠিত হয়। ক্লাসের লিংক আমাদের প্রাইভেট মেসেঞ্জার গ্রুপে শেয়ার করা হবে। ভর্তি কনফার্ম করলে আপনি সেই গ্রুপে যুক্ত হতে পারবেন।",
  },
  {
    question: "কোর্সে কি ক্লাসের শীট বা স্লাইড দেওয়া হয়?",
    answer: "জি, আমাদের কোর্সে প্রয়োজনীয় ক্লাসের শীট ও স্লাইড দেয়া হয়।",
  },
  {
    question: "কোর্স চলাকালীন সময়ে কোথা থেকে সাপোর্ট নিব?",
    answer: "সাপোর্ট নেয়ার জন্য আমাদের প্রাইভেট গ্রুপ আছে, যেখানে ২৪ ঘণ্টা গ্রুপ সাপোর্ট দেয়া হয়। এছাড়াও সমস্যা সমাধানের জন্য ট্রেইনারদের থেকে সরাসরি মেসেজ অথবা কল করার মাধ্যমে সাপোর্ট নিতে পারবেন।",
  },
];

const faqsRight: FAQ[] = [
  {
    question: "নিয়মিত ক্লাস না করতে পারলে কি রেকর্ড দেওয়া হবে?",
    answer: "দুঃখিত আমাদের ক্লাসের রেকর্ড দেয়া হয় না। তবে মেইন ক্লাসগুলো আমাদের এক্সট্রা প্রব্লেম সলভিং ও প্রাক্টিস ক্লাসের মাধ্যমে রিপিট করা হয়। অর্থাৎ আপনি একই ক্লাস তিনবার পাচ্ছেন। তাই ক্লাস ছুটে গেলেও কোনো ভয় নেই। সেই সাথে ২৪ ঘণ্টা গ্রুপ সাপোর্ট সহ সমস্যা সমাধান না হওয়া পর্যন্ত আমরা সর্বোচ্চ সাপোর্ট দিয়ে থাকি। আশা করি রেকর্ডের কোন প্রয়োজন হবে না। এছাড়াও রেকর্ড দেয়া হলে ক্লাসে উপস্থিতির সংখ্যা কমে যায়, সবাই রেকর্ড নির্ভর হয়ে পড়ে, ক্লাসে মনোযোগ থাকেনা, তাই আমরা রেকর্ড না দিয়ে শিক্ষার্থীদের সরাসরি শেখানোটাকে বেশি গুরুত্ব দিচ্ছি। যা এই কোর্সের অন্যতম একটি বৈশিষ্ট্য।\n \n শেখার পদ্ধতি হচ্ছে \n১. জানতে হয় । \n২. শোনানোর মাধ্যমে সমস্যা সমাধান করতে হয় । \n৩. সে অনুযায়ী প্রয়োগ করতে হয়। \nসাধারণত রেকর্ড ক্লাস থেকে অনেক কিছুই জানা হয় কিন্তু শোনানোর মাধ্যমে সমস্যা সমাধান করার সুযোগ থাকে না। তাই সমস্যা সমাধান না করে প্রয়োগ করার মাধ্যমে ত্রুটিটাকে নিজের মধ্যে বসিয়ে নিলে সেটা ঠিক করা আরও অনেক বেশি কঠিন হয়ে যায়।",
  },
  {
    question: "মেয়েদের জন্য কোর্সে কি আলাদা কোন ব্যবস্থা আছে?",
    answer: "জি, মেয়েদের প্রেজেন্টেশন জমা দেয়ার জন্য আলাদা প্রাইভেট গ্রুপের ব্যবস্থা আছে। তারা চাইলে পর্দা মেইনটেইন করে ক্লাস ও প্রেজেন্টেশন জমা দিতে পারবে।",
  },
  {
    question: "কোর্সটি অফলাইনে করতে চাই, কিভাবে করবো?",
    answer: "আপাতত অফলাইনে আমাদের কোনো কোর্স নেই। তাই আপনাকে অনলাইন কোর্সেই যুক্ত হতে হবে। তবে হ্যাঁ, পরবর্তীতে অফলাইন কোর্স চালু হলে তখন করতে পারবেন।",
  },
  {
    question: "দেশের বাহির থেকে কি কোর্সে যুক্ত হতে পারবো?",
    answer: "জি, বাংলাদেশের বাহির থেকেও কোর্সে যুক্ত হতে পারবেন। ভারত, মিশর, সৌদি আরব, কাতার, আরব আমিরাত, USA থেকে যুক্ত হওয়া আমাদের অনেক শিক্ষার্থী রয়েছে। তবে বাংলাদেশ সময়ের সাথে মিল রেখেই আপনাকে সিদ্ধান্ত নিতে হবে।",
  },
  {
    question: "শুধুমাত্র ভয়েস আর্টিস্ট কোর্সে ভর্তি হওয়া যাবে?",
    answer:
      "না, শুধুমাত্র ভয়েস আর্টিস্ট কোর্সে ভর্তি হওয়া যাবে না। ভয়েস আর্টিস্ট কোর্সে যুক্ত হতে হলে দুটি কোর্স একসাথেই করতে হবে। তবে কেউ চাইলে শুধুমাত্র “বিশুদ্ধ উচ্চারণ কোর্সটি” আলাদাভাবে করতে পারবে।",
  },
  {
    question: "সোশ্যাল মিডিয়ায় আপনাদের সাথে কিভাবে যুক্ত হবো?",
    answer:
      "সোশ্যাল মিডিয়ায় আমাদের সাইটসমূহ। \n ওয়েবসাইট: https://craftinstitutebd.com/ \n ফেইজবুক পেইজ: https://www.facebook.com/craft99 \n      ফেইসবুক গ্রুপ: https://www.facebook.com/groups/craftinstitute/?ref=share \n ভয়েস ওভার সেলিং গ্রুপ: https://www.facebook.com/groups/craftsellingmarketbd \n  ইউটিউব চ্যানেল: https://youtube.com/@CraftInstitute99 \n টেলিগ্রাম চ্যানেল: https://t.me/craftinstitute2",
  }

];
const admissionFaq: FAQ[] = [
  {
    question: "ভর্তি প্রক্রিয়া কী? কিভাবে কোর্স ফি পরিশোধ করবো?",
    answer:
      "১.ওয়েবসাইটের মেনুতে এডমিশন পেইজে ক্লিক করুন। \n২.ভর্তি কনফার্ম বাটনটি ক্লিক করে ফরমের উপরে দেয়া উল্লেখিত ফি পরিশোধ করুন। \n৩. এরপর ভর্তি ফরমটি পূরণ করুন। \n৪. পেমেন্ট করার পর লেনদেনের স্ক্রিনশট 01700999093 (WhatsApp) নাম্বারে পাঠিয়ে রাখুন। আমাদের টিম আপনার সাথে যোগাযোগ করবে। \n৫. যে কোনো প্রয়োজনে আমাদের সাথে কথা বলতে… \n01700999093, 01310726000",
  },
  {
    question: "কোর্স ফি কি একসাথে পরিশোধ করতে হবে?",
    answer: "জি, কোর্স ফি একসাথেই পরিশোধ করতে হবে। ভেঙে ভেঙে দেয়ার সুযোগ নেই।",
  },
  {
    question: "কোর্সে যুক্ত হওয়ার পর ভর্তি বাতিলের কোন সুযোগ আছে?",
    answer: "দুঃখিত, ভর্তি কনফার্ম করার পর বাতিলের কোনো সুযোগ নেই। তাই আপনাকে অনুরোধ করবো চিন্তা ভাবনা করে ভর্তি কনফার্ম করার জন্য।",
  },
];



const FAQSection = () => {
  const [activeIndexLeft, setActiveIndexLeft] = useState<number | null>(null);
  const [activeIndexRight, setActiveIndexRight] = useState<number | null>(null);
  const [activeIndexAdmission, setActiveIndexAdmission] = useState<number | null>(null);

  const toggleFAQLeft = (index: number) => {
    setActiveIndexLeft(activeIndexLeft === index ? null : index);
  };

  const toggleFAQRight = (index: number) => {
    setActiveIndexRight(activeIndexRight === index ? null : index);
  };
  const toggleFAQAdmission = (index: number) => {
    setActiveIndexAdmission(activeIndexAdmission === index ? null : index);
  };

  return (
    <div className="bg-[#FFF7EF] py-10 md:py-20">
      <Container>
        <SectionTitle text="সর্বাধিক জিজ্ঞাসিত প্রশ্ন" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left FAQ */}
          <div className="space-y-2">
            {faqsLeft.map((faq, index) => {
              const isActive = activeIndexLeft === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-md overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQLeft(index)}
                    className={`w-full flex justify-between items-center px-[15px] md:px-5 py-4 text-left font-[400px] text-gray-800 focus:outline-none text-[18px]  ${isActive ? 'bg-[#E7E7E7]' : 'bg-white'
                      }`}

                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`px-5 transition-all duration-300 text-gray-600 overflow-hidden ${isActive ? "max-h-auto py-3" : "max-h-0 py-0"
                      }`}
                  >
                    <div className="transition-opacity duration-300 text-[18px] font-[400px]">
                      {faq.answer.split('\n').map((line, idx) => {
                        const parts = line.split(/(https?:\/\/[^\s]+)/g);
                        return (
                          <p key={idx}>
                            {parts.map((part, i) =>
                              part.match(/https?:\/\/[^\s]+/) ? (
                                <a
                                  key={i}
                                  href={part}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline break-all"
                                >
                                  {part}
                                </a>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right FAQ */}

          <div className="space-y-2">

            <div className="space-y-2">
              {faqsRight.map((faq, index) => {
                const isActive = activeIndexRight === index;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-md overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQRight(index)}
                      className={`w-full flex justify-between items-center px-[15px] md:px-5 py-4 text-left font-medium text-gray-800 focus:outline-none text-[18px] ${isActive ? 'bg-[#E7E7E7]' : 'bg-white'
                        }`}
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <div
                      className={`px-5 transition-all duration-300 text-gray-600 overflow-hidden ${isActive ? "max-h-auto py-3" : "max-h-0 py-0"
                        }`}
                    >

                      <div className="transition-opacity duration-300 text-[18px]">
                        {faq.answer.split('\n').map((line, idx) => {

                          const parts = line.split(/(https?:\/\/[^\s]+)/g);

                          return (
                            <p key={idx}>
                              {parts.map((part, i) =>
                                part.match(/https?:\/\/[^\s]+/) ? (
                                  <a
                                    key={i}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline break-all"
                                  >
                                    {part}
                                  </a>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="bg-white rounded-md overflow-hidden transition-all duration-300"  >
                <div className="w-full px-[15px] md:px-5 py-4 text-center font-bold text-gray-800 focus:outline-none text-[20px]">
                  <span>ভর্তি সংক্রান্ত</span>
                </div>
              </div>
              {admissionFaq.map((faqs, index) => {
                const isActive = activeIndexAdmission === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-md overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQAdmission(index)}
                      className={`w-full flex justify-between items-center px-[15px] md:px-5 py-4 text-left font-medium text-gray-800 focus:outline-none text-[18px] ${isActive ? 'bg-[#E7E7E7]' : 'bg-white'
                        }`}
                    >
                      <span>{faqs.question}</span>
                      <FaChevronDown
                        className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <div
                      className={`px-5 transition-all duration-300 text-gray-600 overflow-hidden ${isActive ? "max-h-auto py-3" : "max-h-0 py-0"
                        }`}
                    >

                      <div className="transition-opacity duration-300 text-[18px]">
                        {faqs.answer.split('\n').map((line, idx) => {

                          const parts = line.split(/(https?:\/\/[^\s]+)/g);

                          return (
                            <p key={idx}>
                              {parts.map((part, i) =>
                                part.match(/https?:\/\/[^\s]+/) ? (
                                  <a
                                    key={i}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline break-all"
                                  >
                                    {part}
                                  </a>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
