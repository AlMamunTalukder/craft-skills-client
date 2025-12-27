// src/components/Forms/SeminarRegistrationForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { seminarFormSchema } from "@/schemas/seminar/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Loader2, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "../FormInputs/SubmitButton";
import { FaArrowCircleRight } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";

export type SeminarRegistrationFormData = z.infer<typeof seminarFormSchema>;

export default function SeminarRegistrationForm({
  seminarId,
}: {
  seminarId?: string;
}) {
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
const handleSubmit = async (data: SeminarRegistrationFormData) => {
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
      : 'http://localhost:5000/api/v1/seminars/register';

    console.log("Sending to API:", API_URL);

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
    console.log("Response status:", response.status);
    
    // Check if it's HTML
    if (responseText.startsWith('<!DOCTYPE') || responseText.startsWith('<html')) {
      console.error("Got HTML instead of JSON. Full response:", responseText.substring(0, 500));
      throw new Error(`API returned HTML. Status: ${response.status}. Check the endpoint URL.`);
    }

    // Parse as JSON
    const result = JSON.parse(responseText);
    console.log("Parsed result:", result);

    if (!response.ok || !result.success) {
      throw new Error(result.message || `Registration failed: ${response.status}`);
    }

    toast.success("Successfully registered for the seminar.", {
      id: toastId,
    });

    router.push(
      `/seminar-registration/success?name=${encodeURIComponent(
        data.name
      )}&seminarId=${encodeURIComponent(activeSeminarId)}`
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
    <AppForm onSubmit={handleSubmit} resolver={zodResolver(seminarFormSchema)}>
      <>
        <h1 className="text-[36px] text-center font-[500]">রেজিস্ট্রেশন ফরম</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-white">
          <div>
            <TextInput
              label="নাম"
              name="name"
              placeholder="আপনার নাম লিখুন"
              icon={User}
              labelClassName="text-white"
              className="bg-white"
            />
          </div>
          <div>
            <TextInput
              label="মোবাইল নাম্বার (ইংরেজি)"
              name="phone"
              placeholder="01XXXXXXXXX"
              icon={Phone}
              labelClassName="text-white"
              className="bg-white"
            />
          </div>
          <div>
            <TextInput
              label="WhatsApp নাম্বার (ইংরেজি)"
              name="whatsapp"
              placeholder="01XXXXXXXXX"
              icon={Phone}
              labelClassName="text-white"
              className="bg-white"
            />
          </div>
          <div>
            <TextInput
              label="ই-মেইল"
              name="email"
              placeholder="example@email.com"
              icon={Mail}
              labelClassName="text-white"
              className="bg-white"
            />
          </div>
          <div>
            <TextInput
              label="পেশা"
              name="occupation"
              placeholder="আপনার পেশা লিখুন"
              icon={Briefcase}
              labelClassName="text-white"
              className="bg-white"
            />
          </div>
          <div>
            <TextArea
              name="address"
              label="ঠিকানা"
              placeholder="আপনার ঠিকানা লিখুন"
              rows={2}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <SubmitButton
            title=" জমা দিন"
            loadingTitle="প্রক্রিয়া চলছে..."
            className="flex content-center items-center justify-center gap-2 w-[200px] bg-[#FFCB2C] text-lg py-3 rounded-md text-black transition-all duration-200 shadow-md hover:shadow-lg"
            loaderIcon={Loader2}
            buttonIcon={FaArrowCircleRight}
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput name="name" label="নাম" icon={User} className="bg-white"/>
          <TextInput name="phone" label="মোবাইল নাম্বার" icon={Phone} />
          <TextInput name="whatsapp" label="WhatsApp" icon={Phone} />
          <TextInput name="email" label="ই-মেইল" icon={Mail} />
          <TextInput name="occupation" label="পেশা" icon={Briefcase} />
          <TextArea name="address" label="ঠিকানা" />
        </div>

        <div className="pt-6 flex justify-center">
          <SubmitButton
            title="জমা দিন"
            loadingTitle="প্রক্রিয়া চলছে..."
            loaderIcon={Loader2}
            buttonIcon={FaArrowCircleRight}
            loading={isSubmitting}
          />
        </div> */}
      </>
    </AppForm>
  );
}
