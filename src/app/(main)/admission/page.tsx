import { Suspense } from "react";
import SubHeaderWrapper from "./_components/SubHeaderWrapper";
import Header from "@/src/components/shared/Header";
import Banner from "@/src/components/home/Banner";
import HomePageContent from "@/src/components/HomePageContent";
import FAQSection from "@/src/components/home/FAQSection";
import { getActiveBatch, getCourses, getSiteData } from "@/src/lib/api";
import { currentUser } from "@/src/lib/currentUser";
import AdmissionForm from "@/src/components/Forms/Admission/AdmissionForm";

export const revalidate = 60;

export default async function AdmissionPage() {
  const [user, siteData, batch, courses ] = await Promise.all([
    currentUser(),
    getSiteData(),
    getActiveBatch(),
    getCourses(),
  ]);

  return (
    <>
      <Suspense fallback={<div className="h-[85px] bg-[#4F0187]"></div>}>
        <SubHeaderWrapper />
      </Suspense>

      <Header user={user} />

      <Banner siteData={siteData} />

      <HomePageContent />

      <div id="admission" className="scroll-mt-[140px]">
        {/* FIX 2: Check if batch exists before rendering the form */}
        {batch ? (
          <AdmissionForm batch={batch} courses={courses} />
        ) : (
          <></>
          // <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-200 mx-auto max-w-4xl">
          //   <h2 className="text-2xl font-bold text-gray-600">
          //     বর্তমানে কোনো ভর্তি কার্যক্রম চলছে না।
          //   </h2>
          //   <p className="text-gray-500 mt-2">পরবর্তী ব্যাচের জন্য অপেক্ষা করুন।</p>
          // </div>
        )}
      </div>

      
      <FAQSection />
    </>
  );
}
