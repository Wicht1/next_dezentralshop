"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Shop", segment: "shop" },
  { label: "Wissen", segment: "wissen" },
  { label: "Beratung", segment: "beratung" },
  { label: "Über uns", segment: "ueber-uns" },
];

export default function NavItems({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-7">
      {NAV.map((item) => {
        const href = `/${locale}/${item.segment}`;
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={item.label}
            href={href}
            className="relative py-1"
            style={{
              fontSize: 14,
              color: isActive ? "#0a0a0a" : "#373939",
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {item.label}
            {isActive && (
              <span
                className="absolute -bottom-[29px] left-0 right-0 h-[2px]"
                style={{ background: "#0a0a0a" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
