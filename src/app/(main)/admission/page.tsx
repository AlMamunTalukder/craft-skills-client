// app/admission/page.tsx
import { Suspense } from "react";
import SubHeaderWrapper from "./_components/SubHeaderWrapper";
import Header from "@/src/components/shared/Header";
import Banner from "@/src/components/home/Banner";
import HomePageContent from "@/src/components/HomePageContent";
import FAQSection from "@/src/components/home/FAQSection";
import AdmissionForm from "@/src/components/Forms/AdmissionForm";
import { BannerType } from "@/types";
import { getActiveBatch, getCourses, getSiteData } from "@/src/lib/api";

async function getBanner(): Promise<BannerType | null> {
  try {
    // Replace with your actual banner fetch logic
    return null;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
}

export const revalidate = 60;

export default async function AdmissionPage() {
  const [batch, courses, siteData, banner] = await Promise.all([
    getActiveBatch(),
    getCourses(),
    getSiteData(),
    getBanner(),
  ]);

  return (
    <>
      <Suspense fallback={<div className="h-[85px] bg-[#4F0187]"></div>}>
        <SubHeaderWrapper />
      </Suspense>

    
      <Header />

      <Banner siteData={siteData} bannerData={banner} />

      

      <HomePageContent />

      <div id="admission" className="scroll-mt-[140px]">
        <AdmissionForm batch={batch} courses={courses} />
        <FAQSection />
      </div>
    </>
  );
}