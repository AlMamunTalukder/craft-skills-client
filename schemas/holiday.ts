// import * as z from "zod";

// export const holidaySchema = z.object({
//   days: z
//     .string({
//       required_error: "Holiday days are required.",
//       invalid_type_error: "Holiday days must be a string.",
//     })
//     .min(3, { message: "Holiday days must be at least 3 characters long." }),
//   isActive: z.boolean().default(true),
// });

// export const updateHolidaySchema = holidaySchema.partial();

// export type CreateHolidayInput = z.infer<typeof holidaySchema>;
// export type UpdateHolidayInput = z.infer<typeof updateHolidaySchema>;
