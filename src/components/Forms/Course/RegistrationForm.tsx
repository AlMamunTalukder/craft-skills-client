// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertCircle,
//   ArrowRight,
//   BadgeCheck,
//   CheckCircle,
//   CreditCard,
//   Facebook,
//   GraduationCap,
//   Mail,
//   MessageSquare,
//   Phone,
//   Send,
//   Sparkles,
//   Tag,
//   User,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import FormSelectInput from "@/components/FormInputs/FormSelectInput";
// import FormSelectInputWithWatch from "@/components/FormInputs/FormSelectInputWithWatch";
// import SubmitButton from "@/components/FormInputs/SubmitButton";
// import TextInput from "@/components/FormInputs/TextInput";
// import { applyCoupon } from "@/queries/coupon/applyCoupon";
// import { courseRegistration } from "@/queries/course/registration";
// import { courseRegistrationSchema } from "@/schemas/course/registration";
// import Image from "next/image";
// import AppForm from "../AppForm";

// export type CourseRegistrationFormData = z.infer<
//   typeof courseRegistrationSchema
// >;

// type Props = {
//   courses: any[];
//   batch: any;
//   loading?: boolean;
// };

// const paymentOptions = [
//   {
//     id: "bkash",
//     name: "বিকাশ",
//     logo: "/bkash.svg",
//     number: "01830327579",
//     type: "এজেন্ট (ক্যাশ আউট)",
//     extraHiddenInMobile: true,
//   },
//   {
//     id: "rocket",
//     name: "রকেট",
//     logo: "/rocket-1.1.png",
//     number: "018211813339",
//     type: "পার্সোনাল (সেন্ড মানি)",
//     extraHiddenInMobile: true,
//   },
//   {
//     id: "nagad",
//     name: "নগদ",
//     logo: "/nagad.svg",
//     number: "01704682820",
//     type: "পার্সোনাল (সেন্ড মানি)",
//     extraHiddenInMobile: true,
//   },
// ];

// export default function RegistrationForm({
//   courses,
//   batch,
//   loading = false,
// }: Props) {
//   const router = useRouter();
//   const methods = useForm({
//     resolver: zodResolver(courseRegistrationSchema),
//   });
//   const { setValue, watch } = methods;
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [finalPrice, setFinalPrice] = useState<number | null>(null);
//   const [applyingCoupon, setApplyingCoupon] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<any>(null);
//   const [coupon, setCoupon] = useState<string>("");
//   const [couponInput, setCouponInput] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponError, setCouponError] = useState<string | null>(null);
//   const [couponState, setCouponState] = useState({
//     code: "",
//     applied: false,
//     discountAmount: 0,
//     error: null as string | null,
//     loading: false,
//   });

//   // Transform courses data for the select input
//   const courseOptions = courses.map((course) => {
//     const discountedPrice = course.price - (course.price * course.discount) / 100;
//     const totalPrice = Math.round(discountedPrice + course.paymentCharge);
//     return {      
//       label: `${course.name} - ৳${totalPrice.toLocaleString()}`,
//       value: course.id,      
//     };
//   });

//   // Payment method options
//   const paymentMethods = [
//     { label: "বিকাশ", value: "BKASH" },
//     { label: "নগদ", value: "NAGAD" },
//     { label: "রকেট", value: "ROCKET" },
//   ];

//   useEffect(() => {
//     if (!selectedCourse) {
//       setFinalPrice(null);
//       setDiscountAmount(0);
//       setCouponApplied(false);
//       setCoupon("");
//       setCouponError(null);
//       setValue("amount", "");
//       return;
//     }

//     const courseId = selectedCourse?.value || selectedCourse;
//     const course = courses.find((c) => c.id === courseId);

//     if (!course) return;

//     let discountedPrice = course.price - (course.price * course.discount) / 100;
//     let totalPrice = Math.round(discountedPrice + course.paymentCharge);

//     setDiscountAmount(0);
//     setFinalPrice(totalPrice);
//     setValue("amount", totalPrice.toString());
//   }, [selectedCourse, courses, setValue]);

//   // Coupon apply handler (dynamic)
//   const handleCouponChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;
//       setCouponInput(value);
//       if (couponError) setCouponError(null);
//     },
//     [couponError],
//   );

