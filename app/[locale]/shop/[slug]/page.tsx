import Pill from "@/components/ui/Pill";
import PriceBlock from "@/components/ui/PriceBlock";
import Link from "next/link";

function ImagePlaceholder({ label, ratio = "1/1", dark = false }: { label: string; ratio?: string; dark?: boolean }) {
  const bg = dark ? "#0a0a0a" : "#f4f2ee";
  const stripe = dark ? "#121212" : "#ece8e1";
  const fg = dark ? "#5a5a5a" : "#9c9689";
  return (
    <div className="relative overflow-hidden w-full" style={{ aspectRatio: ratio, background: `repeating-linear-gradient(135deg, ${bg} 0 14px, ${stripe} 14px 15px)` }}>
      <div className="absolute inset-0 flex items-end justify-start p-3">
        <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", color: fg }}>{label}</span>
      </div>
    </div>
  );
}

const TABS = ["Beschreibung", "Technisch", "Lieferumfang", "Video & Setup", "Rezensionen", "Versand"];

const FEATURES = [
  { k: "01", t: "Air-gapped signieren", d: "PSBTs per microSD oder NFC. Der private Key verlässt das Gerät nie." },
  { k: "02", t: "Zwei Secure Elements", d: "Zwei unabhängige Chips (508A + 608A), kombiniert gegen Supply-Chain-Angriffe." },
  { k: "03", t: "Duress-PIN", d: "Zweite PIN zeigt eine leere Wallet — falls du gezwungen wirst." },
  { k: "04", t: "Reproduzierbare Builds", d: "Firmware prüft sich selbst. Du musst nicht vertrauen — du kannst verifizieren." },
];

const SPECS = [
  ["Chip", "Dual Secure Element"],
  ["Schnittstellen", "USB-C, NFC, microSD"],
  ["Display", "128×64 OLED"],
  ["Firmware", "Bitcoin-only, v5.4.2"],
  ["PSBT", "BIP-174"],
  ["Masse", "94 × 51 × 10 mm"],
  ["Gewicht", "31 g"],
  ["Hergestellt", "Kanada"],
];

const ARTICLES = [
  { n: "Nr. 014", t: "Seed-Backup richtig gemacht", m: "Guide · 12 min" },
  { n: "Nr. 013", t: "BitBox02 vs. Coldcard Mk4 — direkter Vergleich", m: "Review · 18 min" },
  { n: "Nr. 009", t: "Multisig mit Sparrow + Coldcard einrichten", m: "Tutorial · 22 min" },
];

