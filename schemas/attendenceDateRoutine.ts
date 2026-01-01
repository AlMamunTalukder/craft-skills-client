// import * as z from "zod";

// export const attendenceDateRoutineSchema = z.object({
//   batchId: z.string({
//     required_error: "Batch is required.",
//   }),
//   routines: z.array(
//     z.object({
//       className: z.string({
//         required_error: "Class name is required.",
//       }),
//       mainClass: z.string({
//         required_error: "Main Class Date is required.",
//       }),
//       pblmSolving: z.string({
//         required_error: "Problem Solving Date is required.",
//       }),
//       practice: z.string({
//         required_error: "Practice class date is required.",
//       }),
//     })
//   ).min(1, "At least one routine is required"),
//   isActive: z.boolean().default(true),
// });

// export const UpdateAttendenceDateRoutineSchema = attendenceDateRoutineSchema.partial();

// export type CreateAttendenceDateRoutineInput = z.infer<typeof attendenceDateRoutineSchema>;
// export type UpdateAttendenceDateRoutineInput = z.infer<typeof attendenceDateRoutineSchema>;