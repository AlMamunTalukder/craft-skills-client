/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Loader2, Mail, Phone, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "../FormInputs/SubmitButton";
import { FaArrowCircleRight } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import { seminarRegistrationSchema } from "@/schemas/seminar-registration";
 
export type SeminarFormData = z.infer<typeof seminarRegistrationSchema>;

export default function SeminarForm({ seminarId }: { seminarId?: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSeminarId, setActiveSeminarId] = useState<string | null>(null);
  const [isLoadingSeminar, setIsLoadingSeminar] = useState(true);

  // Fetch active seminar if no seminarId is provided
  useEffect(() => {
    if (seminarId) {
      setActiveSeminarId(seminarId);
      setIsLoadingSeminar(false);
      return;
    }

    const fetchActiveSeminar = async () => {
      try {
        const response = await fetch("/seminars/active");
        const result = await response.json();

        if (result.success && result.data) {
          setActiveSeminarId(result.data._id || result.data.id);
        } else {
          toast.error("No active seminar found");
        }
      } catch (error: any) {
        console.error("Error fetching active seminar:", error);
        toast.error("Failed to load seminar information");
      } finally {
        setIsLoadingSeminar(false);
      }
    };

    fetchActiveSeminar();
  }, [seminarId]);

  // In handleSubmit function, change this:
  const handleSubmit = async (data: SeminarFormData) => {
    if (!activeSeminarId) {
      toast.error("No active seminar available for registration");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Registering...");

    try {
      // FIX: Use the correct API endpoint
      const API_URL = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/seminars/register`
        : "http://localhost:5000/api/v1/seminars/register";

      // console.log("Sending to API:", API_URL);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          seminarId: activeSeminarId,
        }),
      });

      // Get response as text first to debug
      const responseText = await response.text();
      // console.log("Response status:", response.status);

      // Check if it's HTML
      if (
        responseText.startsWith("<!DOCTYPE") ||
        responseText.startsWith("<html")
      ) {
        console.error(
          "Got HTML instead of JSON. Full response:",
          responseText.substring(0, 500),
        );
        throw new Error(
          `API returned HTML. Status: ${response.status}. Check the endpoint URL.`,
        );
      }

      // Parse as JSON
      const result = JSON.parse(responseText);
      // console.log("Parsed result:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Registration failed: ${response.status}`,
        );
      }

      toast.success("Successfully registered for the seminar.", {
        id: toastId,
      });

      router.push(
        `/seminar-registration/success?name=${encodeURIComponent(
          data.name,
        )}&seminarId=${encodeURIComponent(activeSeminarId)}`,
      );
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Also update the fetch in useEffect:
  useEffect(() => {
    if (seminarId) {
      setActiveSeminarId(seminarId);
      setIsLoadingSeminar(false);
      return;
    }

    const fetchActiveSeminar = async () => {
      try {
        // Use consistent API endpoint
        const response = await fetch("/seminars/active");
        const result = await response.json();

        if (result.success && result.data) {
          setActiveSeminarId(result.data._id);
        } else {
          toast.error("No active seminar found");
        }
      } catch (error: any) {
        console.error("Error fetching active seminar:", error);
        toast.error("Failed to load seminar information");
      } finally {
        setIsLoadingSeminar(false);
      }
    };

    fetchActiveSeminar();
  }, [seminarId]);

  if (isLoadingSeminar) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2">Loading seminar information...</span>
      </div>
    );
  }

  if (!activeSeminarId) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">No Active Seminar</h2>
        <p className="mt-2">
          Currently, there is no active seminar for registration.
        </p>
      </div>
    );
  }

   return (
    <div className="min-h-screen w-full flex items-center justify-center  ">
      
      {/* Background Blobs (Visible on PC only to keep Mobile clean) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
         <div className="absolute top-10 left-10 w-72 h-72 bg-[#4F0187] rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#FFCB2C] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* --- HEADER SECTION --- 
            Mobile: Top Banner (Colorful & Simple)
            Desktop: Sidebar (Full Height & Detailed) 
        */}
        <div className="w-full md:w-1/3 bg-gradient-to-br from-[#4F0187] to-[#32005a] p-6 md:p-10 flex flex-col justify-center md:justify-between text-white relative overflow-hidden shrink-0">
           
           {/* Decorative Background for Mobile "Colorful" Look */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFCB2C] opacity-20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

           {/* Content */}
           <div className="relative z-10 text-center md:text-left">
             <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-3 md:mb-6 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-5 h-5 text-[#FFCB2C]" />
             </div>
             
             <h2 className="text-2xl md:text-3xl font-bold mb-2">রেজিস্ট্রেশন করুন</h2>
             <p className="text-purple-100 text-sm md:text-base opacity-90 max-w-xs mx-auto md:mx-0">
               আপনার আসন নিশ্চিত করতে নিচের তথ্যগুলো পূরণ করুন।
             </p>
           </div>
           
           {/* Desktop Decoration (Hidden on Mobile) */}
           <div className="hidden md:block relative z-10 mt-8">
              <div className="flex items-center gap-3 opacity-80">
                 <div className="w-1 h-1 bg-[#FFCB2C] rounded-full"></div>
                 <p className="text-sm">ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন</p>
              </div>
           </div>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="w-full md:w-2/3 p-5 md:p-12 bg-white">
          <AppForm
            onSubmit={handleSubmit}
            resolver={zodResolver(seminarRegistrationSchema)}
          >
            <div className="space-y-4 md:space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <TextInput
                  label="নাম"
                  name="name"
                  placeholder="আপনার নাম"
                  icon={User}
                  labelClassName="text-gray-700 font-semibold text-sm mb-1"
                  className="bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#4F0187] focus:ring-1 focus:ring-[#4F0187] rounded-lg py-2.5 transition-all"
                />
                <TextInput
                  label="মোবাইল নাম্বার"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  icon={Phone}
                  labelClassName="text-gray-700 font-semibold text-sm mb-1"
                  className="bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#4F0187] focus:ring-1 focus:ring-[#4F0187] rounded-lg py-2.5 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <TextInput
                  label="WhatsApp নাম্বার"
                  name="whatsapp"
                  placeholder="01XXXXXXXXX"
                  icon={Phone}
                  labelClassName="text-gray-700 font-semibold text-sm mb-1"
                  className="bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#4F0187] focus:ring-1 focus:ring-[#4F0187] rounded-lg py-2.5 transition-all"
                />
                <TextInput
                  label="ই-মেইল"
                  name="email"
                  placeholder="example@email.com"
                  icon={Mail}
                  labelClassName="text-gray-700 font-semibold text-sm mb-1"
                  className="bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#4F0187] focus:ring-1 focus:ring-[#4F0187] rounded-lg py-2.5 transition-all"
                />
              </div>
  
              <TextInput
                label="পেশা"
                name="occupation"
                placeholder="আপনার পেশা লিখুন"
                icon={Briefcase}
                labelClassName="text-gray-700 font-semibold text-sm mb-1"
                className="bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#4F0187] focus:ring-1 focus:ring-[#4F0187] rounded-lg py-2.5 transition-all"
              />

              <TextArea
                name="address"
                label="ঠিকানা"
                placeholder="আপনার ঠিকানা..."
              
                
              />
             

              <div className="pt-2">
                <SubmitButton
                  title="জমা দিন"
                  loadingTitle="সাবমিট হচ্ছে..."
                  className="w-full bg-[#4F0187] hover:bg-[#3a0063] text-white text-base md:text-lg font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  loaderIcon={Loader2}
                  buttonIcon={FaArrowCircleRight}
                  loading={isSubmitting}
                />
              </div>

            </div>
          </AppForm>
        </div>
      </div>
    </div>
  );


  // return (
  //   <AppForm
  //     onSubmit={handleSubmit}
  //     resolver={zodResolver(seminarRegistrationSchema)}
  //   >
  //     <>
  //       <h1 className="text-[36px] text-center font-[500]">রেজিস্ট্রেশন ফরম</h1>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-white">
  //         <div>
  //           <TextInput
  //             label="নাম"
  //             name="name"
  //             placeholder="আপনার নাম লিখুন"
  //             icon={User}
  //             labelClassName="text-white"
  //             className="bg-white"
  //           />
  //         </div>
  //         <div>
  //           <TextInput
  //             label="মোবাইল নাম্বার (ইংরেজি)"
  //             name="phone"
  //             placeholder="01XXXXXXXXX"
  //             icon={Phone}
  //             labelClassName="text-white"
  //             className="bg-white"
  //           />
  //         </div>
  //         <div>
  //           <TextInput
  //             label="WhatsApp নাম্বার (ইংরেজি)"
  //             name="whatsapp"
  //             placeholder="01XXXXXXXXX"
  //             icon={Phone}
  //             labelClassName="text-white"
  //             className="bg-white"
  //           />
  //         </div>
  //         <div>
  //           <TextInput
  //             label="ই-মেইল"
  //             name="email"
  //             placeholder="example@email.com"
  //             icon={Mail}
  //             labelClassName="text-white"
  //             className="bg-white"
  //           />
  //         </div>
  //         <div>
  //           <TextInput
  //             label="পেশা"
  //             name="occupation"
  //             placeholder="আপনার পেশা লিখুন"
  //             icon={Briefcase}
  //             labelClassName="text-white"
  //             className="bg-white"
  //           />
  //         </div>
  //         <div>
  //           <TextArea
  //             name="address"
  //             label="ঠিকানা"
  //             placeholder="আপনার ঠিকানা লিখুন"
  //             rows={2}
  //           />
  //         </div>
  //       </div>

  //       <div className="pt-4 flex justify-center">
  //         <SubmitButton
  //           title=" জমা দিন"
  //           loadingTitle="প্রক্রিয়া চলছে..."
  //           className="flex content-center items-center justify-center gap-2 w-[200px] bg-[#FFCB2C] text-lg py-3 rounded-md text-black transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] hover:bg-[#e6b91f] font-semibold"
  //           loaderIcon={Loader2}
  //           buttonIcon={FaArrowCircleRight}
  //           loading={isSubmitting}
  //         />
  //       </div>
  //     </>
  //   </AppForm>
  // );
}
