"use client";

import { useState } from "react";
import { Search, Calendar, Eye } from "lucide-react";
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
  const filteredItems = fishItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = showSoldOnly ? item.status === "Sold" : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full p-4 space-y-4  text-white rounded-lg">
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
          <Button
            variant="outline"
            className="bg-[#1a2c42] border-[#1a2c42] text-white"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Filter by date
          </Button>

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
                "linear-gradient(180deg, rgba(77, 168, 218, 0.80) 0%, rgba(120, 192, 168, 0.80) 85.08%)",
            }}
            className=""
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
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="border-b border-[#1a2c42]">
                <TableCell className="flex items-center gap-3">
                  <div className=" rounded-md overflow-hidden">
                    <Image
                      src={item?.image}
                      alt={item.name}
                      width={1200}
                      height={1200}
                      className="h-[70px] w-28 object-cover"
                    />
                  </div>
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.itemNumber}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.status === "Ongoing"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
