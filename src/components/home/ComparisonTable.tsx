import { FaCheck } from "react-icons/fa";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { RxCross2 } from "react-icons/rx";

const ComparisonTable = () => {
  const data = [
    { feature: "মেইন ক্লাস", our: true, others: true },
    { feature: "প্রব্লেম সলভিং ক্লাস", our: true, others: false },
    { feature: "প্র্যাক্টিস ক্লাস", our: true, others: false },
    { feature: "স্পেশাল ক্লাস", our: true, others: false },
    { feature: "প্রেজেন্টেশন রিভিউ ক্লাস", our: true, others: false },
    { feature: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন", our: true, others: false },
    { feature: "২৪ ঘন্টা গ্রুপ সাপোর্ট", our: true, others: false },
    { feature: "সার্টিফিকেট প্রদান", our: true, others: true },
    { feature: "আমাদের সাথে কাজ করার সুযোগ", our: true, others: false },
    { feature: "ইনকামের ক্ষেত্রে সহযোগিতা", our: true, others: false },
    { feature: "কোর্স শেষে লাইফটাইম সাপোর্ট", our: true, others: false },
  ];

  return (
    <div className="bg-[#fff6ef] py-10 md:py-20 mt-10 md:mt-20">
      <Container>
        <SectionTitle
          text=" আমাদের সাথে অন্যান্য কোর্সের পার্থক্য"
          lineWidth="lg"
          hasLineBreak={true}
        />
        <div className=" md:w-[770px] mx-auto overflow-x-auto border-[3px] border-[#fff6ef] rounded-md">
          <table className="w-full text-center bg-white rounded-md overflow-hidden">
            <thead className="bg-[#4F0187] text-white border-[3px] border-[#fff6ef]">
              <tr >
                <th className="py-3 px-4 text-[14px] md:text-[20px] font-[500px] border-[3px] border-[#fff6ef] ">
                  কোর্সে যা রয়েছে
                </th>
                <th className="py-3 px-4 text-[14px] md:text-[20px] font-[500px] border-[3px] border-[#fff6ef]">
                  আমাদের কোর্স
                </th>
                <th className="py-3 px-4 text-[14px] md:text-[20px] font-[500px] border-[3px] border-[#fff6ef]">
                  অন্যান্য কোর্স
                </th>
              </tr>
            </thead>
            <tbody className="border-[3px] border-[#fff6ef] text-black">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-[3px] border-[#fff6ef]  even:bg-gray-50 text-sm md:text-base "
                >
                  <td className="py-3 md:px-4 text-[14px] md:text-[19px] font-[400px] border-[3px] border-[#fff6ef]">{row.feature}</td>
                  <td className="py-3 px-4  border-[3px] border-[#fff6ef]">
                    {row.our ? (
                      <span className="flex justify-center content-center items-center text-green-600  text-base md:text-xl"><FaCheck /></span>
                    ) : (
                      <span className="flex justify-center content-center items-center text-red-600 text-xl">
                        <RxCross2 />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-[3px] border-[#fff6ef]">
                    {row.others ? (
                      <span className="flex justify-center content-center items-center text-green-600 text-base md:text-xl"><FaCheck /></span>
                    ) : (
                      <span className="flex justify-center content-center items-center text-red-500 text-base md:text-xl"><RxCross2 className="stroke-[2px]"/></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ComparisonTable;
