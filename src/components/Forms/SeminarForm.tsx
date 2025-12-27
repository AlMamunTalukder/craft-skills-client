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

// import { createSeminar, updateSeminar } from "@/queries/seminar";
// import { seminarSchema } from "@/schemas/seminar";
// import { Seminar } from "@prisma/client";
// import { DateTimePickerForm } from "../FormInputs/DateTimePicker";
// import TextArea from "../FormInputs/TextAreaInput";
// import AppForm from "./AppForm";
// import { BsTelegram } from "react-icons/bs";

// export type SeminarFormData = z.infer<typeof seminarSchema>;

// type Props = {
//   initialValues?: Partial<Seminar>;
//   loading?: boolean;
// };

// export default function SeminarForm({ initialValues, loading = false }: Props) {
//   const router = useRouter();

//   const onSubmit = async (data: SeminarFormData) => {
//     const toastId = toast.loading("Saving seminar...");
//     try {
//       if (initialValues?.id) { 
//         await updateSeminar({
//           id: initialValues.id,
//           data,
//         });
//         toast.success("Seminar updated successfully", { id: toastId });
//       } else {
//         await createSeminar(data);
//         toast.success("Seminar created successfully", { id: toastId });
//       }

//       router.push("/dashboard/seminar/list");
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <Card className="shadow-sm">
//       <CardHeader>
//         <CardTitle>{initialValues ? "Edit" : "Create"} Seminar</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <AppForm
//           resolver={zodResolver(seminarSchema)}
//           onSubmit={onSubmit}
//           defaultValues={initialValues}
//         >
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <TextInput
//                 label="Serial Number (optional)"
//                 name="sl"
//                 placeholder="১৭ নং সেমিনার"
//                 icon={Calendar}
//               />
//               <TextInput
//                 label="Title"
//                 name="title"
//                 placeholder="Enter seminar title"
//                 icon={FileText}
//               />
//               <TextArea
//                 label="Description"
//                 name="description"
//                 placeholder="Enter seminar description"
//               />
//               <DateTimePickerForm label="Seminar Start Date" name="date" />
//               <DateTimePickerForm
//                 label="Registration Deadline"
//                 name="registrationDeadline"
//               />
//               {/* <TextInput
//                 label="Link (optional)"
//                 name="link"
//                 placeholder="https://example.com"
//                 icon={LinkIcon}
//               /> */}

//               <TextInput
//                 label="Free Seminar Facebook Group Link"
//                 name="facebookSecretGroup"
//                 placeholder="Free Seminar Facebook Group Link"
//                 icon={Facebook}
//               />
//               <TextInput
//                 label="Free Seminar WhatsApp Group Link"
//                 name="whatsappSecretGroup"
//                 placeholder="Free Seminar WhatsApp Group Link"
//                 icon={MessageCircle}
//               />
//               {/* <TextInput
//                 label="Messenger Secret Group Link"
//                 name="messengerSecretGroup"
//                 placeholder="Messenger secret group link"
//                 icon={MessageCircleHeart}
//               /> */}

//               {/* Public Groups */}
//               {/* <TextInput
//                 label="Facebook Public Group Link"
//                 name="facebookPublicGroup"
//                 placeholder="Facebook public group link"
//                 icon={Facebook}
//               /> */}

//               {/* <TextInput
//                 label="WhatsApp Public Group Link"
//                 name="whatsappPublicGroup"
//                 placeholder="WhatsApp public group link"
//                 icon={MessageCircle}
//               /> */}

//               <TextInput
//                 label="Free Seminar Telegram Group Link"
//                 name="telegramGroup"
//                 placeholder="Free Seminar Telegram group link"
//                 icon={BsTelegram}
//               />
//             </div>

//             <div className="pt-4 flex justify-end">
//               <SubmitButton
//                 title={initialValues ? "Update Seminar" : "Create Seminar"}
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
