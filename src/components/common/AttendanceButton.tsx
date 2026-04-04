import { CheckCircle } from "lucide-react";

interface AttendanceButtonProps {
  label: string;
  attended: boolean;
  onClick: () => void;
  attendedClass?: string;
  notAttendedClass?: string;
  iconColor?: string;
}

export function AttendanceButton({
  label,
  attended,
  onClick,
  attendedClass = "border-green-500 bg-green-50 hover:bg-green-100",
  notAttendedClass = "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400",
  iconColor = "text-green-600",
}: AttendanceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer group text-left h-full ${
        attended ? attendedClass : notAttendedClass
      }`}
    >
      <div className="flex-1 pr-2">
        <div className="font-bold text-gray-800 text-lg">{label}</div>
      </div>
      <div className={`p-2 rounded-full shrink-0 ${attended ? "bg-green-100" : "bg-red-100"}`}>
        {attended ? (
          <CheckCircle className={iconColor} size={20} />
        ) : (
          <div className="w-5 h-5 rounded-full border border-red-400"></div>
        )}
      </div>
    </button>
  );
}