// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Calendar,
//   Facebook,
//   FileText,
//   Link as LinkIcon,
//   Loader2,
//   MessageCircle,
//   MessageCircleHeart,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { z } from "zod";

// import SubmitButton from "../FormInputs/SubmitButton";
// import TextInput from "../FormInputs/TextInput";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// import { createClassRoutine, updateClassRoutine } from "@/queries/classRoutine";
// import { classRoutineSchema } from "@/schemas/classRoutine";
// import { ClassRoutine } from "@prisma/client";
// import { DateTimePickerForm } from "../FormInputs/DateTimePicker";
// import TextArea from "../FormInputs/TextAreaInput";
// import AppForm from "./AppForm";
// import { BsTelegram } from "react-icons/bs";

// export type ClassRoutineFormData = z.infer<typeof classRoutineSchema>;

// type Props = {
//   initialValues?: Partial<ClassRoutine>;
//   loading?: boolean;
// };

// export default function ClassScheduleForm({
//   initialValues,
//   loading = false,
// }: Props) {
//   const router = useRouter();

//   const onSubmit = async (data: ClassRoutineFormData) => {
//     const toastId = toast.loading("Saving class routine...");
//     try {
//       if (initialValues?.id) {
//         await updateClassRoutine(initialValues.id, data);
//         toast.success("Class routine updated successfully", { id: toastId });
//       } else {
//         await createClassRoutine(data);
//         toast.success("Class routine created successfully", { id: toastId });
//       }

//       router.push("/dashboard/content/class-schedule/list");
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <Card className="shadow-sm">
//       <CardHeader>
//         <CardTitle>{initialValues ? "Edit" : "Create"} Class Routine</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <AppForm
//           resolver={zodResolver(classRoutineSchema)}
//           onSubmit={onSubmit}
//           defaultValues={initialValues}
//         >
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <TextInput
//                 label="Class Name"
//                 name="className"
//                 placeholder="Enter class name"
//                 icon={Calendar}
//               />
//               <TextInput
//                 label="Days"
//                 name="days"
//                 placeholder="Enter class days (e.g., Monday, Wednesday)"
//               />
//               <TextInput
//                 label="Time"
//                 name="time"
//                 placeholder="Enter class time (e.g., 10:00 AM - 12:00 PM)"
//               />
//             </div>

//             <div className="pt-4 flex justify-end">
//               <SubmitButton
//                 title={
//                   initialValues
//                     ? "Update Class Routine"
//                     : "Create Class Routine"
//                 }
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
