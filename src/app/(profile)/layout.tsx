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
  Home,
} from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/profile", icon: LayoutDashboard },
    { name: "Main Classes", href: "/main-class", icon: BookOpen },
    { name: "Special Classes", href: "/special-class", icon: Star },
    { name: "Guest Classes", href: "/guest-class", icon: Users },
    { name: "Results", href: "/results", icon: Award },
  ];

  const handleSignOut = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-40 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button
            onClick={handleSignOut}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-gray-900 text-white h-screen sticky top-0">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Student Panel</h2>
            <p className="text-gray-400 text-sm mt-1">Batch 36</p>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === item.href ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 w-full mt-2"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="w-64 bg-gray-900 text-white h-full">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Student Panel</h2>
                <p className="text-gray-400 text-sm mt-1">Batch 36</p>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      pathname === item.href
                        ? "bg-blue-600"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
