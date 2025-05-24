import React from "react";
import FishInventoryList from "./_components/FishInventoryList";
import Container from "@/components/shared/Container";
import AddNewProductSection from "./_components/AddNewProductSection";

const ItemListDirectSalePage = () => {
  return (
    <Container className="xl:space-y-12 md:space-y-8 space-y-6">
      <AddNewProductSection/>
      <FishInventoryList />
    </Container>
  );
};

export default ItemListDirectSalePage;
