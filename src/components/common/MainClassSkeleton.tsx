import { Skeleton } from "@/components/ui/skeleton";
import { AttendanceCardSkeleton } from "./AttendanceCardSkeleton";

export function MainClassSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="">
            <AttendanceCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
