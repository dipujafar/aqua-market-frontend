import AquaticTreasuresSection from "@/components/modules/Home/AquaticTreasuresSection";
import Hero from "@/components/modules/Home/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="xl:space-y-12 space-y-6">
      <Hero></Hero>
      <hr className="border-t-2 border-t-white/10" />
      <AquaticTreasuresSection></AquaticTreasuresSection>
      <hr className="border-t-2 border-t-white/10" />
    </div>
  );
}
