// import { z } from "zod";

// export const seminarSchema = z.object({
//   sl: z
//     .string({
//       required_error: "Please enter a serial number",
//     })
//     .optional(),
//   title: z
//     .string({
//       required_error: "Please enter a title",
//     })
//     .min(1, "Title is required"),
//   description: z
//     .string({
//       required_error: "Please enter a description",
//     })
//     .optional(),
//   date: z.coerce.date({
//     required_error: "Please enter a date",
//   }),

//   registrationDeadline: z.coerce.date({
//     required_error: "Please enter a registration deadline",
//   }),

//   isActive: z.boolean().optional(),
//   // link: z.string().url().optional(),
//   facebookSecretGroup: z
//     .string()
//     .url("সঠিক Facebook গ্রুপ লিংক দিন")
//     .optional()
//     .or(z.literal("")),
//   whatsappSecretGroup: z
//     .string()
//     .url("সঠিক WhatsApp গ্রুপ লিংক দিন")
//     .optional()
//     .or(z.literal("")),
//   // messengerSecretGroup: z
//   //   .string()
//   //   .url("সঠিক Messenger গ্রুপ লিংক দিন")
//   //   .optional()
//   //   .or(z.literal("")),
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
//   telegramGroup: z.string().url("সঠিক Telegram গ্রুপ লিংক দিন").optional(),
// });
