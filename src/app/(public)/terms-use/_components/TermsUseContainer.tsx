"use client";

import { useGetTermsConditionsQuery } from "@/redux/api/adminApi";

export default function TermsUseContainer() {
  const { data: termsData } = useGetTermsConditionsQuery(undefined);

  return (
    <div className=" text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{termsData?.data?.title}</h1>
      <p className="text-lg text-white/70 mb-6">
        {termsData?.data?.description}
      </p>
    </div>
  );
}
