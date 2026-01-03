import { GraduationCap, AlertCircle } from "lucide-react";
import FormSelect from "../../FormInputs/FormSelect";
import { Course } from "@/types";

interface CourseSelectionProps {
  courses: Course[];
  onCourseSelect: (id: string) => void;
}

export default function CourseSelection({ courses, onCourseSelect }: CourseSelectionProps) {
  // Generate options for the dropdown
  const courseOptions = courses.map((c) => ({
    label: `${c.name} - ৳${Math.round(
      c.price - (c.price * (c.discount || 0)) / 100 + (c.paymentCharge || 0)
    )}`,
    value: c.id,
  }));

  if (courses.length === 0) {
    return (
      <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 text-center">
        <AlertCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-purple-800 font-semibold">কোন কোর্স পাওয়া যায়নি</h3>
      </div>
    );
  }

  return (
    <>
      {/* 1. Visual Course Details Cards (YOUR DESIGN RESTORED) */}
      <div className="w-full bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-2 md:p-4 border border-[#4f0187]/10">
        <h3 className="text-[#4f0187] mb-2 flex items-center gap-2">
          <span className="bg-white/20 rounded-md">
            <GraduationCap />
          </span>
          কোর্স বিবরণ
        </h3>

        <div className="md:flex gap-2 space-y-2 md:space-y-0">
          {courses.map((course) => {
            const dPrice = course.price - (course.price * (course.discount || 0)) / 100;
            const tPrice = Math.round(dPrice + (course.paymentCharge || 0));

            return (
              <div
                key={course.id}
                className="w-full relative overflow-hidden rounded-xl border border-[#4f0187]/10 transition-all bg-white duration-300"
              >
                {(course.discount || 0) > 0 && (
                  <div className="absolute -top-.5 -right-1 bg-green-500 text-white font-semibold text-sm py-1 px-3 rounded-bl-lg transform rotate-12 shadow-md z-10">
                    -{course.discount}% ছাড়
                  </div>
                )}
                <div className="p-2 md:p-4 text-black mt-5 md:mt-0">
                  <h4 className="flex justify-between mt-7">
                    {course.name}
                    <div>
                      <div className="text-end space-x-3">
                        {(course.discount || 0) > 0 && (
                          <span className="line-through text-gray-400 text-sm">
                            ৳{course.price.toLocaleString()}
                          </span>
                        )}
                        <span className="font-bold text-[#4f0187]">
                          ৳{tPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-end text-xs text-gray-500">(খরচসহ কোর্স ফি পরিশোধ করুন)</p>
                    </div>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Selector Input (Required for Form Logic) */}
      <div className="bg-linear-to-br from-[#4f0187]/5 to-purple-50 rounded-2xl p-4 border border-[#4f0187]/10 mt-4">
        <FormSelect
          name="courseId"
          label="কোর্স নির্বাচন করুন"
          options={courseOptions}
          placeholder="কোর্স নির্বাচন করুন"
          required
          variant="outline"
          onValueChange={onCourseSelect}
        />
      </div>
    </>
  );
}