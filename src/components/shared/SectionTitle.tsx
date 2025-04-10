import React from "react";

const SectionTitle = ({
  title,
  LastPart,
}: {
  title: string;
  LastPart: string;
}) => {
  return (
    <h1 className="text-center xl:text-5xl lg:text-4xl md:text-2xl text-xl font-montserrat font-bold">
      {title}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#4DA8DA] to-[#78C0A8]">
        {LastPart}
      </span>
    </h1>
  );
};

export default SectionTitle;
