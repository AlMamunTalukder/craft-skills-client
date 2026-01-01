/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AppForm from "./Forms/AppForm";
import TextInput from "./FormInputs/TextInput";
import PasswordInput from "./FormInputs/PasswordInput";
import SubmitButton from "./FormInputs/SubmitButton";
import { RegisterFormData, registerFormSchema } from "@/schemas/auth";
import { registration } from "../lib/api";

const AuthRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);

    try {
      const registrationData = await registration(data);
      if (registrationData.success) {
        toast.success("সফলভাবে রেজিস্টার হয়েছে!");
        router.push("/login");
      } else {
        toast.error(
          registrationData.message ||
            "রেজিস্ট্রেশনের সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "রেজিস্ট্রেশনের সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppForm resolver={zodResolver(registerFormSchema)} onSubmit={onSubmit}>
      <TextInput
        label="আপনার পূর্ণ নাম"
        name="firstName"
        icon={User}
        placeholder="জন ডো"
      />

      <TextInput
        label="ব্যবহারকারীর নাম"
        name="lastName"
        icon={User}
        placeholder="আপনার পছন্দের ব্যবহারকারীর নাম"
      />

      <TextInput
        label="ইমেইল"
        name="email"
        icon={ShieldCheck}
        placeholder="example@email.com"
        toolTipText="রেজিস্ট্রেশনের সময় যে ইমেইল ও পাসওয়ার্ড ব্যবহার করেছিলেন, সেটিই এখানে দিতে হবে"
      />

      <TextInput
        label="ফোন নম্বর"
        name="phone"
        icon={ShieldCheck}
        placeholder="01XXXXXXXXX"
        toolTipText="রেজিস্ট্রেশনের সময় যে ফোন নম্বর ও পাসওয়ার্ড ব্যবহার করেছিলেন, সেটিই এখানে দিতে হবে"
      />

      <PasswordInput
        label="পাসওয়ার্ড"
        name="password"
        icon={Lock}
        placeholder="••••••••"
      />
      <PasswordInput
        label="পাসওয়ার্ড নিশ্চিত করুন"
        name="confirmPassword"
        icon={Lock}
        placeholder="••••••••"
      />

      <TextInput
        label="ব্যাচ নম্বর"
        name="batch"
        icon={User}
        placeholder="আপনার ব্যাচ নম্বর লিখুন"
        type="number"
      />

      <SubmitButton
        title="রেজিস্টার"
        loadingTitle="অ্যাকাউন্ট তৈরি হচ্ছে..."
        loading={loading}
        className="w-full mt-4"
        loaderIcon={Loader2}
        showIcon={false}
      />
    </AppForm>
  );
};

export default AuthRegistrationForm;
