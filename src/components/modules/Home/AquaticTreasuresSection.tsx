"use client";
import ProductCard from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
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

const AquaticTreasuresSection = () => {
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
        {productData?.map((product) => (
          <motion.div variants={fadeUpVariants} key={product?._id}>
            <ProductCard data={product}></ProductCard>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default AquaticTreasuresSection;
