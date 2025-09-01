"use client";

import { Bell, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/FramerMotionValiantsFadeUp";
import { useAppSelector } from "@/redux/hooks";
import NavSearch from "./NavSearch";
import { useGetMyNotificationsQuery } from "@/redux/api/userApi";
import { useEffect, useState } from "react";
import { UINotification } from "@/types/notification.type";

const SearchAndNavIcon = ({ color = "white" }: { color?: string }) => {
  const [limit, setLimit] = useState<number>(999);
  const user: any = useAppSelector((state) => state.auth.user);
  const cartData = useAppSelector((state) => state.cart);
  const { data: myNotifications } = useGetMyNotificationsQuery({ limit });

  useEffect(() => {
    if (
      myNotifications?.data?.meta?.total &&
      myNotifications?.data?.meta?.total > limit
    ) {
      setLimit(myNotifications.data.meta.total);
    }
  }, [myNotifications, limit]);

  const newNotifications = myNotifications?.data?.data?.filter(
    (notification: UINotification) => !notification.isRead
  );

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
          <NavSearch color={color} />
        </motion.div>

        {user?.role === "user" && (
          <motion.li variants={childrenVariants} className="relative">
            <Link
              href={`${
                cartData?.totalQuantity > 0
                  ? "/shopping/shopping-cart"
                  : "/shop"
              }`}
            >
              <ShoppingCart size={20} color={color} />
              {cartData?.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  {cartData.totalQuantity}
                </span>
              )}
            </Link>
          </motion.li>
        )}

        {(user?.role === "user" || user?.role === "seller") && (
          <motion.li variants={childrenVariants} className="relative">
            <Link href="/notification" className="relative">
              <Bell
                size={20}
                color={color}
                className="hover:bg-white/20 rounded-full"
              />
              {newNotifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  {newNotifications?.length || 0}
                </span>
              )}
            </Link>
          </motion.li>
        )}

        <motion.li variants={childrenVariants}>
          <Link
            href={
              user && user.role === "user"
                ? "/user/profile"
                : user && user.role === "seller"
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
