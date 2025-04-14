import Image from "next/image";
import React from "react";
import topSectionBg from "@/assets/images/top_section_bg.png"


const PageTopSection = ({ title }: { title: string }) => {
  return (
    <div className="max-h-[240px] relative">
      <Image
        src={topSectionBg}
        alt="bg_image"
        className="max-h-[240px] w-full object-cover"
      ></Image>
      <div
        className="max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:px-16 lg:py-12 px-10 py-5 text-primary-white lg:text-5xl md:text-3xl text-xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px] rounded-lg"
        style={{
          background: "rgba(217, 217, 217, 0.09)",
        }}
      >
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageTopSection;
