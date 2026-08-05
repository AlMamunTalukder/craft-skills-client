import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle, PhoneCall } from "lucide-react";
import {  FaWhatsapp } from "react-icons/fa";
import moment from "moment-timezone";
import Container from "@/src/components/shared/Container";
import { Suspense } from "react";
import ExclusiveOfferSuccessTracker from "../_components/ExclusiveOfferSuccessTracker";
import { Button } from "@/components/ui/button";
import { getActiveExclusiveBatch, getSiteData } from "@/lib/api";
import type { SiteContent } from "@/types";

interface PageProps {
  searchParams: Promise<{
    name?: string;
    phone?: string;
    email?: string;
    tran_id?: string;
    amount?: string;
  }>;
}

const formatBangladeshDateTime = (isoString?: string | null) => {
  if (!isoString) return null;
  try {
    const date = moment.utc(isoString).tz("Asia/Dhaka");
    if (!date.isValid()) return null;
    return date.format("DD MMM YYYY, hh:mm A");
  } catch {
    return null;
  }
};

// ✅ Fetch site settings on server side — gets dynamic WhatsApp links from DB
async function getExclusiveSettings(): Promise<Partial<SiteContent>> {
  try {
    return (await getSiteData()) || {};
  } catch {
    return {};
  }
}

export default async function ExclusiveOfferSuccessPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const { name, phone, email, amount } = params;

  const [settings, activeBatch] = await Promise.all([
    getExclusiveSettings(),
    getActiveExclusiveBatch(),
  ]);

  const courseStartDate = formatBangladeshDateTime(activeBatch?.registrationDeadline);
  const whatsappNumber = settings?.whatsappNumber || "8801700999093";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const telLink = `tel:+${whatsappNumber.replace(/[^\d]/g, "")}`;
  const displayPhone = whatsappNumber.replace(/[^\d]/g, "").startsWith("880")
    ? "0" + whatsappNumber.replace(/[^\d]/g, "").slice(3)
    : whatsappNumber;
  const WHATSAPP_GROUP = activeBatch?.whatsappGroupLink || settings?.whatsapp || whatsappLink;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0F0F0F] py-5 md:py-10">

      {/* BACKGROUND */}
      <Container>
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            {/* ── HEADER ── */}
            <div className="relative px-6 md:px-8 pt-4 md:pt-7 pb-5 text-center border-b border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(242,100,34,0.18),rgba(255,255,255,0.03),rgba(53,53,53,0.4))]" />

              <div className="relative z-10">
                <div className="mx-auto mb-3 md:mb-2 w-10 md:w-18 h-10 md:h-18 rounded-full bg-gradient-to-br from-[#F26422] to-[#ff8c57] flex items-center justify-center shadow-[0_10px_40px_rgba(242,100,34,0.5)]">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
                  রেজিস্ট্রেশন সফল হয়েছে
                </h1>

                {name && (
                  <p className="mt-5 text-lg md:text-2xl font-semibold text-white/90">
                    ধন্যবাদ, {decodeURIComponent(name)}
                  </p>
                )}

                <p className="hidden lg:block mt-2 md:mt-0 text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
                  আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন
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

              {/* CLASS START DATE */}
              {courseStartDate && (
                <div className="flex items-center gap-4 rounded-3xl border border-[#F26422]/20 bg-[#F26422]/10 px-5 py-4 backdrop-blur-sm">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F26422]/15 flex items-center justify-center">
                    <CalendarDays className="text-[#F26422]" size={22} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                      ক্লাস শুরু
                    </p>
                    <p className="text-white font-bold text-sm md:text-base">
                      {courseStartDate}
                    </p>
                  </div>
                </div>
              )}

              {/* JOIN GROUPS */}
              <div className="rounded-3xl border border-[#F26422]/20 bg-[#141414] p-3 md:p-5">
                <h3 className="text-center text-xl font-black text-white mb-2">
                  আমাদের গ্রুপগুলোতে যুক্ত হয়ে নিন
                </h3>

                <div className="space-y-3">                 

                  {/* WHATSAPP */}
                  <Link
                    href={WHATSAPP_GROUP}
                    target="_blank"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all duration-300 px-2 md:px-5 py-2 md:py-3"
                  >
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 flex items-center justify-center">
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
              <div className="border border-[#F26422]/20 bg-[#141414]    rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 border border-orange-300 rounded-full -mr-12 -mt-12 opacity-50"></div>

                <h4 className="font-bold text-white mb-5 text-lg flex items-center justify-center gap-2">
                  <span className="w-8 h-0.5 bg-orange-200"></span>
                  কোন সাহায্য প্রয়োজন?
                  <span className="w-8 h-0.5 bg-orange-200"></span>
                </h4>

                <div className="space-y-4 relative">
                  <Button
                    // variant="outline"
                    className="w-full h-auto py-3 justify-start bg-white/5 border border-white/5 hover:border-orange-600 hover:bg-white/10 transition-all duration-300 group"
                    asChild
                  >
                    <Link href={telLink} className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-3 group-hover:bg-orange-600 transition-colors">
                        <PhoneCall className="h-5 w-5 text-orange-600 group-hover:text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-white uppercase tracking-wider font-semibold">
                          সরাসরি কল করুন
                        </span>
                        <span className="text-white font-bold">
                          {displayPhone}
                        </span>
                      </div>
                    </Link>
                  </Button>

                  <Button
                    // variant="outline"
                    className="w-full h-auto py-3 justify-start bg-white/5 border border-white/5 hover:border-green-600 hover:bg-white/10 transition-all duration-300 group"
                    asChild
                  >
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      className="flex items-center"
                    >
                      <div className="bg-green-100 p-2 rounded-lg mr-3 group-hover:bg-[#25D366] transition-colors">
                        <FaWhatsapp className="h-5 w-5 text-[#25D366] group-hover:text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-white uppercase tracking-wider font-semibold">
                          হোয়াটসঅ্যাপ ম্যাসেজ
                        </span>
                        <span className="text-white font-bold">
                          {displayPhone}
                        </span>
                      </div>
                    </Link>
                  </Button>
                </div>
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