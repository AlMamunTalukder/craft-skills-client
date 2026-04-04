/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { studentAttendanceService } from "@/src/services/studentAttendance";

interface MainClass {
  className: string;
  regular: boolean;
  problemSolving: boolean;
  practice: boolean;
}

export function useMainClassData(classNames: string[]) {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<MainClass[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
      
      if (sessionsResult.success && sessionsResult.data) {
        const mainClassesData = classNames.map((className) => {
          // Get all records for this class
          const classRecords = sessionsResult.data.filter(
            (record: any) => record.className === className
          );
          
          // Find latest record for each session type
          const getLatestAttendance = (sessionType: string) => {
            const record = classRecords
              .filter((r: any) => r.sessionType === sessionType)
              .sort((a: any, b: any) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())[0];
            return record?.attended || false;
          };
          
          return {
            className,
            regular: getLatestAttendance('regular'),
            problemSolving: getLatestAttendance('problemSolving'),
            practice: getLatestAttendance('practice'),
          };
        });
        
        setClasses(mainClassesData);
      } else {
        toast.error("Failed to load main classes");
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load main classes");
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (
    className: string,
    sessionType: 'regular' | 'problemSolving' | 'practice',
    currentStatus: boolean
  ) => {
    try {
      const result = await studentAttendanceService.markAttendance({
        className,
        sessionType,
        attended: !currentStatus,
      });
      
      if (result.success) {
        setClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, [sessionType]: !currentStatus }
              : cls
          )
        );
        toast.success(`Attendance ${!currentStatus ? "marked" : "unmarked"} successfully`);
        return true;
      } else {
        toast.error(result.message || "Failed to update");
        return false;
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update attendance");
      return false;
    }
  };

  const calculateStats = () => {
    if (loading && classes.length === 0) {
      return { attended: 0, total: classNames.length * 3, percentage: 0 };
    }
    
    let attendedSessions = 0;
    classes.forEach((cls) => {
      if (cls.regular) attendedSessions++;
      if (cls.problemSolving) attendedSessions++;
      if (cls.practice) attendedSessions++;
    });
    
    const totalSessions = classNames.length * 3;
    return {
      attended: attendedSessions,
      total: totalSessions,
      percentage: Math.round((attendedSessions / totalSessions) * 100)
    };
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    loading,
    classes,
    loadData,
    toggleAttendance,
    calculateStats,
  };
}