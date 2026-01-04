// "use client";

// import { Save, Clock, RefreshCw } from 'lucide-react';

// interface SaveButtonProps {
//     hasUnsavedChanges: boolean;
//     saving: boolean;
//     onSave: () => void;
//     onRefresh?: () => void;
//     className?: string;
// }

// export const SaveButton = ({
//     hasUnsavedChanges,
//     saving,
//     onSave,
//     onRefresh,
//     className = ""
// }: SaveButtonProps) => {
//     return (
//         <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
//             <div>
//                 <p className={`font-medium ${hasUnsavedChanges ? 'text-blue-600' : 'text-green-600'}`}>
//                     {hasUnsavedChanges ? '⚠️ Unsaved changes' : '✓ All changes saved'}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                     {hasUnsavedChanges ? 'Click save to store in database' : 'Attendance saved to database'}
//                 </p>
//             </div>
            
//             <div className="flex gap-3">
//                 {onRefresh && (
//                     <button
//                         onClick={onRefresh}
//                         className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                     >
//                         <RefreshCw size={18} />
//                         Refresh
//                     </button>
//                 )}
                
//                 <button
//                     onClick={onSave}
//                     disabled={saving || !hasUnsavedChanges}
//                     className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
//                         hasUnsavedChanges && !saving
//                             ? 'bg-green-600 hover:bg-green-700 text-white'
//                             : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     }`}
//                 >
//                     {saving ? (
//                         <>
//                             <Clock className="h-5 w-5 animate-spin" />
//                             Saving...
//                         </>
//                     ) : (
//                         <>
//                             <Save className="h-5 w-5" />
//                             Save Attendance
//                         </>
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// };