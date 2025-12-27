// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FileText,
//   Loader2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import SubmitButton from "../FormInputs/SubmitButton";
// import TextInput from "../FormInputs/TextInput";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { TotalClass } from "@prisma/client";
// import AppForm from "./AppForm";
// import { totalclassSchema } from "@/schemas/totalclass";
// import { createTotalClass, updateTotalClass } from "@/queries/content/totalclass";

// export type TotalClassFormData = z.infer<typeof totalclassSchema>;

// type Props = {
//   initialValues?: Partial<TotalClass>;
//   loading?: boolean;
// };

// export default function TotalClassForm({ initialValues, loading = false }: Props) {
//   const router = useRouter();

//   const onSubmit = async (data: TotalClassFormData) => {
//     const toastId = toast.loading("Saving total class...");
//     try {
//       if (initialValues?.id) { 
//         await updateTotalClass({
//           id: initialValues.id,
//           data,
//         });
//         toast.success("Total class updated successfully", { id: toastId });
//       } else {
//         await createTotalClass(data);
//         toast.success("Total class created successfully", { id: toastId });
//       }

//       router.push("/dashboard/content/totalclass/list");
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <Card className="shadow-sm">
//       <CardHeader>
//         <CardTitle>{initialValues ? "Edit" : "Create"} Total Class</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <AppForm
//           resolver={zodResolver(totalclassSchema)}
//           onSubmit={onSubmit}
//           defaultValues={initialValues}
//         >
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               <TextInput
//                 label="Main Class"
//                 name="mainClass"
//                 placeholder="Enter Total Main Class"
//                 icon={FileText}
//               />
//               <TextInput
//                 label="Problem Solving"
//                 name="pblmSolving"
//                 placeholder="Enter Total Problem Solving"
//                 icon={FileText}
//               />
//               <TextInput
//                 label="Practice Class"
//                 name="practice"
//                 placeholder="Enter Total Practice Class"
//                 icon={FileText}
//               />
//               <TextInput
//                 label="Special Class"
//                 name="special"
//                 placeholder="Enter Total Special Class"
//                 icon={FileText}
//               />
//               <TextInput
//                 label="Presentation Review Class"
//                 name="presReview"
//                 placeholder="Enter Total Presentation Review Class"
//                 icon={FileText}
//               />
//             </div>

//             <div className="pt-4 flex justify-end">
//               <SubmitButton
//                 title={initialValues ? "Update Class" : "Create Class"}
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