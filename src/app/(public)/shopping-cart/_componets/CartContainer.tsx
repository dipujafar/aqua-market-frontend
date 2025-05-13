"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

const productData = [
  {
    name: "Pink Polka Dot Hillstream Loach",
    image: "/productImage3.png",
    price: 25,
    quantity: 2,
    seller_info: "AquaPet Seller",
    style: "Single",
  },
  {
    name: "Freezer",
    image: "/productImage2.png",
    price: 24,
    quantity: 3,
    seller_info: "AquaPet Seller",
    style: "Single",
  },
];

const CartContainer = () => {
  // Initialize state with quantities from productData
  const [quantities, setQuantities] = useState(
    productData.map((product) => product.quantity)
  );
  const router = useRouter();

  const handleQuantityChange = (idx: number, change: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, index) =>
        index === idx ? Math.max(quantity + change, 0) : quantity
      )
    );
  };

  const handleProceed = () => {
    router.push("/billing-info");
  };

  return (
    <div>
      <div>
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 xl:gap-x-7 gap-y-5 items-center justify-center">
          <div className="col-span-2 py-5 rounded-md ">
            <Table className="lg:text-lg w-full overflow-x-auto">
              <TableHeader
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
                }}
                className="py-10 text-white"
              >
                <TableRow className="border-none !text-white">
                  <TableHead className="text-white py-5">Fishes</TableHead>
                  <TableHead className="text-white py-5 ">Price</TableHead>
                  <TableHead className="text-white py-5  text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="text-white py-5">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productData.map((data, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium min-w-fit">
                      <div className="flex gap-x-2">
                        <div className="border lg:size-8 size-6  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                          <X
                            size={20}
                            className="group-hover:text-red-700 duration-300"
                          />
                        </div>
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
                      </div>
                    </TableCell>
                    <TableCell>${data?.price}</TableCell>
                    <TableCell className=" ">
                      {/* quantity */}
                      <div className="border-2  rounded-full flex items-center gap-x-3 max-w-fit mx-auto  ">
                        <button
                          onClick={() => handleQuantityChange(idx, -1)}
                          className={`size-10 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300`}
                          disabled={quantities[idx] === 1}
                        >
                          -
                        </button>
                        <p>{quantities[idx]}</p>
                        <button
                          onClick={() => handleQuantityChange(idx, 1)}
                          className=" size-10 border flex justify-center items-center rounded-full hover:bg-primary-color hover:text-primary-white hover:shadow-2xl ease-in duration-300"
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      $
                      {(Number(quantities[idx]) * Number(data?.price)).toFixed(
                        2
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <hr />
            <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
              <Link href="/menu-items">
                <Button
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
                  }}
                  className=" text-primary-black hover:text-primary-white  ease-in  group overflow-hidden cursor-pointer"
                >
                  <ArrowLeft className="group-hover:-translate-x-10 ease-in duration-500"></ArrowLeft>
                  Return to shop
                </Button>
              </Link>
              <Button
                style={{
                  background:
                    "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
                }}
                className="bg-primary-gray text-primary-black  hover:text-primary-white hover:bg-gray-500  cursor-pointer"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* cart statistics */}
          <Card className="shadow-md hover:border hover:border-primary-color/50 duration-300">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                Cart Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex justify-between py-5">
                  <p>Subtotal:</p>
                  <p className="font-medium">$84.00</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Shipping:</p>
                  <p className="font-medium">Free</p>
                </div>
                <hr />
                <div className="flex justify-between py-5">
                  <p>Total:</p>
                  <p className="font-medium">$84.00</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleProceed}
                className="bg-primary-color w-full rounded-full hover:bg-primary-black/80"
              >
                Proceed to checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
