"use client";


interface BiddingComponentProps {
  currentBid: number;
  bidder: string;
}

export default function BiddingComponent({
  currentBid = 225.0,
  bidder = "Poke1234",
}: BiddingComponentProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.14) 0%, rgba(120, 192, 168, 0.14) 85.08%)",
      }}
      className="w-full p-4 rounded-lg  text-white"
    >
      <div className="">
        <p className="text-sm mb-1">Current Bid: ${currentBid.toFixed(2)}</p>
        <p className="text-sm text-gray-400">From: {bidder}</p>
      </div>
    </div>
  );
}
