"use client";

import Categories from "@/components/categories/Categories";
import { collectionTypes } from "@/lib/collectionType";
import AllProducts from "./AllProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PriceCategory from "@/components/categories/PriceCategory";
import PaginationSection from "@/components/shared/PaginationSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  useGetAllFishQuery,
  useGetFishMaxPriceQuery,
} from "@/redux/api/fishApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IFish } from "@/types/fish.type";
import { discountData } from "@/lib/discountData";
import { Button } from "@/components/ui/button";
import { DiscoundIcon, OrderIcon } from "@/components/icons/Icons";
import DiscountCategories from "@/components/categories/DiscountCategories";

const ShopPageContainer = () => {
  const { data: maxPriceData } = useGetFishMaxPriceQuery(undefined);
  const maxPrice = maxPriceData?.data || 5000;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [discountRange, setDiscountRange] = useState<[number, number]>([
    0, 100,
  ]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleType = (type: string) => {
    setSelectedType(type);
  };

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  // --------------------- set queries ---------------------
  const query: Record<string, string | number> = {
    limit,
    page,
  };

  if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) {
    query["minPrice"] = priceRange[0];
    query["maxPrice"] = priceRange[1];
  }

  if (discountRange[0] !== 0 || discountRange[1] !== 100) {
    query["minDiscount"] = discountRange[0];
    query["maxDiscount"] = discountRange[1];
  }

  const { data: fishData, isLoading, isFetching } = useGetAllFishQuery(query);
  // console.log("fishData", fishData);

  // 🔹 Filtered data logic (no useMemo)
  const filteredProducts: IFish[] = fishData?.data
    ? fishData.data.filter((item: IFish) => {
        const matchesSearch = item?.fishName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory
          ? item?.fishType === selectedCategory
          : true;

        const matchesType = selectedType
          ? item?.pricingType === selectedType
          : true;

        return matchesSearch && matchesCategory && matchesType;
      })
    : [];

  // console.log("setSelectedCategory", filteredProducts);

  useEffect(() => {
    if (maxPrice) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setPriceRange([0, 5000]);
    setDiscountRange([0, 100]);
    setSelectedType(null);
  };

  return (
    <div>
      <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="2xl:space-y-7 space-y-5 hidden lg:block">
          <div className="relative xl:mt-9 mt-5">
            <Search size={18} className="absolute top-3 left-2" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background:
                  "linear-gradient(180deg, rgba(77, 168, 218, 0.42) 0%, rgba(120, 192, 168, 0.42) 85.08%)",
              }}
              placeholder="Search here ..."
              className="placeholder:text-white/75 md:py-5 pl-7"
            />
          </div>
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            title="COLLECTION"
            data={collectionTypes}
          ></Categories>
          <PriceCategory
            values={priceRange}
            setValues={setPriceRange}
            maxPrice={maxPrice}
          />
          <DiscountCategories
            title="Discount"
            data={discountData}
            values={discountRange}
            setValues={setDiscountRange}
          />

          <div className="space-y-4">
            <Button
              onClick={() => handleType("preOrder")}
              className="w-full bg-primary-blue py-6 hover:bg-gray-800 cursor-pointer"
            >
              <OrderIcon></OrderIcon> Pre Order Now
            </Button>
            <Button
              onClick={() => handleType("forBids")}
              className="w-full bg-linear-to-t   from-[#78C0A8]/80 to-[#4DA8DA]/70 py-6 cursor-pointer"
            >
              <DiscoundIcon></DiscoundIcon> Bid Now
            </Button>
            <Button
              onClick={resetAllFilters}
              className="w-full bg-red-500 py-6 cursor-pointer hover:bg-red-600 text-white font-bold"
            >
              Reset All Filters
            </Button>
          </div>
        </div>

        <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2 ">
          {/* =============================== categories ========================== */}
          <div className="flex justify-between items-center xl:mb-8 mb-4 ">
            <div></div>
            <div className="lg:hidden block">
              <SmallDeviceFilter
                data={collectionTypes}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                resetAllFilters={resetAllFilters}
              ></SmallDeviceFilter>
            </div>
          </div>
          {/* ========================= all products ========================== */}
          <AllProducts
            fishData={filteredProducts}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection
        id="fish-section"
        setName="page"
        totalItems={fishData?.meta.total}
      />
    </div>
  );
};

export default ShopPageContainer;