//   const handleApplyCoupon = useCallback(async () => {
//     if (!couponInput.trim()) {
//       setCouponState((prev) => ({ ...prev, error: "কুপন কোড লিখুন" }));
//       return;
//     }

//     setCouponState((prev) => ({ ...prev, loading: true, error: null }));

//     try {
//       const res = await applyCoupon(
//         couponInput.trim(),
//         selectedCourse?.value || selectedCourse,
//       );

//       if (res.valid) {
//         setCouponState({
//           code: couponInput.trim(),
//           applied: true,
//           discountAmount: res.discountAmount,
//           error: null,
//           loading: false,
//         });
//         setCoupon(couponInput.trim());
//         setFinalPrice(res.finalPrice || 0);
//         setValue("amount", (res.finalPrice || 0).toString());
//         toast.success(res.message);
//       } else {
//         setCouponState((prev) => ({
//           ...prev,
//           error: res.message,
//           loading: false,
//         }));
//         toast.error(res.message);
//       }
//     } catch (error) {
//       setCouponState((prev) => ({
//         ...prev,
//         error: "Coupon যাচাই করা যায়নি",
//         loading: false,
//       }));
//       toast.error("Coupon যাচাই করা যায়নি");
//     }
//   }, [couponInput, selectedCourse]);

//   const onSubmit = async (data: CourseRegistrationFormData) => {
//     const toastId = toast.loading("ফর্ম জমা দেওয়া হচ্ছে...");
//     try {
//       const formData = {
//         ...data,
//         batchId: batch?.id,
//         couponCode: couponState.applied ? couponState.code : null,
//         amount: Number(data.amount) || finalPrice || 0,
//       };

//       await courseRegistration(formData, batch?.id, coupon);
//       toast.success("আপনার রেজিস্ট্রেশন সফল হয়েছে", { id: toastId });
//       router.push("/admission-registration/success");
//     } catch (error: any) {
//       toast.error(error.message || "কিছু ভুল হয়েছে", { id: toastId });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 py-12 px-2 md:px-4">
//       {/* Background decorative elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#4f0187]/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-4xl mx-auto relative">
//         {/* Header Section */}

//         {/* Main Form */}
//         <div className="bg-white rounded-3xl  border border-gray-100 overflow-hidden">
//           {/* Form Header */}
//           <div className="bg-linear-to-r from-[#4f0187] to-[#6d0b99] p-3 md:p-6 text-white text-center">
//             <div className="flex items-center justify-center content-center md:gap-3">
//               <Sparkles className="w-6 h-6" />
//               <h2 className=" md:text-xl font-semibold">
//                 ভর্তি নিশ্চিত করতে টাকা পাঠিয়ে ফরমটি পূরণ করুন ।
//               </h2>
//             </div>        
//             {batch?.registrationEnd && (
//               <span className="block mt-2 text-yellow-300 text-sm md:text-base">
//                 শেষ তারিখ:{" "}
//                 {new Date(batch.registrationEnd).toLocaleDateString("bn-BD", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//             )}
//           </div>

//           <div className="p-2 md:p-8">
//             <FormProvider {...methods}>
//               <AppForm
//                 resolver={zodResolver(courseRegistrationSchema)}
//                 onSubmit={onSubmit}
//               >
//                 <div className="space-y-6 mt-5 md:mt-0">
//                   {/* Course Details */}
//                   <div className="flex gap-5 w-full">
//                     <div className="w-full bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
//                       <h3 className=" text-[#4f0187] mb-2 flex items-center gap-2">
//                         <span className="bg-white/20 rounded-md">
//                           <GraduationCap className="" />
//                         </span>
//                         কোর্স বিবরণ
//                       </h3>

//                       <div className="md:flex gap-2 space-y-2 md:space-y-0">
//                         {courses.map((course) => {
//                           const discountedPrice =
//                             course.price -
//                             (course.price * course.discount) / 100;
//                           const totalPrice = Math.round(
//                             discountedPrice + course.paymentCharge,
//                           );

//                           return (
//                             <div
//                               key={course.id}
//                               className="w-full relative overflow-hidden rounded-xl border border-[#4f0187]/10 transition-all bg-white duration-300 "
//                             >
//                               {course.discount > 0 && (
//                                 <div className="absolute -top-.5 -right-1 bg-green-500 text-white font-semibold text-sm py-1 px-3 rounded-bl-lg transform rotate-12 shadow-md z-10">
//                                   -{course.discount}% ছাড়
//                                 </div>
//                               )}

