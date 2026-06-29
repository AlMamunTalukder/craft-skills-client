// app/exclusive/success/page.tsx

import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import Container from "@/src/components/shared/Container";
import { Suspense } from "react";
import ExclusiveOfferSuccessTracker from "../_components/ExclusiveOfferSuccessTracker";

interface PageProps {
  searchParams: Promise<{
    name?: string;
    phone?: string;
    email?: string;
    tran_id?: string;
    amount?: string;
  }>;
}

// ✅ Fetch settings on server side — gets dynamic links from DB
async function getExclusiveSettings() {
  try {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      "http://localhost:5000/api/v1";

    const res = await fetch(`${API_URL}/exclusive-offer/price`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data || {};
  } catch {
    return {};
  }
}

export default async function ExclusiveOfferSuccessPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const { name, phone, email, amount } = params;

  // ✅ Fetch dynamic links from settings
  const settings = await getExclusiveSettings();
  const FACEBOOK_GROUP =
    settings.fbLink || "https://www.facebook.com/share/g/1D4Sbt1FpN/";
  const WHATSAPP_GROUP =
    settings.whatsappLink ||
    "https://chat.whatsapp.com/J9D354IJMwi7VNg7Fvq3DY?s=cl&p=a&mlu=1";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0F0F0F] py-5 md:py-10">
      {/* BACKGROUND */}
  

      <Container>
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

            {/* ── HEADER ── */}
            <div className="relative px-6 md:px-8 pt-4 md:pt-7 pb-5 text-center border-b border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(242,100,34,0.18),rgba(255,255,255,0.03),rgba(53,53,53,0.4))]" />

              <div className="relative z-10">
                <div className="mx-auto mb-3 md:mb-4 w-10 md:w-12 h-10 md:h-12 rounded-full bg-gradient-to-br from-[#F26422] to-[#ff8c57] flex items-center justify-center shadow-[0_10px_40px_rgba(242,100,34,0.5)]">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-2xl md:text-4xl font-black  leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">               
                  
                     রেজিস্ট্রেশন সফল হয়েছে
                
                </h1>

                {name && (
                  <p className="mt-5 text-lg md:text-2xl font-semibold text-white/90">
                    ধন্যবাদ, {decodeURIComponent(name)}
                  </p>
                )}

                <p className="hidden lg:block mt-2 md:mt-3 text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
                  আপনার এক্সক্লুসিভ অফার কোর্স রেজিস্ট্রেশন সফলভাবে সম্পন্ন
                  হয়েছে।
                </p>
              </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="p-2 md:p-5 space-y-5">

              {/* USER INFO */}
              {(phone || email || amount) && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-7 backdrop-blur-xl">
                  <h3 className="text-lg font-bold text-white mb-4">
                    আপনার তথ্য
                  </h3>
                  <div className="space-y-2 text-white/70">
                    {name && (
                      <p>
                        <span className="text-white font-semibold">নাম:</span>{" "}
                        {decodeURIComponent(name)}
                      </p>
                    )}
                    {phone && (
                      <p>
                        <span className="text-white font-semibold">মোবাইল:</span>{" "}
                        {phone}
                      </p>
                    )}
                    {email && (
                      <p>
                        <span className="text-white font-semibold">ইমেইল:</span>{" "}
                        {email}
                      </p>
                    )}
                    {amount && (
                      <p>
                        <span className="text-white font-semibold">পেমেন্ট:</span>{" "}
                        <span className="text-green-400 font-bold">৳{amount}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* JOIN GROUPS */}
              <div className="rounded-3xl border border-[#F26422]/20 bg-[#141414] p-3 md:p-5">
                <h3 className="text-center text-xl font-black text-white mb-2">
                  লাইভ ক্লাস লিংক এবং আপডেট পেতে নিচের গ্রুপগুলোতে যুক্ত হন
                </h3>
                

                <div className="space-y-3">
                  {/* FACEBOOK */}
                  <Link
                    href={FACEBOOK_GROUP}
                    target="_blank"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-300 px-2 md:px-5 py-2 md:py-3"
                  >
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="w-10 h-10  rounded-lg  bg-[#1877F2]/15 flex items-center justify-center">
                        <FaFacebookF className="text-[#1877F2] text-xl md:text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold md:text-base">
                          Facebook Group
                        </h4>
                        <p className="text-white/60 text-xs md:text-sm">
                          গ্রুপে জয়েন করতে ক্লিক করুন
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="text-white/40 group-hover:text-white transition-all" />
                  </Link>

                  {/* WHATSAPP */}
                  <Link
                    href={WHATSAPP_GROUP}
                    target="_blank"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all duration-300 px-2 md:px-5 py-2 md:py-3"
                  >
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="w-10 h-10  rounded-lg bg-[#25D366]/15 flex items-center justify-center">
                        <FaWhatsapp className="text-[#25D366] text-xl md:text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold md:text-base">
                          WhatsApp Group
                        </h4>
                        <p className="text-white/60 text-xs md:text-sm">
                          গ্রুপে জয়েন করতে ক্লিক করুন
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="text-white/40 group-hover:text-white transition-all" />
                  </Link>
                </div>
              </div>

              {/* CONTACT */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-2 md:p-5 backdrop-blur-xl">
                <h3 className="text-center text-white font-bold text-2xl mb-4">
                  সাহায্য প্রয়োজন?
                </h3>
                <Link
                  href="tel:01700999093"
                  className="group flex items-center rounded-2xl border border-white/10 bg-[#F26422]/10 hover:bg-[#F26422]/20 transition-all duration-300 px-2 md:px-5 py-2 md:py-3"
                >
                  <div className="w-9 md:w-14 h-9 md:h-14 rounded-lg md:rounded-2xl bg-[#F26422] flex items-center justify-center mr-2 md:mr-4">
                    <PhoneCall className="text-white md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">সরাসরি কল করুন</p>
                    <h4 className="text-white text-lg md:text-xl font-black">
                      01700999093
                    </h4>
                  </div>
                </Link>
              </div>

              {/* HOME BUTTON */}
              <Link
                href="/exclusive"
                className="group relative overflow-hidden flex items-center justify-center gap-3 rounded-lg md:rounded-2xl bg-gradient-to-r from-[#F26422] to-[#ff7b42] px-3 md:px-6 py-2 md:py-5 text-lg md:text-xl font-black text-white shadow-[0_10px_40px_rgba(242,100,34,0.4)] hover:scale-[1.02] transition-all duration-300"
              >
                <span className="relative z-10">হোমপেজে ফিরে যান</span>
                <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-all" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Link>
            </div>

            {/* FOOTER */}
            <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
              <p className="text-white/40 text-sm">Exclusive Offer Course</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F26422]" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-[#F26422]" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Suspense fallback={null}>
        <ExclusiveOfferSuccessTracker name={name} phone={phone} email={email} />
      </Suspense>
    </div>
  );
}