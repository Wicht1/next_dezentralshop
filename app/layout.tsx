import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Bellota_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const bellotaText = Bellota_Text({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-logo",
  display: "swap",
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
    <html lang={locale} className={`h-full ${inter.variable} ${bellotaText.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
