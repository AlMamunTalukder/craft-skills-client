import BeforeAfter from "./home/BeforeAfter";
import CareerOpportunities from "./home/CareerOpportunities";
import { ClassRoutine } from "./home/ClassRoutine";
import ComparisonTable from "./home/ComparisonTable";
import CourseFeatures from "./home/CourseFeatures";
import CourseOutline from "./home/CourseOutline";
import CourseReviews from "./home/CourseReviews";
import CourseStats from "./home/CourseStats";
import CourseStory from "./home/CourseStory";
import Instructors from "./home/Instructors";
import OurActivities from "./home/OurActivities";
import Testimonials from "./home/Testimonials";
import TotalClass from "./home/TotalClass";
import TrainerSection from "./home/TrainerSection";
import WhyCourse from "./home/WhyCourse";
import { getClassSchedule } from "@/lib/api";

const HomePageContent = async () => {
  const [classSchedule] = await Promise.all([getClassSchedule()]);

  return (
    <>
      <WhyCourse />
      <CourseOutline />
      <CourseFeatures />
      <CourseStory />
      <BeforeAfter />
      <CareerOpportunities/>
      <ComparisonTable />
      <Instructors /> 
      <TrainerSection />
      <TotalClass />
      <ClassRoutine scheduleData={classSchedule} />
      <CourseReviews />
      <Testimonials />
      <CourseStats />
      <OurActivities />
    </>
  );
};

export default HomePageContent;
