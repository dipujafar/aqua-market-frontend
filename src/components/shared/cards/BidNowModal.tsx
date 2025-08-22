"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";
import { usePlaceBidMutation } from "@/redux/api/userApi";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getTimeRemaining } from "@/utils/getTimeRemaining";

interface BidNowModalProps {
  children: React.ReactNode;
  bidInfo?: any;
}

const BidNowModal = ({ children, bidInfo }: BidNowModalProps) => {
  // console.log("bidInfo", bidInfo);

  const [bidAmount, setBidAmount] = useState("");
  const [agreedToPay, setAgreedToPay] = useState(false);

  const [placeBid, { isLoading }] = usePlaceBidMutation();

  const fTime = String(bidInfo?.pricingInfo?.time);
  const fDate = bidInfo?.pricingInfo?.date?.slice(0, 10);
  const timeRemaining = getTimeRemaining(fDate, fTime);

  // Ensure all bidAmounts are numbers
  const maximumPriceBid = bidInfo?.bids?.length
    ? Math.max(...bidInfo.bids.map((bid: any) => Number(bid?.bidAmount)))
    : 0;

  // If no bids yet (maximumPriceBid === 0), show starting bid
  const currentMinBid =
    bidInfo?.bids?.length && maximumPriceBid > 0
      ? maximumPriceBid
      : Number(bidInfo?.pricingInfo?.startingBid ?? 0);

  const handlePlaceBid = async () => {
    const bid = parseFloat(bidAmount);

    if (!agreedToPay) {
      toast("You must agree to pay to place a bid.");
      return;
    }

    if (bid <= currentMinBid) {
      toast(`Your bid must be higher than the current bid: $${currentMinBid}`);
      return;
    }

    if (
      timeRemaining?.days === 0 &&
      timeRemaining?.hours === 0 &&
      timeRemaining?.minutes === 0 &&
      timeRemaining?.seconds === 0
    ) {
      toast("Auction has ended. You cannot place a bid.");
      return;
    }

    try {
      const res = await placeBid({
        id: bidInfo?._id,
        data: { bidAmount: bid },
      }).unwrap();

      if (res.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      //   console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl p-0 border-0 bg-transparent">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 p-8 text-white">
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 space-y-6">
            {/* Title */}
            <DialogTitle className="text-2xl font-bold text-white">
              {bidInfo?.fishName} – {bidInfo?.behavior}
            </DialogTitle>

            {/* Time Left Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Time Left</h3>
              <div className="flex gap-4 justify-center">
                <div className="bg-red-600 rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">
                    {timeRemaining?.days}
                  </div>
                  <div className="text-sm opacity-90">days</div>
                </div>
                <div className="bg-red-600 rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">
                    {timeRemaining?.hours}
                  </div>
                  <div className="text-sm opacity-90">hours</div>
                </div>
                <div className="bg-red-600 rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">
                    {timeRemaining?.minutes}
                  </div>
                  <div className="text-sm opacity-90">min</div>
                </div>
                <div className="bg-red-600 rounded-lg px-4 py-3 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">
                    {timeRemaining?.seconds}
                  </div>
                  <div className="text-sm opacity-90">sec</div>
                </div>
              </div>
            </div>

            {/* Current Bid Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
              <div className="text-lg font-semibold">
                Current Bid:{" "}
                <span className="text-teal-300">
                  ${currentMinBid.toFixed(2)}
                </span>
              </div>
              <div className="text-sm opacity-80">
                From:{" "}
                {`${bidInfo?.sellerId?.first_name} ${bidInfo?.sellerId?.last_name}`}
              </div>
            </div>

            {/* Bid Input Section */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="Enter your bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-teal-400 focus:ring-teal-400"
                    min="226"
                    step="0.01"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 13l3 3 7-7" />
                      <path d="M7 13l-3-3" />
                    </svg>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handlePlaceBid}
                  disabled={
                    !bidAmount ||
                    !agreedToPay ||
                    Number.parseFloat(bidAmount) <= currentMinBid ||
                    (timeRemaining?.days === 0 &&
                      timeRemaining?.hours === 0 &&
                      timeRemaining?.minutes === 0 &&
                      timeRemaining?.seconds === 0)
                  }
                  className="bg-teal-500 hover:cursor-pointer hover:bg-teal-600 disabled:bg-gray-600 disabled:opacity-50 px-8 font-semibold"
                >
                  {isLoading ? "Placing Bid..." : "PLACE BID"}
                </Button>
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="agree-to-pay"
                  checked={agreedToPay}
                  onCheckedChange={(checked) =>
                    setAgreedToPay(checked as boolean)
                  }
                  className="border-white/40 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <label
                  htmlFor="agree-to-pay"
                  className="text-sm cursor-pointer"
                >
                  I agree to pay if I win this bidding
                </label>
              </div>

              {/* Additional Info */}
              <p className="text-sm text-center opacity-80">
                For More Information for bidding visit the page.{" "}
                <Link href="/about-us">
                  <button className="text-teal-300 hover:cursor-pointer hover:text-teal-200 underline">
                    View Details
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BidNowModal;
