"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"

interface BiddingComponentProps {
  currentBid: number
  bidder: string
  onPlaceBid: (amount: number) => void
}

export default function BiddingComponent({
  currentBid = 225.0,
  bidder = "Poke1234",
  onPlaceBid = () => {},
}: BiddingComponentProps) {
  const [bidAmount, setBidAmount] = useState<number>(currentBid + 5)
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false)

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setBidAmount(value)
    }
  }

  const handleIncrementBid = () => {
    setBidAmount((prev) => prev + 5)
  }

  const handleDecrementBid = () => {
    if (bidAmount > currentBid) {
      setBidAmount((prev) => prev - 5)
    }
  }

  const handleSubmit = () => {
    if (bidAmount > currentBid && agreeTerms) {
      onPlaceBid(bidAmount)
    }
  }

  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-[#1a2235] text-white">
      <div className="mb-4">
        <p className="text-sm mb-1">Current Bid: ${currentBid.toFixed(2)}</p>
        <p className="text-sm text-gray-400">From: {bidder}</p>
      </div>

      <div className="flex mb-4">
        <div className="relative flex-1">
          <Input
            type="number"
            value={bidAmount}
            onChange={handleBidChange}
            placeholder="Enter your bid amount"
            className="pr-10 bg-[#252d3f] border-[#3a4257] text-white placeholder:text-gray-400"
          />
          <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-center">
            <button onClick={handleIncrementBid} className="text-gray-400 hover:text-white" aria-label="Increase bid">
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!agreeTerms || bidAmount <= currentBid}
          className="ml-2 bg-[#4db6ce] hover:bg-[#3da6be] text-white"
        >
          PLACE BID
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreeTerms}
          onCheckedChange={(checked) => setAgreeTerms(checked === true)}
          className="border-[#4db6ce] data-[state=checked]:bg-[#4db6ce]"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to pay if I win this bidding
        </label>
      </div>
    </div>
  )
}
