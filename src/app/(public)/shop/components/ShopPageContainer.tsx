"use client";

import { collectionTypes } from "@/lib/collectionType";
import AllProducts from "./AllProducts";
import { SmallDeviceFilter } from "./SmallDeviceFilter";
import PriceCategory from "@/components/categories/PriceCategory";
import PaginationSection from "@/components/shared/PaginationSection";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Search } from "lucide-react";
import {
  useGetAllFishQuery,
  useGetFishMaxPriceQuery,
} from "@/redux/api/fishApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { IFish } from "@/types/fish.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/FramerMotionValiants";

const containerVariants = {
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "0.75rem",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

// Define available pricing types (this could come from an API or config)
const pricingTypes = [
  { id: "preOrder", label: "Pre Orders" },
  { id: "forBids", label: "For Bids" },
  { id: "newListed", label: "New Listed" },
  { id: "liveAuctions", label: "Live Auctions" },
  { id: "algaeEaters", label: "Algae Eaters" },
  { id: "cardinal", label: "Cardinal" },
  { id: "neoCardinal", label: "Neo Cardinal" },
  { id: "sulawesi", label: "Sulawesi" },
];

const productTypes = [
  { id: "nets", label: "Nets" },
  { id: "filters", label: "Filters" },
  { id: "bacteria", label: "Bacteria" },
  { id: "food", label: "Food" },
];

const ShopPageContainer = () => {
  const { data: maxPriceData } = useGetFishMaxPriceQuery(undefined);
  const maxPrice = maxPriceData?.data || 5000;

  const [show, setShow] = useState(true);
  const [pShow, setPShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [discountRange, setDiscountRange] = useState<[number, number]>([
    0, 100,
  ]);
  const [selectedPricingTypes, setSelectedPricingTypes] = useState<
    Record<string, boolean>
  >({});

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 9);

  // Query object for API
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

  // Memoized filtered products
  const filteredProducts: IFish[] = useMemo(() => {
    if (!fishData?.data) return [];

    return fishData.data.filter((item: IFish) => {
      const matchesSearch = item?.fishName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? item?.fishType === selectedCategory
        : true;

      const matchesPricingType = Object.values(selectedPricingTypes).some(
        (isChecked) => isChecked
      )
        ? selectedPricingTypes[item?.pricingType]
        : true;

      return matchesSearch && matchesCategory && matchesPricingType;
    });
  }, [fishData, searchTerm, selectedCategory, selectedPricingTypes]);

  useEffect(() => {
    if (maxPrice) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Reset all filters
  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
    setDiscountRange([0, 100]);
    setSelectedPricingTypes({});
  };

  // Handle dynamic checkbox changes
  const handleTypeChange = (type: string) => {
    setSelectedPricingTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-8 gap-4 xl:mt-8 mt-4">
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

          {/* Collections Section */}
          <div className="space-y-3 xl:space-y-6">
            <div className="xl:space-y-4 space-y-3">
              <div className="py-2 border-b flex items-center justify-between">
                <h4 className="text-lg font-bold uppercase">COLLECTIONS</h4>
                <button
                  onClick={() => setShow(!show)}
                  className="text-primary-gray hover:text-purple-400 transition-all duration-300 cursor-pointer w-8 border h-fit flex justify-center items-center hover:border-pink-300"
                >
                  {show ? <Minus /> : <Plus />}
                </button>
              </div>
              <motion.div
                initial={show ? "visible" : "hidden"}
                animate={show ? "visible" : "hidden"}
                exit="hidden"
                variants={containerVariants}
                className="overflow-hidden"
              >
                <motion.div
                  variants={parentVariants}
                  initial="initial"
                  whileInView="animate"
                  exit="exit"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {pricingTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      variants={childrenVariants}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <Checkbox
                        id={type.id}
                        className="border-primary-gray"
                        checked={!!selectedPricingTypes[type.id]}
                        onCheckedChange={() => handleTypeChange(type.id)}
                      />
                      <label
                        htmlFor={type.id}
                        className="text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg cursor-pointer"
                      >
                        {type.label}
                      </label>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <div className="xl:space-y-4 space-y-3">
              <div className="py-2 border-b flex items-center justify-between">
                <h4 className="text-lg font-bold uppercase">PRODUCTS</h4>
                <button
                  onClick={() => setPShow(!pShow)}
                  className="text-primary-gray hover:text-purple-400 transition-all duration-300 cursor-pointer w-8 border h-fit flex justify-center items-center hover:border-pink-300"
                >
                  {pShow ? <Minus /> : <Plus />}
                </button>
              </div>
              <motion.div
                initial={pShow ? "visible" : "hidden"}
                animate={pShow ? "visible" : "hidden"}
                exit="hidden"
                variants={containerVariants}
                className="overflow-hidden"
              >
                <motion.div
                  variants={parentVariants}
                  initial="initial"
                  whileInView="animate"
                  exit="exit"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {productTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      variants={childrenVariants}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <Checkbox
                        id={type.id}
                        className="border-primary-gray"
                        checked={!!selectedPricingTypes[type.id]}
                        onCheckedChange={() => handleTypeChange(type.id)}
                      />
                      <label
                        htmlFor={type.id}
                        className="text-primary-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg cursor-pointer"
                      >
                        {type.label}
                      </label>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            title="COLLECTION"
            data={collectionTypes}
          /> */}
          <PriceCategory
            values={priceRange}
            setValues={setPriceRange}
            maxPrice={maxPrice}
          />

          <div className="space-y-4">
            <Button
              onClick={resetAllFilters}
              className="w-full bg-red-500 py-6 cursor-pointer hover:bg-red-600 text-white font-bold"
            >
              Reset All Filters
            </Button>
          </div>
        </div>

        <div className="2xl:col-span-4 xl:col-span-3 md:col-span-2">
          <div className="flex justify-between items-center xl:mb-8 mb-4">
            <div></div>
            <div className="lg:hidden block">
              <SmallDeviceFilter
                data={collectionTypes}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                resetAllFilters={resetAllFilters}
              />
            </div>
          </div>
          <AllProducts
            fishData={filteredProducts}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
      </div>
      <PaginationSection
        id="fish-section"
        setName="page"
        totalItems={fishData?.meta.total}
      />
    </div>
  );
};

export default ShopPageContainer;
