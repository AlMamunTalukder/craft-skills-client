import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { BookOpen, Star, Users, Award } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const stats = [
    {
      title: "Main Classes",
      value: "15/15",
      subtitle: "Regular classes attended",
      icon: BookOpen,
      color: "bg-blue-500",
      href: "/student/main-class"
    },
    {
      title: "Special Classes",
      value: "5/5",
      subtitle: "Special sessions attended",
      icon: Star,
      color: "bg-orange-500",
      href: "/student/special-class"
    },
    {
      title: "Guest Classes",
      value: "5/5",
      subtitle: "Guest lectures attended",
      icon: Users,
      color: "bg-green-500",
      href: "/student/guest-class"
    },
    {
      title: "Results",
      value: "Pending",
      subtitle: "Academic performance",
      icon: Award,
      color: "bg-purple-500",
      href: "/student/results"
    }
  ];

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Batch {user.batchNumber} • Student Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{stat.subtitle}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl lg:rounded-2xl shadow-xl p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">
          Track Your Progress
        </h2>
        <p className="text-blue-100 mb-6 lg:mb-8">
          Stay updated with your class attendance and academic performance.
          Regular attendance leads to better results!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all duration-300"
            >
              <div className="text-xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm">{stat.title}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Student Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
          Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div>
            <div className="text-sm text-gray-500 font-medium">Name</div>
            <div className="text-lg font-semibold text-gray-800">{user.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Batch</div>
            <div className="text-lg font-semibold text-gray-800">#{user.batchNumber}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Email</div>
            <div className="text-lg font-semibold text-gray-800 truncate">
              {user.email || "Not provided"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Phone</div>
            <div className="text-lg font-semibold text-gray-800">
              {user.phone || "Not provided"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}