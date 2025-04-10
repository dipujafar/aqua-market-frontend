import logo from "@/assets/images/logo.png";
import Container from "../Container";
import Image from "next/image";
import SocialMedia from "./SocialMedia";
import QuickLinks from "./QuickLinks";

const Footer = () => {
  return (
    <Container>
      <div
        // style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.06)" }}
        className="bg-primary-white lg:py-8 py-5 flex flex-col justify-center items-center  gap-y-4 rounded-2xl px-5 "
      >
        <Image src={logo} alt="logo"></Image>
        <p className="md:text-center lg:text-xl text-white/90 ">
          At aquaMarket, discover a thriving community where aquarium
          enthusiasts buy and sell fish with ease. Whether you're shopping,
          selling, or joining live bidding, every interaction supports
          responsible fishkeeping. Dive into a vibrant marketplace designed to
          connect hobbyists and help aquatic life thrive in new, caring homes
        </p>
        <SocialMedia></SocialMedia>
        <QuickLinks></QuickLinks>
      </div>
    </Container>
  );
};

export default Footer;
