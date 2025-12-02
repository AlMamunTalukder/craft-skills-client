import { z } from "zod";

export const totalclassSchema = z.object({
  mainClass: z.string({
    required_error: "Please enter total main class",
  }).min(1, "Main class is required"),
  
  pblmSolving: z.string({
    required_error: "Please enter total problem solving class",
  }).min(1, "Problem solving class is required"),
  
  practice: z.string({
    required_error: "Please enter total practice class",
  }).min(1, "Practice class is required"),
  
  special: z.string({
    required_error: "Please enter total special class",
  }).min(1, "Special class is required"),
  
  presReview: z.string({
    required_error: "Please enter total presentation review class",
  }).min(1, "Presentation review class is required"),
});