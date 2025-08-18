import type { Metadata } from "next";
import { Figtree, Montserrat, Playfair } from "next/font/google";
import "./globals.css";
import TopInfo from "@/components/shared/TopInfo";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import "react-pagination-bar/dist/index.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/provider/ReduxProvider";

const figtree = Figtree({
  display: "swap",
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const playfair = Playfair({
  display: "swap",
  variable: "--font-playfair",
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
      <body
        className={`${figtree.className} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <TopInfo></TopInfo>
          <div className="sticky top-0 z-50 ">
            <Navbar></Navbar>
          </div>
          <div className="min-h-[calc(100vh-140px)]  bg-linear-to-r from-[#2E1345] to-[#0A2943] text-white ">
            {children}
          </div>
          <div className=" lg:py-6 py-5 bg-linear-to-r from-[#533E69] to-[#3D4B68] text-white ">
            <Footer></Footer>
          </div>
          <Toaster position="top-right" richColors duration={3000}  />
          <NextTopLoader
            color="#1EC1E2"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #232323,0 0 5px #EA5326"
            zIndex={1600}
            showAtBottom={false}
          />
        </Providers>
      </body>
    </html>
  );
}
