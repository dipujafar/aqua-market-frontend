import SellerListings from "./_components/SellerListings";

const SellerProductListingsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;
  // console.log('id___', id);

  return (
    <>
      <SellerListings id={id} />
    </>
  );
};

export default SellerProductListingsPage;
