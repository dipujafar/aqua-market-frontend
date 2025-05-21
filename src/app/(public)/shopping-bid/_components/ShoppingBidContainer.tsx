"use client";
import ProductImagesCarousel from "@/components/shared/carousel/ProductImagesCarousel";
import { productDetails } from "@/lib/dummyData";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import { CountdownTimer } from "./CountdownTimer";
import BiddingComponent from "./BiddingComponent";

const OPTIONS: EmblaOptionsType = {};
const ShoppingBidContainer = () => {
  return (
    <div>
      <ProductImagesCarousel
        slides={productDetails?.image}
        options={OPTIONS}
        showThumbs={true}
        className="2xl: max-h-[500px] xl:h-[550px] lg:h-[400px] md:h-[620px] h-[350px]"
      ></ProductImagesCarousel>
      <div>
        <CountdownTimer
          targetDate={
            "Sat May 31 2025 06:00:00 GMT+0600 (Bangladesh Standard Time)"
          }
        />
        <BiddingComponent
          currentBid={225.0}
          bidder="Poke1234"
          onPlaceBid={(amount) => console.log(`Bid placed: $${amount}`)}
        />
      </div>
    </div>
  );
};

export default ShoppingBidContainer;
