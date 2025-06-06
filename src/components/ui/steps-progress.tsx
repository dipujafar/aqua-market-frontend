"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ListIcon } from "@/icons";

interface ProgressBarProps {
  stages: string[]; // List of stages e.g., ["Order Received", "Processing", "On the way", "Delivered"]
  percent: number; // Percent of current stage completion e.g., 50
  currentStage: number; // Index of the current stage, starts from 0
  className?: string; // Optional className prop to apply custom styles
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  stages,
  percent,
  currentStage,
  className,
}) => {
  // Automatically check "Delivered" when "On the way" reaches 100%
  const isDeliveredChecked =
    percent === 100 && currentStage === stages.length - 2;

  return (
    <div className={cn("flex w-full items-center", className)}>
      {stages.map((stage, index) => (
        <div key={index} className="relative flex-1">
          {/* Stage label */}
          <div
            className={cn(
              "mt-2  truncate md:text-base text-[8px]   w-full absolute md:-top-20 -top-16 flex flex-col items-center justify-center gap-y-1",
              className
            )}
            style={{
              whiteSpace: "nowrap",

              //   transform: "translateX(-44%)",
            }}
          >
            
              <ListIcon className="md:size-10 size-5" />
              {stage}
           
          </div>

          {/* Progress Track - No track after the last stage */}
          {index !== stages.length - 0 && (
            <div className={cn("h-2 w-full bg-gray-300", className)}>
              {index < currentStage && (
                <div className={cn("h-2 w-full bg-[#78C0A8]", className)}></div>
              )}
              {index === currentStage && index !== stages.length - 1 && (
                <div
                  className={cn("h-2 bg-[#78C0A8]", className)}
                  style={{ width: `${percent}%` }}
                ></div>
              )}
            </div>
          )}

          {/* Stage circle */}
          <div
            className={cn(
              "absolute top-1/2 flex md:size-6 size-5 -translate-y-1/2 items-center justify-center  border-2 ",
              index < currentStage ||
                (index === currentStage && percent > 0) || // Make sure the current stage is checked if in progress
                (index === stages.length - 1 && isDeliveredChecked) // Automatically check "Delivered" when "On the way" reaches 100%
                ? "border-[#78C0A8] bg-[#78C0A8] text-white"
                : "border-gray-300 bg-white text-gray-400",
              className
            )}
          >
            <Check />
          </div>
        </div>
      ))}
    </div>
  );
};

export { ProgressBar };
