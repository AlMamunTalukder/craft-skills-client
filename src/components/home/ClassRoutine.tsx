import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { Schedule } from "@/types";

const border = "border-[5px] border-white px-2 md:px-4 md:py-2";

type Props = {
  scheduleData: Schedule[] | null;
};

const ClassRoutine = ({ scheduleData }: Props) => {
  const schedule = scheduleData || [];

  if (schedule.length === 0) {
    return (
      <Container>
        <div className="mt-8 md:mt-20">
          <SectionTitle text="ক্লাস শিডিউল" />
          <div className="text-center py-16 text-gray-500">
            শীঘ্রই ক্লাস শিডিউল আপডেট করা হবে
          </div>
          <div className="border-dashed border-b border-gray-400 pb-10 md:pb-20" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-8 md:mt-20">
        <SectionTitle text="ক্লাস শিডিউল" />

        <div className="w-[280px] md:w-[770px] mx-auto overflow-x-auto">
          <table className="min-w-full text-center">
            <thead className="bg-[#4F0187] text-white">
              <tr>
                <th className={border}>ক্লাস</th>
                <th className={border}>বার</th>
                <th className={border}>সময়</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 text-[12px] md:text-[19px]">
              {schedule.map((routine) => (
                <tr key={routine._id} className="bg-gray-100">
                  <td className={border}>{routine.className}</td>
                  <td className={border}>{routine.days}</td>
                  <td className={border}>{routine.time}</td>
                </tr>
              ))}

              {schedule[0]?.holidays && (
                <tr className="bg-gray-100">
                  <td
                    colSpan={3}
                    className="border-[5px] border-white px-4 py-2 font-medium"
                  >
                    {schedule[0].holidays}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-dashed border-b border-gray-400 pb-10 md:pb-20" />
      </div>
    </Container>
  );
};

export default ClassRoutine;