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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import PaginationSection from "@/components/shared/PaginationSection";
import Link from "next/link";
import {
  useDeleteMyFishMutation,
  useGetMyFishQuery,
} from "@/redux/api/sellerApi";
import { IFish } from "@/types/fish.type";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

// Utility function to normalize pricing type for comparison
const normalize = (v?: string) => (v ?? "").toLowerCase().replace(/\s|_/g, "");

export default function FishInventoryList() {
  const [showSoldOnly, setShowSoldOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pricingType, setPricingType] = useState<string>("all"); // 👈 new state

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const { data: allFish } = useGetMyFishQuery({ page, limit });
  const [deleteFish] = useDeleteMyFishMutation();

  // Filter items based on search, sold status, and pricing type
  const filteredItems = allFish?.data?.filter((item: IFish) => {
    const matchesSearch =
      item?.fishName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesStatus = showSoldOnly ? item?.status === "sold" : true;

    const matchesPricingType =
      pricingType === "all"
        ? true
        : normalize(item?.pricingType) === normalize(pricingType);

    return matchesSearch && matchesStatus && matchesPricingType;
  });

  // Handle delete fish
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFish(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div id="page" className="w-full space-y-4 text-white rounded-lg">
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

        <div className="flex gap-3 items-center">
          {/* Pricing Type Filter */}
          <Select value={pricingType} onValueChange={setPricingType}>
            <SelectTrigger className="text-white bg-transparent border-white/70 shadow-none w-[150px]">
              <SelectValue placeholder="Pricing Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#132846] text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="forBids">For Bid</SelectItem>
              <SelectItem value="directSale">Direct Sale</SelectItem>
              <SelectItem value="preOrder">Pre-Order</SelectItem>
            </SelectContent>
          </Select>

          {/* Sold Toggle */}
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
                Fishes Item List ({allFish?.meta?.total || 0})
              </TableHead>
              <TableHead className="text-white py-5">Item Number</TableHead>
              <TableHead className="text-white py-5">Price</TableHead>
              <TableHead className="text-white py-5">Pricing Type</TableHead>
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
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={item?.image[0]}
                      alt={item.fishName}
                      width={1200}
                      height={1200}
                      className="h-[70px] w-28 object-cover"
                    />
                  </div>
                  <span>{item?.fishName}</span>
                </TableCell>
                <TableCell>#{item?._id?.slice(0, 8)}</TableCell>
                <TableCell>${item?.pricingInfo?.price?.toFixed(2)}</TableCell>
                <TableCell>{item?.pricingType}</TableCell>
                <TableCell>
                  {item?.pricingInfo?.date
                    ? moment(item?.pricingInfo?.date).format("DD MMM YYYY")
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
                  <Link
                    href={`/seller/item-list-direct-sale/product-details/${item._id}`}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer hover:bg-transparent hover:text-[#316A8A] hover:transform hover:scale-110 transition-transform duration-300 "
                    >
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className=" cursor-pointer hover:bg-transparent hover:text-red-500 hover:transform hover:scale-110 transition-transform duration-300 "
                      >
                        <Trash2
                          className="size-4 hover:cursor-pointer"
                          color="red"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-2 rounded bg-linear-to-r from-[#2E1345] to-[#0A2943]">
                      <p>Are you sure you want to delete this item?</p>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          onClick={() => handleDelete(item?._id as string)}
                          size={"sm"}
                          className="bg-transparent border border-red-500 hover:cursor-pointer text-red-500"
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

      <PaginationSection
        id="page"
        setName="page"
        totalItems={allFish?.meta?.total}
        className="mt-4"
      />
    </div>
  );
}