//                               <div className="p-2 md:p-4  text-black mt-5 md:mt-0">
//                                 <h4 className="flex justify-between mt-7">
//                                   {course.name}
//                                   <div>
//                                     <div className="text-end space-x-3">
//                                       <span
//                                         className={
//                                           course.discount > 0
//                                             ? "line-through "
//                                             : ""
//                                         }
//                                       >
//                                         ৳{course.price.toLocaleString()}
//                                       </span>
//                                       <span>
//                                         ৳{totalPrice.toLocaleString()}
//                                       </span>
//                                     </div>
//                                     <p className="text-end text-xs">
//                                       (খরচসহ কোর্স ফি পরিশোধ করুন)
//                                     </p>
//                                   </div>
//                                 </h4>                            
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Course Selection */}
//                   <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
//                     <FormSelectInputWithWatch
//                       label="কোর্স নির্বাচন করুন"
//                       name="course"
//                       options={courseOptions}
//                       onChange={(value) => {
//                         setSelectedCourse(value);
//                         setCoupon("");
//                         setCouponApplied(false);
//                         setDiscountAmount(0);
//                         setCouponError(null);
//                         setValue("course", value);
//                       }}
//                     />
//                   </div>

//                   {/* Coupon Section */}
//                   <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-2 md:p-4 border border-green-100">
//                     <div className="flex items-center gap-2 mb-4">
//                       <Tag className="w-5 h-5 text-green-600" />
//                       <h3 className="font-semibold text-green-800">কুপন কোড</h3>
//                     </div>

//                     <div className="md:flex gap-3 items-end ">
//                       <div className="flex-1">                     
//                         <input
//                           id="coupon-input"
//                           type="text"
//                           value={couponInput}
//                           onChange={handleCouponChange}
//                           className={`w-full px-4 py-2 mb-4 md:mb-0  border rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${
//                             couponError ? "border-red-500" : "border-green-300"
//                           }`}
//                           placeholder="কুপন কোড লিখুন"
//                           disabled={couponApplied || applyingCoupon}
//                           autoComplete="off"
//                           aria-describedby="coupon-helper"
//                           aria-invalid={!!couponError}
//                         />
//                       </div>
//                       <button
//                         type="button"
//                         onClick={handleApplyCoupon}
//                         disabled={
//                           couponState.applied ||
//                           couponState.loading ||
//                           !couponInput.trim()
//                         }
//                         className={`px-6 py-3 rounded font-semibold text-sm transition-all duration-300 ${
//                           couponState.applied
//                             ? "bg-green-500 text-white"
//                             : "bg-[#4f0187] text-white hover:bg-[#6d0b99]"
//                         }`}
//                       >
//                         {couponState.applied ? (
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="w-4 h-4" />
//                             Applied
//                           </div>
//                         ) : couponState.loading ? (
//                           "Applying..."
//                         ) : (
//                           "Apply"
//                         )}
//                       </button>
//                     </div>

//                     {couponError && (
//                       <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
//                         <AlertCircle className="w-4 h-4 flex-shrink-0" />
//                         {couponError}
//                       </div>
//                     )}
//                   </div>

