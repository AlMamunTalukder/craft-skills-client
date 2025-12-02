"use client";

import Container from "../shared/Container";
import React, { useEffect, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import { usePathname } from "next/navigation";
import { getClassRoutines } from "@/queries/classRoutine";
import { getHolidays } from "@/queries/holiday";
import type { ClassRoutine, Holiday } from "@prisma/client";

const border = "border-[5px] border-white px-2 md:px-4 md:py-2";

const ClassRoutine = () => {
  const pathname = usePathname();
  const [routines, setRoutines] = useState<ClassRoutine[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routinesData, holidaysData] = await Promise.all([
          getClassRoutines(),
          getHolidays(),
        ]);
        setRoutines(routinesData || []);
        setHolidays(holidaysData || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="mt-8 md:mt-20">
          <div className="w-[280px] md:w-[770px] mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-8 md:mt-20">
        {pathname === "/dashboard/content/class-schedule" ? (
          <></>
        ) : (
          <>
            <SectionTitle text="ক্লাস শিডিউল" />
          </>
        )}
        <div className="w-[280px] md:w-[770px] mx-auto overflow-x-auto">
          <table className="min-w-full text-center">
            <thead className="bg-[#4F0187] text-white">
              <tr>
                <th className="text-[18px] md:text-[20px] border-[5px] border-white px-4 py-2">
                  ক্লাস
                </th>
                <th className="text-[18px] md:text-[20px] border-[5px] border-white px-4 py-2">
                  বার
                </th>
                <th className="text-[18px] md:text-[20px] border-[5px] border-white px-4 py-2">
                  সময়
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-[12px] md:text-[19px]">
              {routines.map((routine) => (
                <tr key={routine.id} className="bg-gray-100">
                  <td className={border}>{routine.className}</td>
                  <td className={border}>{routine.days}</td>
                  <td className={border}>{routine.time}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td
                  className="border-[5px] border-white px-4 py-2 text-gray-800"
                  colSpan={3}
                >
                  {holidays
                    .filter((h) => h.isActive)
                    .map((h) => h.days)
                    .join(", ") || ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {pathname === "/dashboard/content/class-schedule" ? (
          <></>
        ) : (
          <>
            <div className="border-dashed border-b border-gray-400 pb-10 md:pb-20" />
          </>
        )}
      </div>
    </Container>
  );
};

export default ClassRoutine;
