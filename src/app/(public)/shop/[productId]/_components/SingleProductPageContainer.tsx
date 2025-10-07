"use client";

import Container from "@/components/shared/Container";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import RelatedProduct from "./RelatedProduct";

import SubmitYourReview from "./SubmitYourReview";
import CustomerFeedbacks from "./CustomerFeedbacks";
import AverageRating from "./AverageRating";
import {
  useGetFishBaseAverageReviewQuery,
  useGetFishBaseReviewQuery,
  useGetFishDetailsQuery,
} from "@/redux/api/fishApi";
import { IFish, IFishAverageRating, IFishReview } from "@/types/fish.type";

const SingleProductPageContainer = ({ productId }: { productId: string }) => {
  const id = productId?.split("-").pop() || "";

  // fish details
  const { data: details } = useGetFishDetailsQuery(id);
  const fishDetails = (details?.data as IFish) || {};
  // console.log("fishDetails", fishDetails?.image);

  // reviews
  const { data: reviews } = useGetFishBaseReviewQuery(id);
  const fishReviews = (reviews?.data as IFishReview) || {};
  // console.log("fishReviews", fishReviews);

  // average rating
  const { data: averageRating } = useGetFishBaseAverageReviewQuery(id);
  const fishAverageRating = (averageRating?.data as IFishAverageRating) || {};

  return (
    <Container className="xl:space-y-8 lg:space-y-6 space-y-8 md:pt-10 md:pb-16 pt-5 pb-8">
      <div className="flex flex-col lg:flex-row xl:gap-x-8 gap-x-5 gap-y-5">
        <div className="flex-1">
          
          <ProductImages videos={fishDetails?.video} images={fishDetails?.image}></ProductImages>
        </div>
        <div className="flex-1">
          <ProductDetails
            fishDetails={fishDetails}
            fishAverageRating={fishAverageRating}
          />
        </div>
      </div>
      {/* <CharitySupport></CharitySupport> */}

      <ProductDescription fishDetails={fishDetails} />
      <RelatedProduct />
      {/* <RecentlyViewed></RecentlyViewed> */}

      {/* <div className="flex flex-col lg:flex-row gap-x-4  gap-y-4">
        <AverageRating
          fishAverageRating={fishAverageRating}
          className="lg:w-2/5"
        ></AverageRating>
        <SubmitYourReview fishId={id} className="lg:w-3/5"></SubmitYourReview>
      </div> */}

      {/* <CustomerFeedbacks fishReviews={fishReviews}></CustomerFeedbacks> */}
    </Container>
  );
};

export default SingleProductPageContainer;
