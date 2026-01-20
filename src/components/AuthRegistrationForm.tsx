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

const AuthRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);

    try {
      // Determine if identifier is email or phone
      const isEmail = data.identifier.includes('@');
      
      const registrationData = {
        name: data.name,
        email: isEmail ? data.identifier : "", // Empty string if not email
        phone: !isEmail ? data.identifier : "", // Empty string if not phone
        password: data.password,
        batchNumber: data.batchNumber,
      };

      const registrationResult = await registration(registrationData);
      
      if (registrationResult.success) {
        toast.success("Successfully registered!");
        router.push("/login");
      } else {
        // Show user-friendly error messages
        if (registrationResult.message.includes("email")) {
          toast.error("Email already registered. Please use a different email or log in.");
        } else if (registrationResult.message.includes("phone")) {
          toast.error("Phone number already registered. Please use a different phone or log in.");
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