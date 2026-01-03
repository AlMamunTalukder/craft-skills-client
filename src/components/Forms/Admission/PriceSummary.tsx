import { CreditCard, BadgeCheck } from "lucide-react";
import { Course } from "@/types";

interface PriceDetails {
  totalWithCharge: number;
  finalTotal: number;
}

interface PriceSummaryProps {
  selectedCourse: Course | null;
  priceDetails: PriceDetails | null;
  couponDiscount: number;
}

export default function PriceSummary({ selectedCourse, priceDetails, couponDiscount }: PriceSummaryProps) {
  if (!selectedCourse || !priceDetails) return null;

  return (
    <div className="bg-purple-50 rounded-2xl p-4 md:p-6 border border-purple-200">
      <h3 className="font-semibold text-[#4f0187] mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5" /> মূল্য বিবরণ
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>মূল দাম (চার্জ সহ):</span>
          <span className="font-medium">৳{priceDetails.totalWithCharge.toLocaleString()}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> কুপন ছাড়:</span>
            <span className="font-medium">-৳{couponDiscount.toLocaleString()}</span>
          </div>
        )}
        <div className="border-t border-purple-200 pt-3 mt-2">
          <div className="flex justify-between text-lg font-bold text-[#4f0187]">
            <span>সর্বমোট পরিমাণ:</span>
            <span className="text-2xl">৳{priceDetails.finalTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}