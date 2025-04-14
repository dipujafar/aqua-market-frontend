
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import PriceCategory from "./PriceCategory";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import { SlidersHorizontal } from "lucide-react";
import Categories from "@/components/categories/Categories";

export function SmallDeviceFilter() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SlidersHorizontal />
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-scroll ">
        <div className="2xl:space-y-10 space-y-6 mt-10 px-2 mb-10 ">
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          {/* <PriceCategory></PriceCategory> */}
          <Categories title="Discount" data={discountData}></Categories>
        </div>
      </SheetContent>
    </Sheet>
  );
}
