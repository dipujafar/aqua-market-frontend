"use client";

import ProductCard from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import { useSellerFishQuery } from "@/redux/api/fishApi";
import { SkeletonFishCard } from "@/skeletons/SkeletonFishCard";
import { IFish } from "@/types/fish.type";
import { motion } from "framer-motion";
import SellerProfileInfo from "./SellerProfileInfo";

const SellerListings = ({ id }: { id: string }) => {
  const { data: sellerFish, isLoading, isFetching } = useSellerFishQuery(id);
  // console.log("sellerFish", sellerFish?.data.data);

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
  const isLoadingState = isLoading || isFetching;

  return (
    <>
      <Container className="md:pt-10 md:pb-16 pt-5 pb-8">
        <div className=" py-4 md:py-6 2xl:py-8">
          <SellerProfileInfo id={id} />
        </div>
        <h2 className="md:text-3xl text-xl font-semibold my-3">
          Listed Products
        </h2>
        <motion.div
          variants={fadeUpVariants}
          key="products"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-6"
        >
          {isLoadingState
            ? Array.from({ length: 9 }).map((_, idx) => (
                <motion.div key={idx}>
                  <SkeletonFishCard />
                </motion.div>
              ))
            : sellerFish?.data?.data?.map((product: IFish) => (
                <motion.div key={product?._id}>
                  <ProductCard data={product} />
                </motion.div>
              ))}
        </motion.div>
      </Container>
    </>
  );
};

export default SellerListings;
