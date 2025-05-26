"use client";;
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterIcon } from "@/icons";
import Image from "next/image";
import PaginationSection from "@/components/shared/PaginationSection";
import Link from "next/link";

const productData = [
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage3.png",
    price: 25,
    quantity: 2,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
    status: "pending",
    date: "24 May, 2025",
  },
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage2.png",
    price: 30,
    quantity: 3,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
    status: "delivered",
    date: "24 May, 2025",
  },
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage1.png",
    price: 30,
    quantity: 3,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
    status: "delivered",
    date: "24 May, 2025",
  },
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage6.png",
    price: 30,
    quantity: 3,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
    status: "delivered",
    date: "24 May, 2025",
  },
];

const ProductTable = () => {
  return (
    <>
      <div className="col-span-2  rounded-md border md:p-5 px-2 ">
        <Table className="lg:text-lg w-full overflow-x-auto">
          <TableHeader className="  text-white">
            <TableRow className="border-none !text-white hover:bg-transparent">
              <TableHead className="text-white">Fishes</TableHead>
              <TableHead className="text-white  text-center ">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData?.map((data, idx) => (
              <TableRow key={idx} className="hover:bg-transparent ">
                <TableCell className="font-medium min-w-fit">
                  <div className=" flex flex-col lg:flex-row items-center md:gap-2 gap-1  min-w-fit">
                    <Link href="/shop/1">
                      <Image
                        src={data?.image}
                        alt="product_image"
                        width={950}
                        height={700}
                        className="md:size-28 size-20 rounded object-cover origin-center"
                      />
                    </Link>
                    <div className="flex flex-col lg:gap-y-2">
                      <Link href="/shop/1">
                        <p className="truncate font-medium lg:text-lg text-sm">
                          {data?.name}
                        </p>
                      </Link>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-white/60">
                        <p>Seller info:</p>
                        <p>{data?.seller_info}</p>
                      </div>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-white/60">
                        <p>Style:</p>
                        <p>{data?.style}</p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center ">${data?.price}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationSection className="mt-5" />
    </>
  );
};

export default ProductTable;

const statuses = [
  {
    name: "Pending",
    color: "#FFD700",
    value: "pending",
  },
  {
    name: "Delivered",
    color: "#78C0A8",
    value: "delivered",
  },
  {
    name: "In Progress",
    color: "#A78BFA",
    value: "in_progress",
  },
  {
    name: "On The Why",
    color: "#60A5FA",
    value: "on_the_why",
  },
  {
    name: "Canceled",
    color: "#F87171",
    value: "canceled",
  },
];

const StatusHeader = () => {
  return (
    <TableHead className="text-white  flex justify-center items-center md:gap-x-2 gap-x-1">
      Status{" "}
      <Select>
        <SelectTrigger
          //  @ts-ignore
          iconShow={false}
          className="p-0 py-0 border-none h-fit mt-0 m-0 cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <FilterIcon className="lg:size-3 size-2.5"></FilterIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses?.map((status, idx) => (
              <SelectItem key={idx} value={status?.value}>
                <SelectLabel className="flex items-center gap-x-1">
                  <div
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: status?.color }}
                  ></div>
                  {status?.name}
                </SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableHead>
  );
};
