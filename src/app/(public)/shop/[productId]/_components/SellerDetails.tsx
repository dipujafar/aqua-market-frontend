"use client";

import { MapIcon } from "@/components/icons/Icons";
import CommonButton from "@/components/ui/common-button";
import {
  useFollowSellerMutation,
  useGetSellerBaseFollowingQuery,
} from "@/redux/api/userApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const SellerDetails = ({ sellerDetails }: { sellerDetails: any }) => {
  // console.log("sellerDetails", sellerDetails);

  const [followUnfollow] = useFollowSellerMutation();
  const { data: followingData } = useGetSellerBaseFollowingQuery(
    sellerDetails?.sellerId?._id
  );
  const status =
    followingData?.data?.isActive === true
      ? "Unfollow Seller"
      : "Follow Seller";

  const handleFollowSeller = async (sellerId: string) => {
    try {
      const res = await followUnfollow({ id: sellerId }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <div className=" flex justify-between gap-x-2 items-center border-b border-white/50 pb-2 ">
        <h4 className="uppercase  text-primary-gray">SELLER INFORMATION</h4>
      </div>

      <div className="bg-primary-light-pink/5 mt-4  rounded-lg ">
        <div className="space-y-2 flex justify-between border-b pb-2 ">
          <div className="flex  gap-x-2  flex-1 items-center">
            <div className="relative size-12 rounded-full">
              <Link href="/seller-profile">
                <Image
                  src={"/sellerImage.png"}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="size-12 rounded-full  "
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/seller-profile">
                <h5 className="font-medium">
                  {sellerDetails?.sellerId?.first_name}{" "}
                  {sellerDetails?.sellerId?.last_name}
                </h5>{" "}
              </Link>
            </div>
          </div>
        </div>

        <CommonButton
          handlerFunction={() =>
            handleFollowSeller(sellerDetails?.sellerId?._id)
          }
          className="w-full mt-4 group border-r-3 border-b-3 border-white "
        >
          {status}
        </CommonButton>
      </div>
    </div>
  );
};

export default SellerDetails;
