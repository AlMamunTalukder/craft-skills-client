import * as z from "zod";

export const phoneRegex = /^(\+880|880)?1[3-9]\d{8}$/;

export const registerFormSchema = z
  .object({
    firstName: z
      .string({})
      .min(1, "First name is required")
      .max(50, "First name must not exceed 50 characters")
      .trim(),

    lastName: z
      .string({})
      .min(1, "Last name is required")
      .max(50, "Last name must not exceed 50 characters")
      .trim(),

    password: z
      .string({})
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),

    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase()
      .trim()
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .regex(phoneRegex, "Invalid phone number format")
      .trim()
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone number must be provided",
    path: ["email"],
  })
  .refine(
    (data) => {
      if (data.email && data.email.trim() === "") return false;
      if (data.phone && data.phone.trim() === "") return false;
      return true;
    },
    {
      message: "Email or phone cannot be empty",
      path: ["email"],
    },
  );

export const loginFormSchema = z.object({
  identifier: z
    .string({ required_error: "অনুগ্রহ করে আপনার ইমেইল বা ফোন নম্বর লিখুন" })
    .refine(
      (value) =>
        /^\S+@\S+\.\S+$/.test(value) ||
        /^(?:\+8801|01)[3-9][0-9]{8}$/.test(value),
      {
        message: "সঠিক ইমেইল বা ফোন নম্বর নয়",
      },
    ),
  password: z.string({ required_error: "অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
