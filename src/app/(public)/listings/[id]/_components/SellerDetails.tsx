import { IUser } from "@/types/fish.type";
import { Calendar } from "lucide-react";
import moment from "moment";

interface ProfileDetailsProps {
  userInfo: IUser;
}
const SellerDetails = ({ userInfo }: ProfileDetailsProps) => {
  return (
    <>
      <div className="w-full   text-white rounded-lg overflow-hidden ">
        {/* Main content container */}
        <div className="pt-5">
          {/* Top section with date and location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-300 flex-shrink-0" />
              <div>
                <span className="text-slate-300 text-sm block">
                  Date of Join:
                </span>
                <span className="text-white font-medium">
                  {userInfo?.createdAt
                    ? moment(userInfo.createdAt).format("MMMM Do, YYYY, h:mm A")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* About section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">About</h3>
            <p className="text-slate-300 leading-relaxed text-sm lg:text-base bg-[#ffffff33] px-2 pb-7 pt-2 rounded-lg">
              {userInfo?.about === ""
                ? "No information provided"
                : userInfo?.about}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDetails;
