"use client";
import { ArrowDown, ArrowUp, Dot } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons/Icons";

const shippingMethods = [
  "Orders are shipped on Monday, Tuesday, or Wednesday to ensure your snails arrive before the weekend and avoid delays.",
  "All live animals, including Blueberry Snails, are shipped via overnight shipping to minimize stress and ensure safe delivery.",
  "1–2 days after shipping, depending on your location.",
];


const deliveryPolicies = [
  "If any snails arrive dead, you must provide photo or video documentation of the dead snails in their original packaging within 1 hour of delivery. Contact the seller immediately to report the issue..",
  "The DOA policy covers the total cost of the snails (excluding shipping fees). Refunds or replacements are issued at the seller’s discretions.",
];

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

const ProductDescription = () => {
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
            The Blueberry Snail is a striking freshwater snail with a glossy,
            dark shell that ranges from deep blue to black with subtle purple
            hues. These peaceful snails are excellent tank cleaners, feeding on
            algae, detritus, and leftover food, making them a functional and
            attractive addition to any aquarium. They are livebearers, meaning
            they give birth to live young rather than laying eggs, which can add
            an interesting dynamic to your tank.
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
            {shippingMethods.map((method, index) => (
              <p key={index} className="flex gap-x-1">
                <CheckIcon></CheckIcon> <span className="flex-1"> {method}</span>
              </p>
            ))}
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
            {deliveryPolicies.map((deliveryPolicy, index) => (
              <p key={index} className="flex gap-x-1">
                <CheckIcon></CheckIcon> <span className="flex-1"> {deliveryPolicy}</span>
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDescription;