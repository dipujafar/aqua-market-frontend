"use client";
import ProductCard from "@/components/shared/cards/ProductCard";
import { productData } from "@/lib/dummyData";
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

const AllUploadedProducts = () => {
  return (
    <motion.div
      variants={fadeUpVariants}
      key={"cars"}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2   2xl:grid-cols-3  gap-4 xl:gap-6 "
    >
      {productData?.map((product) => (
        <motion.div variants={fadeUpVariants} key={product?._id}>
          <ProductCard data={product}></ProductCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AllUploadedProducts;
