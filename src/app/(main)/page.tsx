import SeminarRegistrationForm from "@/src/components/Forms/SeminarRegistrationForm";
import Banner from "@/src/components/home/Banner";
import FAQSection from "@/src/components/home/FAQSection";
import HomePageContent from "@/src/components/HomePageContent";
import Container from "@/src/components/shared/Container";
import Header from "@/src/components/shared/Header";
import SubHeader from "@/src/components/shared/SubHeader";
import { BannerType, Seminar, SiteContent } from "@/types";

// API fetch ফাংশন
async function getSiteContent(): Promise<SiteContent | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/site`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

async function activeSeminar(): Promise<Seminar | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/seminar/active`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

async function getBanner(): Promise<BannerType | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/banner`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [siteData, seminar, banner] = await Promise.all([
    getSiteContent(),
    activeSeminar(),
    getBanner(),
  ]);

  console.log("Page - siteData:", siteData);

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

      {/* Header-এ siteData পাঠান */}
      <Header />

      {/* Banner-এ siteData পাঠান */}
      <Banner siteData={siteData} bannerData={banner} />

      <HomePageContent />

      {seminar && (
        <Container>
          <div
            id="registration-form"
            className="scroll-mt-[180px] md:scroll-mt-[140px] border-purple-600 bg-[#4F0187] border-t-4 p-5 md:p-10 my-10 rounded-lg shadow-lg shadow-purple-500/50 text-white"
          >
            <SeminarRegistrationForm seminarId={seminar.id} />
          </div>
        </Container>
      )}

      <FAQSection />
    </>
  );
}
