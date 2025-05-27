import Container from "@/components/shared/Container";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import RelatedProduct from "./RelatedProduct";

import SubmitYourReview from "./SubmitYourReview";
import CustomerFeedbacks from "./CustomerFeedbacks";
import AverageRating from "./AverageRating";

const SingleProductPageContainer = () => {
  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8 md:pt-10 md:pb-16 pt-5 pb-8">
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

    <div className="flex flex-col lg:flex-row gap-x-4  gap-y-4">
        <AverageRating className="lg:w-2/5"></AverageRating>
        <SubmitYourReview className="lg:w-3/5"></SubmitYourReview>
    </div>

    <CustomerFeedbacks></CustomerFeedbacks>
  </Container>
  );
};

export default SingleProductPageContainer;
