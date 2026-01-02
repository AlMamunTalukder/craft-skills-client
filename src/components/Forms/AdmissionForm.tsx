/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Forms/AdmissionForm.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Loader2,
  User,
  Phone,
  Mail,
  Briefcase,
  CreditCard,
  Sparkles,
  GraduationCap,
  Tag,
  AlertCircle,
  Send,
  MessageSquare,
  CheckCircle,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Batch, Course } from "@/types";
import Image from "next/image";
import FormSelect from "../FormInputs/FormSelect";
import { validateCoupon } from "@/src/app/api/coupons/couponapply";
import { courseAdmissionSchema } from "@/schemas/admission";

interface AdmissionFormProps {
  batch: Batch | null;
  courses: Course[];
}

const paymentOptions = [
  {
    id: "bkash",
    name: "বিকাশ",
    logo: "/img/bkash.svg",
    number: "01830327579",
    type: "এজেন্ট (ক্যাশ আউট)",
  },
  {
    id: "rocket",
    name: "রকেট",
    logo: "/img/Rocket.svg",
    number: "018211813339",
    type: "পার্সোনাল (সেন্ড মানি)",
  },
  {
    id: "nagad",
    name: "নগদ",
    logo: "/img/nagad.svg",
    number: "01704682820",
    type: "পার্সোনাল (সেন্ড মানি)",
  },
];

const paymentMethods = [
  { label: "বিকাশ", value: "BKASH" },
  { label: "নগদ", value: "NAGAD" },
  { label: "রকেট", value: "ROCKET" },
];

interface CouponState {
  code: string;
  applied: boolean;
  discountAmount: number;
  error: string | null;
  loading: boolean;
  couponData?: {
    discountType: "PERCENTAGE" | "AMOUNT";
    discount: number;
    validFrom: string;
    validTo: string;
  };
}

export type admissionFormData = z.infer<typeof courseAdmissionSchema>;

