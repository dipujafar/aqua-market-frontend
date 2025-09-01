"use client";
import React from "react";
import TrackingCard from "./TrackingCard";
import { useGetMyOrdersDetailsQuery } from "@/redux/api/userApi";

const DetailsAddress = ({ id }: { id: string }) => {
  const { data: fishDetails } = useGetMyOrdersDetailsQuery(id);
  console.log("fishDetails___", fishDetails);

  return (
    <TrackingCard
      orderId="#STG123456789"
      trackingCode="01JKLHGBNJIO"
      name="Aria Pal"
      address="153/2,Florida, UK"
      phoneNumber="0123456789"
    />
  );
};

export default DetailsAddress;
