/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { CheckCircle, Clock } from "lucide-react";

// export default function ResultsPage() {
//   // Static data
//   const user = {
//     name: "John Doe",
//     batchNumber: "2025-01",
//   };

//   const result = {
//     status: "Pending",
//     score: 85,
//     comments: "Your result is being evaluated. Please check back later.",
//     lastUpdated: "2026-01-14",
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "pass":
//         return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" };
//       default:
//         return { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" };
//     }
//   };

//   const config = getStatusStyle(result.status);
//   const Icon = config.icon;

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-12">
//         <h1 className="text-3xl font-semibold text-gray-900">Academic Results</h1>
//         <p className="text-sm text-gray-500 mt-2">Batch {user.batchNumber}</p>
//       </div>

//       {/* Result Card */}
//       <div className={`rounded-2xl ${config.bg} p-8 text-center mb-12`}>
//         <Icon className={`${config.color} mx-auto mb-4`} size={56} />
//         <h2 className={`text-4xl font-bold tracking-tight ${config.color}`}>
//           {result.status}
//         </h2>
//         <p className="text-lg text-gray-700 mt-3">
//           Score: <span className="font-semibold">{result.score}%</span>
//         </p>
//         <p className="text-sm text-gray-500 mt-4">
//           Last updated on {new Date(result.lastUpdated).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Feedback */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
//         <h3 className="text-xl font-semibold text-gray-900 mb-4">Feedback</h3>
//         <p className="text-gray-700 leading-relaxed text-base">{result.comments}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getStudentResult() {
  try {
    const response = await fetch(`${API_URL}/admissions/student/result`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching result:", error);
    return { success: false, data: null, message: "Failed to fetch result" };
  }
}

export default function ResultsPage() {
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getStudentResult();

      if (data.success) {
        console.log("Result data:", data.data);
        setResultData(data.data);
      } else {
        setError(data.message || "No result found");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to load result. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (result: string) => {
    const resultLower = result?.toLowerCase();

    if (resultLower === "excellent") {
      return {
        icon: CheckCircle,
        color: "text-purple-600",
        bg: "bg-purple-50",
        label: "Excellent",
      };
    }
    if (resultLower === "very good") {
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
        label: "Very Good",
      };
    }
    if (resultLower === "good") {
      return {
        icon: CheckCircle,
        color: "text-blue-600",
        bg: "bg-blue-50",
        label: "Good",
      };
    }
    if (resultLower === "average") {
      return {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        label: "Average",
      };
    }
    if (resultLower === "needs improvement") {
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-50",
        label: "Needs Improvement",
      };
    }

    return {
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      label: "Pending",
    };
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading result...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
          <button
            onClick={loadResult}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">No result data available</p>
        </div>
      </div>
    );
  }

  const config = getStatusStyle(resultData.admission?.result || "pending");
  const Icon = config.icon;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold text-gray-900">
          Academic Results
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Student:{" "}
          <span className="font-medium">
            {resultData.displayName || resultData.user?.name || "N/A"}
          </span>
        </p>
        {resultData.admissionName &&
          resultData.admissionName !== resultData.displayName && (
            <p className="text-sm text-gray-500">
              Admission Name: {resultData.admissionName}
            </p>
          )}
        {resultData.admission?.batchId?.batchNumber && (
          <p className="text-sm text-gray-500">
            Batch: {resultData.admission.batchId.batchNumber}
          </p>
        )}
      </div>

      <div className={`rounded-2xl ${config.bg} p-8 text-center mb-12`}>
        <Icon className={`${config.color} mx-auto mb-4`} size={56} />
        <h2 className={`text-4xl font-bold tracking-tight ${config.color}`}>
          {config.label}
        </h2>
        <p className="text-lg text-gray-700 mt-3">
          Result:{" "}
          <span className="font-semibold">
            {resultData.admission?.result || "pending"}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Last updated on{" "}
          {new Date(
            resultData.admission?.updatedAt || Date.now(),
          ).toLocaleDateString()}
        </p>
      </div>

      
    </div>
  );
}
