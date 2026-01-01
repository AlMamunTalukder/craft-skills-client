// import { z } from "zod";

// export const couponSchema = z
//   .object({
//     code: z.string().min(3, "Coupon code is required"),
//     discountType: z.object({
//       label: z.string(),
//       value: z.enum(["PERCENTAGE", "AMOUNT"]),
//     }),
//     discount: z.number().min(1, "Discount is required"),
//     isActive: z.boolean().default(true),
//     validFrom: z.date({ required_error: "Valid from date is required" }),
//     validTo: z.date({ required_error: "Valid to date is required" }),
//     maxUsage: z.number().min(1).optional(),
//   })

//   .refine(
//     (data) => {
//       if (data.discountType.value === "PERCENTAGE") {
//         return data.discount >= 1 && data.discount <= 100;
//       }
//       // For AMOUNT, just ensure it's at least 1 (already handled by z.number().min(1))
//       return true;
//     },
//     {
//       message: "Percentage discount must be between 1 and 100",
//       path: ["discount"],
//     },
//   );

// export type CouponFormData = z.infer<typeof couponSchema>;

// // Helper to convert object to string for backend
// export function couponFormToDb(data: CouponFormData) {
//   return {
//     ...data,
//     discountType: data.discountType.value,
//   };
// }
