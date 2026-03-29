"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import Container from "../shared/Container";

const Transformation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const transformations = useMemo(() => [
    {
      before: "কথা বলতে গেলে জড়তা আসে, মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না।",
      after: "পরিষ্কার ও সাবলীল উচ্চারণে অত্যন্ত আত্মবিশ্বাসের সাথে নিজের কথাগুলো গুছিয়ে বলবেন।",
    },
    {
      before: "আঞ্চলিক টানের কারণে হীনম্মন্যতায় ভোগেন এবং আত্মবিশ্বাস কমে যায়।",
      after: "আঞ্চলিকতা পুরোপুরি কাটিয়ে উঠে শুদ্ধ ও প্রফেশনাল টোনে নিজেকে প্রকাশ করবেন।",
    },
    {
      before: "কণ্ঠে কোনো গভীরতা নেই, কথা বা ভয়েস ওভার শুনলে একঘেয়ে লাগে।",
      after: "বিশেষ ব্যায়ামের মাধ্যমে কণ্ঠ হবে ভরাট, শ্রুতিমধুর এবং আকর্ষণীয়।",
    },
    {
      before: "স্টেজে উঠলেই বুক ধড়ফড় করে, আর ক্যামেরার সামনে এলেই সব কথা ভুলে যান।",
      after: "স্টেজ হোক বা ক্যামেরা—সব জায়গায় একদম ন্যাচারাল, ফ্লুয়েন্ট এবং কনফিডেন্ট থাকবেন।",
    },
    {
      before: "বডি ল্যাঙ্গুয়েজ ঠিক না থাকায় Awkward লাগে এবং প্রেজেন্টেশন খারাপ হওয়ায় সুযোগ মিস হয়।",
      after: "স্মার্ট বডি ল্যাঙ্গুয়েজ দিয়ে প্রেজেন্টেশন, ভাইভা বা মিটিং—সব জায়গায় শক্তিশালী ইমপ্যাক্ট তৈরি করবেন।",
    },
    {
      before: "স্ক্রিপ্ট লিখতে গেলে চিন্তা এলোমেলো হয়ে যায় এবং স্টুডিও সেটআপ বা এডিটিং নিয়ে কনফিউশনে থাকেন।",
      after: "নিজেই পাওয়ারফুল স্ক্রিপ্ট লিখে ডেলিভারি দেবেন এবং ঘরে বসেই প্রফেশনাল রেকর্ডিং ও এডিটিং করবেন।",
    },
    {
      before: "সঠিক গাইডলাইন বা ফিডব্যাক নেই, তাই স্কিল থাকলেও ইনকাম করার ক্লিয়ার পথ জানা নেই।",
      after: "এক্সপার্ট ফিডব্যাকে নিজেকে শুধরে পোর্টফোলিও তৈরি করবেন এবং ক্লায়েন্ট পেয়ে ইনকাম শুরু করবেন।",
    },
  ], []);

  // Function to handle auto-scrolling logic
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === transformations.length - 1 ? 0 : prev + 1;
          
          // Scroll the container to the next item
          if (scrollRef.current) {
            const itemWidth = scrollRef.current.offsetWidth * 0.9; // Match the 90vw width
            scrollRef.current.scrollTo({
              left: nextIndex * itemWidth,
              behavior: "smooth",
            });
          }
          return nextIndex;
        });
      }, 4000); // Changes every 4 seconds
    };

    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [transformations.length]);

  // Sync index if user manually swipes
  const handleManualScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.9));
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <section className="py-10 lg:py-32 bg-[#FAF9FF] relative overflow-hidden">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight">
            কোর্স শেষে আপনার ক্যারিয়ারে{" "}
            <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              যে অভাবনীয় পরিবর্তনগুলো আসবে
            </span>
          </h2> 
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleManualScroll}
          className="flex md:grid md:grid-cols-1 overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {transformations.map((item, index) => (
            <div
              key={index}
              // min-w-[90vw] ensures a bit of the next card is visible (affordance)
              className="min-w-[90vw] md:min-w-full snap-center flex flex-col md:flex-row rounded-xl md:rounded-4xl border border-white/10 bg-linear-to-br from-[#461289] via-[#4F0187] to-[#37016a] overflow-hidden shadow-sm"
            >
              <div className="flex-1 p-5 md:p-8 flex items-start gap-2 border-b md:border-b-0 md:border-r border-white/10">
                <XCircle className="shrink-0 text-red-500" size={20} />
                <div>
                  <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    কোর্স করার আগে
                  </span>
                  <p className="text-white text-sm md:text-lg leading-relaxed">
                    {item.before}
                  </p>
                </div>
              </div>

              <div className="flex-1 p-5 md:p-8 flex items-start gap-2 ">
                <CheckCircle2 className="shrink-0 text-purple-400" size={20} />
                <div>
                  <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    কোর্স করার পরে
                  </span>
                  <p className="text-white text-sm md:text-lg leading-tight">
                    {item.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {transformations.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i ? "w-8 bg-purple-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Transformation;