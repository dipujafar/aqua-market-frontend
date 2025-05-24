import Container from "@/components/shared/Container";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import RelatedProduct from "./RelatedProduct";
import CustomerFeedbacks from "./CustomerFeedbacks";
import AverageRating from "./AverageRating";

const SingleProductPageContainer = () => {
  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <ProductImages></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails></ProductDetails>
        </div>
      </div>
      {/* <CharitySupport></CharitySupport> */}

      <ProductDescription></ProductDescription>
      <RelatedProduct></RelatedProduct>
      {/* <RecentlyViewed></RecentlyViewed> */}

      <AverageRating className="lg:w-2/5 mx-auto"></AverageRating>

      <CustomerFeedbacks></CustomerFeedbacks>
    </Container>
  );
};

export default SingleProductPageContainer;
