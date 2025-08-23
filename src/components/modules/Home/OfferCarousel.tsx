"use client";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CountdownTimer from "./CountdownTimerCard";
import Container from "@/components/shared/Container";
import { useGetAllFishQuery } from "@/redux/api/fishApi";
import { IFish } from "@/types/fish.type";

const OfferCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { data: fishData } = useGetAllFishQuery(undefined);

  // Filter offers based on discount and expiry
  const isDiscounted = fishData?.data.filter((fish: any) => {
    if (fish?.advertise?.offerDiscount > 0) {
      const advertiseDate = new Date(fish.advertise.date);
      const [hours, minutes] = fish.advertise.time.split(":").map(Number);
      advertiseDate.setHours(hours);
      advertiseDate.setMinutes(minutes);
      advertiseDate.setSeconds(0);

      const now = new Date();

      // Check if the advertisement is expired
      if (advertiseDate > now) {
        return true;
      }
    }
    return false;
  });

  // console.log("isDiscounted", isDiscounted);

  const plugin = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Container>
      <div className="relative">
        <Carousel
          opts={{
            loop: true,
            duration: 80,
            align: "start",
          }}
          plugins={[plugin?.current]}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {isDiscounted?.map((fish: IFish) => (
              <CarouselItem key={fish?._id}>
                <CountdownTimer
                  title={fish.advertise?.offerTitle}
                  discount={`${fish?.advertise?.offerDiscount}% OFF`}
                  fish={fish}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 absolute -bottom-6 left-0 right-0">
          {isDiscounted?.map((_: any, index: number) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all ${
                current === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OfferCarousel;
