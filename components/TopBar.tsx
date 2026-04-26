import Link from "next/link";
import NavItems from "./NavItems";

export default function TopBar({ locale }: { locale: string }) {
  return (
    <div
      className="sticky top-0 z-20"
      style={{ borderBottom: "1px solid #e7e4df", background: "#fafafa" }}
    >
      {/* Announcement strip */}
      <div style={{ background: "#0a0a0a", color: "#fafafa" }}>
        <div className="max-w-[1280px] mx-auto px-8 h-8 flex items-center justify-between font-mono text-[11px] tracking-wide">
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5"
              style={{ background: "#f39320" }}
            />
            VERSAND AB CHF 150 GRATIS · SELBSTABHOLUNG ZÜRICH
          </span>
          <span className="opacity-70">
            1 BTC ={" "}
            <span style={{ color: "#f39320" }}>CHF 98&rsquo;042</span>
            <span className="mx-2 opacity-40">·</span>
            BLOCK 889&rsquo;412
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <img
              src="/logo.svg"
              alt="Dezentralshop"
              width={34}
              height={34}
            />
            <div className="leading-none">
              <div
                className="tracking-tight"
                style={{
                  fontSize: 22,
                  color: "#0a0a0a",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-logo)",
                  fontWeight: 400,
                }}
              >
                <span style={{ fontStyle: "italic", fontWeight: 700 }}>
                  Dezentral
                </span>
                <span>shop</span>
              </div>
              <div
                className="font-mono uppercase mt-0.5"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#373939",
                }}
              >
                Schweiz · seit 2021
              </div>
            </div>
          </Link>

          <NavItems locale={locale} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            href={`/${locale}/suche`}
            className="w-10 h-10 flex items-center justify-center"
            style={{ color: "#0a0a0a" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <div
            style={{ width: 1, height: 20, background: "#e7e4df" }}
            className="mx-2"
          />
          <Link
            href={`/${locale}/warenkorb`}
            className="flex items-center gap-2 h-10 px-3"
            style={{ fontSize: 13, color: "#0a0a0a" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="font-mono tabular-nums">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
