/* eslint-disable @typescript-eslint/no-unused-vars */
import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { BookOpen, Star, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { attendanceService } from "@/src/services/attendance";

export default async function StudentDashboard() {
  const user = await currentUser();
  if (!user) redirect("/login");

  // Fetch attendance stats from database
  const BATCH_ID = user.batchNumber || "36";
  let mainAttendance = { attended: 0, total: 15, percentage: 0 };
  let specialAttendance = { attended: 0, total: 5, percentage: 0 };
  let guestAttendance = { attended: 0, total: 5, percentage: 0 };

  try {
    const [mainResult, specialResult, guestResult] = await Promise.all([
      attendanceService.getSummary(BATCH_ID, 'main'),
      attendanceService.getSummary(BATCH_ID, 'special'),
      attendanceService.getSummary(BATCH_ID, 'guest')
    ]);

    if (mainResult.success) mainAttendance = mainResult.data;
    if (specialResult.success) specialAttendance = specialResult.data;
    if (guestResult.success) guestAttendance = guestResult.data;
  } catch (error) {
    console.log('Could not load attendance stats');
  }

  const totalAttended = mainAttendance.attended + specialAttendance.attended + guestAttendance.attended;
  const totalSessions = mainAttendance.total + specialAttendance.total + guestAttendance.total;
  const overallPercentage = Math.round((totalAttended / totalSessions) * 100);

  const stats = [
    {
      title: "Main Classes",
      value: `${mainAttendance.attended}/${mainAttendance.total}`,
      percentage: mainAttendance.percentage,
      icon: BookOpen,
      color: "bg-blue-500",
      href: "/main-class"
    },
    {
      title: "Special Classes",
      value: `${specialAttendance.attended}/${specialAttendance.total}`,
      percentage: specialAttendance.percentage,
      icon: Star,
      color: "bg-orange-500",
      href: "/special-class"
    },
    {
      title: "Guest Classes",
      value: `${guestAttendance.attended}/${guestAttendance.total}`,
      percentage: guestAttendance.percentage,
      icon: Users,
      color: "bg-green-500",
      href: "/guest-class"
    },
    {
      title: "Overall",
      value: `${totalAttended}/${totalSessions}`,
      percentage: overallPercentage,
      icon: CheckCircle,
      color: "bg-purple-500",
      href: "#"
    }
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Batch #{user.batchNumber}</p>
      </div>

      {/* Attendance Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Your Attendance</h2>
            <p className="text-blue-100">Overall: {overallPercentage}%</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{totalAttended}/{totalSessions}</div>
            <div className="text-sm">Sessions Attended</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}
              className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">{stat.percentage}% attended</div>
                <div className="text-xs px-2 py-1 bg-gray-100 rounded">{stat.percentage}%</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Student Info */}
      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold mb-4">Student Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-semibold">{user.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Batch</div>
            <div className="font-semibold">#{user.batchNumber}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-semibold truncate">{user.email || "-"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-semibold">{user.phone || "-"}</div>
          </div>
        </div>
        
        {/* Additional Attendance Info */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-bold mb-3">Attendance Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <AttendanceDetail label="Main Classes" value={`${mainAttendance.attended} of ${mainAttendance.total}`} />
            <AttendanceDetail label="Special Classes" value={`${specialAttendance.attended} of ${specialAttendance.total}`} />
            <AttendanceDetail label="Guest Classes" value={`${guestAttendance.attended} of ${guestAttendance.total}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}