"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the bid data structure
interface Bid {
  id: number;
  bidder: string;
  amount: number;
  date: string;
  isHighlighted: boolean;
}

// Sample bid data
const bidData: Bid[] = [
  {
    id: 1,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Today at 9:43:53 PM",
    isHighlighted: true,
  },
  {
    id: 2,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Yesterday at 9:43:53 PM",
    isHighlighted: true,
  },
  {
    id: 3,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Today at 9:43:53 PM",
    isHighlighted: false,
  },
  {
    id: 4,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Yesterday at 9:43:53 PM",
    isHighlighted: true,
  },
  {
    id: 5,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Yesterday at 9:43:53 PM",
    isHighlighted: false,
  },
  {
    id: 6,
    bidder: "Drop_Expert",
    amount: 360.0,
    date: "Today at 9:43:53 PM",
    isHighlighted: false,
  },
];

export default function BidHistory() {
  const [showHighestBidder, setShowHighestBidder] = useState(false);

  // Filter bids if highest bidder toggle is on
  const displayedBids = showHighestBidder
    ? bidData.filter((bid) => bid.isHighlighted)
    : bidData;

  return (
    <div className="w-full   rounded-lg overflow-hidden">
      <div className=" flex justify-between items-center xl:mb-5 mb-3">
        <h2 className="text-white md:text-2xl text-lg font-light">
          BID HISTORY
        </h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="highest-bidder" className="text-white text-sm">
            Highest Bidder
          </Label>
          <Switch
            id="highest-bidder"
            checked={showHighestBidder}
            onCheckedChange={setShowHighestBidder}
          />
        </div>
      </div>

      <Table>
        <TableHeader
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
          }}
        >
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="text-white font-medium w-1/3 py-3">
              Bidder
            </TableHead>
            <TableHead className="text-white font-medium w-1/3 py-3 text-center">
              Bid (USD)
            </TableHead>
            <TableHead className="text-white font-medium w-1/3 py-3 text-right">
              Date & Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedBids.map((bid, index) => (
            <TableRow
              key={bid.id}
              className={cn("border-t border-[#3D2A5E] hover:bg-[#2A1C45]", index % 2 === 0 && "bg-[#78c0a838]")}
            >
              <TableCell className="text-white py-4 flex items-center gap-2">
                {bid.isHighlighted && (
                  <motion.div
                    whileInView={{ opacity: 1, rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                )}
                {bid.bidder}
              </TableCell>
              <TableCell className="text-white py-4 text-center">
                ${bid.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-white py-4 text-right">
                {bid.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
