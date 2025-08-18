"use client";

import { useGetPrivacyPolicyQuery } from "@/redux/api/adminApi";

export default function PrivacyPolicyContainer() {
  const { data: policyData } = useGetPrivacyPolicyQuery(undefined);

  return (
    <div className=" text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{policyData?.data?.title}</h1>
      <p className="text-lg text-white/70 mb-6">
        {policyData?.data?.description}
      </p>
    </div>
  );
}
