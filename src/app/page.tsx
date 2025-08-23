import AquaticTreasuresSection from "@/components/modules/Home/AquaticTreasuresSection";
import DiscordHelpSection from "@/components/modules/Home/DiscordHelpSection";

import Hero from "@/components/modules/Home/Hero";
import OfferCarousel from "@/components/modules/Home/OfferCarousel";

export const metadata = {
  title: "Home | AquaMarket",
  description: "Enjoy your shopping with AquaMarket!",
};

export default function Home() {
  return (
    <div className="xl:space-y-12 space-y-6  md:pb-16  pb-8">
      <Hero></Hero>
      <hr className="border-t-2 border-t-white/10" />
      <AquaticTreasuresSection></AquaticTreasuresSection>
      <hr className="border-t-2 border-t-white/10" />
      <OfferCarousel />
      <hr className="border-t-2 border-t-white/10" />
      <DiscordHelpSection />
    </div>
  );
}
