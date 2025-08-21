"use client";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IFishReview } from "@/types/fish.type";

interface RatingProps {
  fishReviews: IFishReview;
}

const CustomerFeedbacks = ({ fishReviews }: RatingProps) => {
  const initialCount = 4;
  const [showReview, setShowReview] = useState(initialCount);

  const totalReviews = fishReviews?.meta?.total || 0;

  return (
    <div>
      <h3 className="md:text-3xl text-xl font-medium">Customer Feedback</h3>
      {/* ===================== all feedbacks ===================== */}

      {fishReviews?.data?.slice(0, showReview).map((feedback: IFishReview) => (
        <div key={feedback?._id} className="md:mt-8 mt-6  space-y-3">
          <div className="flex justify-between items-center gap-x-2 flex-wrap gap-y-2">
            <div className="flex items-center gap-x-2 ">
              <Image
                src={
                  feedback?.userId?.profile_image
                    ? (feedback?.userId?.profile_image as string)
                    : "/user_image.png"
                }
                alt="user_image"
                width={1200}
                height={1200}
                className="md:size-16 size-12 rounded-full"
              ></Image>

              <div>
                <p className=" flex items-center gap-x-1 ">
                  <span>{feedback?.userId?.first_name}</span>
                  <span>{feedback?.userId?.last_name}</span>
                </p>
                <div className="flex items-center gap-x-1 ">
                  <Rating rating={feedback?.rating}></Rating>
                  <p>({feedback?.rating}/5)</p>
                </div>
              </div>
            </div>

            {/* date */}
            <p className="text-gray-200">
              {moment(feedback?.createdAt).fromNow()}
            </p>
          </div>
          <p className="text-gray-200">{feedback?.comment}</p>
        </div>
      ))}

      {/* See More / See Less Button */}
      {totalReviews > initialCount && (
        <div className="flex justify-end mt-5">
          {showReview >= totalReviews ? (
            <Button
              onClick={() => setShowReview(initialCount)}
              variant="outline"
              className="border-primary-blue rounded-full text-black duration-500"
            >
              See Less
            </Button>
          ) : (
            <Button
              onClick={() => setShowReview((prev) => prev + initialCount)}
              variant="outline"
              className="border-primary-blue rounded-full text-black duration-500"
            >
              See More
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerFeedbacks;
