"use client";
import { EmblaOptionsType } from "embla-carousel";
import ProductImagesCarousel from "@/components/shared/carousel/ProductImagesCarousel";

const OPTIONS: EmblaOptionsType = {};

const ProductImages = ({ images }: { images: string[] }) => {
  return (
    <div>
      <ProductImagesCarousel
        slides={images}
        options={OPTIONS}
      ></ProductImagesCarousel>
    </div>
  );
};

export default ProductImages;