"use client";
import { ArrowIcon, ShoppingCartIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/ui/common-button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useBuyFishMutation } from "@/redux/api/userApi";
import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { IFish } from "@/types/fish.type";

interface IActionButtonsProps {
  fishDetails: IFish;
}
const ActionButtons = ({ fishDetails }: IActionButtonsProps) => {
  // console.log("fishDetails", fishDetails);

  const [quantity, setQuantity] = useState<number>(1);
  const type = useSearchParams().get("type");
  const router = useRouter();

  const [buyFish] = useBuyFishMutation();

  const buyFishHandler = async () => {
    const fishData = {
      quantity: quantity,
      fishId: fishDetails?._id,
    };

    try {
      const res = await buyFish(fishData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="lg:space-y-4 space-y-3 lg:mt-6 mt-4">
      <div className="flex items-center justify-between border-b pb-1 border-white/50">
        <h6 className="uppercase">style</h6>
        {/* =============== quantity &  add to cart  button ================ */}

        <div className="border border-primary-gray/40 rounded-2xl flex w-fit   gap-x-2">
          <button
            disabled={quantity === 1}
            className="size-10  cursor-pointer flex-center text-white hover:text-red-500"
            onClick={() => setQuantity(quantity - 1)}
          >
            <Minus size={20} />
          </button>
          <span className="size-10 text-xl  flex-center">{quantity}</span>
          <button
            className="size-10 text-xl cursor-pointer flex-center text-white hover:text-green-500"
            onClick={() => setQuantity(quantity + 1)}
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
        <div className="flex items-center gap-x-4">
          <Button
            onClick={buyFishHandler}
            disabled={
              !fishDetails.pricingInfo ||
              fishDetails.pricingInfo.quantity <= 0 ||
              type === "bid"
            }
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
            }}
            className={`rounded border-r-3 border-b-3 border-white uppercase md:min-w-40 md:py-5 cursor-pointer group flex-1 ${
              !fishDetails.pricingInfo ||
              fishDetails.pricingInfo.quantity <= 0 ||
              type === "bid"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Buy now{" "}
            <ArrowIcon className="group-hover:translate-x-2 duration-500" />
          </Button>

          <div
            style={{
              background: "rgba(77, 168, 218, 0.40)",
            }}
            className="md:size-12 size-10 rounded-full flex justify-center items-center cursor-pointer "
          >
            <ShoppingCartIcon></ShoppingCartIcon>
          </div>
        </div>

        {/* ============================= bit now button ==================== */}
        <Button
          disabled={type !== "bid"}
          onClick={() => router.push("/shopping-bid")}
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.16) 0%, rgba(120, 192, 168, 0.16) 85.08%)",
          }}
          className="rounded border-r-3 border-b-3 border-white uppercase md:min-w-40 md:py-5 cursor-pointer group w-full"
        >
          Bid now
          <ArrowIcon className="group-hover:translate-x-2 duration-500"></ArrowIcon>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
