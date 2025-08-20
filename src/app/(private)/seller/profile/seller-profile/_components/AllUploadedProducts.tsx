"use client";

import { motion } from "framer-motion";
import OwnProductCard from "./OwnProductCard";
import { IFish } from "@/types/fish.type";

const fadeUpVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const AllUploadedProducts = ({ myFishData }: { myFishData: IFish[] }) => {
  // console.log(myFishData);

  return (
    <motion.div
      variants={fadeUpVariants}
      key={"cars"}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2   2xl:grid-cols-3  gap-4 xl:gap-6 "
    >
      {myFishData?.map((product: IFish) => (
        <motion.div key={product?._id}>
          <OwnProductCard data={product}></OwnProductCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AllUploadedProducts;
