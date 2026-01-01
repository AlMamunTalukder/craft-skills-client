// import { validateCoupon } from "@/src/app/api/coupons/couponapply";
// import { Course } from "@/types";
// import { useState } from "react";

// export function useCoupon() {
//   const [state, setState] = useState<CouponState>(initialState);

//   const reset = () => setState(initialState);

//   const apply = async (code: string, course: Course, price: number) => {
//     setState(s => ({ ...s, loading: true }));

//     const result = await validateCoupon(code, price, course.id);

//     if (!result.success) {
//       setState(s => ({ ...s, error: result.message, loading: false }));
//       return false;
//     }

//     setState({
//       applied: true,
//       code,
//       discountAmount: result.discountAmount || 0,
//       loading: false,
//       error: null,
//       couponData: result.coupon,
//     });

//     return true;
//   };

//   return { state, apply, reset };
// }
