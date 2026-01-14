// import { currentUser } from "@/src/lib/currentUser";
// // import { redirect } from "next/navigation";
// import { CheckCircle, XCircle, Clock } from "lucide-react";

// export default async function ResultsPage() {
//  const user = await currentUser();

// if (!user) {
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8 text-center">
//       <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//         You are not logged in
//       </h2>
//       <p className="text-gray-600">Please <a href="/login" className="text-blue-600 underline">login</a> to view your results.</p>
//     </div>
//   );
// }


//   const result = {
//     status: "Pending",
//     score: null,
//     comments: "Your result is being evaluated. Please check back later.",
//     lastUpdated: new Date().toISOString(),
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "pass":
//         return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" };
//       case "fail":
//         return { icon: XCircle, color: "text-red-600", bg: "bg-red-50" };
//       default:
//         return { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" };
//     }
//   };

//   const config = getStatusStyle(result.status);
//   const Icon = config.icon;

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <div className="mb-12">
//         <h1 className="text-3xl font-semibold text-gray-900">Academic Results</h1>
//         <p className="text-sm text-gray-500 mt-2">Batch {user.batchNumber}</p>
//       </div>

//       <div className={`rounded-2xl ${config.bg} p-8 text-center mb-12`}>
//         <Icon className={`${config.color} mx-auto mb-4`} size={56} />
//         <h2 className={`text-4xl font-bold tracking-tight ${config.color}`}>{result.status}</h2>
//         {result.score !== null && (
//           <p className="text-lg text-gray-700 mt-3">
//             Score: <span className="font-semibold">{result.score}%</span>
//           </p>
//         )}
//         <p className="text-sm text-gray-500 mt-4">
//           Last updated on {new Date(result.lastUpdated).toLocaleDateString()}
//         </p>
//       </div>

//       {result.comments && (
//         <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">Feedback</h3>
//           <p className="text-gray-700 leading-relaxed text-base">{result.comments}</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react';

const page = () => {
  return (
    <div>
      result
    </div>
  );
};

export default page;