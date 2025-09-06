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

// Fonts
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

// ✅ SEO Friendly Metadata
export const metadata: Metadata = {
  title: {
    default: "Shrimp Exchange",
    template: "%s | Shrimp Exchange",
  },
  description:
    "Shrimp Exchange is the official marketplace for premium shrimp trading. Buy, sell, and explore shrimp products globally.",
  keywords: [
    "Shrimp Exchange",
    "Shrimp Trading",
    "Seafood Marketplace",
    "Buy Shrimp Online",
    "Shrimp Export",
    "Shrimp Business",
  ],
  authors: [{ name: "Shrimp Exchange Team", url: "https://shrimpswap.com" }],
  creator: "Shrimp Exchange",
  publisher: "Shrimp Exchange",

  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Shrimp Exchange - Global Shrimp Marketplace",
    description:
      "Join Shrimp Exchange, the world's trusted shrimp trading platform. Connect with buyers & sellers globally.",
    url: "https://shrimpswap.com",
    siteName: "Shrimp Exchange",
    images: [
      {
        url: "https://shrimpswap.com/og-image.jpg", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Shrimp Exchange",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Shrimp Exchange - Global Shrimp Marketplace",
    description:
      "Buy, sell & explore shrimp products worldwide with Shrimp Exchange.",
    images: ["https://shrimpswap.com/og-image.jpg"], // replace with your image
    creator: "@shrimpexchange", // your Twitter handle
  },

  // Robots / SEO Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://shrimpswap.com",
  },

  // Icons / Favicon
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${figtree.className} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        <Providers>
          <TopInfo />
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <div className="min-h-[calc(100vh-140px)] bg-linear-to-r from-[#2E1345] to-[#0A2943] text-white">
            {children}
          </div>
          <div className="lg:py-6 py-5 bg-linear-to-r from-[#533E69] to-[#3D4B68] text-white">
            <Footer />
          </div>
          <Toaster position="top-right" richColors duration={3000} />
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
