import { ArrowIcon } from "@/components/icons/Icons";
import Image from "next/image";
import Link from "next/link";

const charitySupportData = [
  {
    _id: 1,
    image: "/related_product_image1.png",
    title: "Betta Fish",
  },
  {
    _id: 2,
    image: "/related_product_image2.png",
    title: "Jelly Fish",
  },
  {
    _id: 3,
    image: "/related_product_image3.png",
    title: "Guppy Fish",
  },
  {
    _id: 4,
    image: "/related_product_image4.png",
    title: "Tetra Fish",
  },
];

const RelatedProduct = () => {
  return (
    <div>
      {/* ======================================= section header ========================================== */}

      <div className="flex items-center gap-x-1.5">
        <h4 className="lg:text-3xl sm:text-xl text-lg font-medium uppercase">
          You may also like
        </h4>
      </div>

      {/* ========================================= preview images and data ==================================== */}
      <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-5 gap-2">
        {charitySupportData?.map((charitySupport) => (
          <Link href={"/shop/1"} key={charitySupport?._id}>
            <div className="relative group">
              <Image
                src={charitySupport?.image}
                alt="charity_support_data"
                width={1200}
                height={1200}
                className="object-cover origin-center rounded-xl"
              ></Image>
              <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out sm:h-[50px] h-[30px] group-hover:h-full group-hover:rounded-xl  md:group-hover:text-3xl group-hover:text-xl origin-bottom overflow-hidden">
                <p>{charitySupport?.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
