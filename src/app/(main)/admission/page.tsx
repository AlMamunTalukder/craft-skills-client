// app/admission/page.tsx
import { Suspense } from "react";
import SubHeaderWrapper from "./_components/SubHeaderWrapper";
import Header from "@/src/components/shared/Header";
import Banner from "@/src/components/home/Banner";
import HomePageContent from "@/src/components/HomePageContent";
import FAQSection from "@/src/components/home/FAQSection";
import AdmissionForm from "@/src/components/Forms/AdmissionForm";
import { getActiveBatch, getCourses, getSiteData } from "@/src/lib/api";

export const revalidate = 60;

export default async function AdmissionPage() {
  const [batch, courses, siteData] = await Promise.all([
    getActiveBatch(),
    getCourses(),
    getSiteData(),
  ]);

  return (
    <>
      <Suspense fallback={<div className="h-[85px] bg-[#4F0187]"></div>}>
        <SubHeaderWrapper />
      </Suspense>

      <Header />

      <Banner siteData={siteData} />

      <HomePageContent />

      <div id="admission" className="scroll-mt-[140px]">
        <AdmissionForm batch={batch} courses={courses} />
        <FAQSection />
      </div>
    </>
  );
}
