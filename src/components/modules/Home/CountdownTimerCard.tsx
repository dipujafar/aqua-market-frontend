"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import Image from "next/image";
import Link from "next/link";
import { IFish } from "@/types/fish.type";

interface CountdownTimerProps {
  title?: string;
  subtitle?: string;
  discount?: string;
  onComplete?: () => void;
  fish: IFish;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  title = "Limited Time Offer! Don't Miss Out!",
  subtitle,
  discount = "30% OFF",
  onComplete,
  fish,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  useEffect(() => {
    if (!fish?.advertise?.date || !fish?.advertise?.time) return;

    const advertiseDate = new Date(fish?.advertise?.date);
    const [hours, minutes] = fish?.advertise?.time.split(":").map(Number);
    advertiseDate.setHours(hours);
    advertiseDate.setMinutes(minutes);
    advertiseDate.setSeconds(0);

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDifference = advertiseDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setIsExpired(true);
        clearInterval(countdownInterval);
        if (onComplete) onComplete();
      } else {
        const seconds = Math.floor(timeDifference / 1000) % 60;
        const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
        const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        const daysToShow = days > 30 ? "30+" : days.toString();

        // @ts-ignore
        setTimeLeft({ days: daysToShow, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [fish, onComplete]);

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.20) 0%, rgba(120, 192, 168, 0.20) 85.08%)",
      }}
      className="relative overflow-hidden xl:px-20 md:px-10 px-4 xl:py-12  md:py-8 py-4 text-white rounded-lg"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="flex flex-col-reverse md:flex-row justify-between w-full">
        <div className="relative z-10 w-full md:w-1/3">
          <div className="mb-2">
            <h2 className="md:text-5xl text-2xl font-medium tracking-tight font-playfair">
              {discount}
            </h2>
          </div>

          <h3 className="mb-4 md:text-4xl text-xl font-medium font-playfair leading-tight">
            {title}
          </h3>

          {subtitle && <p className="mb-6 text-sm opacity-90">{subtitle}</p>}

          {!isExpired ? (
            <div className="mb-6 flex gap-3 w-full">
              <div className="flex flex-col items-center">
                <div className="flex md:size-16 size-8 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm ">
                  <span className="md:text-2xl text-lg font-bold">
                    {formatNumber(timeLeft.days)}
                  </span>
                </div>
                <span className="mt-2 text-xs uppercase tracking-wide opacity-80">
                  Days
                </span>
              </div>

              <div className="flex items-center">
                <span className="md:text-2xl text-lg font-bold opacity-60">
                  :
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex md:size-16 size-8 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm">
                  <span className="md:text-2xl text-lg font-bold">
                    {formatNumber(timeLeft.hours)}
                  </span>
                </div>
                <span className="mt-2 text-xs uppercase tracking-wide opacity-80">
                  Hours
                </span>
              </div>

              <div className="flex items-center">
                <span className="md:text-2xl text-lg font-bold opacity-60">
                  :
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex md:size-16 size-8 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm">
                  <span className="md:text-2xl text-l font-bold">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                </div>
                <span className="mt-2 text-xs uppercase tracking-wide opacity-80">
                  Mins
                </span>
              </div>

              <div className="flex items-center">
                <span className="md:text-2xl text-lg font-bold opacity-60">
                  :
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex md:size-16 size-8 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm">
                  <span className="md:text-2xl text-lg font-bold">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                </div>
                <span className="mt-2 text-xs uppercase tracking-wide opacity-80">
                  Secs
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-2xl font-bold text-red-300">Offer Expired!</p>
            </div>
          )}

          <Link
            href={`/shop/${String(
              fish?.pricingType ?? ""
            ).toLowerCase()}-${String(fish?._id ?? "")}`}
          >
            <Button
              style={{
                background:
                  " linear-gradient(180deg, rgba(77, 168, 218, 0.30) 0%, rgba(120, 192, 168, 0.30) 85.08%)",
              }}
              className="backdrop-blur-md  border-b-2 border-r-2 border-white text-white w-[260px]  flex items-center justify-center gap-2 hover:bg-white/20 transition-all rounded lg:py-6 group cursor-pointer"
            >
              {isExpired ? "Offer Ended" : "SHOP NOW"}
              {!isExpired && <AnimatedArrow />}
            </Button>
          </Link>
        </div>
        <div className="xl:w-1/3">
          <Image
            src={fish?.image[0]}
            alt="product-data"
            width={1200}
            height={1200}
            className="mx-auto object-cover rounded-lg h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
