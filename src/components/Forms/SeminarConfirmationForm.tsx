/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Download,
  FileText,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  User,
  MessageSquare,
  Briefcase,
  MapPin,
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
      // const API_URL = process.env.NEXT_PUBLIC_API_URL
      //   ? `${process.env.NEXT_PUBLIC_API_URL}/seminars/confirm`
      //   : "http://localhost:5000/api/v1/seminars/confirm";

      const API_URL = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/seminar-confirmations/confirm`
        : "http://localhost:5000/api/v1/seminar-confirmations/confirm";

      console.log("Submitting to:", API_URL);
      console.log("Data:", {
        ...data,
        seminarId: seminarId,
      });

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
      console.log("result", result);
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Failed: ${response.status}`);
      }

      toast.success("সফলভাবে জমা হয়েছে!", { id: toastId });

      // In your handleSubmit function, change the redirect:
      router.push(
        `/seminar-confirmation/success?name=${encodeURIComponent(
          data.name
        )}&seminar=${encodeURIComponent(seminarTitle)}&timestamp=${Date.now()}`
      );

      // router.push(
      //   `/seminar-confirmation/success?name=${encodeURIComponent(
      //     data.name
      //   )}&seminar=${encodeURIComponent(seminarTitle)}`
      // );
    } catch (err: any) {
      console.error("Confirmation error:", err);
      toast.error(err.message || "জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-2 md:px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#4f0187] to-[#6d0b99] p-4 md:p-8 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h2 className="text-xl md:text-2xl font-bold">
                সেমিনার PDF ডাউনলোড
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-bold">{seminarTitle}</h3>
              </div>
              <p className="text-sm opacity-90">
                PDF ফাইল ডাউনলোড করতে ফরমটি পূরণ করুন
              </p>
            </div>
          </div>

          {/* Form Content Section */}
          <div className="p-4 md:p-8">
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
              <div className="space-y-6">
                {/* Personal Info Section */}
                <div className="bg-blue-50 rounded-2xl p-4 md:p-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" /> ব্যক্তিগত তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="পূর্ণ নাম *"
                      name="name"
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      icon={User}
                      className="border-blue-200 focus:border-blue-500"
                    />

                    <TextInput
                      label="মোবাইল নাম্বার *"
                      name="phone"
                      placeholder="০১XXXXXXXXX"
                      icon={Phone}
                      className="border-blue-200 focus:border-blue-500"
                    />

                    <TextInput
                      label="হোয়াটসঅ্যাপ"
                      name="whatsapp"
                      placeholder="০১XXXXXXXXX"
                      icon={MessageSquare}
                      className="border-blue-200 focus:border-blue-500"
                    />

                    <TextInput
                      label="ইমেইল"
                      name="email"
                      placeholder="your@email.com"
                      type="email"
                      icon={Mail}
                      className="border-blue-200 focus:border-blue-500"
                    />

                    <TextInput
                      label="পেশা"
                      name="occupation"
                      placeholder="আপনার পেশা"
                      icon={Briefcase}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-4">
                    <TextArea
                      name="address"
                      label="ঠিকানা"
                      placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Download Info Banner */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    ডাউনলোড সুবিধা
                  </h4>
                  <p className="text-green-700 text-sm">
                    ফরম সাবমিট করার পর আপনি PDF ফাইল ডাউনলোড করতে পারবেন
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-100">
                  <SubmitButton
                    title="PDF ডাউনলোড করুন"
                    loadingTitle="প্রক্রিয়া চলছে..."
                    className="w-full py-4 bg-gradient-to-r from-[#4f0187] to-[#6d0b99] hover:from-[#3d0169] hover:to-[#55087a] text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    loaderIcon={Loader2}
                    buttonIcon={FaArrowCircleRight}
                    loading={isSubmitting}
                  />
                </div>
              </div>
            </AppForm>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 text-center">
            <p className="text-gray-500 text-sm">
              ফরম পূরণে কোনো সমস্যা হলে যোগাযোগ করুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
