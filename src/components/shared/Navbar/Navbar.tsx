"use client";
import Link from "next/link";
import Container from "../Container";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SearchAndNavIcon from "./SearchAndNavIcon";
import SmallDeviceView from "./SmallDeviceView";
import { activeNavLink } from "@/utils/activeNavLinks";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/navlinks";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";

const Navbar = () => {
  const currentPath = usePathname();
  const paths = currentPath.split("/");

  const { data: userdata } = useGetUserProfileQuery(undefined);
  // console.log("userdata", userdata);

  return (
    <div className="bg-linear-to-r from-[#2E1345] to-[#122443] text-white">
      <Container className="flex justify-between items-center gap-x-5 bg-primary-white py-4">
        {/* ======= Small Screen view ========== */}
        <SmallDeviceView></SmallDeviceView>
        {/* ======= category ========== */}
        <div className="md:flex lg:gap-x-2 gap-x-1 hidden ">
          {navLinks.map((item) => (
            <div key={item.id} className="relative group">
              {/* Navigation Link */}
              <Link
                href={item.href}
                className={cn(
                  "relative uppercase py-2 px-4 font-medium z-10 transition-colors duration-300 truncate"
                )}
              >
                {item.label}
              </Link>
              <span
                className={cn(
                  "absolute inset-0 bg-white/10 transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 rounded",
                  "z-0",
                  activeNavLink(paths, item?.href, currentPath) && "scale-x-100"
                )}
              ></span>
            </div>
          ))}
        </div>
        {/* ======= logo ========== */}
        <div className="flex justify-center items-center flex-1 ">
          <Link href={"/"}>
            <Image src={logo} alt="logo" className="min-w-[150px]"></Image>
          </Link>
        </div>
        {/* ======= search and nav icon  ========== */}
        <div className="md:block hidden ">
          <SearchAndNavIcon></SearchAndNavIcon>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
