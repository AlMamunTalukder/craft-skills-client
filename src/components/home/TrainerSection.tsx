import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { Play } from "lucide-react";

const TrainerSection = () => {
  return (
    <div className="bg-[#FAF9FF] py-16 md:py-24">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center ">
            <SectionTitle text="প্রশিক্ষকদের কাজ" />
            
          </div>

          {/* Main Feature Video (Cinema Style) */}
          <div className="relative group mb-10 md:mb-16">
            {/* Glow background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4F0187] to-[#DC25FF] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-black rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Xqclr2dhrSE?si=Mcp-QuWtT3Tlu2gZ"
                title="Featured Trainer Work"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>          
            
          </div>

          {/* Secondary Grid (Side-by-Side Gallery) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-20">
            {/* Video 1 */}
            <div className="group relative">
               <div className="bg-white rounded-3xl p-3 shadow-xl shadow-purple-100/50 border border-purple-50 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/qLNxu8IFsiQ?si=i5YBVQtbCgKYNOTt"
                      title="Trainer Portfolio 1"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
               </div>
            </div>

            {/* Video 2 */}
            <div className="group relative">
               <div className="bg-white rounded-3xl p-3 shadow-xl shadow-purple-100/50 border border-purple-50 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/1RxdQgm7-R4?si=ph1pbz4BPLtcgbzb"
                      title="Trainer Portfolio 2"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
               </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrainerSection;