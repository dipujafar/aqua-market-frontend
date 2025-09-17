import { cn } from "@/lib/utils";
import Link from "next/link";

const quickLink = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Fresh Water Shop",
    href: "/shop",
  },
  {
    id: 3,
    label: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    id: 4,
    label: "Terms of use",
    href: "/terms-use",
  },
  {
    id: 5,
    label: "about us",
    href: "/about-us",
  },
  {
    id: 6,
    label: "contact us",
    href: "/contact-us",
  },
];

const QuickLinks = () => {
  const isYear = new Date().getFullYear();

  return (
    <div className="py-2 border-t border-t-white/80 w-full xl:mt-10 md:mt-6 mt-3 flex flex-col lg:flex-row justify-between text-primary-black/70 text-sm gap-y-1 md:items-center">
      <p>Copyright © {isYear} Shrimp Swap. All rights reserved.</p>
      <div className="md:flex grid grid-cols-2 md:gap-x-4 gap-x-2 gap-y-1">
        {quickLink.map((link) => (
          <div
            key={link.id}
            className="relative group hover:border-y duration-300 transition-all"
          >
            <Link href={link.href} className="uppercase font-medium truncate">
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
