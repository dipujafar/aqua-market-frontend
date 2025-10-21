"use client";

import CustomAvatar from "@/components/shared/CustomAvatar";
import Image from "next/image";
import React from "react";
import SellerInfo from "./SellerInfo";
import CommonButton from "@/components/ui/common-button";
import Link from "next/link";
import {
  useConnectAccountMutation,
  useGetMyFollowersQuery,
} from "@/redux/api/sellerApi";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppSelector } from "@/redux/hooks";

const ProfileInfo = () => {
  const userInfo = useAppSelector((state) => state.auth.user);

  const [connectAccount, { isLoading }] = useConnectAccountMutation();
  const { data: user } = useGetUserProfileQuery(undefined);

  const { data: followers } = useGetMyFollowersQuery(user?.data?._id, {
    skip: !userInfo,
  });
  // console.log("followers", followers?.data?.meta?.total);

  const handleConnectAccount = async () => {
    try {
      const res = await connectAccount({}).unwrap();
      // console.log("res___", res);
      if (res.success) {
        setTimeout(() => {
          window.location.href = res.data && res.data;
        }, 1000);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="relative">
      <Image
        src={user?.data?.banner?.url || "/seller_profile.png"}
        alt="Banner"
        width={1900}
        height={1900}
        className="max-h-[220px] min-h-[120px] object-cover w-full rounded-lg"
      />

      <div className="flex flex-col lg:flex-row gap-4">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.11) 0%, rgba(120, 192, 168, 0.11) 85.08%)",
          }}
          className="relative lg:w-1/3 pt-4 px-3 rounded-lg"
        >
          <CustomAvatar
            img={user?.data?.profile_image?.url || "/seller_profile.png"}
            name="Anita Alice"
            className=" xl:size-48 md:size-36 size-28 md:top-[-100px] top-[-80px] mx-auto object-cover"
          ></CustomAvatar>
          <div className="relative md:top-[-90px] top-[-80px]">
            <div className="flex items-center justify-between gap-3">
              <Link href={"/seller/profile"} className="w-full">
                <CommonButton className="w-full border-white mb-2">
                  Edit Profile
                </CommonButton>
              </Link>
              {!user?.data?.stripeAccountId && (
                <div className="w-full">
                  <CommonButton
                    handlerFunction={handleConnectAccount}
                    className="w-full border-white mb-2"
                  >
                    {isLoading ? "Connecting..." : "Connect Stripe"}
                  </CommonButton>
                </div>
              )}
            </div>
            <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
              <h1>Name</h1>
              <p className=" font-semibold">
                {/* @ts-ignore */}
                {user?.data?.first_name} {user?.data?.last_name}
              </p>
            </div>
            <div className="flex justify-between  px-2 py-3 border-b border-white">
              <h1>Followers</h1>
              <p className=" font-semibold">
                {followers?.data?.meta?.total || 0}
              </p>
            </div>
            <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
              <h1>Following</h1>
              <p className=" font-semibold">5</p>
            </div>
            <div className="flex justify-between  px-2 py-3 border-b border-white">
              <h1>Total Sold</h1>
              <p className=" font-semibold">100+</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3">
          <SellerInfo userInfo={user?.data} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
