import { Suspense } from "react";
import SingleProductPageContainer from "./_components/SingleProductPageContainer";

interface SingleProductPageProps {
  params: { productId: string };
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productId } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleProductPageContainer
        productId={productId}
      ></SingleProductPageContainer>
    </Suspense>
  );
};

export default SingleProductPage;
