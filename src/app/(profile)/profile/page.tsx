import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { BookOpen, Star, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { attendanceService } from "@/src/services/attendance";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/login");

  const BATCH_ID = user.batchNumber || "36";
  
  // Fetch summary from database (now very fast)
  const summaryResult = await attendanceService.getSummary(BATCH_ID);
  const summary = summaryResult.success ? summaryResult.data! : {
    main: { attended: 0, total: 15, percentage: 0 },
    special: { attended: 0, total: 5, percentage: 0 },
    guest: { attended: 0, total: 5, percentage: 0 },
    overall: { attendedSessions: 0, totalSessions: 25, percentage: 0 }
  };

  const stats = [
    {
      title: "Main Classes",
      value: `${summary.main.attended}/${summary.main.total}`,
      percentage: summary.main.percentage,
      icon: BookOpen,
      color: "blue",
      href: "/main-class"
    },
    {
      title: "Special Classes",
      value: `${summary.special.attended}/${summary.special.total}`,
      percentage: summary.special.percentage,
      icon: Star,
      color: "orange",
      href: "/special-class"
    },
    {
      title: "Guest Classes",
      value: `${summary.guest.attended}/${summary.guest.total}`,
      percentage: summary.guest.percentage,
      icon: Users,
      color: "green",
      href: "/guest-class"
    },
    {
      title: "Overall",
      value: `${summary.overall.attendedSessions}/${summary.overall.totalSessions}`,
      percentage: summary.overall.percentage,
      icon: CheckCircle,
      color: "purple",
      href: "#"
    }
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Batch #{user.batchNumber} • Student Dashboard
        </p>
      </div>

      {/* Overall Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Attendance Overview</h2>
            <p className="text-blue-100">Updated in real-time</p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <div className="text-4xl md:text-5xl font-bold">{summary.overall.percentage}%</div>
            <div className="text-lg">
              {summary.overall.attendedSessions}/{summary.overall.totalSessions} Total
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            orange: 'bg-orange-100 text-orange-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600'
          };

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={` p-2 rounded-lg`}>
                  <Icon size={20} />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {stat.percentage}% attended
                </div>
                <div className={`text-xs px-2 py-1 rounded ${colorClasses[stat.color]}`}>
                  {stat.percentage}%
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Student Info & Progress */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Information & Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Info */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Student Details</h3>
            <div className="space-y-3">
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Batch" value={`#${user.batchNumber}`} />
              <InfoRow label="Email" value={user.email || "Not provided"} />
              <InfoRow label="Phone" value={user.phone || "Not provided"} />
            </div>
          </div>

          {/* Progress Bars */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Detailed Progress</h3>
            <div className="space-y-4">
              <ProgressBar 
                label="Main Classes" 
                percentage={summary.main.percentage} 
                count={`${summary.main.attended}/${summary.main.total}`}
                color="blue"
              />
              <ProgressBar 
                label="Special Classes" 
                percentage={summary.special.percentage} 
                count={`${summary.special.attended}/${summary.special.total}`}
                color="orange"
              />
              <ProgressBar 
                label="Guest Classes" 
                percentage={summary.guest.percentage} 
                count={`${summary.guest.attended}/${summary.guest.total}`}
                color="green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function ProgressBar({ label, percentage, count, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{count} • {percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}