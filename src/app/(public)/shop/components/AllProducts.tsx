"use client";

import ProductCard from "@/components/shared/cards/ProductCard";
import { IFish } from "@/types/fish.type";
import { motion } from "framer-motion";
import { SkeletonFishCard } from "../../../../skeletons/SkeletonFishCard";

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
const AllProducts = ({
  fishData,
  isFetching,
  isLoading,
}: {
  fishData: IFish[];
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const isLoadingState = isLoading || isFetching;

  return (
    <motion.div
      variants={fadeUpVariants}
      key="products"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 xl:gap-6"
    >
      {isLoadingState
        ? Array.from({ length: 6 }).map((_, idx) => (
            <motion.div key={idx}>
              <SkeletonFishCard />
            </motion.div>
          ))
        : fishData?.map((product: IFish) => (
            <motion.div key={product?._id}>
              <ProductCard data={product} />
            </motion.div>
          ))}
    </motion.div>
  );
};

export default AllProducts;
