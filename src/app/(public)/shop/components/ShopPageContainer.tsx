import Categories from "@/components/categories/Categories";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import AllProducts from "./AllProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PriceCategory from "@/components/categories/PriceCategory";
import { Button } from "@/components/ui/button";
import { DiscoundIcon, OrderIcon } from "@/components/icons/Icons";
import PaginationSection from "@/components/shared/PaginationSection";

const ShopPageContainer = () => {
  return (
    <div>
      <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="2xl:space-y-7 space-y-5 hidden lg:block">
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          {/* <Categories title="BRANDS" data={brandsData}></Categories> */}
          <PriceCategory></PriceCategory>
          {/* <ColorCategory></ColorCategory> */}
          <Categories title="Discount" data={discountData}></Categories>
          <div className="space-y-4">
            <Button className="w-full bg-primary-blue py-6 hover:bg-gray-800 cursor-pointer">
              <OrderIcon></OrderIcon> Pre Order Now
            </Button>
            <Button className="w-full bg-linear-to-t   from-[#78C0A8]/80 to-[#4DA8DA]/70 py-6 cursor-pointer">
              <DiscoundIcon></DiscoundIcon> Bid Now
            </Button>
          </div>
        </div>

        <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
          {/* =============================== categories ========================== */}
          <div className="flex justify-between items-center xl:mb-8 mb-4 ">
            <div></div>
            <div className="lg:hidden block  ">
              <SmallDeviceFilter></SmallDeviceFilter>
            </div>
          </div>
          {/* ========================= all products ========================== */}
          <AllProducts></AllProducts>
        </div>
      </div>
        {/* Pagination */}
        <PaginationSection></PaginationSection>
    </div>
  );
};

export default ShopPageContainer;
