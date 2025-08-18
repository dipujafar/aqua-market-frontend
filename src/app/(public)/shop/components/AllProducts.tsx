"use client";


import ProductCard from "@/components/shared/cards/ProductCard";
import { useGetAllFishQuery } from "@/redux/api/fishApi";
import { IFish } from "@/types/fish.type";
import { motion } from "framer-motion";

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

const AllProducts = () => {
  const { data: fishData } = useGetAllFishQuery(undefined);
  // console.log("fishData", fishData);

  return (
    <motion.div
      variants={fadeUpVariants}
      key={"cars"}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2   2xl:grid-cols-3  gap-4 xl:gap-6 "
    >
      {fishData?.data.length > 0 &&
        fishData?.data?.map((product: IFish) => (
          <motion.div variants={fadeUpVariants} key={product?._id}>
            <ProductCard data={product}></ProductCard>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default AllProducts;
