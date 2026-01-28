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

      <Header user={user} siteData={siteData} />

      <Banner siteData={siteData} />

      <HomePageContent />

      {seminar && (
        <Container>
          
          <div
            id="registration-form"
            className="scroll-mt-[180px] md:scroll-mt-[140px] "
          >
            <SectionTitle
        text="রেজিস্ট্রেশন করুন"
      />
            <SeminarForm seminarId={seminar._id} />
          </div>
        </Container>
      )}

      <FAQSection />
    </>
  );
}
