// "use client";

// import { ReactNode } from 'react';

// interface StatsCardProps {
//     title: string;
//     description: string;
//     percentage: number;
//     attendedSessions: number;
//     totalSessions: number;
//     gradientFrom: string;
//     gradientTo: string;
// }

// export const StatsCard = ({
//     title,
//     description,
//     percentage,
//     attendedSessions,
//     totalSessions,
//     gradientFrom,
//     gradientTo
// }: StatsCardProps) => {
//     return (
//         <div 
//             className={`bg-linear-to-r ${gradientFrom} ${gradientTo} rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8`}
//         >
//             <div className="flex flex-col lg:flex-row items-center justify-between">
//                 <div>
//                     <h2 className="text-xl lg:text-2xl font-bold mb-2">{title}</h2>
//                     <p className="text-blue-100">{description}</p>
//                 </div>
//                 <div className="mt-4 lg:mt-0 text-center lg:text-right">
//                     <div className="text-4xl lg:text-5xl font-bold">{percentage}%</div>
//                     <div className="text-lg">
//                         {attendedSessions}/{totalSessions} Sessions
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };