import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";
import Image from "next/image";
import { CarouselThumbs } from "./CarouselThumbs";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { cn } from "@/lib/utils";

interface MediaItem {
  _id?: string;
  url: string;
  key: string;
  type?: "image" | "video";
}

type PropType = {
  slides: MediaItem[];
  options?: any;
  showThumbs?: boolean;
  className?: string;
};

const ProductImagesCarousel: React.FC<PropType> = ({
  slides,
  options,
  showThumbs,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // refs for videos
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi.scrollTo(index);

    // 🔥 video playback control
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === index) {
        video.currentTime = 0;
        video.play().catch(() => {}); // avoid autoplay blocking errors
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      {/* Main Carousel */}
      <div className="embla__viewport h-fit" ref={emblaMainRef}>
        <div className="embla__container">
          {slides?.slice(0, 6)?.map((itm, index) => (
            <div className="embla__slide rounded" key={itm?.key || index}>
              {itm.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={itm.url}
                  muted
                  playsInline
                  loop
                  className={cn(
                    "w-full 2xl:h-[700px] xl:h-[550px] lg:h-[400px] md:h-[620px] h-[350px] object-cover rounded",
                    className
                  )}
                />
              ) : (
                <Zoom>
                  <Image
                    src={itm.url}
                    width={500}
                    height={500}
                    alt="product_image"
                    quality={100}
                    className={cn(
                      "w-full 2xl:h-[700px] xl:h-[550px] lg:h-[400px] md:h-[620px] h-[350px] object-cover mx-auto rounded",
                      className
                    )}
                  />
                </Zoom>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className={cn("embla-thumbs", showThumbs && "hidden")}>
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container md:gap-2 grid grid-cols-4 mt-2">
            {slides?.slice(0, 6)?.map((itm, index) => (
              <CarouselThumbs
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                data={itm}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCarousel;
