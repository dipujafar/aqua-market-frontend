"use client";

import { useGetAboutQuery } from "@/redux/api/adminApi";

export default function AboutUsContainer() {
  const { data: aboutData } = useGetAboutQuery(undefined);

  return (
    <div className=" text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{aboutData?.data?.title}</h1>
      <p className="text-lg text-white/70 mb-6">
        {aboutData?.data?.description}
      </p>
    </div>
  );
}
