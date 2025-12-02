




// import { db } from "@/prisma/db";
// import { getCourses } from "@/queries/course";
// import { getActiveBatch } from "@/queries/course/batch";

// import type {
//   Batch,
//   Course,
//   SiteContent,
//   Banner as BannerType,
// } from "@prisma/client";
// import { Suspense } from "react";
// import SubHeaderWrapper from "./_components/SubHeaderWrapper";
// import Header from "@/src/components/shared/Header";
// import Banner from "@/src/components/home/Banner";
// import HomePageContent from "@/src/components/HomePageContent";
// import RegistrationForm from "@/src/components/Forms/Course/RegistrationForm";
// import FAQSection from "@/src/components/home/FAQSection";

// interface AdmissionPageData {
//   batch: Batch | null;
//   courses: Course[];
//   siteData: SiteContent | null;
//   banner: BannerType | null;
// }

// export const revalidate = 60;

// async function getAdmissionPageData(): Promise<AdmissionPageData> {
//   try {
//     const [batch, courses, siteData, banner] = await Promise.all([
//       getActiveBatch(),
//       getCourses(),
//       db.siteContent.findFirst({}),
//       db.banner.findFirst(),
//     ]);

//     return {
//       batch: batch || null,
//       courses: courses || [], // Default to empty array if query fails
//       siteData: siteData || null,
//       banner: banner || null,
//     };
//   } catch (error) {
//     console.error("Error fetching admission page data:", error);

//     return {
//       batch: null,
//       courses: [],
//       siteData: null,
//       banner: null,
//     };
//   }
// }

// export default async function AdmissionPage() {
//   const { batch, courses, siteData, banner } = await getAdmissionPageData();

//   return (
//     <>
//       <Suspense fallback={<div className="h-[85px] bg-[#4F0187]"></div>}>
//         <SubHeaderWrapper />
//       </Suspense>

//       {/* {siteData && (
//         <Header siteData={siteData} logo={siteData.logoLight || ""} />
//       )} */}

//        <Header  />

//       {banner && <Banner data={banner} />}

//       <HomePageContent />

//       <div id="admission" className="scroll-mt-[140px]">
//         <RegistrationForm batch={batch} courses={courses} />

//         <FAQSection />
//       </div>
//     </>
//   );
// }


// src/app/page.tsx
import SeminarRegistrationForm from "@/src/components/Forms/SeminarRegistrationForm";
import Banner from "@/src/components/home/Banner";
import FAQSection from "@/src/components/home/FAQSection";
import HomePageContent from "@/src/components/HomePageContent";
import Header from "@/src/components/shared/Header";
import SubHeader from "@/src/components/shared/SubHeader";
import { BannerType, Seminar, SiteContent } from "@/types";

// API fetch ফাংশন
async function getSiteContent(): Promise<SiteContent | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/site`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return null;
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

async function activeSeminar(): Promise<Seminar | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/seminar/active`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return null;
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

async function getBanner(): Promise<BannerType | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/banner`, {
      cache: 'no-store'
    });
    
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
    getBanner()
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
      <Header  />


      {/* Banner-এ siteData পাঠান */}
      <Banner 
        siteData={siteData}
        bannerData={banner}
      />

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