"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/FramerMotionValiants";
import { Checkbox } from "@/components/ui/checkbox";
import { ICollectionType } from "@/lib/collectionType";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

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

interface ICategoryProps {
  title: string;
  data: ICollectionType[];
  selectedCategory?: string | null;
  setSelectedCategory?: (category: string | null) => void;
}

const Categories = ({
  title,
  data,
  selectedCategory,
  setSelectedCategory
}: ICategoryProps) => {
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
        variants={containerVariants}
        className="overflow-hidden"
      >
        <motion.div
          variants={parentVariants}
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {data?.map((type) => {
            const isChecked = selectedCategory === type.label;

            return (
              <motion.div
                variants={childrenVariants}
                key={type?._id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Checkbox
                  id={type.label}
                  className="border-primary-gray"
                  checked={isChecked}
                  onCheckedChange={() =>
                    setSelectedCategory(isChecked ? null : type.label)
                  }
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

export default Categories;
