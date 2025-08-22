import { Input } from "@/components/ui/input";
import { useGetAllFishQuery } from "@/redux/api/fishApi";
import { IFish } from "@/types/fish.type";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavSearch = ({ color }: { color: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(20);

  const { data: allFish } = useGetAllFishQuery({ limit });
  //   console.log("allFish", allFish);

  useEffect(() => {
    if (allFish?.meta?.total && allFish.meta.total > limit) {
      setLimit(allFish.meta.total);
    }
  }, [allFish, limit]);

  const filterSearch = allFish?.data.filter((item: IFish) => {
    const matchesSearch = item?.fishName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border-0 border-b  focus:outline-0 shadow-none rounded-none focus-visible:ring-0 placeholder:text-${color} min-w-[120px] `}
        placeholder="Search here....."
      />
      <div className="absolute  right-0 top-2">
        <Search size={20} color="#fff" />
      </div>
      {/* Search Results Dropdown */}
      {searchTerm && (
        <div className="absolute z-50 top-full mt-1 w-[250px] lg:w-[400px] bg-white text-black rounded-lg shadow-lg max-h-[80vh] overflow-auto">
          {filterSearch?.length > 0 ? (
            filterSearch.map((item: IFish) => (
              <Link
                href={`/shop/${String(
                  item?.pricingType ?? ""
                ).toLowerCase()}-${String(item?._id ?? "")}`}
                key={item._id}
              >
                <div className="p-2 hover:bg-gray-100 cursor-pointer transition-colors flex items-center gap-3">
                  <Image
                    src={item?.image[0] || "/placeholder.png"}
                    alt={item.fishName || "fish"}
                    width={60}
                    height={60}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{item.fishName}</h3>
                    <p className="text-xs text-gray-500 truncate">
                      {item.behavior}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-gray-500 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavSearch;
