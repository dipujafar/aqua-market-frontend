"use client";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const feedbacksData = [
  {
    _id: 1,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-04-28T15:45:30",
    rating: 4.6,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 2,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-04-28T15:45:30",
    rating: 4.2,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 3,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-04-28T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 4,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-04-28T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 5,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-04-28T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
];

const CustomerFeedbacks = () => {
  const [showReview, setShowReview] = useState(4);
  return (
    <div>
      <h3 className="md:text-3xl text-xl font-medium">Customer Feedback</h3>
      {/* ===================== all feedbacks ===================== */}

      {feedbacksData?.slice(0, showReview).map((feedback) => (
        <div key={feedback?._id} className="md:mt-8 mt-6  space-y-3">
          <div className="flex justify-between items-center gap-x-2 flex-wrap gap-y-2">
            <div className="flex items-center gap-x-2 ">
              <Image
                src={feedback?.userImage}
                alt="user_image"
                width={1200}
                height={1200}
                className="md:size-16 size-12 rounded-full"
              ></Image>

              <div>
                <p>{feedback?.name}</p>
                <div className="flex items-center gap-x-1 ">
                  <Rating rating={feedback?.rating}></Rating>
                  <p>({feedback?.rating}/5)</p>
                </div>
              </div>
            </div>

            {/* date */}
            <p className="text-gray-200">{moment(feedback?.date).fromNow()}</p>
          </div>
          <p className="text-gray-200">{feedback?.review}</p>
        </div>
      ))}

      {feedbacksData?.length > 4 && (
        <div className="flex justify-end mt-5">
          {feedbacksData?.length <= showReview ? (
            <Button
              onClick={() => setShowReview(4)}
              variant="outline"
              className=" border-primary-blue rounded-full text-black duration-500"
            >
              See Less
            </Button>
          ) : (
            <Button
              onClick={() => setShowReview((prev) => prev + 4)}
              variant="outline"
              className=" border-primary-blue rounded-full text-black duration-500"
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
