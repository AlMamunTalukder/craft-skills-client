// import { z } from "zod";

// export const courseSchema = z.object({
//   name: z
//     .string({
//       required_error: "কোর্সের নাম দেওয়া বাধ্যতামূলক",
//     })
//     .min(1, "কোর্সের নাম অবশ্যই প্রদান করতে হবে"),

//   description: z
//     .string({
//       required_error: "কোর্সের বিস্তারিত তথ্য প্রয়োজন",
//     })
//     .optional(),

//   price: z
//     .number({
//       required_error: "কোর্স ফি প্রদান আবশ্যক",
//     })
//     .min(0, "কোর্স ফি অবশ্যই শূন্য বা তার থেকে বেশি হতে হবে"),

//   discount: z
//     .number({
//       required_error: "ছাড়ের পরিমাণ প্রদান আবশ্যক",
//     })
//     .min(0, "ছাড়ের পরিমাণ শূন্যের কম হতে পারবে না")
//     .max(100, "ছাড়ের পরিমাণ ১০০%-এর বেশি হতে পারবে না")
//     .optional(),
//   paymentCharge: z
//     .number({
//       required_error: "পেমেন্ট চার্জ প্রদান আবশ্যক",
//     })
//     .min(0, "পেমেন্ট চার্জ শূন্যের কম হতে পারবে না"),
// });
