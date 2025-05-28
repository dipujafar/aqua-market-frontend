import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OwnProductCard = ({ data }: { data: any }) => {
  return (
    <Card
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
      }}
      className="border-none py-4"
    >
      <CardContent className="px-4 space-y-4 text-white">
        <div className="relative group">
          <Image
            src={data?.image}
            alt="product-data"
            width={1200}
            height={12000}
            className="rounded"
          ></Image>
          {data?.type && (
            <div
              className={cn(
                "p-2  absolute top-0 left-0 text-sm min-w-1/3 rounded-tl rounded-br flex justify-center items-center",
                data?.type === "preOrder" && "bg-primary-blue",
                data?.type === "directBuy" && "bg-[#78C0A8]",
                data?.type === "bid" && "bg-primary-sky"
              )}
            >
              {data?.type === "preOrder" && <h6>Pre Order Now</h6>}
              {data?.type === "directBuy" && <h6>Direct Sale</h6>}
              {data?.type === "bid" && <h6>Bid</h6>}
            </div>
          )}

          <div className="absolute top-1 right-2 size-11 flex justify-center items-center gap-x-1">
            {data?.type === "directBuy" && (
              <Link
                href={`/seller/item-list-direct-sale/add-product`}
                className="p-1 bg-green-500 flex justify-center items-center rounded-full cursor-pointer"
              >
                <Edit size={18} />
              </Link>
            )}
            {data?.type === "bid" && (
              <Link
                href={`/seller/item-list-bid/add-product`}
                className="p-1 bg-green-500 flex justify-center items-center rounded-full cursor-pointer"
              >
                <Edit size={18} />
              </Link>
            )}
            {data?.type === "preOrder" && (
              <Link
                href={`/seller/item-list-pre-order/add-product`}
                className="p-1 bg-green-500 flex justify-center items-center rounded-full cursor-pointer"
              >
                <Edit size={18} />
              </Link>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <div className="p-1 bg-red-500 flex justify-center items-center rounded-full cursor-pointer">
                  <Trash2 size={18} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-600 border-none text-white p-2 rounded bg-linear-to-r from-[#2E1345] to-[#0A2943]">
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
          </div>

          <div
            className="absolute bottom-0 w-full p-2.5 group-hover:p-3  duration-500 flex justify-center items-center text-xl"
            style={{ background: "rgba(255, 255, 255, 0.20)" }}
          >
            {data?.name}
          </div>
        </div>

        <div className="flex justify-between">
          {/* ====================== product price ======================== */}
          <h3 className="text-xl font-bold">{data.price}</h3>
          {/* ====================== Add Advertise ======================== */}
          { data?.type !== "bid" &&
          <Link href={`/seller/profile/advertise`}>
            <Button
              style={{
                background:
                  "linear-gradient(180deg, rgba(77, 168, 218, 0.30) 0%, rgba(120, 192, 168, 0.30) 85.08%)",
              }}
              size={"sm"}
              className="bg-transparent border cursor-pointer group "
            >
              Add Advertise
              <AnimatedArrow />
            </Button>
          </Link>
}
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnProductCard;
