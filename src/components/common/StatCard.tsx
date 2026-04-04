import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  label: string;
  value: number;
  loading: boolean;
}

export function StatCard({ label, value, loading }: StatCardProps) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 flex justify-center">
          {loading ? <Skeleton className="h-8 w-8 rounded" /> : value}
        </div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </div>
    </div>
  );
}