import { IUser } from "@/types/fish.type";
import { Calendar, MapPin, Mail, Phone } from "lucide-react";
import moment from "moment";
import Link from "next/link";

interface ProfileCardProps {
  userInfo: IUser;
}

const SellerInfo = ({ userInfo }: ProfileCardProps) => {
  // console.log("userInfo", userInfo);

  return (
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

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-300 flex-shrink-0" />
            <div>
              <span className="text-slate-300 text-sm block">Location:</span>
              <span className="text-white font-medium">
                {userInfo?.address?.city},{userInfo?.address?.country}
              </span>
            </div>
          </div>
        </div>

        {/* Contact information section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-300 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-slate-300 text-sm block">Email:</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`mailto:${userInfo?.email}`}
                  className="text-white font-medium truncate"
                >
                  {userInfo?.email}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-slate-300 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-slate-300 text-sm block">
                Contact Number:
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`tel:${userInfo?.contact_number}`}
                  className="text-white font-medium"
                >
                  {userInfo?.contact_number}
                </Link>
              </div>
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
  );
};

export default SellerInfo;
