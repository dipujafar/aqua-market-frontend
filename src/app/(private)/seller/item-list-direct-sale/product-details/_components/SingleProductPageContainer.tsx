"use client";

import Container from "@/components/shared/Container";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import AverageRating from "./AverageRating";
import CustomerFeedbacks from "./CustomerFeedbacks";
import {
  useGetFishBaseAverageReviewQuery,
  useGetFishBaseReviewQuery,
  useGetFishDetailsQuery,
} from "@/redux/api/fishApi";
import { IFishAverageRating, IFishReview } from "@/types/fish.type";

const SingleProductPageContainer = ({ id }: { id: string }) => {
  const { data: fishData } = useGetFishDetailsQuery(id);
  const fishDetails = fishData?.data;
  // console.log("useGetFishDetailsQuery", fishDetails);

  // reviews
  const { data: reviews } = useGetFishBaseReviewQuery(id);
  const fishReviews = (reviews?.data as IFishReview) || {};
  // console.log("fishReviews", fishReviews);

  // average rating
  const { data: averageRating } = useGetFishBaseAverageReviewQuery(id);
  const fishAverageRating = (averageRating?.data as IFishAverageRating) || {};

  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          <ProductImages images={fishDetails?.image} />
        </div>
        <div className="flex-1">
          <ProductDetails
            productDetails={fishDetails}
            fishAverageRating={fishAverageRating}
          />
        </div>
      </div>
      {/* <CharitySupport></CharitySupport> */}

      <ProductDescription fishDetails={fishDetails} />
      {/* <RelatedProduct></RelatedProduct> */}
      {/* <RecentlyViewed></RecentlyViewed> */}

      <AverageRating
        fishAverageRating={fishAverageRating}
        className="lg:w-2/5 mx-auto"
      ></AverageRating>

      <CustomerFeedbacks fishReviews={fishReviews} />
    </Container>
  );
};

export default SingleProductPageContainer;
