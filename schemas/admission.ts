// sechemas/admission.ts

import { sanitizePhoneNumber } from "@/src/utils/phone-sanitizer";
import { z } from "zod";

export const courseAdmissionSchema = z.object({
  courseId: z
    .string({
      required_error: "কোর্স নির্বাচন করুন।",
    })
    .min(1, "কোর্স নির্বাচন করুন।"),

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
    .string({
      required_error: "ইমেইল প্রদান করা আবশ্যক।",
    })
    .email("একটি বৈধ ইমেইল ঠিকানা লিখুন।"),

  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  couponCode: z.string().optional().nullable(),

  amount: z
    .number({
      required_error: "টাকার পরিমাণ লিখতে হবে।",
    })
    .min(1, "টাকার পরিমাণ লিখতে হবে।")
    .optional(),

  paymentMethod: z
    .string({
      required_error: "পেমেন্ট পদ্ধতি নির্বাচন করুন।",
    })
    .min(1, "পেমেন্ট পদ্ধতি নির্বাচন করুন।"),

  senderNumber: z
    .string({
      required_error: "পেমেন্ট প্রেরণকারীর মোবাইল নম্বর লিখতে হবে।",
    })
    .min(1, "পেমেন্ট প্রেরণকারীর মোবাইল নম্বর লিখতে হবে।")
    .refine((val) => sanitizePhoneNumber(val) !== null, {
      message: "সঠিক নম্বর দিন (ইংরেজি অক্ষর বা ভুল চিহ্ন গ্রহণযোগ্য নয়)",
    }),
});

export type admissionFormData = z.infer<typeof courseAdmissionSchema>;
