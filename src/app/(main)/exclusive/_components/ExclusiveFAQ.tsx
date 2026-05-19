import Container from "@/src/components/shared/Container";

const admissionFaq = [
  {
    question: "ক্লাসটি কীভাবে এবং কোথায় হবে?",
    answer:
      "এটি একটি সম্পূর্ণ লাইভ মাস্টারক্লাস, যা Google Meet অ্যাপের মাধ্যমে সরাসরি নেওয়া হবে। ভর্তির পর আমাদের সিক্রেট হোয়াটসঅ্যাপ গ্রুপে লাইভ ক্লাসের লিংক দেওয়া হবে।",
  },
  {
    question: "আমি কি লাইভ ক্লাসের রেকর্ড ভিডিও পাব?",
    answer:
      "না, এই লাইভ ক্লাসের কোনো রেকর্ড ভিডিও দেওয়া হবে না। তবে লাইভ ক্লাসে অংশ নিলে স্পেশাল গিফট থাকবে।",
  },
  {
    question: "মাত্র ১৯০ টাকায় কি সত্যিই লাইভ ক্লাস এবং সব বোনাস পাব?",
    answer:
      "হ্যাঁ! মাত্র ১৯০ টাকায় আপনি ৪ ঘণ্টার লাইভ মাস্টারক্লাস এবং সব বোনাস পাবেন।",
  },
  {
    question: "লাইভ ক্লাসের সময় ট্রেইনারকে সরাসরি প্রশ্ন করা যাবে?",
    answer:
      "অবশ্যই! এটি সম্পূর্ণ ইন্টারেক্টিভ লাইভ সেশন।",
  },
  {
    question: "পেমেন্ট করার পর লাইভ ক্লাসের লিংক ও বোনাস কীভাবে পাব?",
    answer:
      "পেমেন্ট করার পর আপনাকে WhatsApp গ্রুপে যুক্ত করা হবে।",
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

          {/* FAQ GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {admissionFaq.map((faq, index) => (
              <div
                key={index}
                className="
                  group relative overflow-hidden rounded-2xl p-6
                  border border-white/10
                  bg-white/5 backdrop-blur-xl
                  shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_25px_70px_rgba(242,100,34,0.25)]
                "
              >

                {/* ORANGE LEFT BAR */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[rgb(242,100,34)]" />

                {/* LIGHT REFLECTION LAYER */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 opacity-60" />

                {/* QUESTION */}
                <h3 className="relative text-white font-bold text-lg pl-2">
                  {faq.question}
                </h3>

                {/* ANSWER */}
                <p className="relative text-gray-300 mt-3 pl-2 leading-relaxed">
                  {faq.answer}
                </p>

                {/* ORANGE HOVER GLOW */}
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[rgb(242,100,34)] rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500" />

                {/* BORDER GLOW */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
              </div>
            ))}

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ExclusiveFAQ;