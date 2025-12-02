"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginFormData, loginFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import PasswordInput from "../FormInputs/PasswordInput";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";
import Logo from "../global/Logo";
import AppForm from "./AppForm";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/";
  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);
      setError("");
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginData?.error) {
        setLoading(false);
        toast.error("সাইন-ইন ত্রুটি: আপনার তথ্য যাচাই করুন");
        setError("ভুল তথ্য, আবার চেষ্টা করুন");
      } else {
        setLoading(false);
        toast.success("সফলভাবে লগইন হয়েছে");
        router.push(returnUrl);
      }
    } catch (error) {
      setLoading(false);
      console.error("নেটওয়ার্ক ত্রুটি:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white border rounded-xl">
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        <AppForm resolver={zodResolver(loginFormSchema)} onSubmit={onSubmit}>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <TextInput
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
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          <SubmitButton
            title="লগইন"
            loadingTitle="লগইন হচ্ছে..."
            loading={loading}
            className="w-full mt-4"
            loaderIcon={Loader2}
            showIcon={false}
          />
        </AppForm>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