export default function AdmissionForm({ batch, courses }: AdmissionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [couponState, setCouponState] = useState<CouponState>({
    code: "",
    applied: false,
    discountAmount: 0,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (!selectedCourse) {
      setFinalPrice(null);
      return;
    }

    const price = selectedCourse.price || 0;
    const discount = selectedCourse.discount || 0;
    const paymentCharge = selectedCourse.paymentCharge || 0;

    const discountedPrice = price - (price * discount) / 100;
    let totalPrice = Math.round(discountedPrice + paymentCharge);

    // Apply coupon discount if any
    if (couponState.applied && couponState.discountAmount > 0) {
      totalPrice = Math.max(0, totalPrice - couponState.discountAmount);
    }

    setFinalPrice(totalPrice);
  }, [selectedCourse, couponState]);

  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    setSelectedCourse(course || null);
    // Reset coupon when course changes
    resetCoupon();
  };

  const resetCoupon = () => {
    setCouponInput("");
    setCouponState({
      code: "",
      applied: false,
      discountAmount: 0,
      error: null,
      loading: false,
    });
  };

  const calculateTotalPrice = () => {
    if (!selectedCourse) return 0;
    const price = selectedCourse.price || 0;
    const discount = selectedCourse.discount || 0;
    const paymentCharge = selectedCourse.paymentCharge || 0;
    const discountedPrice = price - (price * discount) / 100;
    let totalPrice = Math.round(discountedPrice + paymentCharge);

    // Apply coupon discount if any
    if (couponState.applied && couponState.discountAmount > 0) {
      totalPrice = Math.max(0, totalPrice - couponState.discountAmount);
    }

    return totalPrice;
  };

  const handleCouponChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      setCouponInput(value);
      if (couponState.error) {
        setCouponState((prev) => ({ ...prev, error: null }));
      }
    },
    [couponState.error]
  );

  const handleApplyCoupon = useCallback(async () => {
    if (!couponInput.trim()) {
      setCouponState((prev) => ({
        ...prev,
        error: "কুপন কোড লিখুন",
        loading: false,
      }));
      return;
    }

    if (!selectedCourse) {
      setCouponState((prev) => ({
        ...prev,
        error: "প্রথমে একটি কোর্স নির্বাচন করুন",
        loading: false,
      }));
      return;
    }

    setCouponState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const price = selectedCourse.price || 0;
      const discount = selectedCourse.discount || 0;
      const paymentCharge = selectedCourse.paymentCharge || 0;
      const discountedPrice = price - (price * discount) / 100;
      const totalPrice = Math.round(discountedPrice + paymentCharge);

      const result = await validateCoupon(
        couponInput.trim(),
        totalPrice,
        selectedCourse.id
      );

      if (result.valid && result.success) {
        setCouponState({
          code: couponInput.trim(),
          applied: true,
          discountAmount: result.discountAmount || 0,
          error: null,
          loading: false,
          couponData: result.coupon,
        });
        toast.success(result.message || "কুপন সফলভাবে প্রয়োগ করা হয়েছে!");
      } else {
        setCouponState((prev) => ({
          ...prev,
          error: result.message || "কুপনটি ভ্যালিড নয়",
          loading: false,
        }));
        toast.error(result.message || "কুপনটি ভ্যালিড নয়");
      }
    } catch (error) {
      // console.error("Coupon application error:", error);
      setCouponState((prev) => ({
        ...prev,
        error: "কুপন যাচাই করা যায়নি",
        loading: false,
      }));
      toast.error("কুপন যাচাই করা যায়নি");
    }
  }, [couponInput, selectedCourse]);

  const handleRemoveCoupon = () => {
    setCouponInput("");
    setCouponState({
      code: "",
      applied: false,
      discountAmount: 0,
      error: null,
      loading: false,
    });
    toast.success("কুপন সরানো হয়েছে");
  };

  const onSubmit = async (data: admissionFormData) => {
    // console.log("✅ Form submit triggered!");
    // console.log("Form data:", data);

    if (!batch?.isActive) {
      toast.error("This batch is not currently accepting admissions");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing admission...");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/admissions/register`
        : "http://localhost:5000/api/v1/admissions/register";

      // console.log("🔍 [Admission Submit] Sending to:", API_URL);

      const submitData = {
        ...data,
        batchId: batch.id,
        amount: finalPrice || calculateTotalPrice(),
        couponCode: couponState.applied ? couponState.code : undefined,
        discountAmount: couponState.discountAmount,
      };

      // console.log("🔍 [Admission Submit] Data:", JSON.stringify(submitData, null, 2));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      // console.log("🔍 [Admission Submit] Response Status:", response.status);
      // console.log("🔍 [Admission Submit] Response:", result);

      if (!response.ok) {
        const errorMessage =
          result.message ||
          result.error?.message ||
          result.error ||
          `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      if (!result.success) {
        throw new Error(result.message || "Admission failed");
      }

      // console.log("✅ Admission successful!");
      toast.success("Admission submitted successfully!", { id: toastId });

      router.push(
        `/admission-registration/success?name=${encodeURIComponent(
          data.name
        )}&batch=${batch.name}&amount=${finalPrice}`
      );
    } catch (error: any) {
      // console.error("❌ [Admission Submit] Error:", error);

      let errorMessage = "Admission failed. Please try again.";

      if (error.message.includes("Validation failed")) {
        errorMessage = "Please check your information and try again.";
      } else if (error.message.includes("Batch is not active")) {
        errorMessage = "This batch is not currently accepting admissions.";
      } else if (error.message.includes("Registration deadline")) {
        errorMessage = "Registration deadline has passed for this batch.";
      } else if (error.message.includes("Course not found")) {
        errorMessage = "Selected course is not available.";
      } else if (error.message.includes("Batch not found")) {
        errorMessage = "Selected batch is not available.";
      }

      toast.error(error.message || errorMessage, {
        id: toastId,
        duration: 5000,
      });

      // Re-throw the error for AppForm to handle
      throw error;
    } finally {
      // console.log("Form submission completed");
      setIsSubmitting(false);
    }
  };

  // Prepare course options for the select dropdown
  // const courseOptions = courses.map((course) => {
  //   const discountedPrice =
  //     course.price - (course.price * (course.discount || 0)) / 100;
  //   const totalPrice = Math.round(
  //     discountedPrice + (course.paymentCharge || 0)
  //   );

  //   return {
  //     label: `${course.name} - ৳${totalPrice.toLocaleString()}`,
  //     value: course.id,
  //     originalPrice: course.price,
  //     discount: course.discount || 0,
  //     finalPrice: totalPrice,
  //   };
  // });

  const courseOptions = useMemo(
  () =>
    courses.map(c => ({
      label: `${c.name} - ৳${Math.round(
        c.price - (c.price * (c.discount || 0)) / 100 + (c.paymentCharge || 0)
      ).toLocaleString()}`,
      value: c.id,
    })),
  [courses]
);


  // Calculate original price without coupon
  const originalPrice = selectedCourse
    ? Math.round(
        selectedCourse.price -
          (selectedCourse.price * (selectedCourse.discount || 0)) / 100 +
          (selectedCourse.paymentCharge || 0)
      )
    : 0;

  if (!batch) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">No Active Batch</h2>
        <p className="mt-2">
          Currently, there is no active batch for admission.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 py-12 px-2 md:px-4">
      {/* Background decorative elements */} 
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main Form */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-linear-to-r from-[#4f0187] to-[#6d0b99] p-3 md:p-6 text-white text-center">
            <div className="flex items-center justify-center content-center md:gap-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="md:text-xl font-semibold">
                ভর্তি নিশ্চিত করতে ফরমটি পূরণ করুন
              </h2>
            </div>
            {batch?.registrationEnd && (
              <span className="block mt-2 text-yellow-300 text-sm md:text-base">
                শেষ তারিখ:{" "}
                {new Date(batch.registrationEnd).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <div className="p-2 md:p-8">
            {/* Pass resolver to AppForm - AppForm will handle the form context */}
            <AppForm
              onSubmit={onSubmit}
              resolver={zodResolver(courseAdmissionSchema)}
              defaultValues={{
                batchId: batch.id, // Set default value for batchId
              }}
            >
              <div className="space-y-6 mt-5 md:mt-0">
                {/* কোর্স বিবরণ Section - Course Details Cards */}
                {courses.length > 0 ? (
                  <div className="flex gap-5 w-full">
                    <div className="w-full bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
                      <h3 className="text-[#4f0187] mb-2 flex items-center gap-2">
                        <span className="bg-white/20 rounded-md">
                          <GraduationCap className="" />
                        </span>
                        কোর্স বিবরণ
                      </h3>

                      <div className="md:flex gap-2 space-y-2 md:space-y-0">
                        {courses.map((course) => {
                          const discountedPrice =
                            course.price -
                            (course.price * (course.discount || 0)) / 100;
                          const totalPrice = Math.round(
                            discountedPrice + (course.paymentCharge || 0)
                          );

                          return (
                            <div
                              key={course.id}
                              className="w-full relative overflow-hidden rounded-xl border border-[#4f0187]/10 transition-all bg-white duration-300 "
                            >
                              {(course.discount || 0) > 0 && (
                                <div className="absolute -top-.5 -right-1 bg-green-500 text-white font-semibold text-sm py-1 px-3 rounded-bl-lg transform rotate-12 shadow-md z-10">
                                  -{course.discount}% ছাড়
                                </div>
                              )}

                              <div className="p-2 md:p-4 text-black mt-5 md:mt-0">
                                <h4 className="flex justify-between mt-7">
                                  {course.name}
                                  <div>
                                    <div className="text-end space-x-3">
                                      <span
                                        className={
                                          (course.discount || 0) > 0
                                            ? "line-through "
                                            : ""
                                        }
                                      >
                                        ৳{course.price.toLocaleString()}
                                      </span>
                                      <span>
                                        ৳{totalPrice.toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-end text-xs">
                                      (খরচসহ কোর্স ফি পরিশোধ করুন)
                                    </p>
                                  </div>
                                </h4>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-6 border border-[#4f0187]/10 text-center">
                    <AlertCircle className="w-12 h-12 text-[#4f0187]/50 mx-auto mb-4" />
                    <h3 className="text-[#4f0187] font-semibold mb-2">
                      কোন কোর্স পাওয়া যায়নি
                    </h3>
                    <p className="text-gray-600">
                      দুঃখিত, এই মুহূর্তে কোন কোর্স উপলব্ধ নেই। অনুগ্রহ করে পরে
                      চেষ্টা করুন।
                    </p>
                  </div>
                )}

                {/* Course Selection */}
                {courses.length > 0 && (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
                    <FormSelect
                      name="courseId"
                      label="কোর্স নির্বাচন করুন"
                      options={courseOptions}
                      placeholder="কোর্স নির্বাচন করুন"
                      required={true}
                      // icon={<Book className="w-5 h-5 text-[#4f0187]" />}
                      variant="outline"
                      size="md"
                      className="mt-0"
                      labelClassName="text-[#4f0187] mb-0 font-semibold flex items-center gap-2 text-lg"
                      onValueChange={(value) => {
                        handleCourseChange(value);
                      }}
                      triggerClassName="border-[#4f0187]/20 hover:border-[#4f0187]/40"
                    />
                  </div>
                )}

                {/* Coupon Code Section */}
                {selectedCourse && (
                  <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">কুপন কোড</h3>
                      {couponState.applied && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          {couponState.discountAmount} ৳ ছাড়
                        </span>
                      )}
                    </div>

                    {/* Coupon */}
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                      <div className="flex-1 w-full">
                        <div className="relative">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={handleCouponChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all ${
                              couponState.error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : couponState.applied
                                ? "border-green-500 focus:border-green-500 focus:ring-green-400"
                                : "border-green-300 focus:border-green-400"
                            }`}
                            placeholder="কুপন কোড লিখুন"
                            disabled={
                              couponState.applied || couponState.loading
                            }
                            autoComplete="off"
                            aria-describedby="coupon-helper"
                            aria-invalid={!!couponState.error}
                          />
                          {couponState.applied && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        {couponState.applied ? (
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-lg transition-all duration-300 flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            সরান
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={
                              couponState.loading || !couponInput.trim()
                            }
                            className="px-6 py-3 bg-[#4f0187] hover:bg-[#6d0b99] text-white font-semibold text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
                          >
                            {couponState.loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                প্রয়োগ হচ্ছে...
                              </>
                            ) : (
                              <>
                                <Tag className="w-4 h-4" />
                                প্রয়োগ করুন
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {couponState.error && (
                      <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {couponState.error}
                      </div>
                    )}

                    {couponState.applied && couponState.couponData && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 text-sm">
                          <BadgeCheck className="w-4 h-4" />
                          <span>
                            {couponState.couponData.discountType ===
                            "PERCENTAGE"
                              ? `${couponState.couponData.discount}% ছাড়`
                              : `${couponState.couponData.discount} টাকা ছাড়`}{" "}
                            প্রয়োগ করা হয়েছে
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Summary */}
                {selectedCourse && finalPrice !== null && (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-4 md:p-6 border border-[#4f0187]/20">
                    <h3 className="font-semibold text-[#4f0187] mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      মূল্য বিবরণ
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-700">
                        <span>মূল দাম:</span>
                        <span className="font-medium">
                          ৳{originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {couponState.discountAmount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                          <span className="flex items-center gap-2">
                            <BadgeCheck className="w-4 h-4" />
                            কুপন ছাড়:
                          </span>
                          <span className="font-medium">
                            -৳{couponState.discountAmount.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-[#4f0187]/20 pt-3 mt-2">
                        <div className="flex justify-between items-center text-lg font-bold text-[#4f0187]">
                          <span>সর্বমোট পরিমাণ:</span>
                          <span className="text-2xl">
                            ৳{finalPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-right">
                          এই পরিমাণ পরিশোধ করুন
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    ব্যক্তিগত তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="পূর্ণ নাম *"
                      name="name"
                      placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                      icon={User}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <TextInput
                      label="মোবাইল নাম্বার *"
                      name="phone"
                      placeholder="০১XXXXXXXXX"
                      icon={Phone}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <TextInput
                      label="ইমেইল ঠিকানা"
                      name="email"
                      placeholder="your@email.com"
                      icon={Mail}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <TextInput
                      label="হোয়াটসঅ্যাপ"
                      name="whatsapp"
                      placeholder="০১XXXXXXXXX"
                      icon={MessageSquare}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <TextInput
                      label="পেশা"
                      name="occupation"
                      placeholder="আপনার পেশা লিখুন"
                      icon={Briefcase}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <TextInput
                      label="ফেসবুক প্রোফাইল"
                      name="facebook"
                      placeholder="https://facebook.com/yourprofile"
                      icon={() => <FaFacebookF className="h-5 w-5" />}
                      labelClassName="text-blue-700 font-medium"
                      className="border-blue-200 focus:border-blue-400"
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

                {/* Payment Numbers Section */}
                <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    পেমেন্ট নাম্বার সমূহ
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentOptions.map((method) => (
                      <div
                        key={method.id}
                        className="bg-white rounded-xl border border-emerald-200 p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="flex items-center gap-4">
                          {/* Payment Method Logo */}
                          <div className="relative w-14 h-14">
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-2">
                              <Image
                                src={method.logo}
                                alt={method.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-lg text-gray-800">
                              {method.number}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {method.type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    পেমেন্ট তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Payment Method Selection */}
                    <FormSelect
                      name="paymentMethod"
                      label="পেমেন্ট মেথড *"
                      options={paymentMethods}
                      placeholder="পেমেন্ট মেথড নির্বাচন করুন"
                      required={true}
                      icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
                      variant="outline"
                      size="md"
                      labelClassName="text-emerald-700 font-medium"
                      triggerClassName="border-emerald-200 focus:border-emerald-400"
                    />

                    <TextInput
                      label="সেন্ডার নাম্বার *"
                      name="senderNumber"
                      placeholder="যে নাম্বার থেকে পাঠিয়েছেন"
                      icon={Send}
                      labelClassName="text-emerald-700 font-medium"
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  {/* Payment Instructions */}
                  <div className="flex items-center gap-3 mt-6 p-3 bg-white rounded-xl border border-emerald-200">
                    <Send size={16} className="text-emerald-800" />
                    <h4 className="font-medium text-emerald-800">
                      আপনার পেমেন্ট ৬ ঘন্টার মধ্যে যাচাই করা হবে।
                    </h4>
                  </div>
                </div>

                {/* Hidden Batch ID Field - Now handled by defaultValues in AppForm */}
                {/* Remove the hidden input since it's handled by defaultValues */}

                {/* Submit Button */}
                <div className="pt-4">
                  <SubmitButton
                    title="ভর্তি ফরম জমা দিন"
                    loadingTitle="প্রক্রিয়া চলছে..."
                    className="w-full py-4 bg-linear-to-r from-[#4f0187] to-[#6d0b99] text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 border-0"
                  />
                </div>

                {!batch?.isActive && (
                  <div className="text-center text-red-600 bg-red-50 py-4 rounded-2xl border border-red-100">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">এই ব্যাচে ভর্তি বন্ধ রয়েছে।</p>
                  </div>
                )}
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </div>
  );
}
