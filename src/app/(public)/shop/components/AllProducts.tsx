import ProductCard from "@/components/shared/cards/ProductCard";
import { productData } from "@/lib/dummyData";

const AllProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2   2xl:grid-cols-3  gap-4 xl:gap-6 ">
      {productData?.map((product) => (
        <ProductCard data={product} key={product._id}></ProductCard>
      ))}
    </div>
  );
};

export default AllProducts;
