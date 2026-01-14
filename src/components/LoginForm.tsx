/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginFormData, loginFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
// import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AppForm from "./Forms/AppForm";
import TextInput from "./FormInputs/TextInput";
import PasswordInput from "./FormInputs/PasswordInput";
import SubmitButton from "./FormInputs/SubmitButton";
import { login } from "../lib/api";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/profile";
  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setError("");

    try {
      const loginData = await login({
        ...data,
        website: "client",
      });
      if (loginData.success) {
        toast.success("সফলভাবে লগইন হয়েছে!");
        router.push(returnUrl);
      } else {
        toast.error(
          loginData.message ||
            "লগইন করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        );
      }
    } catch (error: any) {
      setError(
        error?.message ||
          "লগইন করার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppForm resolver={zodResolver(loginFormSchema)} onSubmit={onSubmit}>
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <TextInput
        type="text"
        label="ইমেইল অথবা মোবাইল"
        name="identifier"
        icon={ShieldCheck}
        placeholder="example@email.com অথবা ০১২৩৪৫৬৭৮৯"
      />
      <PasswordInput
        label="পাসওয়ার্ড"
        name="password"
        icon={Lock}
        placeholder="••••••••"
      />

      {/* Forgot Password Link */}
      {/* <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </Link>
      </div> */}

      <SubmitButton
        title="লগইন"
        loadingTitle="লগইন হচ্ছে..."
        loading={loading}
        className="w-full mt-4"
        loaderIcon={Loader2}
        showIcon={false}
      />
    </AppForm>
  );
}
