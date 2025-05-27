"use client";;
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const ActionButtons = () => {
  const [quality, setQuality] = useState<number>(1);

  return (
    <div className="lg:space-y-4 space-y-3 lg:mt-6 mt-4">
      <div className="flex items-center justify-between border-b pb-1 border-white/50">
        <h6 className="uppercase">style</h6>
        {/* =============== quantity &  add to cart  button ================ */}

        <div className="border border-primary-gray/40 rounded-2xl flex w-fit   gap-x-2">
          <button
            disabled={quality === 1}
            className="size-10  cursor-pointer flex-center text-white hover:text-red-500"
            onClick={() => setQuality(quality - 1)}
          >
            <Minus size={20} />
          </button>
          <span className="size-10 text-xl  flex-center">{quality}</span>
          <button
            className="size-10 text-xl cursor-pointer flex-center text-white hover:text-green-500"
            onClick={() => setQuality(quality + 1)}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      {/* =============== action buttons ================ */}
      <div className="lg:space-y-3 space-y-2 ">
        <div className="flex flex-col sm:flex-row gap-x-2 gap-y-2">
          <CommonButton className="md:min-w-fit sm:w-1/3">Single</CommonButton>
          <CommonButton className=" md:min-w-fit sm:w-2/3">
            Breeding group of 8(mixed female+male)
          </CommonButton>
        </div>
        {/* =============== buy now  button ================ */}

        <Button
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
          }}
          className=" w-full rounded border-r-3 border-b-3 border-white uppercase md:min-w-40 md:py-5 cursor-pointer group flex-1"
        >
          Direct Fixed sale
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
