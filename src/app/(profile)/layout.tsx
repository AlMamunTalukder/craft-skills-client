"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Star, 
  Users,
  Award,
  LogOut,
  Menu,
  X,
  Home
} from "lucide-react";
import { logout } from "@/src/lib/currentUser";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/profile", icon: LayoutDashboard },
    { name: "Main Class Attendance", href: "/main-class", icon: BookOpen },
    { name: "Special Class Attendance", href: "/special-class", icon: Star },
    { name: "Guest Class Attendance", href: "/guest-class", icon: Users },
    { name: "Results", href: "/results", icon: Award },
  ];

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button
            onClick={handleSignOut}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Student Panel</h2>
            <p className="text-gray-400 text-sm mt-1">Batch 35</p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-200 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-white transition-all"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-red-300 w-full mt-2 transition-all"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="w-64 bg-gray-900 text-white h-full">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Student Panel</h2>
                <p className="text-gray-400 text-sm mt-1">Batch 35</p>
              </div>
              
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-200 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-700">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-white"
                >
                  <Home size={20} />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-30">
        <div className="flex justify-around p-2">
          {menuItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg flex-1 max-w-20 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1 text-center">
                  {item.name.split(" ")[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}