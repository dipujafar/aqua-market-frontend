import ProductCard from "@/components/shared/cards/ProductCard";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { productData } from "@/lib/dummyData";
import React from "react";

const AquaticTreasuresSection = () => {
  return (
    <Container className="lg:space-y-8 space-y-5">
      <SectionTitle
        title="Check Out Our"
        LastPart="Aquatic Treasures!"
      ></SectionTitle>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 gap-4 ">
        {productData?.map((product) => (
          <ProductCard key={product?._id} data={product}></ProductCard>
        ))}
      </div>
    </Container>
  );
};

export default AquaticTreasuresSection;
