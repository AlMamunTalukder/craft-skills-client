// import { Course } from "@/types";
// import { useMemo } from "react";

// export function useCoursePricing(course: Course | null, coupon: CouponState) {
//   return useMemo(() => {
//     if (!course) return null;

//     const base =
//       course.price -
//       (course.price * (course.discount || 0)) / 100 +
//       (course.paymentCharge || 0);

//     const total = coupon.applied
//       ? Math.max(0, Math.round(base - coupon.discountAmount))
//       : Math.round(base);

//     return {
//       basePrice: Math.round(base),
//       finalPrice: total,
//     };
//   }, [course, coupon]);
// }
