"use client";
import {
  AppleIcon,
  MasterCardIcon,
  ShareIcon,
  VisaCardIcon,
} from "@/components/icons/Icons";
import { Rating } from "@/components/ui/rating";
import { envConfig } from "@/config";
import ActionButtons from "./ActionButtons";
import SellerDetails from "./SellerDetails";
import { IFish, IFishAverageRating } from "@/types/fish.type";

interface handleShareProps {
  fishName: string;
  _id: string;
}
const handleShare = ({ fishName, _id }: handleShareProps) => {
  navigator.share({
    title: fishName,
    url: `${envConfig?.client_url}/shop/${_id}`,
  });
};

interface fishDetailsProps {
  fishDetails: IFish;
  fishAverageRating: IFishAverageRating;
}
const fishDetails = ({ fishDetails, fishAverageRating }: fishDetailsProps) => {
  return (
    <div className=" space-y-5">
      {/* --------- product header ---------- */}
      <div className="space-y-2">
        <div>
          <div className="flex items-center  gap-x-2 text-white/80">
            <Rating rating={fishAverageRating?.averageRating}></Rating>
            <p>
              {fishAverageRating?.averageRating} (
              {fishAverageRating?.totalReviews} Reviews)
            </p>
          </div>
          <h4 className="md:text-3xl text-xl">{}</h4>
        </div>
        {fishDetails?.pricingInfo?.discount && (
          <div className="flex gap-x-6 items-center">
            <p className="line-through text-primary-gray text-lg ">
              ${fishDetails?.pricingInfo?.price}
            </p>
            <div className="bg-primary-red text-primary-white px-4 py-1 rounded-tl-lg rounded-br-lg">
              {fishDetails?.pricingInfo?.discount}% Off
            </div>
          </div>
        )}
        <h4 className="md:text-3xl text-xl">
          ${fishDetails?.pricingInfo?.price}
        </h4>
      </div>

      {/* --------- product details data ---------- */}
      <div>
        <div className="flex justify-between items-center gap-x-3 xl:mb-4 mb-2 border-b pb-1 border-b-white/80">
          <h5 className="uppercase  text-primary-gray">Fish Details</h5>

          <button
            className="size-11 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
            style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
            onClick={() =>
              handleShare({
                fishName: fishDetails.fishName as string,
                _id: fishDetails._id as string,
              })
            }
          >
            <ShareIcon></ShareIcon>
          </button>
        </div>
        {/* --------- product details data ---------- */}
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2 bg-[#2D4259] border-b">
          <h2>Common Name</h2>
          <p className="max-w-[300px]">{fishDetails?.fishName}%</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2  border-b">
          <h2>Size</h2>
          <p className="max-w-[300px]">{fishDetails?.size}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2 bg-[#2D4259] border-b">
          <h2>Care Level</h2>
          <p className="max-w-[300px]">{fishDetails?.careLevel}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2  border-b">
          <h2>Tank Requirements</h2>
          <p className="max-w-[300px]">{fishDetails?.tankRequirements}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2 bg-[#2D4259] border-b">
          <h2>Food Requirements</h2>
          <p className="max-w-[300px]">{fishDetails?.foodRequirements}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2  border-b">
          <h2>Behavior</h2>
          <p className="max-w-[300px]">{fishDetails?.behavior}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-2 bg-[#2D4259] border-b">
          <h2>Payment</h2>
          <p className="max-w-[300px] flex xl:gap-x-4 gap-x-2.5 items-center">
            <MasterCardIcon></MasterCardIcon>
            <VisaCardIcon></VisaCardIcon>
            <AppleIcon></AppleIcon>
          </p>
        </div>
      </div>

      {/* ======================= all actions buttons ================ */}
      <ActionButtons></ActionButtons>
      {/* ========================= seller details ========================= */}
      <SellerDetails sellerDetails={fishDetails?.sellerId} />
    </div>
  );
};

export default fishDetails;
