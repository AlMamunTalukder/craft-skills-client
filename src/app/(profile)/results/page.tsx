import { currentUser } from "@/src/lib/currentUser";
import { redirect } from "next/navigation";
import { Award, CheckCircle, XCircle, Clock } from "lucide-react";

export default async function ResultsPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  // Mock data - replace with actual data from your database
  const result = {
    status: "Pending", // "Pass", "Fail", or "Pending"
    score: null, // or percentage score
    comments: "Your result is being evaluated. Please check back later.",
    lastUpdated: new Date().toISOString(),
  };

  const getResultConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "pass":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          message: "Congratulations! You passed the course.",
        };
      case "fail":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          message: "You did not meet the passing criteria.",
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          message: "Result is pending evaluation.",
        };
    }
  };

  const config = getResultConfig(result.status);
  const Icon = config.icon;

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Academic Results
        </h1>
        <p className="text-gray-600 mt-2">
          View your academic performance
        </p>
      </div>

      {/* Result Card */}
      <div className={`rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 ${config.borderColor} ${config.bgColor} mb-6 lg:mb-8`}>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <Icon className={`${config.color}`} size={48} />
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {result.status}
                </h2>
                <p className="text-gray-600 mt-1">Batch {user.batchNumber}</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl">
              {result.score && `Score: ${result.score}% • `}
              {config.message}
            </p>
          </div>
          
          <div className="text-center">
            <Award className="text-gray-400 mx-auto mb-2" size={32} />
            <div className="text-sm text-gray-500">
              Last updated: {new Date(result.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {result.comments && (
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100 mb-6 lg:mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Remarks & Comments
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
            <p className="text-gray-700">{result.comments}</p>
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15/15</div>
            <div className="text-gray-600">Main Classes</div>
            <div className="text-sm text-green-600 mt-1">100% Attendance</div>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">5/5</div>
            <div className="text-gray-600">Special Classes</div>
            <div className="text-sm text-green-600 mt-1">100% Attendance</div>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">5/5</div>
            <div className="text-gray-600">Guest Classes</div>
            <div className="text-sm text-green-600 mt-1">100% Attendance</div>
          </div>
        </div>
      </div>
    </div>
  );
}