"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function SpecialClassAttendance() {
  const [attendance, setAttendance] = useState([
    { className: "Special Class 1", attended: false },
    { className: "Special Class 2", attended: false },
    { className: "Special Class 3", attended: false },
    { className: "Special Class 4", attended: false },
    { className: "Special Class 5", attended: false },
  ]);

  const toggleAttendance = (index: number) => {
    const newAttendance = [...attendance];
    newAttendance[index].attended = !newAttendance[index].attended;
    setAttendance(newAttendance);
  };

  const totalClasses = attendance.length;
  const attendedClasses = attendance.filter(cls => cls.attended).length;
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Special Class Attendance
        </h1>
        <p className="text-gray-600 mt-2">
          Track your special class attendance
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Attendance Summary</h2>
            <p className="text-orange-100">Your special class attendance record</p>
          </div>
          <div className="mt-4 lg:mt-0 text-center lg:text-right">
            <div className="text-4xl lg:text-5xl font-bold">{percentage}%</div>
            <div className="text-lg">
              {attendedClasses}/{totalClasses} Classes
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendance.map((cls, index) => (
            <div
              key={cls.className}
              className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                cls.attended
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
              onClick={() => toggleAttendance(index)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {cls.className}
                </h3>
                {cls.attended ? (
                  <CheckCircle className="text-green-500" size={28} />
                ) : (
                  <XCircle className="text-gray-400" size={28} />
                )}
              </div>
              <div className={`text-center font-medium text-lg ${
                cls.attended ? "text-green-600" : "text-gray-500"
              }`}>
                {cls.attended ? "Attended ✓" : "Not Attended"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}