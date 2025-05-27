import { MapIcon } from "@/components/icons/Icons";
import CommonButton from "@/components/ui/common-button";
import Image from "next/image";
import Link from "next/link";

const SellerDetails = () => {
  return (
    <div>
      <div className=" flex justify-between gap-x-2 items-center border-b border-white/50 pb-2 ">
        <h4 className="uppercase  text-primary-gray">SELLER INFORMATION</h4>
        <p className="font-light text-gray-200">VIEW DETAILS</p>
      </div>

      <div className="bg-primary-light-pink/5 mt-4  rounded-lg ">
        <div className="space-y-2 flex justify-between border-b pb-2 ">
          <div className="flex  gap-x-2  flex-1 ">
            <div className="relative size-12 rounded-full">
              <Link href="/seller-profile">
                <Image
                  src={"/sellerImage.png"}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="size-12 rounded-full  "
                ></Image>
              </Link>
            </div>
            <div>
              <Link href="/seller-profile">
                <h5 className="font-medium">AquaPet Seller</h5>{" "}
              </Link>
              <p className="text-sm text-white/80">AquaFishBomp.com</p>
            </div>
          </div>

          <div className="flex gap-x-2  items-center h-fit  ">
            <MapIcon></MapIcon>
            <h6>Dublin, Ireland</h6>
          </div>
          <hr />
        </div>

        <CommonButton className="w-full mt-4 group border-r-3 border-b-3 border-white ">
          follow seller
        </CommonButton>
      </div>
    </div>
  );
};

export default SellerDetails;
