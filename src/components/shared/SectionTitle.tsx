import Image from "next/image";
import React from "react";
import sen from "../../../public/img/sen.png";

interface SectionTitleProps {
  text: string;
  hasLineBreak?: boolean;
  lineWidth?: "sm" | "md" | "lg" | "full";
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  text,
  hasLineBreak = false,
  lineWidth = "md",
  className,
}) => {
  const getLineWidthClass = () => {
    switch (lineWidth) {
      case "sm":
        return "w-24 md:w-32";
      case "md":
        return "w-32 md:w-48";
      case "lg":
        return "w-40 md:w-64";
      case "full":
        return "w-full max-w-md";
      default:
        return "w-32 md:w-48";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-4">
      <h2
        className={`text-[26px] md:text-[46px] font-[700] md:font-[900] text-[#4F0187] text-center mb-1 md:mb-2 ${ hasLineBreak ? "leading-tight md:leading-[1]" : ""} ${className}`}
      >
        {hasLineBreak
          ? text.split(" ").map((word, index, array) => {
            const midpoint = Math.ceil(array.length / 2);
            return (
              <React.Fragment key={index}>
                {word}
                {index === midpoint - 1 && index !== array.length - 1 && (
                  <br />
                )}
                {index !== midpoint - 1 && index !== array.length - 1 && " "}
              </React.Fragment>
            );
          })
          : text}
      </h2>
      <div className={`relative h-3 md:h-4 mt-1 ${getLineWidthClass()}`}>
        <div className="flex justify-center items-center">
          <Image src={sen} alt="img" className="w-28 -mt-3" />
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
