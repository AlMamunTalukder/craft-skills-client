/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { studentAttendanceService } from "@/src/services/studentAttendance";

export function useAttendanceData(
  classNames: string[],
  sessionType: string,
  loadOnMount = true
) {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
      
      if (sessionsResult.success && sessionsResult.data) {
        const attendanceData = classNames.map((className) => {
          const attendedRecord = sessionsResult.data.find(
            (record: any) =>
              record.className === className && record.sessionType === sessionType
          );
          
          return {
            className,
            attended: attendedRecord?.attended || false,
            attendanceId: attendedRecord?._id,
            date: attendedRecord?.date,
          };
        });
        
        setClasses(attendanceData);
      } else {
        toast.error(`Failed to load ${sessionType} classes`);
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error(`Failed to load ${sessionType} classes`);
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (className: string, currentStatus: boolean, updateFunction: any) => {
    try {
      const result = await updateFunction(className, !currentStatus);
      
      if (result.success) {
        setClasses((prev) =>
          prev.map((cls) =>
            cls.className === className ? { ...cls, attended: !currentStatus, date: new Date() } : cls
          )
        );
        toast.success(`${sessionType} class ${!currentStatus ? "marked" : "unmarked"} successfully`);
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

  useEffect(() => {
    if (loadOnMount) {
      loadData();
    }
  }, []);

  const calculateStats = () => {
    if (loading && classes.length === 0) {
      return { attended: 0, total: classNames.length, percentage: 0 };
    }
    
    const attended = classes.filter((cls) => cls.attended).length;
    return {
      attended,
      total: classNames.length,
      percentage: Math.round((attended / classNames.length) * 100)
    };
  };

  return {
    loading,
    classes,
    loadData,
    toggleAttendance,
    calculateStats,
    setClasses,
  };
}