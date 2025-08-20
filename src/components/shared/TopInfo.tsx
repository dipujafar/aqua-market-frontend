"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { useAppSelector } from "@/redux/hooks";

const TopInfo = () => {
  const userInfo = useAppSelector((state) => state.auth.user);
  const isUserLoggedIn = userInfo !== null;
  

  const quickLink = isUserLoggedIn
    ? [
        { label: "LOGIN", href: "/sign-in" },
        { label: "CONTACT US", href: "/contact-us" },
      ]
    : [
        { label: "Sign In", href: "/sign-in" },
        { label: "Sign Up", href: "/sign-up" },
        { label: "CONTACT US", href: "/contact-us" },
      ];

  return (
    <header className="bg-linear-to-r from-[#533E69] to-[#3D4B68] text-white py-1">
      <Container className="flex md:justify-between justify-center items-center text-sm ">
        <p className="text-lg ">
          <span className="text-gradiant">Hello!!</span> Welcome to AquaMarket.
        </p>

        <div className="xl:space-x-4 space-x-2 hidden   md:flex">
          {quickLink.map((link, index) =>
            link?.label === "Sign Up" ? (
              <Link
                key={`${index + 1}`}
                href={link.href}
                className={cn(
                  "uppercase text-gradiant flex gap-x-1 items-center"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 21"
                  fill="none"
                >
                  <path
                    d="M13.4444 9.63477H2.55556C1.69645 9.63477 1 10.4086 1 11.3632V17.4125C1 18.3671 1.69645 19.1409 2.55556 19.1409H13.4444C14.3036 19.1409 15 18.3671 15 17.4125V11.3632C15 10.4086 14.3036 9.63477 13.4444 9.63477Z"
                    stroke="url(#paint0_linear_20183_1944)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.10938 9.6352V6.17841C4.10938 5.03241 4.5191 3.93335 5.2484 3.12301C5.97771 2.31267 6.96687 1.85742 7.99826 1.85742C9.02966 1.85742 10.0188 2.31267 10.7481 3.12301C11.4774 3.93335 11.8872 5.03241 11.8872 6.17841V9.6352"
                    stroke="url(#paint1_linear_20183_1944)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_20183_1944"
                      x1="8"
                      y1="9.63477"
                      x2="8"
                      y2="17.7225"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#4DA8DA" />
                      <stop offset="1" stopColor="#78C0A8" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_20183_1944"
                      x1="7.99826"
                      y1="1.85742"
                      x2="7.99826"
                      y2="8.47464"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#4DA8DA" />
                      <stop offset="1" stopColor="#78C0A8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span> {link.label}</span>
              </Link>
            ) : (
              <Link
                key={`${index + 1}`}
                href={link.href}
                className={cn("uppercase")}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </Container>
    </header>
  );
};

export default TopInfo;
