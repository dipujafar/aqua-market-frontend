import CustomAvatar from "@/components/shared/CustomAvatar";
import Image from "next/image";
import React from "react";
import SellerInfo from "./SellerInfo";

const ProfileInfo = () => {


  return (
    <div className="relative">
      <Image
        src="/seller_profile_cover.png"
        alt="profile"
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
            img="/seller_profile.png"
            name="Anita Alice"
            className=" xl:size-48 md:size-36 size-28 md:top-[-100px] top-[-80px] mx-auto"
          ></CustomAvatar>
          <div className="relative md:top-[-90px] top-[-80px]">
            <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
              <h1>Name</h1>
              <p className=" font-semibold">Anita</p>
            </div>
            <div className="flex justify-between  px-2 py-3 border-b border-white">
              <h1>Followers</h1>
              <p className=" font-semibold">200.5K</p>
            </div>
            <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
              <h1>Following</h1>
              <p className=" font-semibold">25</p>
            </div>
            <div className="flex justify-between  px-2 py-3 border-b border-white">
              <h1>Total Sold</h1>
              <p className=" font-semibold">100+</p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3">
          <SellerInfo />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
