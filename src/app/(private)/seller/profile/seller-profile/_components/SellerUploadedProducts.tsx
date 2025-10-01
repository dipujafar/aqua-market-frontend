"use client";

import Categories from "@/components/categories/Categories";
import { collectionTypes } from "@/lib/collectionType";
import PaginationSection from "@/components/shared/PaginationSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AllUploadedProducts from "./AllUploadedProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import { useGetMyFishQuery } from "@/redux/api/sellerApi";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { IFish } from "@/types/fish.type";

const SellerUploadedProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  const { data: myFishData } = useGetMyFishQuery({ page, limit });
  // console.log("data", myFishData);

  // 🔹 Filtered data logic
  const filteredProducts = useMemo(() => {
    if (!myFishData?.data) return [];

    return myFishData.data.filter((item: IFish) => {
      const matchesSearch = item?.fishName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? item?.fishType === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [myFishData, searchTerm, selectedCategory]);
  // console.log("setSelectedCategory", setSelectedCategory);
  // console.log("filteredProducts", myFishData?.meta?.total);

  return (
    <div id="seller-uploaded-products">
      <div className=" grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5	lg:gap-8 gap-4 xl:mt-8 mt-4">
        <div className="2xl:space-y-7 space-y-5 hidden lg:block">
          {myFishData?.meta?.total > 0 && (
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
          )}
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
          <AllUploadedProducts myFishData={filteredProducts} />
        </div>
      </div>
      {/* Pagination */}
      <PaginationSection
        totalItems={myFishData?.meta?.total}
        id="seller-uploaded-products"
        setName="page"
        // @ts-ignore
        pagePostsLimitProps={limit}
      />
    </div>
  );
};

export default SellerUploadedProducts;
