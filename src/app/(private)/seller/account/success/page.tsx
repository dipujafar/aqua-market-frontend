import ConnectSuccess from "./_components";

export default async function ConnectAccountSuccessPage({
  searchParams,
}: {
  searchParams: { userId: string; stripeAccountId: string };
}) {
  const { userId, stripeAccountId } = await searchParams;

  return (
    <>
      <ConnectSuccess stripeAccountId={stripeAccountId} userId={userId} />
    </>
  );
}
