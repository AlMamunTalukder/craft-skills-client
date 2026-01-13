"use client";

import { useState, useEffect } from "react";
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
  ChevronDown,
  RefreshCw,
} from "lucide-react";

interface Batch {
  _id: string;
  batchNumber: string;
  name: string;
  isActive: boolean;
  admissionId?: string;
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [batchSwitcherOpen, setBatchSwitcherOpen] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);
  const [userBatches, setUserBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/profile", icon: LayoutDashboard },
    { name: "Main Classes", href: "/main-class", icon: BookOpen },
    { name: "Special Classes", href: "/special-class", icon: Star },
    { name: "Guest Classes", href: "/guest-class", icon: Users },
    { name: "Results", href: "/results", icon: Award },
  ];

  // Load user's batches on mount
  useEffect(() => {
    loadUserBatches();
  }, []);

  const loadUserBatches = async () => {
    try {
      setLoading(true);
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

      console.log("Loading student batches...");

      // Try multiple endpoints in order
      const endpoints = [
        "/users/student-batches", // New endpoint if you add it
        "/users/profile", // Fallback to profile
      ];

      for (const endpoint of endpoints) {
        try {
          console.log(`Trying ${endpoint}...`);
          const response = await fetch(`${API_URL}${endpoint}`, {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`Success from ${endpoint}:`, data);

            if (
              endpoint === "/users/student-batches" &&
              data.success &&
              data.data.batches.length > 0
            ) {
              // Handle student-batches response
              const batches = data.data.batches;
              setUserBatches(batches);
              setCurrentBatch(batches[0]);

              localStorage.setItem("selectedBatchId", batches[0]._id);
              localStorage.setItem(
                "selectedBatchNumber",
                batches[0].batchNumber
              );
              return;
            }

            if (endpoint === "/users/profile" && data.success && data.data) {
              // Create batch from profile data
              const user = data.data;
              if (user.batchNumber) {
                const batch = {
                  _id: user.batchId || `temp-${user._id}`,
                  batchNumber: user.batchNumber,
                  name: `Batch ${user.batchNumber}`,
                  isActive: user.status === "active",
                  admissionId: user.admissionId,
                };

                setUserBatches([batch]);
                setCurrentBatch(batch);

                localStorage.setItem("selectedBatchId", batch._id);
                localStorage.setItem("selectedBatchNumber", batch.batchNumber);
                return;
              }
            }
          } else {
            console.log(`${endpoint} failed:`, response.status);
          }
        } catch (err) {
          console.error(`Error with ${endpoint}:`, err);
        }
      }

      // If nothing works, set empty
      console.log("No batch info found, setting empty");
      setUserBatches([]);
    } catch (error) {
      console.error("Error in loadUserBatches:", error);
      setUserBatches([]);
    } finally {
      setLoading(false);
    }
  };

  const switchBatch = (batch: Batch) => {
    setCurrentBatch(batch);
    setBatchSwitcherOpen(false);

    // Save to localStorage
    localStorage.setItem("selectedBatchId", batch._id);
    localStorage.setItem("selectedBatchNumber", batch.batchNumber);

    // Reload the page to fetch new batch data
    window.location.reload();
  };

  const handleSignOut = () => {
    localStorage.removeItem("selectedBatchId");
    localStorage.removeItem("selectedBatchNumber");
    window.location.href = "/";
  };

  // In layout.tsx, add this test function
  const testEndpoints = async () => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    console.log("=== Testing Endpoints ===");

    try {
      // Test 1: Simple endpoint
      const test1 = await fetch(`${API_URL}/debug/test`, {
        credentials: "include",
      });
      console.log("Test 1 (/debug/test):", await test1.json());

      // Test 2: Always success
      const test2 = await fetch(`${API_URL}/debug/always-success`, {
        credentials: "include",
      });
      console.log("Test 2 (/debug/always-success):", await test2.json());

      // Test 3: Profile endpoint (should work)
      const test3 = await fetch(`${API_URL}/users/profile`, {
        credentials: "include",
      });
      console.log("Test 3 (/users/profile) status:", test3.status);
      if (test3.ok) {
        console.log("Test 3 data:", await test3.json());
      }

      // Test 4: Try my-batches with error handling
      const test4 = await fetch(`${API_URL}/users/my-batches`, {
        credentials: "include",
      });
      console.log("Test 4 (/users/my-batches) status:", test4.status);
      console.log("Test 4 headers:", test4.headers.get("content-type"));

      if (test4.ok) {
        console.log("Test 4 data:", await test4.json());
      } else {
        const errorText = await test4.text();
        console.log("Test 4 error response:", errorText);
        try {
          const errorJson = JSON.parse(errorText);
          console.log("Test 4 error JSON:", errorJson);
        } catch {
          console.log("Test 4 error text (not JSON):", errorText);
        }
      }
    } catch (error) {
      console.error("Test error:", error);
    }
  };

  // Call this in useEffect
  useEffect(() => {
    testEndpoints();
    loadUserBatches();
  }, []);

  if (loading || !currentBatch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your batches...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your batches...</p>
        </div>
      </div>
    );
  }

  if (!currentBatch && userBatches.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Batch Assigned
          </h2>
          <p className="text-gray-600 mb-4">
            You havent been assigned to any batch yet. Please contact the
            administrator or complete your admission process.
          </p>
          <div className="space-y-3">
            <Link
              href="/admission"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Complete Admission
            </Link>
            <div>
              <Link
                href="/"
                className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Mobile Batch Switcher */}
          <div className="relative">
            <button
              onClick={() => setBatchSwitcherOpen(!batchSwitcherOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
            >
              <span className="font-semibold">
                Batch {currentBatch.batchNumber}
              </span>
              <ChevronDown size={16} />
            </button>

            {batchSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">
                    SELECT BATCH
                  </p>
                </div>
                {userBatches.map((batch) => (
                  <button
                    key={batch._id}
                    onClick={() => switchBatch(batch)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center justify-between ${
                      currentBatch._id === batch._id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-gray-800">
                        Batch {batch.batchNumber}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {batch.name}
                      </div>
                    </div>
                    {currentBatch._id === batch._id && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

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

            {/* Desktop Batch Switcher */}
            <div className="mt-4 relative">
              <button
                onClick={() => setBatchSwitcherOpen(!batchSwitcherOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
              >
                <div className="text-left">
                  <div className="text-sm text-gray-400">Current Batch</div>
                  <div className="font-semibold text-blue-400">
                    Batch {currentBatch.batchNumber}
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {batchSwitcherOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-xs text-gray-400 font-medium">
                      YOUR BATCHES
                    </p>
                  </div>
                  {userBatches.map((batch) => (
                    <button
                      key={batch._id}
                      onClick={() => switchBatch(batch)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition ${
                        currentBatch._id === batch._id ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">
                            Batch {batch.batchNumber}
                          </div>
                          <div className="text-xs text-gray-400 line-clamp-1">
                            {batch.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                batch.isActive
                                  ? "bg-green-900 text-green-300"
                                  : "bg-gray-700 text-gray-400"
                              }`}
                            >
                              {batch.isActive ? "Active" : "Completed"}
                            </span>
                          </div>
                        </div>
                        {currentBatch._id === batch._id && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
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

          <div className="p-4 border-t border-gray-700 absolute bottom-0 w-64">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 mb-2"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 w-full"
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Student Panel</h2>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Batch Switcher in Sidebar */}
                <div className="relative">
                  <button
                    onClick={() => setBatchSwitcherOpen(!batchSwitcherOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-400">Current Batch</div>
                      <div className="font-semibold text-blue-400">
                        Batch {currentBatch.batchNumber}
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                </div>
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
        <main className="flex-1">
          {/* Batch Context Banner - Shows current batch */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Batch {currentBatch.batchNumber}
                </div>
                <span className="text-sm opacity-90">{currentBatch.name}</span>
                {!currentBatch.isActive && (
                  <span className="bg-yellow-500 bg-opacity-30 px-2 py-1 rounded text-xs">
                    Completed
                  </span>
                )}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm transition"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
