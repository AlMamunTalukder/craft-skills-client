// "use client";

// import { CheckCircle, XCircle } from 'lucide-react';

// interface SessionCardProps {
//     session: {
//         type: string;
//         attended: boolean;
//     };
//     onClick: () => void;
//     showStatus?: boolean;
// }

// export const SessionCard = ({ session, onClick, showStatus = true }: SessionCardProps) => {
//     return (
//         <div
//             onClick={onClick}
//             className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 select-none ${
//                 session.attended
//                     ? "border-green-500 bg-green-50"
//                     : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//             }`}
//         >
//             <div className="flex items-center justify-between">
//                 <div className="font-medium text-gray-800">
//                     {session.type}
//                 </div>
//                 <div className="flex items-center gap-2">
//                     {showStatus && (
//                         <span className={`text-sm font-medium ${
//                             session.attended ? "text-green-600" : "text-gray-500"
//                         }`}>
//                             {session.attended ? "Attended" : "Not Attended"}
//                         </span>
//                     )}
//                     {session.attended ? (
//                         <CheckCircle className="text-green-500" size={20} />
//                     ) : (
//                         <XCircle className="text-gray-400" size={20} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };