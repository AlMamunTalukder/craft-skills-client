import { Skeleton } from "@/components/ui/skeleton";

export function AttendanceCardSkeleton() {
  return (
    <div className="border-2 border-gray-100 rounded-xl p-2 flex justify-between items-center">
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}