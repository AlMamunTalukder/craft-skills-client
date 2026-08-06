/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Gift,
  Loader2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../FormInputs/SubmitButton";
import { FaArrowCircleRight } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import {
  exclusiveGiftSchema,
  type ExclusiveGiftFormData,
} from "@/schemas/exclusive-gift";

interface ExclusiveGiftFormProps {
  batchId?: string;
}

export default function ExclusiveGiftForm({ batchId }: ExclusiveGiftFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ExclusiveGiftFormData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("প্রক্রিয়া চলছে...");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/exclusive-gift/confirm`
        : "http://localhost:5000/api/v1/exclusive-gift/confirm";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          batchId,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed: ${response.status}`);
      }

      toast.success("সফলভাবে জমা হয়েছে!", { id: toastId });

      router.push(
        `/exclusive-gift/success?name=${encodeURIComponent(
          data.name,
        )}&timestamp=${Date.now()}`,
      );
    } catch (err: any) {
      toast.error(err.message || "জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F2] py-6 md:py-10 px-3 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative">
        <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] border border-orange-100 shadow-[0_20px_40px_-12px_rgba(242,100,34,0.12)] overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-br from-[#F26422] to-[#d94f1d] p-6 text-white text-center relative">
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
                <Gift className="w-7 h-7 md:w-10 md:h-10 text-yellow-200" />
              </div>
              <h2 className="text-xl md:text-3xl font-black tracking-tight mb-2 px-2">
                এক্সক্লুসিভ গিফট ডাউনলোড
              </h2>
              <div className="h-1 w-10 md:w-12 bg-yellow-400 rounded-full mb-3"></div>
              <p className="text-xs md:text-sm font-medium text-orange-100 px-4">
                আপনার তথ্যগুলো দিয়ে সের্টিফিকেট ও গিফটটি সংগ্রহ করুন
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-5 md:p-8">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(exclusiveGiftSchema)}
              defaultValues={{
                name: "",
                phone: "",
                whatsapp: "",
                email: "",
                occupation: "",
              }}
            >
              <GiftFormFields isSubmitting={isSubmitting} />
            </AppForm>
          </div>

          {/* Footer */}
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

function GiftFormFields({ isSubmitting }: { isSubmitting: boolean }) {
  // Runs INSIDE AppForm's FormProvider → useFormContext works here.
  const { setValue } = useFormContext();

  // Allow ONLY digits (0-9) in phone/whatsapp input boxes.
  const digit = (field: string) => (e: any) =>
    setValue(field, (e.target.value || "").replace(/[^0-9]/g, ""));

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="relative">
        <div className="flex items-center gap-2.5 mb-5 md:mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-lg md:rounded-xl flex items-center justify-center text-[#F26422]">
            <User size={18} className="md:w-5 md:h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-base md:text-lg">
            ব্যক্তিগত তথ্য
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-6 md:gap-y-5">
          <TextInput
            label="পূর্ণ নাম"
            name="name"
            placeholder="আপনার পূর্ণ নাম লিখুন"
            icon={User}
            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
            required
          />

          <TextInput
            label="মোবাইল নাম্বার"
            name="phone"
            placeholder="০১XXXXXXXXX"
            icon={Phone}
            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
            onChange={digit("phone")}
            required
          />

          <TextInput
            label="হোয়াটসঅ্যাপ"
            name="whatsapp"
            placeholder="০১XXXXXXXXX"
            icon={MessageSquare}
            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
            onChange={digit("whatsapp")}
            required
          />

          <TextInput
            label="ইমেইল"
            name="email"
            placeholder="your@email.com"
            type="email"
            icon={Mail}
            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
          />

          <div className="md:col-span-2">
            <TextInput
              label="পেশা"
              name="occupation"
              placeholder="আপনার পেশা"
              icon={Briefcase}
              className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all rounded-lg md:rounded-xl text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 to-amber-500/5 rounded-xl md:rounded-2xl"></div>
        <div className="relative bg-white/40 border border-orange-100 p-4 md:p-5 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4">
          <div className="bg-orange-500 text-white p-1.5 md:p-2 rounded-lg shadow-lg shadow-orange-200 shrink-0">
            <Gift className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <h4 className="font-bold text-orange-900 text-[13px] md:text-sm mb-0.5 md:mb-1 italic">
              এক্সক্লুসিভ গিফট সুবিধা
            </h4>
            <p className="text-orange-700 text-[11px] md:text-xs leading-tight md:leading-relaxed">
              সাবমিট করার সাথে সাথেই আপনি{" "}
              <span className="font-black underline">
                সের্টিফিকেট এবং এক্সক্লুসিভ গিফটটি
              </span>{" "}
              পেয়ে যাবেন।
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 md:pt-0">
        <SubmitButton
          title="সের্টিফিকেট ও গিফট নিন"
          loadingTitle="প্রক্রিয়া চলছে..."
          className="w-full py-4 md:py-5 bg-linear-to-r from-[#F26422] to-[#d94f1d] text-white font-black rounded-xl md:rounded-2xl text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 active:scale-[0.95]"
          loaderIcon={Loader2}
          buttonIcon={FaArrowCircleRight}
          loading={isSubmitting}
        />
      </div>
    </div>
  );
}