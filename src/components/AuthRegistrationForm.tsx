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
import { registration } from "@/lib/api";
import { sanitizePhoneNumber } from "../utils/phone-sanitizer";

const AuthRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


async function onSubmit(data: RegisterFormData) {
    setLoading(true);

    try {
        const isEmail = data.identifier.includes('@');
        let phoneNumber = "";
        
        if (!isEmail) {
            const sanitized = sanitizePhoneNumber(data.identifier);
            if (!sanitized) {
                toast.error("Invalid phone number format. Please enter a valid Bangladesh phone number (e.g., 017XXXXXXXX or 88017XXXXXXXX)");
                setLoading(false);
                return;
            }
            phoneNumber = sanitized;
        }
        
        const registrationData = {
            name: data.name,
            email: isEmail ? data.identifier : "",
            phone: !isEmail ? phoneNumber : "",
            password: data.password,
            batchNumber: data.batchNumber,
        };

        const registrationResult = await registration(registrationData);
        
        if (registrationResult.success) {
            if (registrationResult.message === 'User already exists. Batch added to existing account.') {
                toast.success("Batch added to your existing account!");
                router.push("/login");
            } else {
                toast.success("Successfully registered!");
                router.push("/login");
            }
        } else {
            // Show appropriate error messages
            if (registrationResult.message.includes('already registered')) {
                toast.error("You already have an account. Please log in instead.");
                router.push("/login");
            } else {
                toast.error(registrationResult.message || "Registration failed. Please try again.");
            }
        }
    } catch (error: any) {
        toast.error(error?.message || "An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
}

 

  return (
    <AppForm resolver={zodResolver(registerFormSchema)} onSubmit={onSubmit}>
      <TextInput
        label="Full Name"
        name="name"
        icon={User}
        placeholder="John Doe"
      />

      <TextInput
        label="Email or Phone Number"
        name="identifier"
        icon={ShieldCheck}
        placeholder="example@email.com or 018XXXXXXXX"
        toolTipText="Enter either your email OR Bangladesh phone number"
      />

      <PasswordInput
        label="Password"
        name="password"
        icon={Lock}
        placeholder="••••••••"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        icon={Lock}
        placeholder="••••••••"
      />

      <TextInput
        label="Batch Number"
        name="batchNumber"
        icon={User}
        placeholder="Enter your batch number"
      />

      <SubmitButton
        title="Register"
        loadingTitle="Creating account..."
        loading={loading}
        className="w-full mt-4"
        loaderIcon={Loader2}
        showIcon={false}
      />
    </AppForm>
  );
};

export default AuthRegistrationForm;