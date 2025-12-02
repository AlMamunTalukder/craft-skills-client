import * as z from "zod";

export const classRoutineSchema = z.object({
  className: z
    .string({
      required_error: "Class name is required.",
      invalid_type_error: "Class name must be a string.",
    })
    .min(3, { message: "Class name must be at least 3 characters long." }),
  days: z.string({
    required_error: "Days are required.",
    invalid_type_error: "Days must be a string.",
  }),
  time: z.string({
    required_error: "Time is required.",
    invalid_type_error: "Time must be a string.",
  }),
  isActive: z.boolean().default(true),
});

export const UpdateClassRoutineSchema = classRoutineSchema.partial();

export type CreateClassRoutineInput = z.infer<typeof classRoutineSchema>;
export type UpdateClassRoutineInput = z.infer<typeof classRoutineSchema>;
