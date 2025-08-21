import { Suspense } from "react";
import SingleProductPageContainer from "../_components/SingleProductPageContainer";

const FishDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
;

  return (
    <>
      {" "}
      <Suspense fallback={<div>Loading...</div>}>
        <SingleProductPageContainer id={id} />
      </Suspense>
    </>
  );
};

export default FishDetailsPage;
