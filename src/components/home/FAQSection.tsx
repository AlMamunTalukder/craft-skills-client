"use client";
import React from "react";
import { FaQuestionCircle, FaUserCheck } from "react-icons/fa";
import { Accordion } from "@/components/ui/accordion";
import Container from "../shared/Container";
import { CustomAccordionItem } from "../shared/CustomAccordion"; // Assuming this is your path

interface FAQ {
  question: string;
  answer: string;
}

const faqsLeft: FAQ[] = [
  {
    question: "এটি কি লাইভ কোর্স নাকি রেকর্ডেড?",
    answer:
      "এটি সম্পূর্ণ অনলাইন লাইভ কোর্স। \n নিয়মিত ক্লাস Google Meet এর মাধ্যমে অনুষ্ঠিত হবে।",
  },
  {
    question: "কোর্সটি করার জন্য আগে থেকে কি কি জানতে হবে?",
    answer:
      "কোর্স করার জন্য আগে থেকে তেমন কিছু জানতে হবে না। শুধু দেখে দেখে রিডিং পড়া ও অনলাইন সম্পর্কে প্রাথমিক ধারণা থাকলেই হবে। অন্য কোনো যোগ্যতার প্রয়োজন নেই।",
  },
  {
    question: "কোর্সে ভর্তির জন্য কোন বয়সসীমা আছে?",
    answer:
      "জি, ১০ বছরের উর্ধ্বে যে কেউ কোর্সে যুক্ত হতে পারবে। তবে দেখে দেখে স্পষ্ট বাংলা পড়তে জানতে হবে।",
  },
  {
    question: "কোর্স শেষে কি সাপোর্ট থাকবে?",
    answer:
      "জি অবশ্যই, কোর্স শেষ করার পরেও আমাদের সাপোর্ট অব্যাহত থাকবে। উচ্চারণগত সমস্যা, স্টুডিও সেটাপ, কাজ পাওয়া, ভয়েস ওভার পোর্টফোলিও তৈরিসহ সব ধরনের সমস্যা সমাধানে আমাদের সাপোর্ট থাকবে।",
  },
  {
    question: "মাত্র ৫০টি ক্লাস করেই কি শুদ্ধ ভাষায় কথা বলা সম্ভব?",
    answer:
      "প্রবল ইচ্ছাশক্তি ও কঠোর চেষ্টা থাকলে কোন কিছুই অসম্ভব নয়। \nআমাদের ৫টি ক্যাটাগরিতে মোট ৫০টি ক্লাস, দৈনিক ভিডিও প্রেজেন্টেশন (৩০০০মিনিট) কমপ্লিট, এবং ট্রেইনারের দেখানো পদ্ধতি অনুসরণ করে নিয়মিত চর্চা করলে অবশ্যই ৫০টি ক্লাস করে শুদ্ধ ভাষায় কথা বলা সম্ভব। আমরা তা নিশ্চিতভাবেই বলতে পারি।",
  },
  {
    question: "কোর্সটি শেষ করে কি ইনকাম করতে পারবো?",
    answer:
      "আমরা আশাবাদী আপনি যদি ভালোভাবে কোর্সটি সম্পন্ন করে নিজেকে দক্ষ করে গড়ে তোলেন, তাহলে অবশ্যই মার্কেট প্লেসে কাজ করে ইনকাম করতে পারবেন। কাজ পাওয়ার ক্ষেত্রে আমরা আপনাকে সর্বোচ্চ সহযোগিতা করবো।",
  },
  {
    question: "শুধুমাত্র মোবাইল দিয়ে কি কোর্সটি করতে পারবো?",
    answer:
      "হ্যাঁ, শুধুমাত্র একটি স্মার্টফোন থাকলেই কোর্সটি করতে পারবেন। অন্য কোনো ডিভাইসের প্রয়োজন হবে না।",
  },
  {
    question: "ক্লাস কিভাবে হবে? ক্লাসের লিংক কোথায় পাবো?",
    answer:
      "ক্লাস অনলাইনে গুগল মিটের (Google Meet) মাধ্যমে অনুষ্ঠিত হয়। ক্লাসের লিংক আমাদের প্রাইভেট মেসেঞ্জার গ্রুপে শেয়ার করা হবে। ভর্তি কনফার্ম করলে আপনি সেই গ্রুপে যুক্ত হতে পারবেন।",
  },
  {
    question: "কোর্সে কি ক্লাসের শীট বা স্লাইড দেওয়া হয়?",
    answer: ", আমাদের কোর্সে প্রয়োজনীয় ক্লাসের শীট ও স্লাইড দেয়া হয়।",
  },
  {
    question: "কোর্স চলাকালীন সময়ে কোথা থেকে সাপোর্ট নিব?",
    answer:
      "সাপোর্ট নেয়ার জন্য আমাদের প্রাইভেট গ্রুপ আছে, যেখানে ২৪ ঘণ্টা গ্রুপ সাপোর্ট দেয়া হয়। এছাড়াও সমস্যা সমাধানের জন্য ট্রেইনারদের থেকে সরাসরি মেসেজ অথবা কল করার মাধ্যমে সাপোর্ট নিতে পারবেন।",
  },
];

const faqsRight: FAQ[] = [
  {
    question: "নিয়মিত ক্লাস না করতে পারলে কি রেকর্ড দেওয়া হবে?",
    answer:
      "দুঃখিত আমাদের ক্লাসের রেকর্ড দেয়া হয় না। তবে মেইন ক্লাসগুলো আমাদের এক্সট্রা প্রব্লেম সলভিং ও প্রাক্টিস ক্লাসের মাধ্যমে রিপিট করা হয়। অর্থাৎ আপনি একই ক্লাস তিনবার পাচ্ছেন। তাই ক্লাস ছুটে গেলেও কোনো ভয় নেই। সেই সাথে ২৪ ঘণ্টা গ্রুপ সাপোর্ট সহ সমস্যা সমাধান না হওয়া পর্যন্ত আমরা সর্বোচ্চ সাপোর্ট দিয়ে থাকি। আশা করি রেকর্ডের কোন প্রয়োজন হবে না।",
  },
  {
    question: "মেয়েদের জন্য কোর্সে কি আলাদা কোন ব্যবস্থা আছে?",
    answer:
      "জি, মেয়েদের প্রেজেন্টেশন জমা দেয়ার জন্য আলাদা প্রাইভেট গ্রুপের ব্যবস্থা আছে। তারা চাইলে পর্দা মেইনটেইন করে ক্লাস ও প্রেজেন্টেশন জমা দিতে পারবে।",
  },
  {
    question: "কোর্সটি অফলাইনে করতে চাই, কিভাবে করবো?",
    answer:
      "আপাতত অফলাইনে আমাদের কোনো কোর্স নেই। তাই আপনাকে অনলাইন কোর্সেই যুক্ত হতে হবে।",
  },
  {
    question: "দেশের বাহির থেকে কি কোর্সে যুক্ত হতে পারবো?",
    answer:
      "জি, বাংলাদেশের বাহির থেকেও কোর্সে যুক্ত হতে পারবেন। ভারত, মিশর, সৌদি আরব, কাতার, আরব আমিরাত, USA থেকে যুক্ত হওয়া আমাদের অনেক শিক্ষার্থী রয়েছে।",
  },
  {
    question: "শুধুমাত্র ভয়েস আর্টিস্ট কোর্সে ভর্তি হওয়া যাবে?",
    answer:
      "না, শুধুমাত্র ভয়েস আর্টিস্ট কোর্সে ভর্তি হওয়া যাবে না। ভয়েস আর্টিস্ট কোর্সে যুক্ত হতে হলে দুটি কোর্স একসাথেই করতে হবে।",
  },
  {
    question: "সোশ্যাল মিডিয়ায় আপনাদের সাথে কিভাবে যুক্ত হবো?",
    answer:
      "সোশ্যাল মিডিয়ায় আমাদের সাইটসমূহ। \n ওয়েবসাইট: https://craftinstitutebd.com/ \n ফেইজবুক পেইজ: https://www.facebook.com/craft99",
  },
];

const admissionFaq: FAQ[] = [
  {
    question: "ভর্তি প্রক্রিয়া কী? কিভাবে কোর্স ফি পরিশোধ করবো?",
    answer:
      "১.ওয়েবসাইটের মেনুতে এডমিশন পেইজে ক্লিক করুন। \n২.ভর্তি কনফার্ম বাটনটি ক্লিক করে ফরমের উপরে দেয়া উল্লেখিত ফি পরিশোধ করুন।",
  },
  {
    question: "কোর্স ফি কি একসাথে পরিশোধ করতে হবে?",
    answer: "জি, কোর্স ফি একসাথেই পরিশোধ করতে হবে। ভেঙে ভেঙে দেয়ার সুযোগ নেই।",
  },
];

const FAQSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#1A0033] py-12 md:py-24">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              সর্বাধিক জিজ্ঞাসিত{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                প্রশ্নসমূহ
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqsLeft.map((faq, index) => (
                  <CustomAccordionItem
                    key={index}
                    value={`left-${index}`}
                    title={faq.question}
                    description={faq.answer}
                    icon={
                      <FaQuestionCircle className="text-purple-400 text-lg md:text-xl" />
                    }
                  />
                ))}
              </Accordion>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqsRight.map((faq, index) => (
                  <CustomAccordionItem
                    key={index}
                    value={`right-${index}`}
                    title={faq.question}
                    description={faq.answer}
                    icon={
                      <FaQuestionCircle className="text-cyan-400 text-lg md:text-xl" />
                    }
                  />
                ))}
              </Accordion>

              {/* Admission Special Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2 mb-4">
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent to-white/20" />
                  <span className="text-white font-black text-lg flex items-center gap-2 text-nowrap">
                    <FaUserCheck className="text-emerald-400" /> ভর্তি সংক্রান্ত
                  </span>
                  <div className="h-px flex-grow bg-gradient-to-l from-transparent to-white/20" />
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {admissionFaq.map((faq, index) => (
                    <CustomAccordionItem
                      key={index}
                      value={`admission-${index}`}
                      title={faq.question}
                      description={faq.answer}
                      icon={
                        <FaUserCheck className="text-emerald-400 text-lg md:text-xl" />
                      }
                    />
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
