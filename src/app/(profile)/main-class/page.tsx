"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function MainClassAttendance() {
  const [attendance, setAttendance] = useState([
    {
      className: "Main Class 1",
      sessions: [
        { type: "Main Class Session", attended: false },
        { type: "Problem Solving Session", attended: false },
        { type: "Practice Session", attended: false }
      ]
    },
    {
      className: "Main Class 2",
      sessions: [
        { type: "Main Class Session", attended: false },
        { type: "Problem Solving Session", attended: false },
        { type: "Practice Session", attended: false }
      ]
    },
    // Add more classes as needed
  ]);

  const toggleAttendance = (classIndex: number, sessionIndex: number) => {
    const newAttendance = [...attendance];
    newAttendance[classIndex].sessions[sessionIndex].attended = 
      !newAttendance[classIndex].sessions[sessionIndex].attended;
    setAttendance(newAttendance);
  };

  const totalSessions = attendance.reduce((total, cls) => total + cls.sessions.length, 0);
  const attendedSessions = attendance.reduce((total, cls) => 
    total + cls.sessions.filter(s => s.attended).length, 0
  );
  const percentage = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Main Class Attendance
        </h1>
        <p className="text-gray-600 mt-2">
          Track your regular class attendance
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Attendance Summary</h2>
            <p className="text-blue-100">Your main class attendance record</p>
          </div>
          <div className="mt-4 lg:mt-0 text-center lg:text-right">
            <div className="text-4xl lg:text-5xl font-bold">{percentage}%</div>
            <div className="text-lg">
              {attendedSessions}/{totalSessions} Sessions
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <div className="space-y-6">
          {attendance.map((cls, classIndex) => (
            <div key={cls.className} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                {cls.className}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cls.sessions.map((session, sessionIndex) => (
                  <div
                    key={session.type}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      session.attended
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                    onClick={() => toggleAttendance(classIndex, sessionIndex)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-800">{session.type}</span>
                      {session.attended ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <XCircle className="text-gray-400" size={24} />
                      )}
                    </div>
                    <div className={`text-sm font-medium ${
                      session.attended ? "text-green-600" : "text-gray-500"
                    }`}>
                      {session.attended ? "Attended" : "Not Attended"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}