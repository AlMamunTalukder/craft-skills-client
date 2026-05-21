import { Accordion } from "@/components/ui/accordion";
import Container from "@/src/components/shared/Container";
import { CustomAccordionItem } from "@/src/components/shared/CustomAccordion";
import { AlertCircle } from "lucide-react";

const admissionFaq = [
  {
    question: "ক্লাসটি কীভাবে এবং কোথায় হবে?",
    answer:
      "এটি একটি সম্পূর্ণ লাইভ মাস্টারক্লাস, যা Google Meet অ্যাপের মাধ্যমে সরাসরি নেওয়া হবে। ভর্তির পর আমাদের সিক্রেট হোয়াটসঅ্যাপ গ্রুপে লাইভ ক্লাসের লিংক দিয়ে দেওয়া হবে, যেখানে ক্লিক করে আপনি সরাসরি ক্লাসে যুক্ত হতে পারবেন।",
  },
  {
    question: "আমি কি লাইভ ক্লাসের রেকর্ড ভিডিও পাব?",
    answer:
      "না, এই লাইভ ক্লাসের কোনো রেকর্ড ভিডিও দেওয়া হবে না। তবে লাইভ ক্লাসে অংশ নিলে আপনার জন্য থাকছে দারুণ সব স্পেশাল গিফট! আর কোনো কারণে যদি এই ক্লাসটি মিস হয়ে যায়, তবে আপনি আমাদের পরবর্তী লাইভ সেমিনারে সম্পূর্ণ ফ্রিতে যুক্ত হওয়ার সুযোগ পাবেন।",
  },
  {
    question: "মাত্র 199 টাকায় কি সত্যিই লাইভ ক্লাস এবং সব বোনাস পাব?",
    answer:
      "হ্যাঁ! সীমিত সময়ের জন্য এই বিশেষ অফারে মাত্র 199 টাকায় আপনি ৪ ঘণ্টার লাইভ মাস্টারক্লাসে অংশ নেওয়ার সুযোগ পাচ্ছেন। সেই সাথে সবগুলো এক্সক্লুসিভ বোনাস রিসোর্স (PDF, ভিডিও টিউটোরিয়াল, ট্র্যাকার) একদম ফ্রি পাবেন।",
  },
  {
    question: "লাইভ ক্লাসের সময় ট্রেইনারকে সরাসরি প্রশ্ন করা যাবে?",
    answer:
      "অবশ্যই! এটি একটি সম্পূর্ণ ইন্টারেক্টিভ লাইভ সেশন। ক্লাস চলাকালীন আপনার উচ্চারণ বা কথা বলার যেকোনো সমস্যা নিয়ে ট্রেইনারকে সরাসরি প্রশ্ন করে তাৎক্ষণিক সমাধান ও গাইডলাইন পেয়ে যাবেন।",
  },
  {
    question: "পেমেন্ট করার পর লাইভ ক্লাসের লিংক ও বোনাস কীভাবে পাব?",
    answer:
      "পেমেন্ট কমপ্লিট করার সাথে সাথেই আপনাকে আমাদের একটি সিক্রেট হোয়াটসঅ্যাপ গ্রুপে (WhatsApp Secret Group) যুক্ত করে নেওয়া হবে। এই গ্রুপেই লাইভ ক্লাসের গুগল মিট লিংক, ক্লাসের শিডিউল এবং সমস্ত ফ্রি বোনাস রিসোর্স শেয়ার করা হবে।",
  },
];

const ExclusiveFAQ = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-28 bg-[rgb(53,53,53)]">

      {/* =========================
          🔥 PREMIUM COLOR SYSTEM BG
      ========================= */}

      {/* MAIN ORANGE ENERGY CORE */}
      <div className="absolute top-[-260px] left-1/2 -translate-x-1/2 w-[950px] h-[950px] bg-[rgb(242,100,34)]/40 blur-[190px] rounded-full" />

      {/* SECOND ORANGE DEPTH LAYER */}
      <div className="absolute bottom-[-240px] right-[-220px] w-[750px] h-[750px] bg-[rgb(242,100,34)]/25 blur-[170px] rounded-full" />

      {/* DARK STRUCTURE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(40,40,40)] via-[rgb(53,53,53)] to-[rgb(30,30,30)]" />

      {/* SOFT WHITE EDGE LIGHT */}
      <div className="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[140px] rounded-full" />

      {/* TEXTURE GRID */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* VIGNETTE DARK EDGES */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.75))]" />

      <Container>
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              সচরাচর জিজ্ঞাসিত{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(242,100,34)] to-orange-300">
                প্রশ্নাবলী (FAQ)
              </span>
            </h2>

            <p className="text-gray-300 mt-4">
              আপনার সকল গুরুত্বপূর্ণ প্রশ্নের উত্তর এক জায়গায়
            </p>
          </div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
              {admissionFaq.map((column, colIdx) => (
                <Accordion
                  key={colIdx}
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  <CustomAccordionItem
                    
                      value={`why-${colIdx}`}
                      title={column.question}
                      description={column.answer}
                      icon={
                        <AlertCircle size={20} className="text-[#F26422]" />
                      }
                    />
                </Accordion>
              ))}
            </div>

       
          

        </div>
      </Container>
    </section>
  );
};

export default ExclusiveFAQ;