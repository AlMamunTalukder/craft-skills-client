import Container from "@/src/components/shared/Container";
import SectionTitle from "@/src/components/shared/SectionTitle";


const CourseReviews = async () => {
  return (
    <section className="relative py-14 md:py-20 bg-black overflow-hidden">

  {/* BASE DARK LAYER */}
  {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2f2f2f] via-[#353535] to-[#2a2a2a]" /> */}

  {/* ORANGE FOCUS LIGHT (MAIN HERO SPOTLIGHT) */}
  <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F26422] opacity-35 blur-[160px] rounded-full" />

  {/* SECONDARY WHITE DEPTH LIGHT */}
  <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-white/10 opacity-25 blur-[140px] rounded-full" />

  {/* SOFT CENTER VIGNETTE (FOCUS EFFECT) */}
  <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />

  {/* GRID TEXTURE (VERY SUBTLE BUT PREMIUM) */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
      backgroundSize: "26px 26px",
    }}
  />

      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">

          <div className="text-center mb-10 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            কোর্স নিয়ে {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
             শিক্ষার্থীদের 
            </span>{" "}
           মতামত
          </h2>

          
        </div>

          {/* MAIN VIDEO CARD */}
          <div className="mt-10 relative group">

            {/* BORDER GLOW */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F26422]/30 via-white/10 to-[#F26422]/30 blur-[2px]" />

            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_30px_80px_rgba(242,100,34,0.15)]">

              {/* TOP ACCENT BAR */}
              <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-[#FF8A50] to-[#F26422]" />

              {/* YOUTUBE VIDEO */}
              <iframe
                className="w-full h-[220px] md:h-[500px]"
                src="https://www.youtube.com/embed/Hhi_W4NbjDY"
                title="Student Review"
                frameBorder="0"
                allowFullScreen
              ></iframe>

            </div>
          </div>

          

        </div>
      </Container>
    </section>
  );
};

export default CourseReviews;