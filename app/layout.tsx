import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

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
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await headers()).get("x-locale") ?? "de";
  return (
    <html lang={locale} className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
