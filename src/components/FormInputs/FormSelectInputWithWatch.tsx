// "use client";

// import React, { useEffect } from "react";
// import { Controller, useFormContext, useWatch } from "react-hook-form";
// import { GraduationCap } from "lucide-react";
// import AddNewButton from "./AddNewButton";
// import { Select } from "@/components/ui/select";

// type FormSelectInputProps = {
//   name: string;
//   options: Options;
//   label: string;
//   href?: string;
//   labelShown?: boolean;
//   toolTipText?: string;
//   isMultiple?: boolean;
//   onChange?: (value: any) => void;
// };

// export default function FormSelectInputWithWatch({
//   name,
//   options,
//   label,
//   href,
//   toolTipText,
//   labelShown = true,
//   isMultiple = false,
//   onChange,
// }: FormSelectInputProps) {
//   const method = useFormContext();
//   const inputValue = useWatch({
//     control: method.control,
//     name,
//   });

//   useEffect(() => {
//     if (onChange) {
//       onChange(inputValue);
//     }
//   }, [inputValue, onChange]);

//   return (
//     <div className="">
//       {labelShown && (
//         // <div className="flex items-center gap-2 mb-4">
//         //   <GraduationCap className="w-5 h-5 text-green-600" />
//         //   <h3 className="font-semibold text-green-800">কুপন কোড</h3>
//         //   <h2 className="pb-2 block text-sm font-medium leading-6 text-gray-900">
//         //     {label}
//         //   </h2>
//         // </div>

//         <h3 className=" text-[#4f0187] mb-2 flex items-center gap-2">
//           <span className="bg-white/20 rounded-md">
//             <GraduationCap className="" />
//           </span>
//           {label}
//         </h3>


//       )}
//       <div className="">
//         <Controller
//           name={name}
//           control={method.control}
//           render={({ field: { value }, fieldState: { error } }) => (
//             <>
//               <Select
//                 isSearchable
//                 primaryColor="indigo"
//                 value={isMultiple ? value || null : value || null}
//                 onChange={(selected) => {
//                   if (isMultiple) {
//                     method.setValue(name, selected ? selected : null);
//                   } else {
//                     method.setValue(name, selected ? selected : null);
//                   }
//                 }}
//                 options={options}
//                 placeholder={`${label}`}
//                 isMultiple={isMultiple}
//               />
//               {href && toolTipText && (
//                 <AddNewButton toolTipText={toolTipText} href={href} />
//               )}
//               {error && (
//                 <p className="mt-1 text-sm text-red-600">{error.message}</p>
//               )}
//             </>
//           )}
//         />
//       </div>
//     </div>
//   );
// }
