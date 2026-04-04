import { CheckCircle } from "lucide-react";

interface SessionType {
  key: 'regular' | 'problemSolving' | 'practice';
  label: string;
  iconColor: string;
}

const SESSION_TYPES: SessionType[] = [
  { key: 'regular', label: 'Main Class', iconColor: 'text-green-600' },
  { key: 'problemSolving', label: 'Problem Solving', iconColor: 'text-orange-600' },
  { key: 'practice', label: 'Practice Class', iconColor: 'text-blue-600' },
];

interface MainClassCardProps {
  className: string;
  sessions: {
    regular: boolean;
    problemSolving: boolean;
    practice: boolean;
  };
  onToggle: (className: string, sessionType: 'regular' | 'problemSolving' | 'practice') => void;
}

export function MainClassCard({ className, sessions, onToggle }: MainClassCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-bold text-gray-800">{className}</h4>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded ${sessions.regular ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
            Main
          </span>
          <span className={`text-xs px-2 py-1 rounded ${sessions.problemSolving ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
            Problem
          </span>
          <span className={`text-xs px-2 py-1 rounded ${sessions.practice ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
            Practice
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SESSION_TYPES.map((session) => (
          <button
            key={session.key}
            onClick={() => onToggle(className, session.key)}
            className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
              sessions[session.key]
                ? "border-green-500 bg-green-50 hover:bg-green-100"
                : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
            }`}
          >
            <div className="text-left">
              <div className="font-medium text-gray-800">{session.label}</div>
            </div>
            <div className={`p-2 rounded-full ${sessions[session.key] ? "bg-green-100" : "bg-blue-100"}`}>
              {sessions[session.key] ? (
                <CheckCircle className={session.iconColor} size={20} />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}