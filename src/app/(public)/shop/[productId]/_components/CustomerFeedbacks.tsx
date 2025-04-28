import { Rating } from "@/components/ui/rating";
import Image from "next/image";
import moment from "moment";

const feedbacksData = [
  {
    _id: 1,
    userImage: "/user_image.png",
    name: "Amanda P.",
    data: "2025-04-28T15:45:30",
    rating: 4.6,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
];

const CustomerFeedbacks = () => {
  return (
    <div>
      <h3 className="md:text-3xl text-xl font-medium">Customer Feedback</h3>
      {/* ===================== all feedbacks ===================== */}

    {
      feedbacksData?.map((feedback) => (
        <div className="md:mt-8 mt-6  space-y-3">
        <div className="flex justify-between items-center gap-x-2 flex-wrap gap-y-2">
          <div className="flex items-center gap-x-2 ">
            <Image
              src={"/user_image.png"}
              alt="user_image"
              width={1200}
              height={1200}
              className="md:size-16 size-12 rounded-full"
            ></Image>

            <div>
              <p>Amanda P.</p>
              <div className="flex items-center gap-x-1 ">
                <Rating rating={4.6}></Rating>
                <p>(4.6/5)</p>
              </div>
            </div>
          </div>

          {/* date */}
          <p className="text-gray-200">
            {moment("2025-04-28T15:45:30").fromNow()}
          </p>
        </div>
        <p className="text-gray-200">
          I recently purchased a breeding group of rare blueberry snails from
          Moonlight Aquatics, and the entire experience was exemplary. These
          live-bearing, filter-feeding snails are difficult to source, so I was
          particularly pleased to find a healthy and established colony
          available. Shipping was handled with the utmost professionalism. The
          snails were expertly packed and shipped via overnight delivery,
          arriving in perfect condition. Upon their arrival in mid-March, their
          temperature was a stable 65°F—ideal for their acclimation. Every
          detail of the transaction demonstrated Moonlight Aquatics' commitment
          to quality and the well-being of their livestock. I highly recommend
          Moonlight Aquatics to any aquarist seeking rare and well-cared-for
          specimens. Their dedication to both customer service and the
          responsible distribution of these unique invertebrates is commendable.
        </p>
      </div>
      ))
    }



    
    </div>
  );
};

export default CustomerFeedbacks;
