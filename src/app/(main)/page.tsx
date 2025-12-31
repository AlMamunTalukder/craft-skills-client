import SeminarForm from "@/src/components/Forms/SeminarForm";
import Banner from "@/src/components/home/Banner";
import FAQSection from "@/src/components/home/FAQSection";
import HomePageContent from "@/src/components/HomePageContent";
import Container from "@/src/components/shared/Container";
import Header from "@/src/components/shared/Header";
import SubHeader from "@/src/components/shared/SubHeader";
import { activeSeminar, getSiteData } from "@/src/lib/api";

export default async function HomePage() {
  const [siteData, seminar] = await Promise.all([
    getSiteData(),
    activeSeminar(),
  ]);

  return (
    <>
      <SubHeader
        siteData={{
          facebook: siteData?.facebook,
          facebookGroup: siteData?.facebookGroup,
          telegram: siteData?.telegram,
          whatsapp: siteData?.whatsapp,
          youtube: siteData?.youtube,
        }}
        seminar={seminar}
      />

      <Header />

      <Banner siteData={siteData} />

      <HomePageContent />

      {seminar && (
        <Container>
          <div
            id="registration-form"
            className="scroll-mt-[180px] md:scroll-mt-[140px] border-purple-600 bg-[#4F0187] border-t-4 p-5 md:p-10 my-10 rounded-lg shadow-lg shadow-purple-500/50 text-white"
          >
            <SeminarForm seminarId={seminar._id} />
          </div>
        </Container>
      )}

      <FAQSection />

      
    </>
  );
}
