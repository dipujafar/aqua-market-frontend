"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { useRouter } from "next/navigation";

const DiscordHelpSection = () => {
  const router = useRouter();
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #4DA8DA 0%, #78C0A8 85.08%)",
      }}
      className="relative  flex items-center justify-center px-4 py-16 xl:py-32 bg-gradient-to-br from-blue-400 via-blue-500 to-green-400"
    >
      <div className="container max-w-4xl mx-auto text-center">
        <div className="lg:space-y-6 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight font-montserrat">
            Got a question? We're here to help!
          </h2>

          <p className=" lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
            Whether you're troubleshooting a shipment, need advice on your next
            auction, or just want to chat about aquariums, we've got you
            covered. Join our Discord community.
          </p>

          <div className="pt-4">
            <Button
              className="bg-white text-black hover:bg-blue-50 hover:text-black/80 font-semibold px-8  text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer py-5 xl:py-6 border-b-2 border-r-2 border-black rounded-none group"
              onClick={() => router.push("https://discord.com")}
            >
              JOIN ON DISCORD
              <AnimatedArrow />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-full blur-md"></div>
      </div>
    </section>
  );
};

export default DiscordHelpSection;
