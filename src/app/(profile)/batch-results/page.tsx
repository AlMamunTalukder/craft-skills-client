/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  BookOpen,
  LogIn,
  User,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// 1. Static Configuration for Result Styles (Reduces long switch case)
const RESULT_CONFIG: Record<string, any> = {
  excellent: {
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: CheckCircle,
    label: "Excellent",
    desc: "Outstanding performance!",
  },
  "very good": {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
    label: "Very Good",
    desc: "Excellent performance.",
  },
  good: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: CheckCircle,
    label: "Good",
    desc: "Solid understanding.",
  },
  average: {
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: Clock,
    label: "Average",
    desc: "Satisfactory performance.",
  },
  "needs improvement": {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
    label: "Needs Improvement",
    desc: "Requires more practice.",
  },
  pending: {
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: Clock,
    label: "Pending",
    desc: "Result not yet published.",
  },
};

export default function CurrentBatchResultsPage() {
  const router = useRouter();
  const [state, setState] = useState({
    data: null as any,
    loading: true,
    error: "",
    authError: false,
    refreshing: false,
  });

  // 2. Simplified Batch Label Logic
  const getBatchLabel = (d: any) => {
    if (!d) return "No Batch Selected";

    return d.code
      ? `Batch ${d.code}`
      : d.batchCode
        ? `Batch ${d.batchCode}`
        : d.batchId?.code
          ? `Batch ${d.batchId.code}`
          : d.batchName ||
            (d.batchNumber
              ? `Batch ${d.batchNumber}`
              : typeof d.batchId === "string"
                ? `Batch ID: ${d.batchId}`
                : "Batch Result");
  };

  const fetchResult = async (isRefresh = false) => {
    if (isRefresh) setState((prev) => ({ ...prev, refreshing: true }));
    try {
      const batchId = localStorage.getItem("selectedBatchId");

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

      const res = await fetch(
        `${API_URL}/admissions/student/result${batchId ? `?batchId=${batchId}` : ""}`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.status === 401)
        return setState((prev) => ({
          ...prev,
          loading: false,
          refreshing: false,
          authError: true,
        }));
      if (!res.ok) throw new Error(`Status: ${res.status}`);

      const json = await res.json();
      setState({
        data: json.success ? json.data : null,
        loading: false,
        refreshing: false,
        authError: false,
        error: json.success ? "" : json.message || "No result found",
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: err.message,
        data: null,
      }));
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  if (state.loading) return <ResultSkeleton />;

  // Get style config based on result string
  const style =
    RESULT_CONFIG[state.data?.result?.toLowerCase()] || RESULT_CONFIG.pending;
  const Icon = style.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Student Result
          </h1>

          <div className="flex items-center gap-5 ">
            <h1 className="flex items-center content-center gap-2 mt-2 text-gray-600">
              <User size={18} /> {state.data?.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <BookOpen size={18} />{" "}
              <span className="font-medium">{getBatchLabel(state.data)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {state.authError && (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 cursor-pointer"
            >
              <LogIn size={18} /> <span>Login</span>
            </button>
          )}
          <button
            onClick={() => fetchResult(true)}
            disabled={state.refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 cursor-pointer"
          >
            <RefreshCw
              size={18}
              className={state.refreshing ? "animate-spin" : ""}
            />{" "}
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Errors */}
      {state.authError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700 flex items-center gap-3 mb-6">
          <AlertCircle className="h-5 w-5" />{" "}
          <span>Session expired. Please login.</span>
        </div>
      )}
      {state.error && !state.authError && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-orange-700 flex items-center gap-3 mb-6">
          <AlertCircle className="h-5 w-5" /> <span>{state.error}</span>
        </div>
      )}

      {/* Result Card */}
      {state.data && (
        <div
          className={`rounded-2xl ${style.bg} p-8 text-center border ${style.border}`}
        >
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center mb-6">
              <Icon
                className={`h-16 w-16 ${style.color.replace("text-", "text-opacity-90 ")}`}
              />
            </div>
            <h2
              className={`text-5xl font-bold tracking-tight ${style.color} mb-4`}
            >
              {style.label}
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              {style.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex justify-between mb-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="bg-white border rounded-xl p-8 space-y-6">
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
        <Skeleton className="h-10 w-52 mx-auto" />
      </div>
    </div>
  );
}
