import { z } from "zod";

export const courseRegistrationSchema = z.object({
  name: z
    .string({
      required_error: "আপনার পুরো নাম লিখতে হবে।",
    })
    .min(1, "আপনার পুরো নাম লিখতে হবে।"),

  phone: z
    .string({
      required_error: "মোবাইল নম্বর বাধ্যতামূলক।",
    })
    .min(11, "সঠিক মোবাইল নম্বর প্রদান করুন (কমপক্ষে ১১ অঙ্ক)।"),

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

  paymentMethod: z.object(
    {
      label: z.string().optional(),
      value: z.string().optional(),
    },
    {
      required_error: "পেমেন্ট পদ্ধতি নির্বাচন করুন।",
    },
  ),

  senderNumber: z
    .string({
      required_error: "পেমেন্ট প্রেরণকারীর মোবাইল নম্বর লিখতে হবে।",
    })
    .min(1, "পেমেন্ট প্রেরণকারীর মোবাইল নম্বর লিখতে হবে।"),

  course: z.object(
    {
      label: z.string().optional(),
      value: z.string().optional(),
    },
    {
      required_error: "কোর্স নির্বাচন করুন।",
    },
  ),
});
