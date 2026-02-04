import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { ScheduleGroup } from "@/types";

const border =
  "border-[3px] md:border-[5px] border-white px-3 py-3 md:px-4 md:py-4";

type Props = {
  scheduleData: ScheduleGroup[] | ScheduleGroup | null;
};

export const ClassRoutine = ({ scheduleData }: Props) => {
  const dataArray = Array.isArray(scheduleData)
    ? scheduleData
    : scheduleData
      ? [scheduleData]
      : [];

  const displaySchedule =
    dataArray.find((item) => item.isActive) || dataArray[0];

  if (!displaySchedule || !displaySchedule.schedules?.length) {
    return (
      <Container>
        <div className="mt-8 md:mt-20 text-center py-16 text-gray-500">
          <SectionTitle text="ক্লাস শিডিউল" />
          <p>শীঘ্রই ক্লাস শিডিউল আপডেট করা হবে</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-8 md:mt-20">
        <div className="flex flex-col justify-between items-start md:items-center mb-6">
          <SectionTitle text="ক্লাস শিডিউল" />
        </div>

        <div className="w-full max-w-[850px] mx-auto overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-[#4F0187] text-white">
              <tr>
                <th className={`${border} font-bold`}>ক্লাস</th>
                <th className={`${border} font-bold`}>বার</th>
                <th className={`${border} font-bold`}>সময়</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {displaySchedule.schedules.map((routine) => (
                <tr key={routine._id} className="bg-gray-100">
                  <td className={`${border} font-semibold`}>
                    {routine.className}
                  </td>
                  <td className={border}>{routine.days}</td>
                  <td className={`${border} font-medium`}>{routine.time}</td>
                </tr>
              ))}
              {displaySchedule.holidays && (
                <tr className="bg-gray-100">
                  <td
                    colSpan={3}
                    className={`${border} font-bold text-gray-800`}
                  >
                    {displaySchedule.holidays}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-dashed border-b border-gray-400 pb-10 md:pb-20 mt-10" />
      </div>
    </Container>
  );
};
