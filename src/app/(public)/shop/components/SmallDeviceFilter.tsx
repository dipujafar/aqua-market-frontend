
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import PriceCategory from "./PriceCategory";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import { SlidersHorizontal } from "lucide-react";
import Categories from "@/components/categories/Categories";
import PriceCategory from "@/components/categories/PriceCategory";
import { Button } from "@/components/ui/button";
import { DiscoundIcon, OrderIcon } from "@/components/icons/Icons";

export function SmallDeviceFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-y-auto hide-scrollbar  bg-linear-to-r from-[#2E1345] to-[#0A2943] text-white border-none ">
        <div className="2xl:space-y-10 space-y-6 mt-10 px-2 mb-10 ">
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          <PriceCategory></PriceCategory>
          <Categories title="Discount" data={discountData}></Categories>
          <div className="space-y-3">
          <Button className="w-full bg-primary-blue py-6 hover:bg-gray-800 cursor-pointer">
            <OrderIcon></OrderIcon> Pre Order Now
          </Button>
          <Button className="w-full bg-linear-to-t   from-[#78C0A8]/80 to-[#4DA8DA]/70 py-6 cursor-pointer">
            <DiscoundIcon></DiscoundIcon> Bid Now
          </Button>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
