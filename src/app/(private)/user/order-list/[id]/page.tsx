import React from "react";
import ProductTable from "./_components/ProductTable";
import Container from "@/components/shared/Container";
import DetailsAddress from "./_components/DetailsAddress/DetailsAddress";
import OrderProgress from "./_components/OrderProgress";

const OrderListPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <Container className="space-y-8">
      <DetailsAddress id={id} />
      <OrderProgress />
      <ProductTable />
    </Container>
  );
};

export default OrderListPage;
