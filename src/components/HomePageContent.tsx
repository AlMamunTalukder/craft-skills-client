
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
import { getClassSchedule } from "../lib/api";


const HomePageContent = async () => {
  const [classSchedule] = await Promise.all([getClassSchedule()]);

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
