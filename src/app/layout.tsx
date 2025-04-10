import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import TopInfo from "@/components/shared/TopInfo";
import Navbar from "@/components/shared/Navbar/Navbar";

const figtree = Figtree({
  display: "swap",
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AquaMarket",
    template: "%s | AquaMarket",
  },
  description: "The official website of AquaMarket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className}  antialiased`}>
        <TopInfo></TopInfo>
        <div className="sticky top-0 z-50 ">
          <Navbar></Navbar>
        </div>
        {children}
      </body>
    </html>
  );
}
