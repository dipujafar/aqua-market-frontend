import Container from "@/components/shared/Container";
import React from "react";
import AddNewProductSection from "./_components/AddNewProductSection";
import FishInventoryList from "./_components/FishInventoryList";

const ItemListPreOrderPage = () => {
  return (
    <Container className="xl:space-y-12 md:space-y-8 space-y-6">
      <AddNewProductSection />
      <FishInventoryList />
    </Container>
  );
};

export default ItemListPreOrderPage;
