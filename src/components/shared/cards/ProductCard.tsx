import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RightArrowIcon from "@/components/ui/right-arrow-icon";
import ShoppingCartIcon from "@/components/ui/shopping-cart-icon";
import { productCardButtonColor } from "@/utils/productCardButtonColor";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }: { data: any }) => {
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
          {data?.availability && (
            <div className="p-2 bg-primary-blue absolute top-0 left-0 text-sm max-w-[130px] rounded-tl">
              <h6>Availability : {data?.availability} </h6>
            </div>
          )}

          {data?.offer && (
            <div className="p-2 bg-primary-red absolute top-0 left-0 text-sm max-w-[130px] rounded-tl">
              <h6> {data?.offer} </h6>
            </div>
          )}

         {data?.left && <div className="absolute top-0 left-0 space-y-2">
          {data?.left && (
            <div className="py-2 px-4 bg-primary-sky text-sm max-w-[130px] rounded-tl ">
              <h6 className="text-center text-lg font-bold">{data?.left}</h6>
              <h6>Left</h6>
            </div>
          )}
          {data?.totalBid && (
            <div className="py-2 px-4 bg-primary-sky text-sm max-w-[130px]  ">
              <h6 className="text-center text-lg font-bold">{data?.totalBid}</h6>
              <h6>Bids</h6>
            </div>
          )}
          </div>
}
         
          <div
            className="absolute bottom-0 w-full p-2.5 group-hover:p-3  duration-500 flex justify-center items-center text-xl"
            style={{ background: "rgba(255, 255, 255, 0.20)" }}
          >
            {data?.name}
          </div>

          {/* =============== add to card button ====================== */}
          { data?.type !== "bid" &&
            <div
              style={{ background: "rgba(156, 156, 156, 0.40)" }}
              className="absolute top-1 right-1 size-12 flex justify-center items-center rounded-full hover:bg-white cursor-pointer"
            >
              <ShoppingCartIcon></ShoppingCartIcon>
            </div>
          }
        </div>
        {/* seller profile and product price */}
        <div className="flex justify-between gap-x-2">
          {/* =============== seller profile ================== */}
          <Link className="flex justify-between items-center gap-x-2" href="#">
            <Image
              src={data?.sellerProfile}
              alt="seller-profile-image"
              width={1200}
              height={1200}
              className="size-7"
            ></Image>
            <p>{data?.sellerName}</p>
          </Link>

          {/* ====================== product price ======================== */}
          <h3 className="text-xl font-bold">{data.price}</h3>
        </div>

        {/* ================= action button ================= */}
        <Button
          className="uppercase w-full rounded  cursor-pointer z-20 border-b-4 border-r-4 border-primary-deep-green group lg:py-5"
          style={{ backgroundColor: productCardButtonColor(data?.type) }}
        >
          {data?.type === "preOrder" && "Pre Order Now"}
          {data?.type === "bid" && "BID NOW"}
          {data?.type === "directBuy" && "Buy NOW"}
          <RightArrowIcon className="group-hover:translate-x-2 duration-500"></RightArrowIcon>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
