"use client";
import ProductImagesCarousel from "@/components/shared/carousel/ProductImagesCarousel";
import { productDetails } from "@/lib/dummyData";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import { CountdownTimer } from "./CountdownTimer";
import BiddingComponent from "./BiddingComponent";
import BidHistory from "./BidHistory";

const OPTIONS: EmblaOptionsType = {};
const ShoppingBidContainer = () => {
  return (
    <div className="xl:space-y-8 space-y-5">
      <div className="grid lg:grid-cols-2 gap-4">
        <ProductImagesCarousel
          slides={productDetails?.image}
          options={OPTIONS}
          showThumbs={true}
          className="2xl:max-h-[470px] xl:h-[550px] lg:h-[400px] md:h-[620px] h-[350px]"
        ></ProductImagesCarousel>
        <div className="xl:space-y-6 space-y-4">
          <h1 className=" text-lg md:text-2xl font-light">
            Blueberry Snail – A Unique Tank Cleaner!
          </h1>
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
      <BidHistory></BidHistory>
    </div>
  );
};

export default ShoppingBidContainer;
