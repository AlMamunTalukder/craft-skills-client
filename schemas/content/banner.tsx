// import { z } from "zod";

// export const bannerSchema = z.object({
//   title: z
//     .string({
//       required_error: "Title is required",
//     })
//     .min(1, "Title is required"),
//   subtitle: z
//     .string({
//       required_error: "Subtitle is required",
//     })
//     .min(1, "Subtitle is required"),
//   description: z
//     .string(),
//   dateInfo: z
//     .string(),
//   ctaText: z
//     .string({
//       required_error: "CTA text is required",
//     })
//     .min(1, "CTA text is required"),
//   ctaLink: z
//     .string({
//       required_error: "CTA link is required",
//     })
//     .url("Invalid URL"),
//   bannerImage: z
//     .string({
//       required_error: "Banner image is required",
//     })
//     .min(1, "Banner image is required"),
//   isActive: z.boolean({
//     required_error: "Status is required",
//   }),
// });
