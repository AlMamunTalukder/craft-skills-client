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
            offerPrice: 190,
          }),
        }
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
      className="relative overflow-hidden py-16 md:py-28 bg-[#1F1F1F]"
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
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 backdrop-blur-2xl bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            {/* ORANGE TOP LINE */}
            <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-white to-[#F26422]" />

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* =========================
                  LEFT SIDE
              ========================= */}
              <div className="relative p-6 md:p-12 flex flex-col justify-between overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F26422]/20 blur-[120px] rounded-full" />

                <div className="relative z-10">
                  {/* TAG */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F26422]/30 bg-[#F26422]/10 mb-6">
                    <GraduationCap className="text-[#F26422]" size={16} />
                    <span className="text-[#F26422] font-bold text-sm uppercase tracking-widest">
                      Exclusive Live Masterclass
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
                    ৪ ঘণ্টার{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
                      পাওয়ারফুল লাইভ মাস্টারক্লাস{" "}
                    </span>
                    মাত্র ,
                  </h2>

                  {/* PRICE CARD */}
                  <div className="mt-10 relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F26422]/10 via-transparent to-white/5" />

                    <div className="relative z-10">
                      <p className="text-white/50 text-sm font-bold uppercase tracking-[3px] mb-3">
                        Today’s Special Offer
                      </p>

                      <div className="flex items-end gap-4 flex-wrap">
                        <div>
                          <p className="text-white/40 text-lg line-through font-bold">
                            ৫,৫০০ টাকা
                          </p>

                          <h3 className="text-5xl md:text-7xl font-black text-[#F26422] leading-none">
                            ১৯০৳
                          </h3>
                        </div>

                        <div className="mb-2 px-4 py-2 rounded-full bg-[#F26422] text-white font-black text-sm shadow-lg shadow-[#F26422]/30">
                          LIMITED OFFER
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FEATURES */}
                </div>
              </div>

              {/* =========================
                  RIGHT SIDE FORM
              ========================= */}
              <div className="relative bg-white p-6 md:p-12">
                {/* FORM GLOW */}
                <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#F26422]/10 blur-[100px] rounded-full" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                      এখনই রেজিস্ট্রেশন করুন
                    </h3>

                    <p className="text-gray-500 mt-3">
                      আপনার আসন নিশ্চিত করতে নিচের তথ্যগুলো পূরণ করুন।
                    </p>
                  </div>

                  <AppForm
                    onSubmit={handleSubmit}
                    resolver={zodResolver(exclusiveOfferSchema)}
                  >
                    <div className="space-y-5">
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

                      {/* PAYMENT NOTICE */}
                      <div className="rounded-2xl border border-[#F26422]/20 bg-[#F26422]/5 p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-semibold">
                            আজকের অফার প্রাইস
                          </span>

                          <div className="text-right">
                            <p className="text-gray-400 line-through text-sm font-bold">
                              ৫,৫০০৳
                            </p>

                            <h4 className="text-3xl font-black text-[#F26422]">
                              ১৯০৳
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <SubmitButton
                        title="মাত্র ১৯০ টাকায় জয়েন করুন"
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
