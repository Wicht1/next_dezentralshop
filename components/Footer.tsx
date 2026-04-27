import Link from "next/link";

const COLS = [
  {
    title: "Shop",
    items: [
      "Hardware Wallets",
      "Mining",
      "Literatur",
      "Accessoires",
      "Limitierte Editionen",
    ],
  },
  {
    title: "Service",
    items: ["Beratung buchen", "Versand & Retoure", "Garantie", "Support"],
  },
  {
    title: "Bitcoin",
    items: [
      "Zahlung in BTC",
      "Lightning",
      "10% Rabatt erklärt",
      "Knowledge Base",
    ],
  },
];

export default function Footer({ locale }: { locale: string }) {
  return (
    <div style={{ borderTop: "1px solid #e7e4df", background: "#fafafa" }} className="mt-24">
      <div className="max-w-[1280px] mx-auto px-8 py-16 grid grid-cols-12 gap-8">
        {/* Brand column */}
        <div className="col-span-4">
          <div className="flex items-center gap-2.5">
            <img src="/logo-original.svg" alt="" width={28} height={28} />
            <div
              className="tracking-tight"
              style={{
                fontSize: 22,
                color: "#f39320",
                fontFamily: "var(--font-logo)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ fontWeight: 700 }}>
                Dezentral
              </span>
              <span>shop.ch</span>
            </div>
          </div>
          <p
            className="mt-3 max-w-[280px]"
            style={{ fontSize: 13, color: "#373939", lineHeight: 1.6 }}
          >
            Schweizer Fachhandel für Bitcoin-Hardware, Mining und
            selbstsouveräne Aufbewahrung. Versand aus Zürich.
          </p>
          <div
            className="mt-6 font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}
          >
            Block · 889&rsquo;412&nbsp;&nbsp;·&nbsp;&nbsp;Halving − 412 Tage
          </div>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://github.com/Wicht1/next_dezentralshop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}
            >
              GitHub (Open Source)
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {COLS.map((col) => (
          <div key={col.title} className="col-span-2">
            <div
              className="font-mono uppercase mb-4"
              style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}
            >
              {col.title}
            </div>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item} style={{ fontSize: 13, color: "#0a0a0a" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="col-span-2">
          <div
            className="font-mono uppercase mb-4"
            style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}
          >
            Kontakt
          </div>
          <div style={{ fontSize: 13, color: "#0a0a0a", lineHeight: 1.7 }}>
            Zürich
            <br />
            <a href="mailto:hallo@dezentralshop.ch">hallo@dezentralshop.ch</a>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href={`/${locale}/status`}
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}
            >
              Status & Transparenz
            </Link>
            <Link
              href={`/${locale}/reserves`}
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}
            >
              Proof of Reserves
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid #e7e4df" }}
        className="max-w-[1280px] mx-auto px-8 h-14 flex items-center justify-between font-mono"
      >
        <span style={{ fontSize: 11, color: "#373939" }}>
          © 2026 Dezentralshop GmbH
        </span>
        <span style={{ fontSize: 11, color: "#373939" }}>
          Betrieben von Lex &amp; Jonathan
        </span>
      </div>
    </div>
  );
}
