import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import CourseStats from "./CourseStats";

const CourseReviews = async () => {

  return (
    <div className="bg-[#4F0187] py-5 text-white mt-20 relative">
      <Container>
        <div className="max-w-3xl mx-auto pt-10 md:pt-48 ">
          {/* Section Title */}
          <SectionTitle
            text="কোর্স নিয়ে শিক্ষার্থীদের মতামত"
            className="text-white text-[22px] md:text-[26px]"
          />

          {/* Main review video */}
          <div className="w-full h-full mb-5">
            <iframe
              className="w-full h-[170px] md:h-[400px] rounded-md"
              src="https://www.youtube.com/embed/Hhi_W4NbjDY"
              title="Student Review"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Additional review videos */}
          <div className="grid grid-cols-2 gap-5 mb-20">
            <div className="w-full h-full">
              <iframe
                className="w-full h-20 md:h-60 rounded-md"
                src="https://www.youtube.com/embed/YJCLej4So28?si=pwDvFDQLW5d6ZkAf"
                title="Student Review 1"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full h-full">
              <iframe
                className="w-full h-20 md:h-60 rounded-md"
                src="https://www.youtube.com/embed/iWgUXArA9F8?si=MdpC_QdBlFbF5aDJ"
                title="Student Review 1"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute -top-60 left-1/2 transform -translate-x-1/2 w-full">
      
        <CourseStats />
      </div>
    </div>
  );
};

export default CourseReviews;


