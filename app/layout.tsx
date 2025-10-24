import type { Metadata } from "next";
import { Syne, Chakra_Petch } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne"
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Aurora Stadium",
  description: "Immersive concept design for a next-generation football stadium filled with light and sound."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${chakra.variable}`}>
      <body>{children}</body>
    </html>
  );
}
