import Categories from "@/components/categories/Categories";
import { collectionTypes } from "@/lib/collectionType";
import { discountData } from "@/lib/discountData";
import PriceCategory from "@/components/categories/PriceCategory";
import { Button } from "@/components/ui/button";
import { DiscoundIcon, OrderIcon } from "@/components/icons/Icons";
import PaginationSection from "@/components/shared/PaginationSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AllUploadedProducts from "./AllUploadedProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";

const SellerUploadedProducts = () => {
  return (
    <div>
      <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="2xl:space-y-7 space-y-5 hidden lg:block">
          <div className="relative xl:mt-9 mt-5">
            <Search size={18} className="absolute top-3 left-2"/>
            <Input
              style={{
                background:
                  "linear-gradient(180deg, rgba(77, 168, 218, 0.42) 0%, rgba(120, 192, 168, 0.42) 85.08%)",
              }}
              placeholder="Search here ..."
              className="placeholder:text-white/75 md:py-5 pl-7"
            />
          </div>
          <Categories title="COLLECTION" data={collectionTypes}></Categories>
          {/* <Categories title="BRANDS" data={brandsData}></Categories> */}
          {/* <PriceCategory></PriceCategory> */}
          {/* <ColorCategory></ColorCategory> */}
          {/* <Categories title="Discount" data={discountData}></Categories> */}
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
          <AllUploadedProducts></AllUploadedProducts>
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection></PaginationSection>
    </div>
  );
};

export default SellerUploadedProducts;
