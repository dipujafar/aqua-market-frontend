import CustomAvatar from "@/components/shared/CustomAvatar";
import Image from "next/image";
import SellerDetails from "./SellerDetails";
import { useGetProfileDetailsQuery } from "@/redux/api/userProfileApi";
import { useGetMyFollowersQuery } from "@/redux/api/sellerApi";
import {
  useFollowSellerMutation,
  useGetSellerBaseFollowingQuery,
} from "@/redux/api/userApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import CommonButton from "@/components/ui/common-button";

const SellerProfileInfo = ({ id }: { id: string }) => {
  const { data: followers } = useGetMyFollowersQuery(id);
  const { data: user } = useGetProfileDetailsQuery(id);
  const userInfo = user?.data;
  console.log("userInfo", userInfo);

  const [followUnfollow] = useFollowSellerMutation();
  const { data: followingData } = useGetSellerBaseFollowingQuery(id);

  const status =
    followingData?.data?.isActive === true
      ? "Unfollow Seller"
      : "Follow Seller";

  const handleFollowSeller = async (sellerId: string) => {
    try {
      const res = await followUnfollow({ id: sellerId }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="relative">
        <Image
          src={user?.data?.banner?.url || "/seller_profile.png"}
          alt="Banner"
          width={1900}
          height={1900}
          className="max-h-[220px] min-h-[120px] object-cover w-full rounded-lg"
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.11) 0%, rgba(120, 192, 168, 0.11) 85.08%)",
            }}
            className="relative lg:w-1/3 pt-4 px-3 rounded-lg"
          >
            <CustomAvatar
              img={user?.data?.profile_image?.url || "/seller_profile.png"}
              name="Anita Alice"
              className=" xl:size-48 md:size-36 size-28 md:top-[-100px] top-[-80px] mx-auto object-cover"
            ></CustomAvatar>
            <div className="relative md:top-[-90px] top-[-80px]">
              <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
                <h1>Name</h1>
                <p className=" font-semibold">
                  {/* @ts-ignore */}
                  {user?.data?.first_name} {user?.data?.last_name}
                </p>
              </div>
              <div className="flex justify-between px-2 py-3 border-b border-white">
                <h1>Store Name</h1>
                <p className=" font-semibold">
                  {/* @ts-ignore */}
                  {user?.data?.store_name}
                </p>
              </div>
              <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
                <h1>Followers</h1>
                <p className=" font-semibold">
                  {followers?.data?.meta?.total || 0}
                </p>
              </div>
              <div className="flex justify-between  px-2 py-3 border-b border-white">
                <h1>Following</h1>
                <p className=" font-semibold">5</p>
              </div>
              <div className="flex justify-between bg-[#ffffff33] px-2 py-3 border-b border-white">
                <h1>Total Sold</h1>
                <p className=" font-semibold">100+</p>
              </div>
              <div>
                <CommonButton
                  handlerFunction={() => handleFollowSeller(userInfo?._id)}
                  className="w-full mt-4 group border-r-3 border-b-3 border-white "
                >
                  {status}
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3">
            <SellerDetails userInfo={userInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfileInfo;
