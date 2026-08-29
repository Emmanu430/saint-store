import type { Metadata } from "next";
import { Inter, UnifrakturCook } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const unifraktur = UnifrakturCook({
  variable: "--font-unifraktur",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAINT — The Motion Never Ends",
  description: "Faith. Grind. Purpose. Motion. Legacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${unifraktur.variable} antialiased`}>
        <Navbar />        
        {children}
        <Footer/>
      </body>
    </html>
  );
}