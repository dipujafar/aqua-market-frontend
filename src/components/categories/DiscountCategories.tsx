"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { childrenVariants } from "@/animation/FramerMotionValiants";

export interface IDiscountType {
  _id: number;
  label: string;
  value: number;
}

interface IDiscountProps {
  title: string;
  data: IDiscountType[];
  values: [number, number];
  setValues: (val: [number, number]) => void;
}

const DiscountCategories = ({
  title,
  data,
  values,
  setValues,
}: IDiscountProps) => {
  const [show, hide] = useState(true);

  return (
    <div className="xl:space-y-4 space-y-3">
      {/* Header */}
      <div className="py-2 border-b flex items-center justify-between">
        <h4 className="text-lg font-bold uppercase">{title}</h4>
        <button
          onClick={() => hide(!show)}
          className="text-primary-gray hover:text-purple-400 transition-all duration-300 cursor-pointer w-8 border h-fit flex justify-center items-center hover:border-pink-300"
        >
          {show ? <Minus /> : <Plus />}
        </button>
      </div>

      {/* List */}
      <motion.div
        initial={show ? "visible" : "hidden"}
        animate={show ? "visible" : "hidden"}
        exit="hidden"
        className="overflow-hidden"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {data?.map((type) => {
            // Check if the current discountRange matches this item
            const isChecked =
              values[0] === (Array.isArray(type.value) ? type.value[0] : 0) &&
              values[1] === (Array.isArray(type.value) ? type.value[1] : 100);

            return (
              <motion.div
                variants={childrenVariants}
                key={type._id}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  if (isChecked) {
                    // Unselect: reset to full range
                    setValues([0, 100]);
                  } else {
                    if (type.value === 0) {
                      setValues([0, 100]); // All
                    } else if (Array.isArray(type.value)) {
                      setValues([type.value[0], type.value[1]]);
                    }
                  }
                }}
              >
                <Checkbox
                  id={type.label}
                  checked={isChecked}
                  className="border-primary-gray cursor-pointer"
                  onCheckedChange={() => {}}
                />
                <label
                  htmlFor={type.label}
                  className="text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg cursor-pointer"
                >
                  {type.label}
                </label>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DiscountCategories;
