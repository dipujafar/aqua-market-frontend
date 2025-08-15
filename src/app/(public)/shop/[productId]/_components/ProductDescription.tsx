"use client";
import { ArrowDown, ArrowUp, Dot } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons/Icons";
import { IFish } from "@/types/fish.type";

const containerVariants = {
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "0.75rem",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

interface ProductDescriptionProps {
  fishDetails: IFish;
}

const ProductDescription = ({ fishDetails }: ProductDescriptionProps) => {
  // console.log("fishDetails", fishDetails);

  const [showDescription, setShowDescription] = useState(true);
  const [showShipping, setShowShipping] = useState(true);
  const [showDeliveryPolicy, setShowDeliveryPolicy] = useState(true);

  return (
    <div className="lg:space-y-8 space-y-5">
      {/* =================== description ================================== */}
      <div>
        <div className="flex-between border-b lg:mb-6 mb-4">
          <h4 className="lg:text-2xl text-lg font-medium">Description</h4>
          <button
            onClick={() => {
              setShowDescription(!showDescription);
            }}
            className=" hover:text-purple-400 transition-all duration-300 cursor-pointer  w-8 h-fit flex justify-center items-center "
          >
            {showDescription ? <ArrowUp /> : <ArrowDown />}
          </button>
        </div>
        {/* description */}
        <motion.div
          initial={showDescription ? "visible" : "hidden"}
          animate={showDescription ? "visible" : "hidden"}
          exit="hidden"
          variants={containerVariants}
          className={cn(
            "text-primary-gray overflow-hidden"
            // showDescription ? "h-max" : "h-0"
          )}
        >
          <p>
            {fishDetails?.description
              ? fishDetails?.description
              : "No description available for this product at the moment."}
          </p>
        </motion.div>
      </div>

      {/* =================== Shipping and Returns ================================== */}
      <div>
        <div className="flex-between border-b lg:mb-6 mb-4 ">
          <h4 className="lg:text-2xl text-lg font-medium">
            Shipping to your address
          </h4>
          <button
            onClick={() => {
              setShowShipping(!showShipping);
            }}
            className="hover:text-purple-400 transition-all duration-300 cursor-pointer  w-8 h-fit flex justify-center items-center"
          >
            {showShipping ? <ArrowUp /> : <ArrowDown />}
          </button>
        </div>
        {/* description */}
        <motion.div
          initial={showShipping ? "visible" : "hidden"}
          animate={showShipping ? "visible" : "hidden"}
          exit="hidden"
          variants={containerVariants}
          className="text-primary-gray overflow-hidden"
        >
          <div>
            {/* {shippingMethods.map((method, index) => (
              <p key={index} className="flex gap-x-1">
                <CheckIcon></CheckIcon>
                <span className="flex-1"> {method}</span>
              </p>
            ))} */}
            <p className="flex gap-x-1">
              <CheckIcon></CheckIcon>
              <span className="flex-1">
                {fishDetails?.shippingAddress
                  ? fishDetails?.shippingAddress
                  : "No shipping address available for this product at the moment."}
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* =================== Delivery Policy ================================== */}
      <div>
        <div className="flex-between border-b lg:mb-6 mb-4 ">
          <h4 className="lg:text-2xl text-lg font-medium">
            DOA (Dead on Arrival) Policy:
          </h4>
          <button
            onClick={() => {
              setShowDeliveryPolicy(!showDeliveryPolicy);
            }}
            className="hover:text-purple-400 transition-all duration-300 cursor-pointer  w-8 h-fit flex justify-center items-center"
          >
            {showDeliveryPolicy ? <ArrowUp /> : <ArrowDown />}
          </button>
        </div>
        {/* description */}
        <motion.div
          initial={showDeliveryPolicy ? "visible" : "hidden"}
          animate={showDeliveryPolicy ? "visible" : "hidden"}
          exit="hidden"
          variants={containerVariants}
          className="text-primary-gray overflow-hidden"
        >
          <div>
            {/* {deliveryPolicies.map((deliveryPolicy, index) => (
              <p key={index} className="flex gap-x-1">
                <CheckIcon></CheckIcon>
                <span className="flex-1"> {deliveryPolicy}</span>
              </p>
            ))} */}
            <p className="flex gap-x-1">
              <CheckIcon></CheckIcon>
              <span className="flex-1">
                {" "}
                {fishDetails?.doaPolicy
                  ? fishDetails?.doaPolicy
                  : "No delivery policy available for this product at the moment."}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDescription;
