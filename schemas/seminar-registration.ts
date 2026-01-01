import * as z from "zod";
 
export const seminarRegistrationSchema = z.object({
  name: z
    .string({
      required_error: "অনুগ্রহ করে আপনার পূর্ণ নাম প্রদান করুন।",
    })
    .min(1, "অনুগ্রহ করে আপনার পূর্ণ নাম প্রদান করুন।"),

  phone: z
    .string({
      required_error: "মোবাইল নম্বর প্রদান করা আবশ্যক।",
    })
    .min(11, "অনুগ্রহ করে একটি সঠিক ১১-সংখ্যার মোবাইল নম্বর প্রদান করুন।"),

  whatsapp: z
    .string({
      required_error: "WhatsApp নম্বর প্রদান করা আবশ্যক।",
    })
    .min(11, "অনুগ্রহ করে একটি ১১-সংখ্যার WhatsApp নম্বর প্রদান করুন।"),

  email: z
    .string()
    .email("অনুগ্রহ করে সঠিক ই-মেইল ঠিকানা প্রদান করুন।")
    .optional(),

  occupation: z
    .string({
      required_error: "পেশা উল্লেখ করা আবশ্যক।",
    })
    .min(1, "অনুগ্রহ করে আপনার পেশা উল্লেখ করুন।"),

  address: z.string().min(1, "অনুগ্রহ করে ঠিকানা প্রদান করুন।").optional(),
});

export type SeminarRegistration = z.infer<typeof seminarRegistrationSchema>;
