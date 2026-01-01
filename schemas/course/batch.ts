// import { z } from "zod";

// export const batchSchema = z.object({
//   name: z
//     .string({ required_error: "ব্যাচের নাম আবশ্যক" })
//     .min(1, "ব্যাচের নাম আবশ্যক"),
//   code: z
//     .number({ required_error: "ব্যাচের কোড আবশ্যক" })
//     .min(1, "ব্যাচের কোড আবশ্যক"),
//   description: z.string(),
//   registrationStart: z.date({
//     required_error: "রেজিস্ট্রেশনের শুরুর তারিখ আবশ্যক",
//     invalid_type_error: "রেজিস্ট্রেশনের শুরুর তারিখ সঠিক নয়",
//   }),
//   registrationEnd: z.date({
//     required_error: "রেজিস্ট্রেশনের শেষ তারিখ আবশ্যক",
//     invalid_type_error: "রেজিস্ট্রেশনের শেষ তারিখ সঠিক নয়",
//   }),
//   isActive: z.boolean().default(true),
//   facebookSecretGroup: z
//     .string()
//     .url("সঠিক Facebook গ্রুপ লিংক দিন")
//     .optional()
//     .or(z.literal("")),
//   // whatsappSecretGroup: z
//   //   .string()
//   //   .url("সঠিক WhatsApp গ্রুপ লিংক দিন")
//   //   .optional()
//   //   .or(z.literal("")),
//   messengerSecretGroup: z
//     .string()
//     .url("সঠিক Messenger গ্রুপ লিংক দিন")
//     .optional()
//     .or(z.literal("")),
//   // facebookPublicGroup: z
//   //   .string()
//   //   .url("সঠিক Facebook পাবলিক গ্রুপ লিংক দিন")
//   //   .optional()
//   //   .or(z.literal("")),
//   // whatsappPublicGroup: z
//   //   .string()
//   //   .url("সঠিক WhatsApp পাবলিক গ্রুপ লিংক দিন")
//   //   .optional()
//   //   .or(z.literal("")),
//   // telegramGroup: z.string().url("সঠিক Telegram গ্রুপ লিংক দিন").optional(),
// });