export default async function ProduktPage(props: PageProps<"/[locale]/shop/[slug]">) {
  const { locale, slug } = await props.params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb */}
      <section className="max-w-[1280px] mx-auto px-8 pt-8 pb-4">
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          <Link href={`/${locale}/shop`}>Shop</Link>
          <span className="mx-2">/</span>
          Hardware Wallets
          <span className="mx-2">/</span>
          <span style={{ color: "#0a0a0a" }}>{name}</span>
        </div>
      </section>

      {/* Hero — gallery + buy panel */}
      <section className="max-w-[1280px] mx-auto px-8 pt-4 pb-20 grid grid-cols-12 gap-10">
        {/* Gallery */}
        <div className="col-span-7">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2 flex flex-col gap-3">
              {["Front", "Back", "Verpackt", "Detail", "Bundle"].map((t, i) => (
                <div key={t} style={{ border: i === 0 ? "1px solid #0a0a0a" : "1px solid transparent", padding: 2 }}>
                  <ImagePlaceholder label={t} ratio="1/1" />
                </div>
              ))}
            </div>
            <div className="col-span-10 relative">
              <ImagePlaceholder label={`${name} — Hero`} ratio="1/1" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Pill variant="solid">Open Source</Pill>
                <Pill>Air-gapped</Pill>
              </div>
              <button className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center" style={{ background: "#fafafa", border: "1px solid #e7e4df" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Buy panel */}
        <div className="col-span-5">
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Coinkite · Kanada</div>
          <h1 className="tracking-tight mt-3" style={{ fontSize: 44, letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.02 }}>
            {name}
          </h1>
          <p className="mt-3" style={{ fontSize: 15, color: "#373939", lineHeight: 1.5 }}>
            Air-gapped Hardware Wallet. Bitcoin-only Firmware. Secure-Element und NFC für PSBT.
          </p>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6 0l1.8 3.8L12 4.6l-3 3 .8 4.2L6 9.8 2.2 11.8 3 7.6 0 4.6l4.2-.8z" fill={i <= 4 ? "#0a0a0a" : "#e7e4df"} />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#373939" }}>4.8 · 142 Bewertungen</span>
          </div>

          <div className="mt-6 py-5" style={{ borderTop: "1px solid #e7e4df", borderBottom: "1px solid #e7e4df" }}>
            <PriceBlock chf={178} size="lg" btcSave btcSaveStyle="detail" />
          </div>

          {/* Variants */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>Edition</div>
              <span style={{ fontSize: 12, color: "#373939" }}>Classic gewählt</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ n: "Classic", sub: "Standard", active: true }, { n: "Q", sub: "Tastatur", active: false }, { n: "Bundle", sub: "+ Seedplate", active: false }].map((v) => (
                <button key={v.n} className="py-3 px-3 text-left" style={{ border: `1px solid ${v.active ? "#0a0a0a" : "#e7e4df"}`, background: v.active ? "#0a0a0a" : "transparent", color: v.active ? "#fafafa" : "#0a0a0a" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{v.n}</div>
                  <div className="font-mono mt-1" style={{ fontSize: 10, opacity: 0.7, letterSpacing: "0.06em" }}>{v.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-6">
            <div className="font-mono uppercase mb-3" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>Gehäuse</div>
            <div className="flex gap-2">
              {[{ n: "Transparent", c: "#e4e0d9" }, { n: "Schwarz", c: "#0a0a0a" }, { n: "Orange", c: "#f39320" }].map((c, i) => (
                <button key={c.n} className="flex items-center gap-2 pr-3" style={{ border: `1px solid ${i === 0 ? "#0a0a0a" : "#e7e4df"}`, padding: 3, paddingRight: 10 }}>
                  <span className="inline-block w-7 h-7" style={{ background: c.c, border: i === 1 ? "none" : "1px solid #e7e4df" }} />
                  <span style={{ fontSize: 12, color: "#0a0a0a" }}>{c.n}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mt-6 flex items-center gap-2" style={{ fontSize: 13, color: "#0a0a0a" }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#2a9d5a" }} />
            <span>Auf Lager · versandfertig heute</span>
            <span style={{ color: "#373939", marginLeft: 4 }}>· bis 16:00 bestellt, morgen da</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 grid grid-cols-5 gap-3">
            <button className="col-span-3 h-14 flex items-center justify-center gap-2" style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 14, fontWeight: 500 }}>
              In den Warenkorb
              <span className="font-mono" style={{ opacity: 0.6 }}>· CHF 178.00</span>
            </button>
            <Link href={`/${locale}/beratung`} className="col-span-2 h-14 flex items-center justify-center gap-2" style={{ background: "transparent", color: "#0a0a0a", border: "1px solid #0a0a0a", fontSize: 14 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
              </svg>
              Beratung buchen
            </Link>
          </div>
          <div className="mt-3 font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.04em" }}>
            30 Min. Video-Call · gratis · auf Deutsch oder Englisch
          </div>

          {/* Trust strip */}
          <div className="mt-6 grid grid-cols-3 gap-4 py-4" style={{ borderTop: "1px solid #e7e4df", borderBottom: "1px solid #e7e4df" }}>
            {[{ t: "Versand CH", s: "ab CHF 8.50" }, { t: "Siegelprüfung", s: "Tamper-Evident" }, { t: "Garantie", s: "2 Jahre" }].map((x) => (
              <div key={x.t}>
                <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>{x.t}</div>
                <div style={{ fontSize: 12, color: "#0a0a0a", marginTop: 4 }}>{x.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab nav */}
      <section style={{ borderTop: "1px solid #e7e4df", borderBottom: "1px solid #e7e4df", background: "#fafafa" }} className="sticky top-[112px] z-10">
        <div className="max-w-[1280px] mx-auto px-8 flex items-center gap-8 h-14 overflow-x-auto">
          {TABS.map((t, i) => (
            <a key={t} className="font-mono uppercase whitespace-nowrap" style={{ fontSize: 11, letterSpacing: "0.14em", color: i === 0 ? "#0a0a0a" : "#373939", fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? "2px solid #f39320" : "none", paddingBottom: 18, paddingTop: 18 }}>
              {t}
            </a>
          ))}
        </div>
      </section>

      {/* Long-form content */}
      <section className="max-w-[1280px] mx-auto px-8 py-20 grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>§1 · Kurz gesagt</div>
          <p className="mt-5" style={{ fontSize: 22, lineHeight: 1.45, color: "#0a0a0a", letterSpacing: "-0.005em" }}>
            Der {name} ist für uns der Standard, wenn es um sichere Bitcoin-Aufbewahrung im
            Alltag geht. Air-gapped, open-source, Bitcoin-only — und verstanden vom Käufer, nicht nur vom Hersteller.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-8">
            {FEATURES.map((f) => (
              <div key={f.k} style={{ borderTop: "1px solid #0a0a0a", paddingTop: 18 }}>
                <div className="font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.14em" }}>{f.k}</div>
                <div className="mt-3 tracking-tight" style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em" }}>{f.t}</div>
                <p className="mt-2" style={{ fontSize: 14, color: "#373939", lineHeight: 1.6 }}>{f.d}</p>
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="mt-20">
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>§2 · Setup-Video</div>
            <h3 className="tracking-tight mt-4" style={{ fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>Einrichtung in 14 Minuten.</h3>
            <div className="mt-6 relative">
              <div className="relative overflow-hidden w-full" style={{ aspectRatio: "16/9", background: "repeating-linear-gradient(135deg, #0a0a0a 0 14px, #121212 14px 15px)" }}>
                <div className="absolute bottom-3 left-4 font-mono" style={{ fontSize: 11, color: "#fafafa" }}>14:02 · Deutsch · by Dezentralshop</div>
              </div>
              <button className="absolute inset-0 m-auto flex items-center justify-center" style={{ width: 64, height: 64, background: "#fafafa" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a0a0a"><path d="M4 2l12 7-12 7z" /></svg>
              </button>
            </div>
          </div>

          {/* Further reading */}
          <div className="mt-20">
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>§3 · Weiterlesen</div>
            <div className="mt-6" style={{ borderTop: "1px solid #e7e4df", borderBottom: "1px solid #e7e4df" }}>
              {ARTICLES.map((a) => (
                <Link key={a.n} href={`/${locale}/wissen`} className="flex items-center justify-between py-5" style={{ borderTop: "1px solid #e7e4df" }}>
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.1em" }}>{a.n}</span>
                    <span style={{ fontSize: 18, color: "#0a0a0a", fontWeight: 500, letterSpacing: "-0.01em" }}>{a.t}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-mono" style={{ fontSize: 11, color: "#373939" }}>{a.m}</span>
                    <span style={{ fontSize: 16, color: "#0a0a0a" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Spec sheet */}
        <aside className="col-span-4">
          <div className="p-6" style={{ background: "#f4f2ee" }}>
            <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Datenblatt</div>
            <div className="tracking-tight mt-2" style={{ fontSize: 22, letterSpacing: "-0.015em", fontWeight: 500 }}>Technisches.</div>
            <div className="mt-5">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between py-2.5" style={{ borderBottom: "1px solid #e7e4df" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "#0a0a0a" }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4" style={{ border: "1px solid #0a0a0a", background: "#fafafa" }}>
              <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Bundle-Empfehlung</div>
              <div style={{ fontSize: 14, color: "#0a0a0a", marginTop: 6, lineHeight: 1.4 }}>
                + Seedplate Steel<br />
                <span style={{ color: "#373939" }}>Stainless seed backup</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-semibold tabular-nums" style={{ fontSize: 16 }}>+ CHF 79.00</span>
                <span className="font-mono" style={{ fontSize: 10, color: "#373939", textDecoration: "line-through" }}>CHF 89.00</span>
              </div>
              <button className="mt-3 w-full h-10" style={{ background: "transparent", border: "1px solid #0a0a0a", fontSize: 13, color: "#0a0a0a" }}>
                Zum Bundle hinzufügen
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
