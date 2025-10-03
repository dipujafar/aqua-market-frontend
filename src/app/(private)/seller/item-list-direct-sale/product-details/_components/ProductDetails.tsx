"use client";
import {
  AppleIcon,
  MasterCardIcon,
  VisaCardIcon,
} from "@/components/icons/Icons";
import { Rating } from "@/components/ui/rating";
import ActionButtons from "./ActionButtons";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import { IFish, IFishAverageRating,} from "@/types/fish.type";


interface ProductDetailsProps {
  productDetails: IFish;
  fishAverageRating: IFishAverageRating
}

const ProductDetails = ({ productDetails, fishAverageRating }: ProductDetailsProps) => {
  const discount = productDetails?.pricingInfo?.discount ?? 0;
  const price = productDetails?.pricingInfo?.price ?? 0;
  const discountPrice = price - price * (discount / 100);

  return (
    <div className=" space-y-6">
      {/* --------- product header ---------- */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center  gap-x-2 text-white/80">
            <Rating rating={fishAverageRating?.averageRating || 0}></Rating>
            <p>
              {fishAverageRating?.averageRating || 0} (
              {fishAverageRating?.totalReviews || 0} Reviews)
            </p>
          </div>
          <h4 className="md:text-3xl text-xl font-light">
            {productDetails?.fishName}
          </h4>
        </div>
        {discount > 0 && (
          <div className="flex gap-x-6 items-center">
            {/* original price (crossed out) */}
            <p className="line-through text-primary-gray text-lg ">
              ${price.toFixed(2)}
            </p>

            {/* discount badge */}
            <div className="bg-primary-red text-primary-white px-4 py-1 rounded-tl-lg rounded-br-lg">
              {discount}% Off
            </div>
          </div>
        )}

        {/* final price after discount */}
        <h4 className="md:text-3xl text-xl">${discountPrice.toFixed(2)}</h4>
      </div>

      {/* --------- edit button ---------- */}
      <Link href={`/seller/item-list-direct-sale/add-product`}>
        <CommonButton className="w-full border-white">
          Edit your product
        </CommonButton>
      </Link>

      {/* --------- product details data ---------- */}
      <div className="mt-4">
        <div className="flex justify-between items-center gap-x-3 xl:mb-4 mb-2 border-b pb-1 border-b-white/80">
          <h5 className="uppercase  text-primary-gray">Details</h5>
        </div>
        {/* --------- product details data ---------- */}
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3 bg-[#2D4259] border-b">
          <h2>Common Name</h2>
          <p className="max-w-[300px]">{productDetails?.commonName}%</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3  border-b">
          <h2>Size</h2>
          <p className="max-w-[300px]">{productDetails?.size}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3 bg-[#2D4259] border-b">
          <h2>Care Level</h2>
          <p className="max-w-[300px]">{productDetails?.careLevel}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3  border-b">
          <h2>Tank Requirements</h2>
          <p className="max-w-[300px]">{productDetails?.tankRequirements}</p>
        </div>
        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3 bg-[#2D4259] border-b">
          <h2>Food Requirements</h2>
          <p className="max-w-[300px]">{productDetails?.foodRequirements}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3  border-b">
          <h2>Behavior</h2>
          <p className="max-w-[300px]">{productDetails?.behavior}</p>
        </div>

        <div className="flex md:gap-x-8 gap-x-4 items-center justify-between p-3 bg-[#2D4259] border-b">
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
    </div>
  );
};

export default ProductDetails;
