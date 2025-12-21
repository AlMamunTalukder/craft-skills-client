/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { seminarFormSchema } from "@/schemas/seminar/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Loader2, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "../FormInputs/SubmitButton";
import { FaArrowCircleRight } from "react-icons/fa";
import AppForm from "./AppForm";
import TextInput from "../FormInputs/TextInput";
import TextArea from "../FormInputs/TextAreaInput";
import { seminarRegistration } from "@/queries/seminar/registration";

export type SeminarRegistrationFormData = z.infer<typeof seminarFormSchema>;

export default function SeminarRegistrationForm({
  seminarId,
}: {
  seminarId?: string;
}) {
  const router = useRouter();

  const handleSubmit = async (data: SeminarRegistrationFormData) => {
    const toastId = toast.loading("Registering...");

    try {
      const response = await seminarRegistration(data, seminarId);

      if (response?.error) {
        toast.error(response.error.message, { id: toastId });
        return;
      }

      toast.success("Successfully registered for the seminar.", {
        id: toastId,
      });
      router.push("/seminar-registration/success");
    } catch (err: any) {
      toast.error(err.message || "Registration failed", {
        id: toastId,
      });
    }
  };

  return (
    <AppForm onSubmit={handleSubmit} resolver={zodResolver(seminarFormSchema)}>
      <>
        <h1 className="text-[36px] text-center font-[500]">রেজিস্ট্রেশন ফরম</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput name="name" label="নাম" icon={User} />
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
          />
        </div>
      </>
    </AppForm>
  );
}
