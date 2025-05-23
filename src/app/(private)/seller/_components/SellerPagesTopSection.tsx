"use client";
import Image from "next/image";
import React from "react";
import topSectionBg from "@/assets/images/top_section_bg.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    _id: 1,
    title: "Profile Details",
    href: "/user/profile",
  },
  {
    _id: 2,
    title: "Item List for Direct Sale",
    href: "/user/item-list-direct-sale",
  },
  {
    _id: 3,
    title: "Item List for Bid",
    href: "/user/item-list-bid",
  },
  {
    _id: 4,
    title: "Item List for Pre Order",
    href: "/user/item-list-pre-order",
  },
  {
    _id: 5,
    title: "Earning",
    href: "/user/earning",
  },
  {
    _id: 4,
    title: "Settings",
    href: "/user/settings",
  },
];

const SellerPagesTopSection = () => {
  const pathName = usePathname();
  return (
    <div className="max-h-[240px] relative">
      <Image
        src={topSectionBg}
        alt="bg_image"
        className="max-h-[240px] min-h-[150px] w-full object-cover"
      ></Image>
      <div
        className="max-w-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:px-16 lg:py-4 px-10 py-5 text-primary-white lg:text-5xl md:text-3xl text-xl font-semibold text-center w-full md:backdrop-blur-[7px] backdrop-blur-[4px] rounded-lg"
        style={{
          background: "rgba(217, 217, 217, 0.09)",
        }}
      >
        <div className="">
          {navLinks.map((navLink) => (
            <Link href={navLink.href} key={navLink._id}>
              <Button
                style={
                  pathName === navLink.href
                    ? {
                        background:
                          "linear-gradient(180deg, #4DA8DA 0%, #78C0A8 85.08%)",
                      }
                    : {}
                }
                className={cn(
                  "rounded border-r-3 border-b-3  capitalize md:min-w-40 md:py-5 cursor-pointer group bg-white hover:bg-white/30  text-black  sm:m-2 m-1 text-[10px] md:text-sm px-2 md:px-3 py-0 md:h-9 h-7 hover:text-white ",
                  "border-[#78C0A8]", pathName === navLink.href && "border-[#fff] text-white"
                )}
              >
                {navLink.title}
                <AnimatedArrow className="md:size-4 size-3"  />
              </Button>
            </Link>
          ))}

          <Button
            className={cn(
              "rounded border-r-3 border-b-3  uppercase md:min-w-40 md:py-5 cursor-pointer group bg-white text-black  mx-2 hover:bg-white/30 text-[10px] md:text-sm px-2 md:px-3 py-0 hover:text-white",
              "border-[#78C0A8]"
            )}
          >
            Logout
            <AnimatedArrow className="md:size-4 size-3"  />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerPagesTopSection;
