"use client";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/FramerMotionValiantsFadeUp";
import { Input } from "@/components/ui/input";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";

const SearchAndNavIcon = ({ color = "white" }: { color?: string }) => {
  const user: any = useAppSelector((state) => state.auth.user);
  const isLoggedIn = Cookies.get("aqua-access-token");
  // console.log("isLoggedIn", isLoggedIn);

  const { data: userData } = useGetUserProfileQuery(undefined, {
    skip: !isLoggedIn || !user,
  });
  // console.log("userData", userData?.data);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-10%" }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-10%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.ul
        variants={parentVariants}
        initial="initial"
        whileInView="animate"
        exit="exit"
        viewport={{ once: true }}
        className="flex lg:gap-x-4 gap-x-2 items-center justify-center  "
      >
        <motion.div variants={childrenVariants} className="relative">
          <Input
            className={`border-0 border-b  focus:outline-0 shadow-none rounded-none focus-visible:ring-0 placeholder:text-${color} min-w-[120px] `}
            placeholder="Search here....."
          ></Input>
          <div className="absolute  right-0 top-2">
            <Search size={20} color="#fff" />
          </div>
        </motion.div>
        <motion.li variants={childrenVariants}>
          <Link href={"/shopping/shopping-cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              className="hover:bg-white/20 rounded-full"
            >
              <g opacity="0.9">
                <mask
                  id="mask0_20125_1387"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                >
                  <rect x="0.5" y="0.5" width="24" height="24" fill="#fff" />
                </mask>
                <g mask="url(#mask0_20125_1387)">
                  <path
                    d="M11.5 9.5V6.5H8.5V4.5H11.5V1.5H13.5V4.5H16.5V6.5H13.5V9.5H11.5ZM7.5 22.5C6.95 22.5 6.47917 22.3042 6.0875 21.9125C5.69583 21.5208 5.5 21.05 5.5 20.5C5.5 19.95 5.69583 19.4792 6.0875 19.0875C6.47917 18.6958 6.95 18.5 7.5 18.5C8.05 18.5 8.52083 18.6958 8.9125 19.0875C9.30417 19.4792 9.5 19.95 9.5 20.5C9.5 21.05 9.30417 21.5208 8.9125 21.9125C8.52083 22.3042 8.05 22.5 7.5 22.5ZM17.5 22.5C16.95 22.5 16.4792 22.3042 16.0875 21.9125C15.6958 21.5208 15.5 21.05 15.5 20.5C15.5 19.95 15.6958 19.4792 16.0875 19.0875C16.4792 18.6958 16.95 18.5 17.5 18.5C18.05 18.5 18.5208 18.6958 18.9125 19.0875C19.3042 19.4792 19.5 19.95 19.5 20.5C19.5 21.05 19.3042 21.5208 18.9125 21.9125C18.5208 22.3042 18.05 22.5 17.5 22.5ZM1.5 4.5V2.5H4.775L9.025 11.5H16.025L19.925 4.5H22.2L17.8 12.45C17.6167 12.7833 17.3708 13.0417 17.0625 13.225C16.7542 13.4083 16.4167 13.5 16.05 13.5H8.6L7.5 15.5H19.5V17.5H7.5C6.75 17.5 6.17917 17.175 5.7875 16.525C5.39583 15.875 5.38333 15.2167 5.75 14.55L7.1 12.1L3.5 4.5H1.5Z"
                    fill={color}
                  />
                </g>
              </g>
            </svg>
          </Link>
        </motion.li>
        <motion.li variants={childrenVariants}>
          <Link href={"/notification"}>
            <Bell
              size={20}
              color={color}
              className="hover:bg-white/20 rounded-full"
            />
          </Link>
        </motion.li>
        <motion.li variants={childrenVariants}>
          <Link
            href={
              userData?.data && userData?.data?.role === "user"
                ? "/user/profile"
                : userData?.data?.role === "seller"
                ? "/seller/profile"
                : "/sign-in"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="21"
              viewBox="0 0 17 21"
              fill="none"
              className="hover:bg-white/20 rounded-full"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.48298 13.8462C4.61536 13.8462 1.3125 14.431 1.3125 16.7729C1.3125 19.1148 4.5944 19.7205 8.48298 19.7205C12.3506 19.7205 15.6525 19.1348 15.6525 16.7938C15.6525 14.4529 12.3715 13.8462 8.48298 13.8462Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.48294 10.5059C11.021 10.5059 13.0782 8.44779 13.0782 5.90969C13.0782 3.3716 11.021 1.31445 8.48294 1.31445C5.94484 1.31445 3.88675 3.3716 3.88675 5.90969C3.87817 8.43922 5.92198 10.4973 8.45056 10.5059H8.48294Z"
                stroke={color}
                strokeWidth="1.42857"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default SearchAndNavIcon;
