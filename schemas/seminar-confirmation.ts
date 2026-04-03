import { sanitizePhoneNumber } from "@/src/utils/phone-sanitizer";
import { z } from "zod";

export const seminarConfirmationSchema = z.object({
  name: z
    .string({
      required_error: "আপনার পুরো নাম লিখুন।",
    })
    .min(1, "আপনার পুরো নাম লিখুন।"),

  phone: z
    .string({
      required_error: "মোবাইল নম্বর প্রদান করা আবশ্যক।",
    })
    .min(11, "অনুগ্রহ করে একটি সঠিক ১১-সংখ্যার মোবাইল নম্বর প্রদান করুন।")
    .refine((val) => sanitizePhoneNumber(val) !== null, {
      message: "সঠিক নম্বর দিন (ইংরেজি অক্ষর বা ভুল চিহ্ন গ্রহণযোগ্য নয়)",
    }),

  email: z
    .string()
    .email("একটি বৈধ ইমেইল ঠিকানা লিখুন।")
    .optional()
    .or(z.literal("")),

  whatsapp: z.string().optional(),

  occupation: z.string().optional(),

  address: z.string().optional(),
});

export type SeminarConfirmationFormData = z.infer<
  typeof seminarConfirmationSchema
>;
