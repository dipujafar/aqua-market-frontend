"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PaginationSection from "@/components/shared/PaginationSection";
import { useMyBidsQuery } from "@/redux/api/userApi";

export default function BidHistory() {
  const { data: myBids } = useMyBidsQuery(undefined);
  const bids = myBids?.data?.bids;
  // console.log("myBids___", bids);

  return (
    <div className="w-full">
      <h1 className="xl:text-2xl text-xl font-light mb-4 text-white">
        MY BID HISTORY
      </h1>
      <div className="overflow-hidden ">
        <Table>
          <TableHeader
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.80) 0%, rgba(120, 192, 168, 0.80) 85.08%)",
            }}
          >
            <TableRow className="hover:bg-[#5a9a9a]/90 border-b-0">
              <TableHead className="text-white font-medium py-5">
                Fishes
              </TableHead>
              <TableHead className="text-white font-medium">
                <div className="flex items-center gap-2">
                  Auction
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-[#5a9a9a]/80"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-[#1a1a3a] border-[#2a2a4a] text-white">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">
                            Filter by Auction Status
                          </h4>
                          <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="auction-ongoing"
                                // checked={filters.auction.ongoing}
                                // onCheckedChange={() =>
                                //   handleAuctionFilterChange("ongoing")
                                // }
                              />
                              <Label htmlFor="auction-ongoing">Ongoing</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="auction-completed"
                                // checked={filters.auction.completed}
                                // onCheckedChange={() =>
                                //   handleAuctionFilterChange("completed")
                                // }
                              />
                              <Label htmlFor="auction-completed">
                                Completed
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="auction-canceled"
                                // checked={filters.auction.canceled}
                                // onCheckedChange={() =>
                                //   handleAuctionFilterChange("canceled")
                                // }
                              />
                              <Label htmlFor="auction-canceled">Canceled</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableHead>
              <TableHead className="text-white font-medium">
                <div className="flex items-center gap-2">
                  Bid Status
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:bg-[#5a9a9a]/80"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-[#1a1a3a] border-[#2a2a4a] text-white">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Filter by Bid Status</h4>
                          {/* <div className="grid gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="status-active"
                                checked={filters.bidStatus.active}
                                onCheckedChange={() =>
                                  handleBidStatusFilterChange("active")
                                }
                              />
                              <Label htmlFor="status-active">Active</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="status-outbid"
                                checked={filters.bidStatus.outbid}
                                onCheckedChange={() =>
                                  handleBidStatusFilterChange("outbid")
                                }
                              />
                              <Label htmlFor="status-outbid">Outbid</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="status-won"
                                checked={filters.bidStatus.won}
                                onCheckedChange={() =>
                                  handleBidStatusFilterChange("won")
                                }
                              />
                              <Label htmlFor="status-won">Won</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="status-lost"
                                checked={filters.bidStatus.lost}
                                onCheckedChange={() =>
                                  handleBidStatusFilterChange("lost")
                                }
                              />
                              <Label htmlFor="status-lost">Lost</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="status-canceled"
                                checked={filters.bidStatus.canceled}
                                onCheckedChange={() =>
                                  handleBidStatusFilterChange("canceled")
                                }
                              />
                              <Label htmlFor="status-canceled">Canceled</Label>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableHead>
              <TableHead className="text-white font-medium">Your Bid</TableHead>
              <TableHead className="text-white font-medium">
                Highest Bid
              </TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bids?.map((item: any, index: number) => (
              <TableRow
                key={item._id}
                className={cn(
                  "hover:bg-[#2a2a4a]/50 border-t  ",
                  index % 2 === 0 ? "bg-[#78c0a838]" : ""
                )}
              >
                <TableCell className="text-white py-5">
                  <Link href={`/shop/1`}> {item?.fishName} </Link>
                </TableCell>
                <TableCell className="text-white">{item.auction}</TableCell>
                <TableCell className={``}>{item?.status}</TableCell>
                <TableCell className="text-white">
                  ${item?.bidAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-white">
                  ${item?.bidAmount.toFixed(2)}
                </TableCell>
                <TableCell className={``}>
                  {item?.isWinning === false ? (
                    <Link href={"/shopping-bid"}>Bid Again</Link>
                  ) : (
                    item.action
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationSection className="mt-5" />
    </div>
  );
}
