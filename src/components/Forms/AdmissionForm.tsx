/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Forms/AdmissionForm.tsx
"use client";

import { useState, useCallback, useMemo } from "react";
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
import Image from "next/image";

// Components
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import SubmitButton from "../FormInputs/SubmitButton";
import FormSelect from "../FormInputs/FormSelect";

// Types & Utils
import { Batch, Course } from "@/types";
import { validateCoupon } from "@/src/app/api/coupons/couponapply";
import { courseAdmissionSchema } from "@/schemas/admission";

// --- Static Data (Moved outside component to prevent re-creation) ---
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

interface AdmissionFormProps {
  batch: Batch | null;
  courses: Course[];
}

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
  
  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [couponState, setCouponState] = useState<CouponState>({
    code: "",
    applied: false,
    discountAmount: 0,
    error: null,
    loading: false,
  });

  // --- Derived State (Memoized Price Calculations) ---
  // This replaces the useEffect and calculateTotalPrice function
  const priceDetails = useMemo(() => {
    if (!selectedCourse) return null;

    const basePrice = selectedCourse.price || 0;
    const discountPercent = selectedCourse.discount || 0;
    const paymentCharge = selectedCourse.paymentCharge || 0;

    // Calculate price after course discount
    const discountAmount = (basePrice * discountPercent) / 100;
    const priceAfterCourseDiscount = basePrice - discountAmount;
    
    // Calculate total with payment charge
    const totalWithCharge = Math.round(priceAfterCourseDiscount + paymentCharge);

    // Apply Coupon
    const finalTotal = Math.max(0, totalWithCharge - couponState.discountAmount);

    return {
      basePrice,
      discountPercent,
      paymentCharge,
      totalWithCharge, // Price before coupon
      finalTotal,      // Price after coupon
    };
  }, [selectedCourse, couponState.discountAmount]);

  // --- Handlers ---

  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    setSelectedCourse(course || null);
    
    // Reset coupon when course changes
    setCouponInput("");
    setCouponState({
      code: "",
      applied: false,
      discountAmount: 0,
      error: null,
      loading: false,
    });
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
      setCouponState((prev) => ({ ...prev, error: "কুপন কোড লিখুন", loading: false }));
      return;
    }

    if (!selectedCourse || !priceDetails) {
      setCouponState((prev) => ({ ...prev, error: "প্রথমে একটি কোর্স নির্বাচন করুন", loading: false }));
      return;
    }

    setCouponState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await validateCoupon(
        couponInput.trim(),
        priceDetails.totalWithCharge, // Use the derived price (before coupon)
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
      setCouponState((prev) => ({ ...prev, error: "কুপন যাচাই করা যায়নি", loading: false }));
      toast.error("কুপন যাচাই করা যায়নি");
    }
  }, [couponInput, selectedCourse, priceDetails]);

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

      const submitData = {
        ...data,
        batchId: batch.id,
        amount: priceDetails?.finalTotal || 0, // Use memoized price
        couponCode: couponState.applied ? couponState.code : undefined,
        discountAmount: couponState.discountAmount,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error?.message || "Admission failed");
      }

      if (!result.success) {
        throw new Error(result.message || "Admission failed");
      }

      toast.success("Admission submitted successfully!", { id: toastId });

      router.push(
        `/admission-registration/success?name=${encodeURIComponent(data.name)}&batch=${batch.name}&amount=${priceDetails?.finalTotal}`
      );
    } catch (error: any) {
      let errorMessage = "Admission failed. Please try again.";
      const msg = error.message || "";

      if (msg.includes("Validation failed")) errorMessage = "Please check your information.";
      else if (msg.includes("Batch is not active")) errorMessage = "Batch is closed.";
      else if (msg.includes("Registration deadline")) errorMessage = "Deadline passed.";

      toast.error(errorMessage, { id: toastId, duration: 5000 });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized options for Select Input
  const courseOptions = useMemo(
    () =>
      courses.map((c) => ({
        label: `${c.name} - ৳${Math.round(
          c.price - (c.price * (c.discount || 0)) / 100 + (c.paymentCharge || 0)
        ).toLocaleString()}`,
        value: c.id,
      })),
    [courses]
  );

  // --- Render ---

  if (!batch) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">No Active Batch</h2>
        <p className="mt-2">Currently, there is no active batch for admission.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 py-12 px-2 md:px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#4f0187] to-[#6d0b99] p-3 md:p-6 text-white text-center">
            <div className="flex items-center justify-center content-center md:gap-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="md:text-xl font-semibold">ভর্তি নিশ্চিত করতে ফরমটি পূরণ করুন</h2>
            </div>
            {batch?.registrationEnd && (
              <span className="block mt-2 text-yellow-300 text-sm md:text-base">
                শেষ তারিখ: {new Date(batch.registrationEnd).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <div className="p-2 md:p-8">
            <AppForm
              onSubmit={onSubmit}
              resolver={zodResolver(courseAdmissionSchema)}
              defaultValues={{ batchId: batch.id }}
            >
              <div className="space-y-6 mt-5 md:mt-0">
                {/* 1. Course Details Cards */}
                {courses.length > 0 ? (
                  <div className="w-full bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
                    <h3 className="text-[#4f0187] mb-2 flex items-center gap-2">
                      <span className="bg-white/20 rounded-md">
                        <GraduationCap />
                      </span>
                      কোর্স বিবরণ
                    </h3>

                    <div className="md:flex gap-2 space-y-2 md:space-y-0">
                      {courses.map((course) => {
                         const dPrice = course.price - (course.price * (course.discount || 0)) / 100;
                         const tPrice = Math.round(dPrice + (course.paymentCharge || 0));

                        return (
                          <div
                            key={course.id}
                            className="w-full relative overflow-hidden rounded-xl border border-[#4f0187]/10 transition-all bg-white duration-300"
                          >
                            {(course.discount || 0) > 0 && (
                              <div className="absolute -top-.5 -right-1 bg-green-500 text-white font-semibold text-sm py-1 px-3 rounded-bl-lg transform rotate-12 shadow-md z-10">
                                -{course.discount}% ছাড়
                              </div>
                            )}
                            <div className="p-2 md:p-4 text-black mt-5 md:mt-0">
                              <h4 className="flex justify-between mt-7">
                                {course.name}
                                <div>
                                  <div className="text-end space-x-3">
                                    <span className={(course.discount || 0) > 0 ? "line-through" : ""}>
                                      ৳{course.price.toLocaleString()}
                                    </span>
                                    <span>৳{tPrice.toLocaleString()}</span>
                                  </div>
                                  <p className="text-end text-xs">(খরচসহ কোর্স ফি)</p>
                                </div>
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-6 border border-[#4f0187]/10 text-center">
                    <AlertCircle className="w-12 h-12 text-[#4f0187]/50 mx-auto mb-4" />
                    <h3 className="text-[#4f0187] font-semibold">কোন কোর্স পাওয়া যায়নি</h3>
                  </div>
                )}

                {/* 2. Course Selection Dropdown */}
                {courses.length > 0 && (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
                    <FormSelect
                      name="courseId"
                      label="কোর্স নির্বাচন করুন"
                      options={courseOptions}
                      placeholder="কোর্স নির্বাচন করুন"
                      required
                      variant="outline"
                      size="md"
                      className="mt-0"
                      labelClassName="text-[#4f0187] mb-0 font-semibold flex items-center gap-2 text-lg"
                      onValueChange={handleCourseChange}
                      triggerClassName="border-[#4f0187]/20 hover:border-[#4f0187]/40"
                    />
                  </div>
                )}

                {/* 3. Coupon Section */}
                {selectedCourse && (
                  <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">কুপন কোড</h3>
                      {couponState.applied && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          {couponState.discountAmount} ৳ ছাড়
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 items-center">
                      <div className="flex-1 w-full relative">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={handleCouponChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            couponState.error
                              ? "border-red-500 focus:ring-red-500"
                              : couponState.applied
                              ? "border-green-500 focus:ring-green-400"
                              : "border-green-300 focus:border-green-400"
                          }`}
                          placeholder="কুপন কোড লিখুন"
                          disabled={couponState.applied || couponState.loading}
                          autoComplete="off"
                        />
                        {couponState.applied && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 w-full md:w-auto">
                        {couponState.applied ? (
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" /> সরান
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponState.loading || !couponInput.trim()}
                            className="px-6 py-3 bg-[#4f0187] hover:bg-[#6d0b99] text-white font-semibold text-sm rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 min-w-[120px]"
                          >
                            {couponState.loading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" /> প্রয়োগ হচ্ছে...
                              </>
                            ) : (
                              <>
                                <Tag className="w-4 h-4" /> প্রয়োগ করুন
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
                  </div>
                )}

                {/* 4. Price Summary */}
                {selectedCourse && priceDetails && (
                  <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-4 md:p-6 border border-[#4f0187]/20">
                    <h3 className="font-semibold text-[#4f0187] mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> মূল্য বিবরণ
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-700">
                        <span>মূল দাম (চার্জ সহ):</span>
                        <span className="font-medium">৳{priceDetails.totalWithCharge.toLocaleString()}</span>
                      </div>

                      {couponState.discountAmount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                          <span className="flex items-center gap-2">
                            <BadgeCheck className="w-4 h-4" /> কুপন ছাড়:
                          </span>
                          <span className="font-medium">-৳{couponState.discountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="border-t border-[#4f0187]/20 pt-3 mt-2">
                        <div className="flex justify-between items-center text-lg font-bold text-[#4f0187]">
                          <span>সর্বমোট পরিমাণ:</span>
                          <span className="text-2xl">৳{priceDetails.finalTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-right">এই পরিমাণ পরিশোধ করুন</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Personal Information */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" /> ব্যক্তিগত তথ্য
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

                {/* 6. Payment Numbers */}
                <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> পেমেন্ট নাম্বার সমূহ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentOptions.map((method) => (
                      <div
                        key={method.id}
                        className="bg-white rounded-xl border border-emerald-200 p-4 hover:-translate-y-1 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
                            <Image src={method.logo} alt={method.name} width={40} height={40} className="object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-lg text-gray-800">{method.number}</p>
                            <p className="text-sm text-gray-500 mt-1">{method.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Payment Inputs */}
                <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> পেমেন্ট তথ্য
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect
                      name="paymentMethod"
                      label="পেমেন্ট মেথড *"
                      options={paymentMethods}
                      placeholder="পেমেন্ট মেথড নির্বাচন করুন"
                      required
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

                  <div className="flex items-center gap-3 mt-6 p-3 bg-white rounded-xl border border-emerald-200">
                    <Send size={16} className="text-emerald-800" />
                    <h4 className="font-medium text-emerald-800">
                      আপনার পেমেন্ট ৬ ঘন্টার মধ্যে যাচাই করা হবে।
                    </h4>
                  </div>
                </div>

                {/* 8. Submit Button */}
                <div className="pt-4">
                  <SubmitButton
                    title="ভর্তি ফরম জমা দিন"
                    loadingTitle="প্রক্রিয়া চলছে..."
                    className="w-full py-4 bg-linear-to-r from-[#4f0187] to-[#6d0b99] text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-0"
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