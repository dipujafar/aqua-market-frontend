"use client";
import { EmblaOptionsType } from "embla-carousel";
import { productDetails } from "@/lib/dummyData";
import ProductImagesCarousel from "./carousel/ProductImagesCarousel";

const OPTIONS: EmblaOptionsType = {};

const ProductImages = () => {
  return (
    <div>
      <ProductImagesCarousel
        slides={productDetails?.image}
        options={OPTIONS}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;
