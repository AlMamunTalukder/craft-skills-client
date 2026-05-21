/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Mail,
  Phone,
  User,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { object, z } from "zod";
import { FaArrowCircleRight } from "react-icons/fa";
import Container from "../../shared/Container";
import AppForm from "../AppForm";
import TextInput from "../../FormInputs/TextInput";
import SubmitButton from "../../FormInputs/SubmitButton";

/* =========================
   VALIDATION SCHEMA
========================= */

const exclusiveOfferSchema = z.object({
  name: z.string().min(1, "নাম লিখুন"),
  phone: z.string().min(11, "সঠিক মোবাইল নাম্বার লিখুন"),
  email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
});

type ExclusiveOfferFormData = z.infer<typeof exclusiveOfferSchema>;

export default function ExclusiveOfferForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ExclusiveOfferFormData) => {
    setIsSubmitting(true);

    const toastId = toast.loading("প্রসেস হচ্ছে...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exclusive-offer/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            email: data.email,
            courseTitle: "Voice & Public Speaking Masterclass",
            offerPrice: 199,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Redirecting to payment...", { id: toastId });

      // ✅ SSLCommerz Redirect (IMPORTANT FIX)
      const paymentUrl = result?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      throw new Error("Payment URL not found");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="registration-form"
      className="relative overflow-hidden py-16 md:py-28 bg-black"
    >
      {/* =========================
          PREMIUM BACKGROUND
      ========================= */}

      {/* Main Orange Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F26422]/25 blur-[180px] rounded-full" />

      {/* Side Dark Glow */}
      <div className="absolute bottom-[-250px] right-[-150px] w-[600px] h-[600px] bg-black/40 blur-[160px] rounded-full" />

      {/* Extra Orange Accent */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F26422]/15 blur-[140px] rounded-full" />

      {/* Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] border border-white/10 backdrop-blur-2xl bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            {/* ORANGE TOP LINE */}
            <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-white to-[#F26422]" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* =========================
                  LEFT SIDE
              ========================= */}
              <div className="relative p-6 sm:p-10 md:p-14 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#121215] to-[#0A0A0C]">
                {/* 🌌 HIGHER END INTEGRATED GLOW SYSTEM */}
                <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#F26422]/15 blur-[140px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-[-50px] w-[200px] h-[200px] bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 my-auto">
                  {/* PREMIUM LIVE TAG */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#F26422]/20 bg-[#F26422]/5 backdrop-blur-md mb-6 sm:mb-8 shadow-[0_4px_20px_rgba(242,100,34,0.05)] animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26422] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26422]"></span>
                    </span>
                    <GraduationCap className="text-[#F26422]" size={15} />
                    <span className="text-[#F26422] font-black text-xs uppercase tracking-widest">
                      Live Masterclass
                    </span>
                  </div>

                  {/* FLUID SINGLE-MARKUP TITLE */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
                    ৪ ঘণ্টার{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff844f] to-[#F26422] bg-size-200">
                      পাওয়ারফুল লাইভ মাস্টারক্লাস
                    </span>
                  </h2>

                  {/* DESIGNED PRICE CARD (Adapts beautifully from mobile to desktop) */}
                  <div className="mt-8 md:mt-12 relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.4)]">
                    {/* Internal ambient card texture */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F26422]/5 via-transparent to-white/[0.02] pointer-events-none" />

                    <div className=" relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-white/40 text-xs font-black uppercase tracking-[2px]">
                            Special Offer
                          </p>
                          <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black tracking-wide uppercase">
                            Save 96%
                          </span>
                        </div>

                        <div className="flex items-baseline gap-3.5 flex-wrap">
                          <h3 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                            199<span className="text-[#F26422]">৳</span>
                          </h3>
                          <p className="text-white/30 text-base sm:text-lg line-through font-bold decoration-red-500/40">
                           5,500 টাকা
                          </p>
                        </div>
                      </div>

                      {/* Callout Indicator Badge */}
                      {/* <div className="hidden sm:flex flex-col items-end text-right">
                        <p className="text-white/70 text-xs font-bold bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-sm">
                          ⚡ সীমিত সময়ের অফার
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================
                  RIGHT SIDE FORM
              ========================= */}
              <div className="relative bg-white p-3 md:p-12">
                {/* FORM GLOW */}
                <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#F26422]/10 blur-[100px] rounded-full" />

                <div className="relative z-10">
                  <div className="mb-3 md:mb-8">
                    <h3 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                      এখনই রেজিস্ট্রেশন করুন
                    </h3>
                  </div>

                  <AppForm
                    onSubmit={handleSubmit}
                    resolver={zodResolver(exclusiveOfferSchema)}
                  >
                    <div className="space-y-3 md:space-y-5">
                      <TextInput
                        label="আপনার নাম"
                        name="name"
                        placeholder="পূর্ণ নাম লিখুন"
                        icon={User}
                        labelClassName="text-[#1A1A1A] font-bold mb-2"
                        className="h-14 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#F26422] focus:ring-2 focus:ring-[#F26422]/20 transition-all"
                      />

                      <TextInput
                        label="মোবাইল নাম্বার"
                        name="phone"
                        placeholder="01XXXXXXXXX"
                        icon={Phone}
                        labelClassName="text-[#1A1A1A] font-bold mb-2"
                        className="h-14 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#F26422] focus:ring-2 focus:ring-[#F26422]/20 transition-all"
                      />

                      <TextInput
                        label="ইমেইল (Optional)"
                        name="email"
                        placeholder="example@email.com"
                        icon={Mail}
                        labelClassName="text-[#1A1A1A] font-bold mb-2"
                        className="h-14 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#F26422] focus:ring-2 focus:ring-[#F26422]/20 transition-all"
                      />

                      {/* BUTTON */}
                      <SubmitButton
                        title="মাত্র 199 টাকায় জয়েন করুন"
                        loadingTitle="সাবমিট হচ্ছে..."
                        loading={isSubmitting}
                        loaderIcon={Loader2}
                        buttonIcon={FaArrowCircleRight}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#F26422] to-[#ff7b42] hover:scale-[1.01] active:scale-95 transition-all duration-300 text-white text-lg font-black shadow-[0_15px_40px_rgba(242,100,34,0.35)]"
                      />
                    </div>
                  </AppForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
