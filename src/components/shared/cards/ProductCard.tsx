"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RightArrowIcon from "@/components/ui/right-arrow-icon";
import ShoppingCartIcon from "@/components/ui/shopping-cart-icon";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { productCardButtonColor } from "@/utils/productCardButtonColor";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import BidNowModal from "./BidNowModal";
import { getTimeRemaining } from "@/utils/getTimeRemaining";
import { useRef } from "react";

const ProductCard = ({ data }: { data: any }) => {
  // console.log("data", data);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserProfileQuery(undefined);

  const image = data?.image[0]?.url;
  const sellerProfileImage = data?.sellerId?.profile_image?.url;
  const AvailabilityDate = data?.pricingInfo?.date
    ? moment(data.pricingInfo.date).format("MMM Do YY")
    : "";

  const handleAddToCart = async () => {
    try {
      dispatch(
        addToCart({
          userId: userData?.data?._id as string,
          userEmail: userData?.data?.email as string,
          fishId: data?._id as string,
          sellerId: data?.sellerId._id as string,
          quantity: 1,
          price: data?.pricingInfo?.price as number,
          stock: data?.pricingInfo?.quantity as number,
          image: data?.image[0] as { key: string; url: string; _id?: string },
          sellerName:
            `${data.sellerId.first_name} ${data.sellerId.last_name}` as string,
          style: data?.pricingInfo?.style as string,
        })
      );
      toast.success("Item added to cart successfully");
    } catch (error) {
      console.log("error______", error);
    }
  };

  const fTime = String(data?.pricingInfo?.time);
  const fDate = data?.pricingInfo?.date?.slice(0, 10);
  const timeRemaining = getTimeRemaining(fDate, fTime);
  // console.log('timeRemaining', timeRemaining);

  // Video playback controls
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // reset to start
    }
  };

  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
      }}
      className="border-none py-4"
    >
      <CardContent className="px-4 space-y-4 text-white">
        <div className="relative group">
          <div
            className="relative w-full h-[250px] rounded overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data?.video?.length > 0 ? (
              <>
                {/* Thumbnail as background */}
                <Image
                  src={image ? image : "/no-image.jpg"}
                  alt="product-thumbnail"
                  width={1200}
                  height={1200}
                  className="absolute inset-0 w-full h-full object-cover rounded"
                />
                {/* Video overlay */}
                <video
                  ref={videoRef}
                  src={data.video[0].url}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover rounded"
                />
              </>
            ) : (
              <Image
                src={image ? image : "/no-image.jpg"}
                alt="product-data"
                width={1200}
                height={1200}
                className="rounded w-full h-[250px] object-cover"
              />
            )}
          </div>
          {data.pricingType == "preOrder" && (
            <div className="p-2 bg-primary-blue absolute top-0 left-0 text-sm max-w-[130px] rounded-tl">
              <div className=" flex flex-col">
                <p>Availability :</p>
                <p>{AvailabilityDate}</p>
              </div>
            </div>
          )}

          {data?.pricingType === "directSale" && (
            <div className="p-2 bg-primary-red absolute top-0 left-0 text-sm max-w-[130px] rounded-tl">
              <h6> {data?.pricingInfo?.discount} % off</h6>
            </div>
          )}

          {data?.pricingType === "forBids" && (
            <div className="absolute top-0 left-0 space-y-1">
              <div className="py-1 px-4 bg-primary-sky text-sm max-w-[130px] rounded-tl ">
                <h6 className="text-center flex flex-col italic justify-center text-sm font-bold">
                  <span>{timeRemaining?.days || 0}d </span>
                  <span>{timeRemaining?.hours || 0}h</span>
                </h6>
                <h6 className="text-white/80 text-xs">Left</h6>
              </div>
              <hr className="w-[85%] mx-auto border-gray-400" />
              {data?.bids && (
                <div className="py-1 px-4 bg-primary-sky text-sm max-w-[130px]  ">
                  <h6 className="text-center text-lg font-bold">
                    {data?.bids?.length}
                  </h6>
                  <h6 className="text-white/80 text-xs text-center">Bids</h6>
                </div>
              )}
            </div>
          )}

          <div
            className="absolute bottom-0 w-full p-2.5 group-hover:p-3  duration-500 flex justify-center items-center text-xl"
            style={{ background: "rgba(255, 255, 255, 0.20)" }}
          >
            {data?.fishName}
          </div>

          {/* =============== add to card button ====================== */}
          {data?.pricingType !== "forBids" && (
            <div
              onClick={handleAddToCart}
              className="absolute top-1 right-1 size-11 flex justify-center items-center rounded-full bg-[rgba(156,_156,_156,_0.40)] hover:bg-white/40 duration-300 cursor-pointer"
            >
              <ShoppingCartIcon />
            </div>
          )}
        </div>
        {/* seller profile and product price */}
        <div className="flex justify-between gap-x-2">
          {/* =============== seller profile ================== */}
          <Link
            className="flex justify-between items-center gap-x-2"
            href="/seller-profile"
          >
            <Image
              src={sellerProfileImage ? sellerProfileImage : "/sellerImage.png"}
              alt="seller-profile-image"
              width={1200}
              height={1200}
              className="size-7 rounded-full object-cover"
            />
            <p>{data?.sellerName}</p>
          </Link>

          {/* ====================== product price ======================== */}
          <h3 className="text-xl font-bold">${data?.pricingInfo?.price}</h3>
        </div>

        {/* ================= action button ================= */}

        {data?.pricingType === "forBids" ? (
          <>
            <BidNowModal bidInfo={{ ...data }}>
              <Button
                className="uppercase w-full rounded  cursor-pointer z-20 border-b-4 border-r-4 border-primary-deep-green group lg:py-5"
                style={{
                  backgroundColor: productCardButtonColor(data?.pricingType),
                }}
              >
                Bid Now
                <RightArrowIcon className="group-hover:translate-x-2 duration-500"></RightArrowIcon>
              </Button>
            </BidNowModal>
          </>
        ) : (
          <>
            <Link
              href={`/shop/${String(
                data?.pricingType ?? ""
              ).toLowerCase()}-${String(data?._id ?? "")}`}
            >
              <Button
                className="uppercase w-full rounded  cursor-pointer z-20 border-b-4 border-r-4 border-primary-deep-green group lg:py-5"
                style={{
                  backgroundColor: productCardButtonColor(data?.pricingType),
                }}
              >
                {data?.pricingType === "preOrder" && "Pre Order Now"}
                {data?.pricingType === "directSale" && "Buy NOW"}
                <RightArrowIcon className="group-hover:translate-x-2 duration-500"></RightArrowIcon>
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
