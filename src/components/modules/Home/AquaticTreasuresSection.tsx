"use client";

import ProductCard from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { useGetAllFishQuery } from "@/redux/api/fishApi";
import { SkeletonFishCard } from "@/skeletons/SkeletonFishCard";
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

const AquaticTreasuresSection = () => {
  const {
    data: fishData,
    isLoading,
    isFetching,
  } = useGetAllFishQuery(undefined);
  // console.log("fishData", fishData);

  const isLoadingState = isLoading || isFetching;
  return (
    <Container className="lg:space-y-8 space-y-5">
      <SectionTitle
        title="Check Out Our"
        LastPart="Aquatic Treasures!"
      ></SectionTitle>
      <motion.div
        variants={fadeUpVariants}
        key={"cars"}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-4 "
      >
        {/* {fishData?.data?.slice(0, 8).map((product: IFish) => (
          <motion.div variants={fadeUpVariants} key={product?._id}>
            <ProductCard data={product}></ProductCard>
          </motion.div>
        ))} */}
        {isLoadingState
          ? Array.from({ length: fishData?.meta?.total }).map((_, idx) => (
              <motion.div key={idx}>
                <SkeletonFishCard />
              </motion.div>
            ))
          : fishData?.data &&
            fishData?.data?.slice(0, 8).map((product: IFish) => (
              <motion.div variants={fadeUpVariants} key={product?._id}>
                <ProductCard data={product}></ProductCard>
              </motion.div>
            ))}
      </motion.div>
    </Container>
  );
};

export default AquaticTreasuresSection;
