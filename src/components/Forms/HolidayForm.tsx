// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Calendar, Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { z } from "zod";

// import SubmitButton from "../FormInputs/SubmitButton";
// import TextInput from "../FormInputs/TextInput";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// import { createHoliday, updateHoliday } from "@/queries/holiday";
// import { holidaySchema } from "@/schemas/holiday";
// import { Holiday } from "@prisma/client";
// import AppForm from "./AppForm";

// export type HolidayFormData = z.infer<typeof holidaySchema>;

// type Props = {
//   initialValues?: Partial<Holiday>;
//   loading?: boolean;
// };

// export default function HolidayForm({ initialValues, loading = false }: Props) {
//   const router = useRouter();

//   const onSubmit = async (data: HolidayFormData) => {
//     const toastId = toast.loading("Saving holiday...");
//     try {
//       if (initialValues?.id) {
//         await updateHoliday(initialValues.id, data);
//         toast.success("Holiday updated successfully", { id: toastId });
//       } else {
//         await createHoliday(data);
//         toast.success("Holiday created successfully", { id: toastId });
//       }

//       router.push("/dashboard/content/holidays/list");
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <Card className="shadow-sm">
//       <CardHeader>
//         <CardTitle>{initialValues ? "Edit" : "Create"} Holiday</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <AppForm
//           resolver={zodResolver(holidaySchema)}
//           onSubmit={onSubmit}
//           defaultValues={initialValues}
//         >
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 gap-5">
//               <TextInput
//                 label="Holiday Days"
//                 name="days"
//                 placeholder="Enter holiday days (e.g., Friday, Saturday)"
//                 icon={Calendar}
//               />
//             </div>

//             <div className="pt-4 flex justify-end">
//               <SubmitButton
//                 title={initialValues ? "Update Holiday" : "Create Holiday"}
//                 loadingTitle="Saving..."
//                 loading={loading}
//                 className="px-6"
//                 loaderIcon={Loader2}
//               />
//             </div>
//           </div>
//         </AppForm>
//       </CardContent>
//     </Card>
//   );
// }
