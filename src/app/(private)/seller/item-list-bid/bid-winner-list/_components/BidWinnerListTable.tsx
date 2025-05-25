"use client";
import { useState } from "react";
import { Search, Calendar, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fishesData = [
  {
    id: 1,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Processing",
    date: "March 24, 2025",
  },
  {
    id: 2,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Delivered",
    date: "March 24, 2025",
  },
  {
    id: 3,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Processing",
    date: "March 24, 2025",
  },
  {
    id: 4,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Delivered",
    date: "March 24, 2025",
  },
  {
    id: 5,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Delivered",
    date: "March 24, 2025",
  },
  {
    id: 6,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Processing",
    date: "March 24, 2025",
  },
  {
    id: 7,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Delivered",
    date: "March 24, 2025",
  },
  {
    id: 8,
    customer: "Anila@123",
    location: "T23 Whale UK",
    itemNumber: "#A01124",
    quantity: 5,
    price: "$255.00",
    status: "Processing",
    date: "March 24, 2025",
  },
];

export default function BidWinnerListTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveredFilter, setDeliveredFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(fishesData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterData(value, deliveredFilter);
  };

  const handleDeliveredToggle = (checked: boolean) => {
    setDeliveredFilter(checked);
    filterData(searchTerm, checked);
  };

  const filterData = (search: string, delivered: boolean) => {
    let filtered = fishesData;

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.customer.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()) ||
          item.itemNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (delivered) {
      filtered = filtered.filter((item) => item.status === "Delivered");
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Processing") {
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
        >
          Processing
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="bg-green-500/20 text-green-400 border-green-500/30"
      >
        Delivered
      </Badge>
    );
  };

  return (
    <div className="xl:space-y-12 md:space-y-8 space-y-6">
      <div
        style={{
          background: "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
          boxShadow: "0px 11px 11px 0px rgba(87, 173, 208, 0.11) inset",
        }}
        className="p-4 border border-white/30 rounded-lg"
      >
        <h5 className="text-center xl:text-2xl md:text-xl text-lg">
          Bid Winner List
        </h5>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              style={{
                background:
                  "linear-gradient(180deg, rgba(77, 168, 218, 0.24) 0%, rgba(120, 192, 168, 0.24) 85.08%)",
              }}
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10  border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
            />
          </div>

          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.24) 0%, rgba(120, 192, 168, 0.24) 85.08%)",
                }}
                className="w-[180px]  border-white/20 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm">Delivered</span>
              <Switch
                checked={deliveredFilter}
                onCheckedChange={handleDeliveredToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className=" backdrop-blur-sm  overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
                }}
                className="border-none hover:bg-white/5"
              >
                <TableHead className="text-gray-300 font-medium py-5">
                  Customer
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Item Number
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Quantity
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Highest Bid Price
                </TableHead>
                <TableHead className="text-white font-medium">
                  <div className="flex items-center gap-2">
                    Status
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
                              Filter by Order Status
                            </h4>
                            <div className="grid gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="auction-processing" />
                                <Label htmlFor="auction-processing">
                                  Processing
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="auction-delivered" />
                                <Label htmlFor="auction-delivered">
                                  Delivered
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300 font-medium">
                  Purchase Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-white/5">
                  <TableCell className="text-white">
                    <div className="flex items-center space-x-2">
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
                      <div>
                        <div className="font-medium">{item.customer}</div>
                        <div className="text-sm text-gray-400">
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {item.itemNumber}
                  </TableCell>
                  <TableCell className="text-white">{item.quantity}</TableCell>
                  <TableCell className="text-white">{item.price}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-white">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
