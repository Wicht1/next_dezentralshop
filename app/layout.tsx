import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dezentralshop – Bitcoin Produkte aus der Schweiz",
  description:
    "Hardware Wallets, Mining, Bücher & mehr. 10% Rabatt bei Zahlung mit Bitcoin.",
  openGraph: {
    title: "Dezentralshop – Bitcoin Produkte aus der Schweiz",
    description:
      "Hardware Wallets, Mining, Bücher & mehr. 10% Rabatt bei Zahlung mit Bitcoin.",
    url: "https://dezentralshop.ch",
    siteName: "Dezentralshop",
    locale: "de_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
