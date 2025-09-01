import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface MediaItem {
  url: string;
  key: string;
  type?: "image" | "video";
}

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  data: MediaItem;
};

export const CarouselThumbs: React.FC<PropType> = ({
  selected,
  onClick,
  data,
}) => {
  return (
    <div className="embla-thumbs__slide p-1">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "w-full h-full rounded border-2 overflow-hidden transition-all",
          selected
            ? "border-blue-500 scale-105"
            : "border-transparent hover:scale-105"
        )}
      >
        {data.type === "video" ? (
          <video
            src={data.url}
            muted
            playsInline
            className="w-full h-[80px] object-cover"
          />
        ) : (
          <Image
            src={data.url}
            width={100}
            height={80}
            alt="thumbnail"
            className="w-full h-[80px] object-cover"
          />
        )}
      </button>
    </div>
  );
};
