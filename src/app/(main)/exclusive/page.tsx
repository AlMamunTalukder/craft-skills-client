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
import CoursePricing from "./_components/CoursePrice";
import ExclusiveFAQ from "./_components/ExclusiveFAQ";

const Page = async () => {
  const [siteData, seminar] = await Promise.all([
    getSiteData(),
    activeSeminar(),
    // currentUser(),
  ]);

  return (
    <div>
      <Header siteData={siteData} />
      <ExclusiveBanner siteData={siteData} />
      <ExclusiveWhyCourse />
      <WhatYouWillLearn/>
      <MasterclassBundle/>
      <CareerOpportunities/>
      <ExclusiveTrainer/>
      <ExclusiveCourseReviews/>
      <CoursePricing/>
      <ExclusiveFAQ/>
    </div>
  );
};

export default Page;
