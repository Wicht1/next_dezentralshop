import Link from "next/link";
import PriceBlock from "@/components/ui/PriceBlock";
import HouseBadge from "@/components/ui/HouseBadge";
import LimitedCounter from "@/components/ui/LimitedCounter";
import BtcDiscountChip from "@/components/ui/BtcDiscountChip";
import Pill from "@/components/ui/Pill";

const FEATURED = [
  { n: "Coldcard Mk4", c: "Hardware Wallet", p: 178, tags: ["Open Source"] },
  { n: "BitBox02 · Bitcoin-only", c: "Hardware Wallet", p: 139, tags: ["Open Source", "Swiss"] },
  { n: "Bitaxe Gamma 601", c: "Solo-Miner", p: 289, tags: ["DIY"] },
  { n: "Seedplate Steel", c: "Seed-Backup", p: 89, tags: ["Made"], house: true },
] as const;

const CATEGORIES = [
  { k: "01", t: "Hardware Wallets", n: "24 Produkte" },
  { k: "02", t: "Mining", n: "11 Produkte" },
  { k: "03", t: "Bücher", n: "38 Titel" },
  { k: "04", t: "Accessoires", n: "19 Produkte" },
  { k: "05", t: "Limitierte Editionen", n: "4 offen" },
];

function ImagePlaceholder({ label, ratio = "1/1", dark = false }: { label: string; ratio?: string; dark?: boolean }) {
  const bg = dark ? "#0a0a0a" : "#f4f2ee";
  const stripe = dark ? "#121212" : "#ece8e1";
  const fg = dark ? "#5a5a5a" : "#9c9689";
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        aspectRatio: ratio,
        background: `repeating-linear-gradient(135deg, ${bg} 0 14px, ${stripe} 14px 15px)`,
      }}
    >
      <div className="absolute inset-0 flex items-end justify-start p-3">
        <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", color: fg }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* HERO — full bleed, dark */}
      <section style={{ background: "#0a0a0a", color: "#fafafa", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 100%",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-8 relative" style={{ paddingTop: 28, paddingBottom: 0 }}>
          {/* Meta row */}
          <div
            className="flex items-center justify-between font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: "0.22em", color: "#7a7a7a", paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span>Ausgabe Nº 014 · 04 / 2026</span>
            <span className="flex items-center gap-6">
              <span>Block 889&apos;214</span>
              <span>·</span>
              <span>CHF/BTC 98&apos;042</span>
              <span>·</span>
              <span style={{ color: "#f39320" }}>● 10% mit BTC</span>
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8" style={{ paddingTop: 80, paddingBottom: 96 }}>
            <div className="col-span-7">
              <div className="font-mono uppercase mb-8" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#f39320" }}>
                ● Dezentralshop · Zürich
              </div>
              <h1
                className="tracking-tight"
                style={{ fontSize: "clamp(72px,10vw,132px)", lineHeight: 0.9, letterSpacing: "-0.035em", fontWeight: 500, color: "#fafafa" }}
              >
                Ready
                <br />for
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "#f39320" }}>Bitcoin.</em>
              </h1>
              <div className="mt-14 flex items-center gap-8">
                <Link
                  href={`/${locale}/shop`}
                  className="h-14 px-8 flex items-center gap-3"
                  style={{ background: "#f39320", color: "#0a0a0a", fontSize: 14, fontWeight: 500 }}
                >
                  Hardware Wallets
                  <span className="font-mono">→</span>
                </Link>
                <Link
                  href={`/${locale}/wissen`}
                  className="h-14 px-0 flex items-center gap-3"
                  style={{ background: "transparent", color: "#fafafa", fontSize: 14 }}
                >
                  <span
                    style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid #fafafa", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}
                  >
                    ▶
                  </span>
                  3 min · Warum Self-Custody
                </Link>
              </div>
            </div>

            <div className="col-span-5 flex flex-col justify-between">
              <div />
              <div>
                <ImagePlaceholder label="Hero still — Coldcard Mk4 auf Walnuss, side-lit" ratio="4/5" dark />
                <div className="mt-4 flex items-start justify-between font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#7a7a7a" }}>
                  <span>Fig. 01 — Coldcard Mk4</span>
                  <span>↗ ab CHF 178</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div
            className="grid grid-cols-4 gap-8 font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: "0.18em", color: "#9a9a9a", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, paddingBottom: 24 }}
          >
            <span>→ Versand aus Zürich</span>
            <span>→ Lightning & on-chain</span>
            <span>→ 2 Jahre Garantie</span>
            <span>→ Keine KYC, kein Tracking</span>
          </div>
        </div>
      </section>

      {/* INTRO editorial */}
      <section className="max-w-[1280px] mx-auto px-8 pt-16 pb-24">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-7">
            <div className="font-mono uppercase mb-6" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>
              Frühjahrskollektion · 2026 / I
            </div>
            <h2 className="tracking-tight" style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, color: "#0a0a0a" }}>
              Werkzeug für
              <br />Selbstsouveränität.
            </h2>
            <p className="mt-8 max-w-[480px]" style={{ fontSize: 16, lineHeight: 1.55, color: "#373939" }}>
              Kuratierte Hardware, ehrliche Beratung, Versand aus Zürich.
              Kein Hype, keine Altcoins — nur Bitcoin und die Werkzeuge, um ihn
              sicher aufzubewahren.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href={`/${locale}/shop`} className="h-12 px-6" style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 14, display: "inline-flex", alignItems: "center" }}>
                Zum Shop →
              </Link>
              <Link href={`/${locale}/beratung`} className="h-12" style={{ background: "transparent", color: "#0a0a0a", fontSize: 14, borderBottom: "1px solid #0a0a0a", display: "inline-flex", alignItems: "center" }}>
                Beratung buchen
              </Link>
            </div>
          </div>
          <div className="col-span-5">
            <ImagePlaceholder label="Hero shot — Coldcard Mk4 auf Walnuss" ratio="4/5" />
            <div className="mt-3 flex items-start justify-between">
              <div>
                <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Produkt der Woche</div>
                <div style={{ fontSize: 14, color: "#0a0a0a", marginTop: 2 }}>Coldcard Mk4 · Hardware Wallet</div>
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: "#373939" }}>↗ 01/12</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category rail */}
      <section style={{ borderTop: "1px solid #e7e4df", borderBottom: "1px solid #e7e4df" }}>
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.k}
              href={`/${locale}/shop`}
              className="py-8 px-5 flex flex-col gap-1"
              style={{ borderLeft: i === 0 ? "none" : "1px solid #e7e4df" }}
            >
              <span className="font-mono" style={{ fontSize: 10, color: "#373939", letterSpacing: "0.1em" }}>{c.k}</span>
              <span style={{ fontSize: 18, color: "#0a0a0a", marginTop: 4 }}>{c.t}</span>
              <span className="font-mono" style={{ fontSize: 11, color: "#373939", marginTop: 2 }}>{c.n}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BTC discount + trust row */}
      <section className="max-w-[1280px] mx-auto px-8 py-12 grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <BtcDiscountChip variant="banner" />
        </div>
        <div className="col-span-7 flex items-center justify-between" style={{ fontSize: 12, color: "#373939" }}>
          {["Versand aus Zürich", "Lightning & on-chain", "2 Jahre Garantie", "Persönliche Beratung"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="inline-block w-1 h-1" style={{ background: "#f39320" }} />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Featured product grid */}
      <section className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>Ausgewählt · April</div>
            <h2 className="tracking-tight mt-3" style={{ fontSize: 36, letterSpacing: "-0.02em", fontWeight: 500 }}>Hardware, die wir selbst benutzen.</h2>
          </div>
          <Link href={`/${locale}/shop`} className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0a0a0a" }}>
            Alle Produkte →
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {FEATURED.map((prod) => (
            <div key={prod.n} className="group">
              <div className="relative">
                <ImagePlaceholder label={prod.n} ratio="1/1" />
                {"house" in prod && prod.house && (
                  <div className="absolute top-3 left-3"><HouseBadge /></div>
                )}
              </div>
              <div className="mt-4">
                <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>{prod.c}</div>
                <div style={{ fontSize: 15, color: "#0a0a0a", marginTop: 6, fontWeight: 500 }}>{prod.n}</div>
                <div className="mt-3"><PriceBlock chf={prod.p} size="sm" btcSave /></div>
                <div className="mt-3 flex items-center gap-1.5">
                  {prod.tags.map((t) => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Limited edition spotlight */}
      <section style={{ background: "#0a0a0a", color: "#fafafa" }}>
        <div className="max-w-[1280px] mx-auto px-8 py-20 grid grid-cols-12 gap-8">
          <div className="col-span-5">
            <ImagePlaceholder label="Limited — Seedplate 21" ratio="1/1" dark />
          </div>
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#f39320" }}>Limitierte Edition · 21 Stück</div>
              <h3 className="tracking-tight mt-6" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500 }}>
                Seedplate 21
                <br />
                <span style={{ color: "#8a8a8a" }}>Handgefräst, Aargau.</span>
              </h3>
              <p className="mt-6 max-w-[520px]" style={{ fontSize: 15, lineHeight: 1.6, color: "#c4c4c4" }}>
                Titanium grade 5, CNC-gefräst bei einem Familienbetrieb im Aargau.
                Eingraviert mit Blockhöhe der Bestellung. Verschweisst und nummeriert.
              </p>
            </div>
            <div className="mt-10 flex items-end justify-between">
              <div>
                <PriceBlock chf={420} size="lg" />
                <div className="mt-4"><LimitedCounter left={7} total={21} /></div>
              </div>
              <button className="h-12 px-6" style={{ background: "#f39320", color: "#0a0a0a", fontSize: 14, fontWeight: 500 }}>
                Reservieren →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Wissen */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>Wissen</div>
            <h2 className="tracking-tight mt-4" style={{ fontSize: 36, letterSpacing: "-0.02em", fontWeight: 500 }}>
              Lesen, bevor
              <br />du kaufst.
            </h2>
            <p className="mt-4" style={{ fontSize: 14, color: "#373939", lineHeight: 1.6 }}>
              Wir schreiben keine Produkt-PR. Wir schreiben, was wir selbst
              wissen wollten, bevor wir Hardware gekauft haben.
            </p>
          </div>
          {[
            { k: "Guide", t: "Seed-Backup richtig gemacht", d: "12 min", n: "Nr. 014" },
            { k: "Review", t: "BitBox02 vs. Coldcard Mk4", d: "18 min", n: "Nr. 013" },
          ].map((a) => (
            <Link
              key={a.n}
              href={`/${locale}/wissen`}
              className="col-span-4 flex flex-col"
              style={{ borderTop: "1px solid #0a0a0a", paddingTop: 20 }}
            >
              <div className="flex items-center justify-between font-mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
                <span>{a.n}</span>
                <span>{a.k.toUpperCase()} · {a.d}</span>
              </div>
              <h4 className="tracking-tight mt-4" style={{ fontSize: 24, letterSpacing: "-0.015em", fontWeight: 500, lineHeight: 1.15 }}>
                {a.t}
              </h4>
              <div className="mt-6">
                <ImagePlaceholder label={a.t} ratio="3/2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-12 gap-8 items-center py-12 px-10" style={{ background: "#f4f2ee" }}>
          <div className="col-span-6">
            <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Newsletter · alle 4 Wochen</div>
            <h3 className="tracking-tight mt-3" style={{ fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>
              Neue Hardware, ehrliche Reviews.
            </h3>
          </div>
          <div className="col-span-6 flex">
            <input
              placeholder="du@beispiel.ch"
              className="flex-1 h-12 px-4 outline-none"
              style={{ background: "#fafafa", border: "1px solid #e7e4df", borderRight: "none", fontSize: 14, color: "#0a0a0a" }}
            />
            <button className="h-12 px-6" style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 13 }}>
              Abonnieren
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
