"use client";

import dynamic from "next/dynamic";
const OurActivitiesSlider = dynamic(() => import("./OurActivitiesSlider"), {
  ssr: false,
});

const OurActivities = () => {
  return (
    <div className="mt-20">
      <OurActivitiesSlider />
    </div>
  );
};

export default OurActivities;
