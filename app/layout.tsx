import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://purecart.example"),
  title: {
    default: "PureCart — Ready to Wear",
    template: "%s · PureCart",
  },
  description:
    "PureCart is a ready-to-wear label for women, men, and the home. Plain materials, considered cuts, nothing louder than it needs to be.",
  openGraph: {
    title: "PureCart — Ready to Wear",
    description: "Ready-to-wear for women, men, and the home.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="label focus:bg-ink focus:text-paper sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
