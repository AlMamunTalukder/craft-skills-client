import { StatCard } from "./StatCard";

interface BottomStatsProps {
  attended: number;
  remaining: number;
  total: number;
  totalLabel: string;
  loading: boolean;
}

export function BottomStats({ attended, remaining, total, totalLabel, loading }: BottomStatsProps) {
  const stats = [
    { label: "Attended", value: attended },
    { label: "Remaining", value: remaining },
    { label: totalLabel, value: total },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <StatCard key={i} label={stat.label} value={stat.value} loading={loading} />
      ))}
    </div>
  );
}