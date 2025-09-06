"use client";
import hero_image from "@/assets/images/hero_image.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { TextAnimation2 } from "@/animation/TextAnimation2";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative font-montserrat">
      <Image
        src={hero_image}
        alt="hero_image"
        className="w-full brightness-100 object-cover origin-center max-h-[calc(100vh-80px)]"
      ></Image>

      <div className="text-white absolute inset-0 flex flex-col md:gap-y-2 justify-center items-center gap-y-1">
        <motion.h6
          initial={{ opacity: 0, y: "10%", filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="md:text-2xl text font-semibold max-w-[400px] text-center"
        >
          Buy, Bid, and Sell Rare Fish and More with Confidence.
        </motion.h6>
        {/* <motion.h2
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
        </motion.h2> */}

        <TextAnimation2
          text="Shrimp Exchange"
          className="text-transparent bg-clip-text bg-gradient-to-b from-[#4DA8DA] to-[#78C0A8] xl:text-[140px] md:text-7xl text-[40px] font-extrabold"
          initialDelay={0.3}
        />
        <motion.div
          initial={{ opacity: 0, y: "10%", filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "10%" }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Link href={"/shop"}>
            <Button
              style={{
                background:
                  " linear-gradient(180deg, rgba(77, 168, 218, 0.30) 0%, rgba(120, 192, 168, 0.30) 85.08%)",
              }}
              className="backdrop-blur-md  border-b-2 border-r-2 border-white text-white w-[260px]  flex items-center justify-center gap-2 hover:bg-white/20 transition-all rounded lg:py-6 group cursor-pointer"
            >
              SHOP NOW
              <AnimatedArrow />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
