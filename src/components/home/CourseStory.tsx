import Container from "../shared/Container";
import Image from "next/image";
import SectionTitle from "../shared/SectionTitle";

const CourseStory = () => {
  return (
    <div className="mt-5 md:mt-20">
      <Container>
        <div className="border-dashed border-b border-gray-400 pb-8 lg:pb-20">
          <SectionTitle text="কোর্স স্টোরি" />
          <div className="w-[252px] h-[190px] mx-auto mb-5">
            <Image
              src="/img/cup.webp"
              height={300}
              width={400}
              alt=""
              className=" mb-5 -ml-8"
            />
          </div>
          <h2 className="text-[30px] md:text-[44px] font-[600] md:font-extrabold text-center text-[#D223F6] leading-[1]">
            প্রমিত ভাষা শেখার
          </h2>
          <h2 className="text-[30px] md:text-[44px] font-[600] md:font-extrabold text-center text-[#4F0187] leading-[1]">
            ৫০ দিনের চ্যালেঞ্জ
          </h2>
        </div>
        <div className="border-dashed border-b border-gray-400 pb-8 lg:pb-20">
          <div className="w-[280px] md:w-[831px] mx-auto ">
            <Image
              src="/img/outline.webp"
              height={600}
              width={670}
              alt="decorative shape"
              className="mt-20"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseStory;
