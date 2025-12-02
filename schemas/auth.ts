import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string({ required_error: "Please enter your full name" })
      .min(2, "Name must be at least 2 characters long"),
    identifier: z
      .string({ required_error: "Please enter your email or phone" })
      .refine(
        (value) =>
          /^\S+@\S+\.\S+$/.test(value) ||
          /^(?:\+8801|01)[3-9][0-9]{8}$/.test(value),
        {
          message: "Must be a valid email or phone number",
        },
      ),
    password: z
      .string({ required_error: "Please enter your password" })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(8, "Password must be at least 8 characters long"),
    batch: z.number({
      required_error: "Please give your batch number",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

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
  password: z
    .string({ required_error: "অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন" })
    .min(8, "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
