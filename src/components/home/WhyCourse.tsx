import { GoDotFill } from "react-icons/go";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const WhyCourse = () => {
  const whycourse = [
    "আঞ্চলিকতা দূর করে বিশুদ্ধ ,বাংলা ভাষায় অনর্গল কথা বলতে পারবেন।",
    "মুখের জড়তা কাটাতে পারবেন।",
    "কণ্ঠস্বর শ্রুতিমধুর করতে পারবেন।",
    "সুন্দর বাচনভঙ্গির মাধ্যমে নিজেকে দক্ষ আলোচক হিসেবে তৈরি করতে পারবেন।",
    "জনসম্মুখে নির্ভয়ে কথা বলতে পারবেন।",
    "ক্যামেরা ভীতি দূর করতে পারবেন।",
    "কর্পোরেট, শিক্ষকতা এবং যেকোন পেশায় নিজেকে সমৃদ্ধ করে ফুটিয়ে তুলতে পারবেন।",
    "এছাড়াও মিডিয়ার বিভিন্ন পেশায় যেমন: রেডিও জকি, আলোচক, উপস্থাপক, ভয়েস আর্টিস্ট এবং কন্টেন্ট ক্রিয়েটর হিসেবে নিজেকে প্রতিষ্ঠিত করতে পারবেন।",
  ];

  return (
    <>
      <Container>
        <div className="relative mt-5 lg:mt-20 lg:mx-20">
          <SectionTitle
            text="শিক্ষার্থীদের কাজের পোর্টফোলিও"
            lineWidth="lg"
            hasLineBreak={true}
            className="space-x-0"
          />

          {/* Grid layout for video and bullet points */}
          <div className="items-start space-y-5 lg:space-y-20">
            {/* Video */}
            <div className="w-full">
              <iframe
                className="w-[280px] md:w-[784px] h-full md:h-[440px] mx-auto rounded-xl"
                src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0&modestbranding=1&showinfo=0&controls=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            {/* Bullet Points */}
            <div>
              <div className="w-[280px] md:w-[770px] h-[57px] md:h-[105px] mx-auto bg-[#4F0187] rounded-md text-white p-3 md:p-8 text-[26px] md:text-[35px] font-medium mb-4 text-center">
                কোর্সটি কেন প্রয়োজন ?
              </div>
              <ul className="text-[#2D2D2D] space-y-1">
                {whycourse.map((text, index) => (
                  <li
                    key={index}
                    className="w-[280px] md:w-[770px] mx-auto flex items-start gap-2 text-[17px] md:text-[19px] font-light"
                  >
                    <GoDotFill className="text-gray-700 mt-[6px] flex-shrink-0 h-3 w-3" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shapes */}
          {/* <Image
            src={"/shape1.png"}
            height={100}
            width={100}
            alt="Decorative shape"
            className="absolute top-[30%] right-0 w-16 md:w-20 opacity-40"
          />
          <Image
            src={"/shape2.png"}
            height={100}
            width={100}
            alt="Decorative shape"
            className="absolute top-[70%] right-0 w-16 md:w-20 opacity-40"
          /> */}
        </div>
      </Container>
    </>
  );
};

export default WhyCourse;
