import SeminarForm from "@/src/components/Forms/SeminarForm";
import Banner from "@/src/components/home/Banner";
import FAQSection from "@/src/components/home/FAQSection";
import HomePageContent from "@/src/components/HomePageContent";
import Container from "@/src/components/shared/Container";
import Header from "@/src/components/shared/Header";
import SubHeader from "@/src/components/shared/SubHeader";
import { activeSeminar, getSiteData } from "@/lib/api";
import { currentUser } from "@/lib/currentUser";
import SectionTitle from "@/src/components/shared/SectionTitle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [siteData, seminar, user] = await Promise.all([
    getSiteData(),
    activeSeminar(),
    currentUser(),
  ]);


  console.log("Fetched seminar:", activeSeminar);
  
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

      <Header siteData={siteData} />

      <Banner siteData={siteData} />

      <HomePageContent />

      <Container>
  <div
    id="registration-form"
    className="scroll-mt-[200px] md:scroll-mt-[160px]"
  >
    {seminar ? (
      <>
        <SectionTitle text="রেজিস্ট্রেশন করুন" />
        <SeminarForm seminarId={seminar._id} />
      </>
    ) : (
      <p className="text-center py-10">
        Currently no seminar available
      </p>
    )}
  </div>
</Container>

      <FAQSection />
    </>
  );
}
