import SellerListings from "./_components/SellerListings";

const SellerProductListingsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;

  return (
    <>
      <SellerListings id={id} />
    </>
  );
};

export default SellerProductListingsPage;
