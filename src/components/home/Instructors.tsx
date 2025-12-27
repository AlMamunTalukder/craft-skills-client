import Image from "next/image";
import Container from "../shared/Container";
// import { getAllInstructors } from "@/queries/content/instructors";
import SectionTitle from "../shared/SectionTitle";
import nesar from "../../../public/img/instructor/nesar.webp";
import samapan from "../../../public/img/instructor/samapan.png";
import imteaz from "../../../public/img/instructor/imteaz.webp";
import salim from "../../../public/img/instructor/md-salim.webp";

const Instructors = async () => {
  // const instructors = (await getAllInstructors()) || [];
  const instructors = [
  {
    "name": "নেছার আহমাদ",
    "image": nesar,
    "designation": "ভয়েস ওভার আর্টিস্ট"
  },
  {
    "name": "সমাপন মিশ্র",
    "image": samapan,
    "designation": "ভয়েস অ্যাক্টর (ইন্ডিয়া)"
  },
  {
    "name": "আহমেদ ইমতিয়াজ সাব্বির",
    "image": imteaz,
    "designation": "ডাবিং ডিরেক্টর"
  },
  {
    "name": "মোহাম্মদ সেলিম",
    "image": salim,
    "designation": "ভয়েস ওভার ডিরেক্টর"
  }
]


  if (!instructors.length) {
    return (
      <Container>
        <div className=" my-10 md:my-20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4F0187] text-center mb-10">
            কোর্স প্রশিক্ষক
          </h2>
          <p className="text-center">কোন প্রশিক্ষক নেই</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="md:mx-24 my-10 md:my-20">
        <SectionTitle text="কোর্স প্রশিক্ষক" />

        <div className="md:w-[770px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {instructors.map((instructor, idx) => (
            <div
              key={idx}
              className="md:w-[170px] md:h-[240px] border border-dashed border-gray-300 rounded-lg overflow-hidden bg-white "
            >
              {/* Image Section */}
              <div className="relative md:w-[170px] h-[180px] md:h-[190px] ">
                <Image
                  src={instructor.image || "/placeholder.png"}
                  alt={instructor.name}
                  width={100}
                  height={100}
                  // objectFit="cover"
                  className="w-full h-full rounded-t-lg"
                />
              </div>

              {/* Info Section */}
              <div className="bg-gray-100 text-center py-2 px-0 h-[65px] md:h-auto">
                <h3 className="font-semibold text-gray-800 leading-[1]">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-700">{instructor.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Instructors;

