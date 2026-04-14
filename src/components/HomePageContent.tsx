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
      <div id="why-course-section">
        <WhyCourse />
      </div>
      <div id="course-outline-section">
        <CourseOutline />
      </div>
      <div id="course-features-section">
        <CourseFeatures />
      </div>
      <div id="course-story-section">
        <CourseStory />
      </div>
      <div id="before-after-section">
        <BeforeAfter />
      </div>
      <div id="career-section">
        <CareerOpportunities />
      </div>
      <div id="comparison-section">
        <ComparisonTable />
      </div>
      <div id="instructors-section">
        <Instructors />
      </div>
      <div id="trainer-section">
        <TrainerSection />
      </div>
      <div id="total-class-section">
        <TotalClass />
      </div>
      <div id="routine-section">
        <ClassRoutine scheduleData={classSchedule} />
      </div>
      <div id="reviews-section">
        <CourseReviews />
      </div>
      <div id="testimonials-section">
        <Testimonials />
      </div>
      <div id="stats-section">
        <CourseStats />
      </div>
      <div id="activities-section">
        <OurActivities />
      </div>
      {/* <WhyCourse />
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
      <OurActivities /> */}
    </>
  );
};

export default HomePageContent;
