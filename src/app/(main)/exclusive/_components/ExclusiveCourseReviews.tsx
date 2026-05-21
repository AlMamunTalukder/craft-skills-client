import Container from "@/src/components/shared/Container";
import SectionTitle from "@/src/components/shared/SectionTitle";


const CourseReviews = async () => {
  return (
    <section className="relative py-14 md:py-20 bg-black overflow-hidden">

  {/* MOBILE SECTION CONTAINER SHELL (KEY FIX) */}
  <div className="absolute inset-0 md:hidden">
    {/* soft card-like separation */}
    <div className="absolute inset-0 bg-[#0B0B0B]" />

    {/* top fade-in separator */}
    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black to-transparent" />

    {/* bottom fade-out separator */}
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent" />

    {/* subtle border ring */}
    <div className="absolute inset-x-3 inset-y-3 border border-white/5 rounded-2xl" />
  </div>

  {/* ORANGE FOCUS LIGHT */}
  <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F26422] opacity-30 blur-[160px] rounded-full" />

  {/* SECONDARY LIGHT */}
  <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-white/10 opacity-20 blur-[140px] rounded-full" />

  {/* VIGNETTE */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

  {/* GRID (kept subtle for mobile) */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
      backgroundSize: "26px 26px",
    }}
  />

  <Container>
    <div className="relative z-10 max-w-4xl mx-auto text-center">

      {/* TITLE */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          কোর্স নিয়ে{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
            শিক্ষার্থীদের
          </span>{" "}
          মতামত
        </h2>
      </div>

      {/* VIDEO CARD */}
      <div className="relative group">

        {/* glow border (reduced on mobile) */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F26422]/25 via-white/5 to-[#F26422]/25 blur-[2px]" />

        <div className="relative rounded-3xl overflow-hidden bg-white border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          {/* top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-[#FF8A50] to-[#F26422]" />

          <iframe
            className="w-full h-[220px] md:h-[500px]"
            src="https://www.youtube.com/embed/Hhi_W4NbjDY"
            title="Student Review"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  </Container>
</section>
  );
};

export default CourseReviews;