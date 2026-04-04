import { Skeleton } from "@/components/ui/skeleton";

interface AttendanceStatsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  percentage: number;
  attended: number;
  total: number;
  loading: boolean;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
}

export function AttendanceStatsCard({
  icon,
  title,
  subtitle,
  percentage,
  attended,
  total,
  loading,
  gradientFrom,
  gradientTo,
  textColor,
}: AttendanceStatsCardProps) {
  return (
    <div className={`bg-linear-to-r ${gradientFrom} ${gradientTo} rounded-xl p-6 text-white mb-6 shadow-lg`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            {icon}
            {title}
          </h2>
          <p className={`${textColor}`}>{subtitle}</p>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <div className="text-4xl md:text-5xl font-bold">
            {loading ? (
              <Skeleton className="h-12 w-24 bg-white/20 inline-block rounded-lg" />
            ) : (
              `${percentage}%`
            )}
          </div>
          <div className="text-lg mt-1">
            {loading ? (
              <Skeleton className="h-6 w-48 bg-white/20 inline-block rounded-lg" />
            ) : (
              `${attended}/${total} Classes Attended`
            )}
          </div>
        </div>
      </div>
    </div>
  );
}