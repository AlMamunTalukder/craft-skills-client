import { Schedule } from "@/types";
import ClassDescription from "./home/ClassDescription";
import ClassRoutine from "./home/ClassRoutine";
import ComparisonTable from "./home/ComparisonTable";
import CourseFeatures from "./home/CourseFeatures";
import CourseOutline from "./home/CourseOutline";
import CourseReviews from "./home/CourseReviews";
import CourseStory from "./home/CourseStory";
import Instructors from "./home/Instructors";
import OurActivities from "./home/OurActivities";
import Testimonials from "./home/Testimonials";
import TotalClass from "./home/TotalClass";
import TrainerSection from "./home/TrainerSection";
import WhyCourse from "./home/WhyCourse";

// src/app/page.tsx - API ফাংশনে
async function getClassSchedule(): Promise<Schedule[] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/class-schedule`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return null;
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

const HomePageContent = async () => {

   const [ classSchedule] = await Promise.all([
    
    getClassSchedule()
  ]);

   console.log("Page - classSchedule:", classSchedule);

  return (
    <>
      <WhyCourse />
      <CourseOutline />
      <CourseStory />
      <ClassDescription />
      <TotalClass />
   <ClassRoutine scheduleData={classSchedule} />
      <CourseFeatures />
      <ComparisonTable />
      <Instructors />
      <TrainerSection />
      <CourseReviews />
      <Testimonials />
      <OurActivities />
    </>
  );
};

export default HomePageContent;
