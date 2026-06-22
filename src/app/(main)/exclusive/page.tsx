import React from "react";
import ExclusiveBanner from "./_components/ExclusiveBanner";
import { activeSeminar, getSiteData } from "@/lib/api";
import ExclusiveWhyCourse from "./_components/ExclusiveWhyCourse";
import Header from "@/src/components/shared/Header";
import WhatYouWillLearn from "./_components/WhatYouWillLearn";
import MasterclassBundle from "./_components/MasterclassBundle";
import CareerOpportunities from "@/src/components/home/CareerOpportunities";
import ExclusiveTrainer from "./_components/ExclusiveTrainer";
import ExclusiveCourseReviews from "./_components/ExclusiveCourseReviews";
import ExclusiveFAQ from "./_components/ExclusiveFAQ";
import ExclusiveOfferForm from "@/src/components/Forms/Exclusive/ExclusiveForm";
// import SubHeaderExclusive from "@/src/components/shared/SubHeader/SubHeaderExclusive";
// import InvestmentComparison from "./_components/InvestmentComparison";
import ExclusiveTimerPopup from "@/src/components/exclusive/ExclusiveTimerPopup";

const Page = async () => {
  const [siteData] = await Promise.all([
    getSiteData(),
    activeSeminar(),
  ]);

  return (
    <div>
      <ExclusiveTimerPopup />
      {/* <SubHeaderExclusive /> */}
      <Header siteData={siteData} />
      <ExclusiveBanner />
      <ExclusiveWhyCourse />
      <WhatYouWillLearn />
      <MasterclassBundle />
      <CareerOpportunities />
      <ExclusiveTrainer />
      <ExclusiveCourseReviews />
      <ExclusiveOfferForm />
      {/* <InvestmentComparison /> */}
      <ExclusiveFAQ />
    </div>
  );
};

export default Page;
