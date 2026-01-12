import { z } from "zod";

export const seminarConfirmationSchema = z.object({
  name: z
    .string({
      required_error: "আপনার পুরো নাম লিখুন।",
    })
    .min(1, "আপনার পুরো নাম লিখুন।"),

  phone: z
    .string({
      required_error: "মোবাইল নম্বর বাধ্যতামূলক।",
    })
    .min(11, "সঠিক মোবাইল নম্বর প্রদান করুন (কমপক্ষে ১১ অঙ্ক)।"),

  email: z
    .string()
    .email("একটি বৈধ ইমেইল ঠিকানা লিখুন।")
    .optional()
    .or(z.literal("")),

  whatsapp: z.string().optional(),
  
  occupation: z.string().optional(),
  
  address: z.string().optional(),
});

export type SeminarConfirmationFormData = z.infer<typeof seminarConfirmationSchema>;