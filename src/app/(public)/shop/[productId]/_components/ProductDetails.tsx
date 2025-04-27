"use client";
import {
  AppleIcon,
  MasterCardIcon,
  ShareIcon,
  VisaCardIcon,
} from "@/components/icons/Icons";
import { Rating } from "@/components/ui/rating";
import { envConfig } from "@/config";
import { productDetails } from "@/lib/dummyData";
import ActionButtons from "./ActionButtons";
// import ActionButtons from "./ActionButtons";
// import SellerDetails from "./SellerDetails";

const handleShare = () => {
  navigator.share({
    title: productDetails?.title,
    url: `${envConfig?.client_url}/shop/${productDetails?._id}`,
  });
};

const ProductDetails = () => {
  return (
    <div className=" space-y-8">
      {/* --------- product header ---------- */}
      <div className="xl:space-y-3 space-x-2">
        <div>
          <div className="flex items-center  gap-x-2 text-white/80">
            <Rating rating={productDetails?.rating}></Rating>
            <p>
              {productDetails?.rating} ({productDetails?.reviews} Reviews)
            </p>
          </div>
          <h4 className="md:text-3xl text-xl">{productDetails?.title}</h4>
        </div>
        {productDetails?.discount && (
          <div className="flex gap-x-6 items-center">
            <p className="line-through text-primary-gray text-lg ">
              ${productDetails?.originalPrice}
            </p>
            <div className="bg-primary-red text-primary-white px-4 py-1 rounded-tl-lg rounded-br-lg">
              {productDetails?.discount} Off
            </div>
          </div>
        )}
        <h4 className="md:text-3xl text-xl">${productDetails?.price}</h4>
      </div>

      {/* --------- product details data ---------- */}
      <div>
        <div className="flex justify-between items-center gap-x-3 xl:mb-4 mb-2 border-b pb-1 border-b-white/80">
          <h5 className="uppercase  text-primary-gray">Fish Details</h5>

          <button
            className="size-11 rounded-full flex justify-center items-center cursor-pointer hover:bg-primary-gray/10  transition-all duration-300"
            style={{ boxShadow: "0px 4px 5px 0px rgba(0, 0, 0, 0.07)" }}
            onClick={handleShare}
          >
            <ShareIcon></ShareIcon>
          </button>
        </div>
        {/* --------- product details data ---------- */}
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4 bg-[#2D4259] border-b">
          <h2>Common Name</h2>
          <p className="max-w-[300px]">{productDetails?.commonName}%</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4  border-b">
          <h2>Size</h2>
          <p className="max-w-[300px]">{productDetails?.size}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4 bg-[#2D4259] border-b">
          <h2>Care Level</h2>
          <p className="max-w-[300px]">{productDetails?.careLevel}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4  border-b">
          <h2>Tank Requirements</h2>
          <p className="max-w-[300px]">{productDetails?.tankRequirements}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4 bg-[#2D4259] border-b">
          <h2>Food Requirements</h2>
          <p className="max-w-[300px]">{productDetails?.foodRequirements}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4  border-b">
          <h2>Behavior</h2>
          <p className="max-w-[300px]">{productDetails?.behavior}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-4 bg-[#2D4259] border-b">
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
      {/* <SellerDetails></SellerDetails> */}
    </div>
  );
};

export default ProductDetails;
