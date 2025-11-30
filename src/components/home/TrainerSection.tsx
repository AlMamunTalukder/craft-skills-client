import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const TrainerSection = () => {
  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-10 md:mt-20 mb-60">
        {/* Title */}
        <SectionTitle text="প্রশিক্ষকদের কাজ" />

        {/* Main review video */}
        <div className="w-full h-full mb-5">
          <iframe
            className="w-full h-[170px] md:h-[400px] rounded-md"
            src="https://www.youtube.com/embed/Xqclr2dhrSE?si=Mcp-QuWtT3Tlu2gZ"
            title="Student Review"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Additional review videos */}
        <div className="grid grid-cols-2 gap-2 md:gap-5 mb-20">
          <div className="w-full h-full">
            <iframe
              className="w-full h-[80px] md:h-60 rounded-md"
              src="https://www.youtube.com/embed/qLNxu8IFsiQ?si=i5YBVQtbCgKYNOTt"
              title="Student Review 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-full h-full">
            <iframe
              className="w-full h-[80px] md:h-60 rounded-md"
              src="https://www.youtube.com/embed/1RxdQgm7-R4?si=ph1pbz4BPLtcgbzb"
              title="Student Review 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TrainerSection;
