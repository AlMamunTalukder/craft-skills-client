import { Tag, Loader2, XCircle, AlertCircle } from "lucide-react";
import { Course } from "@/types";
import { CouponState } from "./AdmissionForm";


interface CouponProps {
  selectedCourse: Course | null;
  couponInput: string;
  setCouponInput: (val: string) => void;
  couponState: CouponState;
  onApply: () => void;
  onRemove: () => void;
}

export default function CouponSection({ selectedCourse, couponInput, setCouponInput, couponState, onApply, onRemove }: CouponProps) {
  if (!selectedCourse) return null;

  return (
    <div className="bg-green-50 rounded-2xl p-4 md:p-6 border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-green-800">কুপন কোড</h3>
        {couponState.applied && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            Applied
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white ${
              couponState.error ? "border-red-500" : "border-green-300"
            }`}
            placeholder="কুপন কোড লিখুন"
            disabled={couponState.applied}
          />
        </div>
        
        <button
          type="button"
          onClick={couponState.applied ? onRemove : onApply}
          className={`px-6 py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer ${
            couponState.applied ? "bg-red-500 hover:bg-red-600" : "bg-[#4f0187] hover:bg-[#6d0b99]"
          }`}
          disabled={couponState.loading || (!couponInput && !couponState.applied)}
        >
          {couponState.loading ? <Loader2 className="animate-spin" /> : couponState.applied ? <XCircle /> : <Tag />}
          {couponState.applied ? "সরান" : "প্রয়োগ করুন"}
        </button>
      </div>
      
      {couponState.error && (
        <div className="flex items-center gap-2 mt-3 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" /> {couponState.error}
        </div>
      )}
    </div>
  );
}