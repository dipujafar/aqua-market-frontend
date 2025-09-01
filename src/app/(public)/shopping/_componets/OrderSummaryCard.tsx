"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonButton from "@/components/ui/common-button";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const OrderSummaryCard = () => {
  const router = useRouter();
  const pathName = usePathname();

  const cartData = useAppSelector((state) => state.cart);
  const cartProducts = cartData?.items || [];
  // console.log("cartProducts", cartProducts);

  //  Calculate total items and subtotal
  const totalItems = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
  const subTotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card
      className="shadow-md hover:border hover:border-primary-color/50 duration-300 text-white h-fit"
      style={{
        background:
          "var(--Linear-2, linear-gradient(180deg, rgba(77, 168, 218, 0.24) 0%, rgba(120, 192, 168, 0.24) 85.08%))",
      }}
    >
      <CardHeader className="mb-0">
        <CardTitle className="font-semibold text-center">
          Total Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <hr />
        <div className="space-y-3 mt-4">
          <div className="flex justify-between ">
            <p>Items:</p>
            <p className="font-medium">{totalItems}</p>
          </div>

          <div className="flex justify-between ">
            <p>Subtotal:</p>
            <p className="font-medium">${subTotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between ">
            <p>Total Shipping:</p>
            <p className="font-medium">$0.00</p>
          </div>
          <hr />
          <div className="flex justify-between ">
            <p>Total:</p>
            <p className="font-medium">${subTotal.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {pathName !== "/shopping/shopping-address" && (
          <>
            {cartData?.totalQuantity === 0 ? (
              <CommonButton disabled className="w-full border-white">
                Proceed to checkout
              </CommonButton>
            ) : (
              <Link href="/shopping/shopping-address" className="w-full">
                <CommonButton className="w-full border-white">
                  Proceed to checkout
                </CommonButton>
              </Link>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;
