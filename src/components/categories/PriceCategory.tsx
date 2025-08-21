"use client";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import reverseIcon from "@/assets/icons/reverseIcon.png";
import Image from "next/image";
import { parentVariants } from "@/animation/FramerMotionValiants";
import { RangeSlider } from "../ui/dual-range-slider";

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

const PriceCategory = ({
  values,
  setValues,
}: {
  values: [number, number];
  setValues: (val: [number, number]) => void;
}) => {
  const [show, hide] = useState(true);

  return (
    <div className="xl:space-y-4 space-y-3 overflow-y-hidden">
      <div className="py-2 border-b flex items-center justify-between">
        <h4 className="text-lg font-bold uppercase">PRICE</h4>
        <button
          onClick={() => hide(!show)}
          className="text-primary-gray hover:text-primary-blue transition-all duration-300 cursor-pointer w-8 border h-fit flex justify-center items-center"
        >
          {show ? <Minus /> : <Plus />}
        </button>
      </div>

      {show && (
        <motion.div variants={containerVariants}>
          <motion.div variants={parentVariants}>
            <RangeSlider
              value={values}
              onValueChange={(price) => setValues(price as [number, number])}
         max={values[1] >= 950 ? values[1] + 100 : 1000}
              step={1}
            />
            <div className="flex items-center justify-between mt-5 gap-x-2">
              <div className="border w-full flex-1 rounded text-center text-primary-gray">
                ${values[0]}
              </div>
              <Image src={reverseIcon} alt="reverseIcon" />
              <div className="border w-full flex-1 rounded text-center text-primary-gray">
                ${values[1]}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PriceCategory;
