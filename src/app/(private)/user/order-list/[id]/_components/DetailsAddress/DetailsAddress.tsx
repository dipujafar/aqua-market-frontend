import React from "react";
import TrackingCard from "./TrackingCard";

const DetailsAddress = () => {
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
