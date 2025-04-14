import Container from "@/components/shared/Container";
import ShopPageContainer from "./components/ShopPageContainer";

export const metadata = {
    title: "Shop",
    description: "Enjoy your shopping with AquaMarket!",
  };
  

const ShopPage = () => {
    return (
        <Container>
          <ShopPageContainer></ShopPageContainer>  
        </Container>
    );
};

export default ShopPage;