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

const bannerImage = [
  "/bannerImage1.png",
  "/bannerImage2.png",
  "/bannerImage3.png",
  "/bannerImage4.png",
];

const OfferCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  futureDate.setHours(futureDate.getHours() + 16);
  futureDate.setMinutes(futureDate.getMinutes() + 54);
  futureDate.setSeconds(futureDate.getSeconds() + 32);

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
    // Call once to set initial state
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
            {bannerImage?.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <CountdownTimer
                  targetDate={futureDate}
                  title="Limited Time Offer! Don't Miss Out!"
                  discount="30% OFF"
                  //   onComplete={handleCountdownComplete}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4 absolute -bottom-6 left-0 right-0">
          {bannerImage.map((_, index) => (
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
