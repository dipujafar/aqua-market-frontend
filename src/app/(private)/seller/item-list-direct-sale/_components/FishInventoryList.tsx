"use client";
import { useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import PaginationSection from "@/components/shared/PaginationSection";
import Link from "next/link";
import { useGetMyFishQuery } from "@/redux/api/sellerApi";
import { IFish } from "@/types/fish.type";
import moment from "moment";

interface FishItem {
  id: string;
  image: string;
  name: string;
  itemNumber: string;
  price: number;
  date: string;
  status: "Ongoing" | "Sold";
}

export default function FishInventoryList() {
  const [showSoldOnly, setShowSoldOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allFish } = useGetMyFishQuery(undefined);
  console.log("Fetched Fish Items:", allFish);

  // Sample data
  const fishItems: FishItem[] = [
    {
      id: "1",
      image: "/productImage7.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Ongoing",
    },
    {
      id: "2",
      image: "/productImage5.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Sold",
    },
    {
      id: "3",
      image: "/productImage8.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Ongoing",
    },
    {
      id: "4",
      image: "/productImage4.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Sold",
    },
    {
      id: "5",
      image: "/productImage6.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Ongoing",
    },
    {
      id: "6",
      image: "/productImage2.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Sold",
    },
    {
      id: "7",
      image: "/productImage8.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Ongoing",
    },
    {
      id: "8",
      image: "/productImage6.png",
      name: "Pink Polka Dot Hikitsuri Loach",
      itemNumber: "#A01124",
      price: 25.0,
      date: "March 24, 2025",
      status: "Sold",
    },
  ];

  // Filter items based on search query and sold status
  const filteredItems = allFish?.data?.filter((item: IFish) => {
    const matchesSearch =
      item?.fishName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = showSoldOnly ? item?.status === "sold" : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full  space-y-4  text-white rounded-lg">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="pl-8 bg-[#1a2c42] border-[#1a2c42] text-white w-full sm:w-60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <span>Sold</span>
            <Switch checked={showSoldOnly} onCheckedChange={setShowSoldOnly} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
            }}
          >
            <TableRow>
              <TableHead className="text-white py-5">
                Fishes Item List
              </TableHead>
              <TableHead className="text-white py-5">Item Number</TableHead>
              <TableHead className="text-white py-5">Price</TableHead>
              <TableHead className="text-white py-5">Date</TableHead>
              <TableHead className="text-white py-5">Status</TableHead>
              <TableHead className="text-white py-5">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems?.map((item: IFish) => (
              <TableRow
                key={item._id}
                className="border-b border-white hover:bg-transparent"
              >
                <TableCell className="flex items-center gap-3">
                  <div className=" rounded-md overflow-hidden">
                    <Image
                      src={item?.image[0]}
                      alt={item.fishName}
                      width={1200}
                      height={1200}
                      className="h-[70px] w-28 object-cover"
                    />
                  </div>
                  <span>{item.fishName}</span>
                </TableCell>
                <TableCell>#{item?._id?.slice(0, 8)}</TableCell>
                <TableCell>${item.pricingInfo.price.toFixed(2)}</TableCell>
                <TableCell>
                  {item?.pricingInfo?.date
                    ? moment(item.pricingInfo.date).format("DD MMM YYYY")
                    : "-"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "ongoing"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item?.status === "sold" ? (
                      <Link
                        href={`/seller/item-list-direct-sale/purchase-order`}
                        className="underline text-base"
                      >
                        Sold
                      </Link>
                    ) : (
                      item.status
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/seller/item-list-direct-sale/product-details`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="size-4" color="red" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80  p-2 rounded bg-linear-to-r from-[#2E1345] to-[#0A2943]">
                      <p>Are you sure you want to delete this item?</p>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          size={"sm"}
                          className="bg-transparent border  border-red-500 text-red-500"
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <PaginationSection className="mt-4" /> */}
    </div>
  );
}
