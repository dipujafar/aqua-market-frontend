"use client";
import TextAnimation from "@/animation/TextAnimation";
import hero_image from "@/assets/images/hero_image.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative font-montserrat">
      <Image
        src={hero_image}
        alt="hero_image"
        className="w-full brightness-100 object-cover origin-center"
      ></Image>

      <div className="text-white absolute inset-0 flex flex-col md:gap-y-2 justify-center items-center gap-y-1">
        <motion.h6
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="md:text-2xl text-xl font-semibold max-w-[400px] text-center"
        >
          Buy, Bid, and Sell Rare Fish and More with Confidence.
        </motion.h6>
        <motion.h2
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-transparent bg-clip-text bg-gradient-to-b from-[#4DA8DA] to-[#78C0A8] xl:text-[140px] md:text-7xl text-5xl font-extrabold"
        >
          <TextAnimation delay={0.1} duration={0.3}>
            AquaMarket
          </TextAnimation>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            style={{
              background:
                " linear-gradient(180deg, rgba(77, 168, 218, 0.30) 0%, rgba(120, 192, 168, 0.30) 85.08%)",
            }}
            className="backdrop-blur-md  border-b-2 border-r-2 border-white text-white w-[260px]  flex items-center justify-center gap-2 hover:bg-white/20 transition-all rounded lg:py-6 group cursor-pointer"
          >
            SHOP NOW
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              className="group-hover:translate-x-2 transition-all duration-500"
            >
              <path
                d="M16.25 6.72607L1.25 6.72607"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1992 0.701489L16.2492 6.72549L10.1992 12.7505"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
