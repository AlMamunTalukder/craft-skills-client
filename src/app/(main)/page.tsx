

import Banner from "@/src/components/home/Banner";
import FAQSection from "@/src/components/home/FAQSection";
import HomePageContent from "@/src/components/HomePageContent";
import SubHeader from "@/src/components/shared/SubHeader";
// import type {
//   Banner as BannerType,
//   Seminar,
//   SiteContent,
// } from "@prisma/client";

// interface HomePageData {
//   seminar: Seminar | null;
//   banner: BannerType | null;
//   siteData: SiteContent | null;
// }

// async function getHomePageData(): Promise<HomePageData> {
//   try {
//     const [seminar, banner, siteData] = await Promise.all([
//       activeSeminar(),
//       db.banner.findFirst({}),
//       db.siteContent.findFirst({}),
//     ]);

//     return {
//       seminar: seminar || null,
//       banner: banner || null,
//       siteData: siteData || null,
//     };
//   } catch (error) {
//     console.error("Error fetching home page data:", error);
//     return {
//       seminar: null,
//       banner: null,
//       siteData: null,
//     };
//   }
// }

export default async function HomePage() {
//   const { seminar, banner, siteData } = await getHomePageData();

  return (
    <>
      {/* <SubHeader
        siteData={{
          facebook: siteData?.facebook,
          facebookGroup: siteData?.facebookGroup,
          telegram: siteData?.telegram,
          whatsapp: siteData?.whatsapp,
          youtube: siteData?.youtube,
        }}
        seminar={seminar}
      /> */}
{/* 
      {siteData && (
        <Header siteData={siteData} logo={siteData.logoLight || ""} />
      )} */}

      {/* {banner && <Banner data={banner} />} */}
      <Banner />

      <HomePageContent />

      {/* {seminar && (
        <Container>
          <div
            id="registration-form"
            className="scroll-mt-[180px] md:scroll-mt-[140px] border-purple-600 bg-[#4F0187] border-t-4 p-5 md:p-10 my-10 rounded-lg shadow-lg shadow-purple-500/50 text-white"
          >
            <SeminarRegistrationForm seminarId={seminar.id} />
          </div>
        </Container>
      )} */}

      <FAQSection />
    </>
  );
}
