/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";
import SubmitButton from "../../FormInputs/SubmitButton";
import CourseSelection from "./CourseSelection";
import CouponSection from "./CouponSection";
import PriceSummary from "./PriceSummary";
import PersonalInfo from "./PersonalInfo";
import PaymentSection from "./PaymentSection";

// Utils & Types
import { Batch, Course } from "@/types";
import { validateCoupon } from "@/src/app/api/coupons/couponapply";
import { admissionFormData, courseAdmissionSchema } from "@/schemas/admission";
import AppForm from "../AppForm";

interface AdmissionFormProps {
  batch: Batch;
  courses: Course[];
}

export interface CouponState {
  code: string;
  applied: boolean;
  discountAmount: number;
  error: string | null;
  loading: boolean;
}

export default function AdmissionForm({ batch, courses }: AdmissionFormProps) {
  const router = useRouter();
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

  // Derived Price Calculations
  const priceDetails = useMemo(() => {
    if (!selectedCourse) return null;
    const basePrice = selectedCourse.price || 0;
    const discountPercent = selectedCourse.discount || 0;
    const paymentCharge = selectedCourse.paymentCharge || 0;
    const discountAmount = (basePrice * discountPercent) / 100;
    const priceAfterCourseDiscount = basePrice - discountAmount;
    const totalWithCharge = Math.round(
      priceAfterCourseDiscount + paymentCharge,
    );
    const finalTotal = Math.max(
      0,
      totalWithCharge - couponState.discountAmount,
    );

    return {
      basePrice,
      discountPercent,
      paymentCharge,
      totalWithCharge,
      finalTotal,
    };
  }, [selectedCourse, couponState.discountAmount]);

  // Handlers
  const handleCourseChange = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    setSelectedCourse(course || null);
    setCouponInput("");
    setCouponState({
      code: "",
      applied: false,
      discountAmount: 0,
      error: null,
      loading: false,
    });
  };

  const handleCouponApply = async () => {
    if (!couponInput.trim() || !selectedCourse || !priceDetails) return;
    setCouponState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await validateCoupon(
        couponInput.trim(),
        priceDetails.totalWithCharge,
        selectedCourse.id,
      );
      if (result.valid && result.success) {
        setCouponState({
          code: couponInput.trim(),
          applied: true,
          discountAmount: result.discountAmount || 0,
          error: null,
          loading: false,
        });
        toast.success("Coupon applied!");
      } else {
        setCouponState((prev) => ({
          ...prev,
          error: result.message,
          loading: false,
        }));
        toast.error(result.message);
      }
    } catch (error) {
      setCouponState((prev) => ({
        ...prev,
        error: "Validation failed",
        loading: false,
      }));
    }
  };

  const handleRemoveCoupon = () => {
    setCouponInput("");
    setCouponState({
      code: "",
      applied: false,
      discountAmount: 0,
      error: null,
      loading: false,
    });
  };

  const onSubmit = async (data: admissionFormData) => {
    if (!batch?.isActive) return toast.error("Batch closed");
    const toastId = toast.loading("Processing...");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL + "/admissions/register";
      const submitData = {
        ...data,
        batchId: batch.id,
        amount: priceDetails?.finalTotal || 0,
        couponCode: couponState.applied ? couponState.code : undefined,
        discountAmount: couponState.discountAmount,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message);

      toast.success("Success!", { id: toastId });
      router.push(
        `/admission-registration/success?name=${data.name}&amount=${priceDetails?.finalTotal}`,
      );
    } catch (error: any) {
      toast.error(error.message || "Failed", { id: toastId });
    }
  };

  // --- RENDERING ---
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 py-12 px-2 md:px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl">
          {/* Header Section */}
          <div className="bg-linear-to-r from-[#4f0187] to-[#6d0b99] p-4 md:p-8 text-white text-center">
            <div className="flex items-center justify-center content-center md:gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h2 className="text-lg md:text-2xl font-bold">
                ভর্তি নিশ্চিত করতে ফরমটি পূরণ করুন
              </h2>
            </div>
            {batch?.registrationEnd && (
              <span className="inline-block bg-white/10 px-4 py-1 rounded-full text-yellow-300 text-sm md:text-base border border-white/20">
                শেষ তারিখ:{" "}
                {(() => {
                  const rawDate = batch.registrationEnd;
                  // Extract date string whether it's a string, Date object, or MongoDB {$date: ...} object
                  const dateValue =
                    typeof rawDate === "object" &&
                    rawDate !== null &&
                    "$date" in rawDate
                      ? (rawDate as any).$date
                      : rawDate;

                  const parsedDate = new Date(dateValue);

                  // If parsing fails, don't show a fake date
                  if (isNaN(parsedDate.getTime())) return "নির্ধারিত নয়";

                  return parsedDate.toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                })()}
              </span>
            )}
          </div>

          {/* Form Content Section */}
          <div className="p-4 md:p-8">
            <AppForm
              onSubmit={onSubmit}
              resolver={zodResolver(courseAdmissionSchema)}
              defaultValues={{ batchId: batch.id }}
            >
              <div className="space-y-6">
                {/* 1. Course Selection */}
                <CourseSelection
                  courses={courses}
                  onCourseSelect={handleCourseChange}
                />

                {/* 2. Coupon Section */}
                <CouponSection
                  selectedCourse={selectedCourse}
                  couponInput={couponInput}
                  setCouponInput={setCouponInput}
                  couponState={couponState}
                  onApply={handleCouponApply}
                  onRemove={handleRemoveCoupon}
                />

                {/* 3. Price Summary */}
                <PriceSummary
                  selectedCourse={selectedCourse}
                  priceDetails={priceDetails}
                  couponDiscount={couponState.discountAmount}
                />

                {/* 4. Personal Info */}
                <PersonalInfo />

                {/* 5. Payment Section */}
                <PaymentSection />

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-100">
                  <SubmitButton
                    title="ভর্তি ফরম জমা দিন"
                    loadingTitle="প্রক্রিয়া চলছে..."
                    className="w-full py-4 bg-linear-to-r from-[#4f0187] to-[#6d0b99] hover:from-[#3d0169] hover:to-[#55087a] text-white font-bold rounded-xl text-lg shadow-lg border-0 transition-all duration-300 transform hover:scale-[1.01]"
                  />
                </div>
              </div>
            </AppForm>
          </div>
          {/* End Form Content */}
        </div>
      </div>
    </div>
  );
}