//                   {/* Price Summary */}
//                   {selectedCourse && finalPrice !== null && (
//                     <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-6 border border-[#4f0187]/20">
//                       <h3 className="font-semibold text-[#4f0187] mb-4 flex items-center gap-2">
//                         <CreditCard className="w-5 h-5" />
//                         মূল্য বিবরণ
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center text-gray-700">
//                           <span>মূল দাম:</span>
//                           <span className="font-medium">
//                             ৳{(finalPrice + discountAmount).toLocaleString()}
//                           </span>
//                         </div>
//                         {discountAmount > 0 && (
//                           <div className="flex justify-between items-center text-green-600">
//                             <span className="flex items-center gap-2">
//                               <BadgeCheck className="w-4 h-4" />
//                               কুপন ছাড়:
//                             </span>
//                             <span className="font-medium">
//                               -৳{discountAmount.toLocaleString()}
//                             </span>
//                           </div>
//                         )}
//                         <div className="border-t border-[#4f0187]/20 pt-3">
//                           <div className="flex justify-between items-center text-lg font-bold text-[#4f0187]">
//                             <span>সর্বমোট পরিমাণ:</span>
//                             <span className="text-2xl">
//                               ৳{finalPrice.toLocaleString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Personal Information */}
//                   <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-2 md:p-4 border border-blue-100">
//                     <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
//                       <User className="w-5 h-5" />
//                       ব্যক্তিগত তথ্য
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <TextInput
//                         label="পূর্ণ নাম"
//                         name="name"
//                         placeholder="আপনার সম্পূর্ণ নাম লিখুন"
//                         icon={User}
//                         labelClassName="text-blue-700 font-medium"
//                         className="border-blue-200 focus:border-blue-400"
//                       />
//                       <TextInput
//                         label="মোবাইল নাম্বার"
//                         name="phone"
//                         placeholder="০১XXXXXXXXX"
//                         icon={Phone}
//                         labelClassName="text-blue-700 font-medium"
//                         className="border-blue-200 focus:border-blue-400"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <TextInput
//                         label="ইমেইল ঠিকানা"
//                         name="email"
//                         placeholder="your@email.com"
//                         icon={Mail}
//                         labelClassName="text-blue-700 font-medium"
//                         className="border-blue-200 focus:border-blue-400"
//                       />
//                       <TextInput
//                         label="হোয়াটসঅ্যাপ"
//                         name="whatsapp"
//                         placeholder="০১XXXXXXXXX"
//                         icon={MessageSquare}
//                         labelClassName="text-blue-700 font-medium"
//                         className="border-blue-200 focus:border-blue-400"
//                       />
//                     </div>
//                     <div className="mt-4">
//                       <TextInput
//                         label="ফেসবুক প্রোফাইল"
//                         name="facebook"
//                         placeholder="https://facebook.com/yourprofile"
//                         icon={Facebook}
//                         labelClassName="text-blue-700 font-medium"
//                         className="border-blue-200 focus:border-blue-400 "
//                       />
//                     </div>
//                   </div>

//                   <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-2 md:p-4 border border-emerald-100">
//                     <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
//                       <CreditCard className="w-5 h-5" />
//                       পেমেন্ট নাম্বার সমূহ
//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
//                       {paymentOptions.map((method) => (
//                         <div
//                           key={method.id}
//                           className="bg-white rounded-xl  border border-emerald-200 p-2 transition-all duration-300 transform hover:-translate-y-1"
//                         >
//                           <div className="flex items-center gap-3 ">
//                             <Image
//                               src={method.logo}
//                               alt={`${method.name} Logo`}
//                               width={36}
//                               height={36}
//                               className=" w-16 rounded-lg"
//                               priority
//                             />
//                             <div>
//                               <p className="font-medium text-lg">
//                                 {method.number}
//                               </p>
//                               <p className="text-sm text-gray-500 md:mt-1">
//                                 {method.type}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Payment Information */}
//                   <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-2 md:p-4 border border-emerald-100">
//                     <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
//                       <CreditCard className="w-5 h-5" />
//                       পেমেন্ট তথ্য
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <FormSelectInput
//                         label="পেমেন্ট মেথড"
//                         name="paymentMethod"
//                         options={paymentMethods}
//                         labelClassName="text-emerald-700 font-medium"
//                       />
//                       <TextInput
//                         label="সেন্ডার নাম্বার"
//                         name="senderNumber"
//                         placeholder="যে নাম্বার থেকে পাঠিয়েছেন"
//                         icon={Send}
//                         labelClassName="text-emerald-700 font-medium"
//                         className="border-emerald-200 focus:border-emerald-400"
//                       />
//                     </div>

//                     {/* Payment Instructions */}
//                     <div className="flex items-center gap-3 mt-6 p-2 bg-white rounded-xl border border-emerald-200">
//                       <Send size={16} className="text-emerald-800" />
//                       <h4 className="font-medium text-emerald-800 ">
//                         আপনার পেমেন্ট ৬ ঘন্টার মধ্যে যাচাই করা হবে।
//                       </h4>                     
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="pt-4">
//                     <SubmitButton
//                       title="ভর্তি সম্পন্ন করুন"
//                       loadingTitle="প্রক্রিয়া চলছে..."
//                       loading={loading}
//                       className="w-full py-4 bg-linear-to-r from-[#4f0187] to-[#6d0b99] text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                       loaderIcon={ArrowRight}
//                     />
//                   </div>
//                 </div>
//               </AppForm>
//             </FormProvider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
