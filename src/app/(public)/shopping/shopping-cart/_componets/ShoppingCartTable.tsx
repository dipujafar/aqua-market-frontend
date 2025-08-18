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
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShoppingCartTable = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const cartProducts = cartData?.items || [];
  // console.log("cartProducts", cartProducts);

  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    const list = cartProducts ?? [];
    setQuantities(list.map((o) => Number(o.quantity ?? 0)));
  }, [cartProducts]);

  return (
    <div className="col-span-2  rounded-md ">
      <Table className="lg:text-lg w-full overflow-x-auto">
        <TableHeader
          style={{
            background:
              "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
          }}
          className="py-10 text-white"
        >
          <TableRow className="border-none !text-white hover:bg-transparent">
            <TableHead className="text-white py-5">Fishes</TableHead>
            <TableHead className="text-white py-5 ">Price</TableHead>
            <TableHead className="text-white py-5  text-center">
              Quantity
            </TableHead>
            <TableHead className="text-white py-5">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartProducts.map((data, idx: number) => (
            <TableRow key={`${idx + 1}`} className="hover:bg-transparent">
              <TableCell className="font-medium min-w-fit">
                <div className="flex gap-x-2">
                  <div className="border lg:size-8 size-6  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 group duration-300">
                    <X
                      onClick={() => dispatch(removeFromCart(data.fishId))}
                      size={20}
                      className="group-hover:text-red-700 duration-300"
                    />
                  </div>
                  <div className=" flex flex-col lg:flex-row items-center md:gap-3 gap-1  min-w-fit">
                    <Image
                      src={data?.image ? data?.image : "/no-image.jpg"}
                      alt="product_image"
                      width={950}
                      height={700}
                      className="md:size-28 size-20 rounded object-cover origin-center"
                    />
                    <div className="flex flex-col lg:gap-y-2">
                      <p className="truncate font-medium lg:text-lg text-sm">
                        {"Fish Name"}
                      </p>
                      <div className="truncate text-sm font-light flex items-center gap-x-2 text-gray-300">
                        <p>Seller info:</p>
                        <p>{data?.sellerName}</p>
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

              {/* Quantity */}
              <TableCell>
                <div className="border-2 rounded-full flex items-center gap-x-3 max-w-fit mx-auto">
                  {/* − button (use -1) */}
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: data.fishId,
                          quantity: Math.max(data.quantity - 1, 1),
                        })
                      )
                    }
                    className="size-10 border flex justify-center items-center rounded-full hover:bg-black/50 hover:text-white duration-300"
                  >
                    -
                  </button>

                  <p>{quantities[idx] ?? 0}</p>

                  {/* + button */}
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: data.fishId,
                          quantity: Math.min(data.quantity + 1, data.stock),
                        })
                      )
                    }
                    className="size-10 border flex justify-center items-center rounded-full hover:bg-black/50 hover:text-white duration-300"
                  >
                    +
                  </button>
                </div>
              </TableCell>

              <TableCell>
                ${(Number(quantities[idx]) * Number(data?.price)).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      <div className="flex flex-wrap gap-2 md:justify-between items-center justify-center px-4 mt-5">
        <Link href="/shop">
          <Button
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.50) 0%, rgba(120, 192, 168, 0.50) 85.08%)",
            }}
            className=" text-primary-black hover:text-primary-white  ease-in  group overflow-hidden cursor-pointer group"
          >
            <AnimatedArrowReverse />
            Return to shop
          </Button>
        </Link>
        <Button
          onClick={() => dispatch(clearCart())}
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
  );
};

export default ShoppingCartTable;
