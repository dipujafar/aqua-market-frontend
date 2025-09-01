import PaymentSuccess from "../_components/success";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { tranId: string };
}) {
  const { tranId } = await searchParams;
  return (
    <>
      <PaymentSuccess tranId={tranId} />
    </>
  );
}
