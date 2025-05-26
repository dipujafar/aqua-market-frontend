import { Suspense } from "react";
import SingleProductPageContainer from "./_components/SingleProductPageContainer";

const SingleProdcutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleProductPageContainer></SingleProductPageContainer>
    </Suspense>
  );
};

export default SingleProdcutPage;
