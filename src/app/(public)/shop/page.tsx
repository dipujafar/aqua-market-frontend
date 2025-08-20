import Container from "@/components/shared/Container";
import ShopPageContainer from "./components/ShopPageContainer";

export const metadata = {
  title: "Shop",
  description: "Enjoy your shopping with AquaMarket!",
};

const ShopPage = () => {
  return (
    <Container id="fish-section" className="md:pt-10 md:pb-16 pt-5 pb-8">
      <ShopPageContainer></ShopPageContainer>
    </Container>
  );
};

export default ShopPage;
