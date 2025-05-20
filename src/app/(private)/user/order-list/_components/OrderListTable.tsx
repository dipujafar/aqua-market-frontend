"use client";
import AnimatedArrowReverse from "@/components/animatedArrows/AnimatedArrowReverse";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { useState } from "react";

const productData = [
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage3.png",
    price: 25,
    quantity: 2,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
  },
  {
    name: "Freezer",
    image: "/productImage2.png",
    price: 25,
    quantity: 3,
    discount: 20,
    seller_info: "AquaPet Seller",
    style: "Single",
  },
];

const OrderListTable = () => {
  // Initialize state with quantities from productData
  const [quantities, setQuantities] = useState(
    productData.map((product) => product.quantity)
  );

  const handleQuantityChange = (idx: number, change: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === idx ? Math.max(quantity + change, 0) : quantity
      )
    );
  };

  return (
    <div className="col-span-2  rounded-md border md:p-5 px-2 ">
      <Table className="lg:text-lg w-full overflow-x-auto">
        <TableHeader className="  text-white">
          <TableRow className="border-none !text-white hover:bg-transparent">
            <TableHead className="text-white py-5">Fishes</TableHead>
            <TableHead className="text-white py-5 text-center ">
              Subtotal
            </TableHead>
            <TableHead className="text-white py-5  text-center">
              Quantity
            </TableHead>
            <TableHead className="text-white py-5  text-center">
              Discount
            </TableHead>
            <TableHead className="text-white py-5">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.map((data, idx) => (
            <TableRow key={idx} className="hover:bg-transparent">
              <TableCell className="font-medium min-w-fit">
                <div className=" flex flex-col lg:flex-row items-center md:gap-3 gap-1  min-w-fit">
                  <Image
                    src={data?.image}
                    alt="product_image"
                    width={950}
                    height={700}
                    className="md:size-28 size-20 rounded object-cover origin-center"
                  />
                  <div className="flex flex-col lg:gap-y-2">
                    <p className="truncate font-medium lg:text-lg text-sm">
                      {data?.name}
                    </p>
                    <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-300">
                      <p>Seller info:</p>
                      <p>{data?.seller_info}</p>
                    </div>
                    <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-300">
                      <p>Style:</p>
                      <p>{data?.style}</p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">${data?.price}</TableCell>
              <TableCell className="text-center ">{data?.quantity}</TableCell>
              <TableCell className="text-center ">{data?.discount}%</TableCell>
              <TableCell>
                ${(Number(quantities[idx]) * Number(data?.price)).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderListTable;
