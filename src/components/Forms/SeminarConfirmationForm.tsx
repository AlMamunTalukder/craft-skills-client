/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Download,
  Loader2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../FormInputs/SubmitButton";
import { FaArrowCircleRight } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import {
  seminarConfirmationSchema,
  type SeminarConfirmationFormData,
} from "@/schemas/seminar-confirmation";

interface SeminarPDFDownloadFormProps {
  seminar: {
    _id: string;
    id?: string;
    title: string;
    sl?: string;
  };
}

export default function SeminarPDFDownloadForm({
  seminar,
}: SeminarPDFDownloadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const seminarId = seminar._id || seminar.id;
  const seminarTitle = seminar.title || "সেমিনার";

  const handleSubmit = async (data: SeminarConfirmationFormData) => {
    if (!seminarId) {
      toast.error("Seminar information is missing");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("প্রক্রিয়া চলছে...");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/seminar-confirmations/confirm`
        : "http://localhost:5000/api/v1/seminar-confirmations/confirm";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          seminarId: seminarId,
        }),
      });

      const result = await response.json();
      // console.log("result", result);
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed: ${response.status}`);
      }

      toast.success("সফলভাবে জমা হয়েছে!", { id: toastId });

      // In your handleSubmit function, change the redirect:
      router.push(
        `/seminar-confirmation/success?name=${encodeURIComponent(
          data.name,
        )}&seminar=${encodeURIComponent(seminarTitle)}&timestamp=${Date.now()}`,
      );
    } catch (err: any) {
      // console.error("Confirmation error:", err);
      toast.error(err.message || "জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaff] py-6 md:py-10 px-3 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative">
        {/* Reduced rounded corners on mobile for better screen utilization */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white shadow-[0_20px_40px_-12px_rgba(79,1,135,0.08)] overflow-hidden">
          {/* Header: Responsive padding and font sizes */}
          <div className="bg-linear-to-br from-[#4f0187] to-[#870bb3] p-6  text-white text-center relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 100 C 30 0 70 0 100 100 Z" fill="white"></path>
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md p-2.5 md:p-3 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                <GraduationCap className="w-7 h-7 md:w-10 md:h-10 text-yellow-300" />
              </div>
              <h2 className="text-xl md:text-3xl font-black tracking-tight mb-2 px-2">
                সেমিনার PDF ডাউনলোড
              </h2>
              <div className="h-1 w-10 md:w-12 bg-yellow-400 rounded-full mb-3"></div>
              <p className="text-xs md:text-sm font-medium text-purple-100 px-4">
                নিচের তথ্যগুলো দিয়ে আপনার কপিটি সংগ্রহ করুন
              </p>
            </div>
          </div>

          {/* Form Content: Adjusted padding for mobile */}
          <div className="p-5 md:p-8">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(seminarConfirmationSchema)}
              defaultValues={{
                name: "",
                phone: "",
                whatsapp: "",
                email: "",
                occupation: "",
                address: "",
              }}
            >
              <div className="space-y-6 md:space-y-8">
                <div className="relative">
                  {/* Icon and Title alignment for mobile */}
                  <div className="flex items-center gap-2.5 mb-5 md:mb-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-50 rounded-lg md:rounded-xl flex items-center justify-center text-[#4f0187]">
                      <User size={18} className="md:w-5 md:h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-base md:text-lg">
                      ব্যক্তিগত তথ্য
                    </h3>
                  </div>

                  {/* Grid: 1 col on mobile, 2 on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 md:gap-y-5">
                    <TextInput
                      label="পূর্ণ নাম"
                      name="name"
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      icon={User}
                      className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
                      required
                    />

                    <TextInput
                      label="মোবাইল নাম্বার"
                      name="phone"
                      placeholder="০১XXXXXXXXX"
                      icon={Phone}
                      className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
                      required
                    />

                    <TextInput
                      label="হোয়াটসঅ্যাপ"
                      name="whatsapp"
                      placeholder="০১XXXXXXXXX"
                      icon={MessageSquare}
                      className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
                      required
                    />

                    <TextInput
                      label="ইমেইল"
                      name="email"
                      placeholder="your@email.com"
                      type="email"
                      icon={Mail}
                      className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
                    />
                  </div>

                  <div className="mt-4 md:mt-5">
                    <TextArea
                      name="address"
                      label="ঠিকানা"
                      placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Info Banner: More compact on mobile */}
                <div className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-teal-500/5 rounded-xl md:rounded-2xl"></div>
                  <div className="relative bg-white/40 border border-emerald-100 p-4 md:p-5 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4">
                    <div className="bg-emerald-500 text-white p-1.5 md:p-2 rounded-lg shadow-lg shadow-emerald-200 shrink-0">
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-900 text-[13px] md:text-sm mb-0.5 md:mb-1 italic">
                        ডাউনলোড সুবিধা
                      </h4>
                      <p className="text-emerald-700 text-[11px] md:text-xs leading-tight md:leading-relaxed">
                        সাবমিট করার সাথে সাথেই আপনি{" "}
                        <span className="font-black underline">PDF ফাইলটি</span>{" "}
                        পেয়ে যাবেন।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button: Full Custom Styling */}
                <div className="pt-2 md:pt-0">
                  <SubmitButton
                    title="PDF ডাউনলোড করুন"
                    loadingTitle="প্রক্রিয়া চলছে..."
                    className="w-full py-4 md:py-5 bg-linear-to-r from-[#4f0187] to-[#870bb3] text-white font-black rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 active:scale-[0.95]"
                    loaderIcon={Loader2}
                    buttonIcon={FaArrowCircleRight}
                    loading={isSubmitting}
                  />
                </div>
              </div>
            </AppForm>
          </div>

          {/* Footer: Compact padding for mobile */}
          <div className="bg-gray-50/30 p-4 md:p-6 text-center border-t border-gray-50">
            <p className="text-gray-400 text-[10px] md:text-xs font-medium flex items-center justify-center gap-2 italic uppercase tracking-[0.1em] md:tracking-widest">
              Support: +8801310726000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
