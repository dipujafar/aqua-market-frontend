import { Calendar, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  dateOfJoin?: string;
  location?: string;
  email?: string;
  emailVerified?: boolean;
  contactNumber?: string;
  contactVerified?: boolean;
  aboutText?: string;
}

const SellerInfo = ({
  dateOfJoin = "January 2024",
  location = "Ontario, USA",
  email = "user@example.com",
  emailVerified = true,
  contactNumber = "+1 (555) 123-4567",
  contactVerified = true,
  aboutText = "Passionate aquarist with 10 years of experience breeding rare snails and fish. Specializing in unique tank cleaners! I've dedicated my career to cultivating healthy, vibrant aquatic life, focusing on species that enhance the beauty and cleanliness of your aquarium. My journey began with a small home tank, and now I manage a thriving breeding operation, ensuring each fish and snail is raised with care and expertise. I'm committed to sustainable practices, providing only the highest-quality livestock to fellow aquarium enthusiasts. Whether you're a beginner or a seasoned hobbyist, I'm here to help you find the perfect addition to your tank!",
}: ProfileCardProps) => {
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
              <span className="text-white font-medium">{dateOfJoin}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-300 flex-shrink-0" />
            <div>
              <span className="text-slate-300 text-sm block">Location:</span>
              <span className="text-white font-medium">{location}</span>
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
                <Link href={`mailto:${email}`} className="text-white font-medium truncate">{email}</Link>
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
                <Link href={`tel:${contactNumber}`} className="text-white font-medium">{contactNumber}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* About section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">About</h3>
          <p className="text-slate-300 leading-relaxed text-sm lg:text-base bg-[#ffffff33] px-2 pb-7 pt-2 rounded-lg">
            {aboutText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
