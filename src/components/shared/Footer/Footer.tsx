"use client";

import Container from "../Container";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import QuickLinks from "./QuickLinks";
import blue from "@/assets/logos/blue.png";

const Footer = () => {
  return (
    <Container>
      <div
        // style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
        className="bg-primary-white flex flex-col justify-center items-center gap-y-4 rounded-2xl px-5 relative"
      >
        <Image
          src={blue}
          alt="logo"
          height={280}
          width={280}
          className=""
        ></Image>
        <p className="md:text-center lg:text-xl text-white/90 ">
          At ShrimpSwap, you’ll find a thriving community where aquarium
          enthusiasts connect, buy, and sell with ease. Whether you’re shopping,
          selling, or joining a live auction, every interaction supports
          responsible shrimp keeping. Dive into a vibrant marketplace built to
          connect hobbyists and ensure aquatic life thrives in new, caring
          homes.
        </p>
        <SocialMedia></SocialMedia>
        <QuickLinks></QuickLinks>
      </div>
    </Container>
  );
};

export default Footer;
