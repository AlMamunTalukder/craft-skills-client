import * as z from "zod";

export const phoneRegex = /^(01[3-9]\d{8}|8801[3-9]\d{8}|\+8801[3-9]\d{8})$/;

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters")
    .trim(),

  identifier: z
    .string({})
    .min(1, "Email or phone number is required")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = phoneRegex.test(value);
        return isEmail || isPhone;
      },
      {
        message: "Please provide a valid email or Bangladesh phone number",
      }
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),

  batchNumber: z
    .string()
    .min(1, "Batch number is required")
    .trim(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Add this loginFormSchema
export const loginFormSchema = z.object({
  identifier: z
    .string({ required_error: "Please enter your email or phone number" })
    .refine(
      (value) => {
        const isEmail = /^\S+@\S+\.\S+$/.test(value);
        const isPhone = phoneRegex.test(value);
        return isEmail || isPhone;
      },
      {
        message: "Invalid email or Bangladesh phone number",
      }
    ),
  password: z.string({ required_error: "Please enter your password" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;