"use client";
import { EmblaOptionsType } from "embla-carousel";
import ProductImagesCarousel from "@/components/shared/carousel/ProductImagesCarousel";

const OPTIONS: EmblaOptionsType = {};

interface MediaItem {
  _id?: string;
  url: string;
  key: string;
  type?: "image" | "video";
}

interface ProductImagesProps {
  images?: MediaItem[];
  videos?: MediaItem[];
}

const ProductImages = ({ videos = [], images = [] }: ProductImagesProps) => {
  // mark type and merge
  const medias: MediaItem[] = [
    ...images.map((img) => ({ ...img, type: "image" as const })),
    ...videos.map((vid) => ({ ...vid, type: "video" as const })),
  ];

  if (!medias.length) {
    return (
      <div className="w-full h-[250px] flex items-center justify-center text-gray-400">
        No media available
      </div>
    );
  }

  return (
    <div>
      <ProductImagesCarousel slides={medias} options={OPTIONS} />
    </div>
  );
};

export default ProductImages;
