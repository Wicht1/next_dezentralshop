import Pill from "@/components/ui/Pill";
import PriceBlock from "@/components/ui/PriceBlock";
import HouseBadge from "@/components/ui/HouseBadge";
import LimitedCounter from "@/components/ui/LimitedCounter";
import Link from "next/link";

const PRODUCTS = [
  { n: "Coldcard Mk4", c: "Hardware Wallet", p: 178, tags: ["Open Source", "Air-gapped"], stock: "Lager" as const },
  { n: "BitBox02 Bitcoin-only", c: "Hardware Wallet", p: 139, tags: ["Open Source", "Swiss Made"], stock: "Lager" as const },
  { n: "Trezor Safe 5", c: "Hardware Wallet", p: 219, tags: ["Open Source", "Touchscreen"], stock: "Lager" as const },
  { n: "Jade Plus", c: "Hardware Wallet", p: 149, tags: ["Open Source"], stock: "Lager" as const },
  { n: "Bitaxe Gamma 601", c: "Solo-Miner", p: 289, tags: ["DIY", "Open Source"], stock: "Lager" as const },
  { n: "Seedplate Steel", c: "Seed-Backup", p: 89, tags: ["Stainless"], stock: "Lager" as const, house: true },
  { n: "Seedplate 21 · Edition", c: "Seed-Backup", p: 420, tags: ["Titanium", "Limitiert"], stock: "limited" as const, left: 7, total: 21, house: true },
  { n: "Passport Batch 2", c: "Hardware Wallet", p: 299, tags: ["Open Source", "Air-gapped"], stock: "Lager" as const },
  { n: "Blockstream Jade", c: "Hardware Wallet", p: 69, tags: ["Open Source"], stock: "2-3 Wochen" as const },
];

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

function CB({ label, n, checked }: { label: string; n: number; checked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
      <span
        className="inline-block shrink-0"
        style={{ width: 14, height: 14, border: `1px solid ${checked ? "#0a0a0a" : "#e7e4df"}`, background: checked ? "#0a0a0a" : "transparent", position: "relative" }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ position: "absolute", top: 1, left: 1 }}>
            <path d="M1 5l3 3 5-6" stroke="#f39320" strokeWidth="1.5" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 13, color: "#0a0a0a", flex: 1 }}>{label}</span>
      <span className="font-mono" style={{ fontSize: 11, color: "#373939" }}>{n}</span>
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid #e7e4df" }} className="py-5">
      <div className="font-mono uppercase mb-4" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default async function ShopPage(props: PageProps<"/[locale]/shop">) {
  const { locale } = await props.params;

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb + title */}
      <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-8">
        <div className="font-mono uppercase mb-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          Shop <span className="mx-2">/</span> Hardware Wallets
        </div>
        <div className="flex items-end justify-between">
          <h1 className="tracking-tight" style={{ fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1 }}>
            Hardware Wallets.
          </h1>
          <div className="font-mono" style={{ fontSize: 12, color: "#373939" }}>{PRODUCTS.length} Produkte</div>
        </div>
        <p className="mt-5 max-w-[620px]" style={{ fontSize: 15, color: "#373939", lineHeight: 1.6 }}>
          Wir führen nur Hardware Wallets, deren Firmware wir selbst geprüft haben.
          Alle Geräte sind Open-Source oder teil-offen und werden mit versiegelter Verpackung versandt.
        </p>
      </section>

      {/* Body */}
      <section className="max-w-[1280px] mx-auto px-8 grid grid-cols-12 gap-8 pb-24">
        {/* Filters */}
        <aside className="col-span-3">
          <div className="sticky top-32">
            <div className="flex items-center justify-between pb-4">
              <div className="font-semibold tracking-tight" style={{ fontSize: 15 }}>Filter</div>
              <button className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
                Alle zurücksetzen
              </button>
            </div>

            <FilterGroup title="Kategorie">
              <CB label="Hardware Wallets" n={24} checked />
              <CB label="Mining" n={11} />
              <CB label="Bücher" n={38} />
              <CB label="Accessoires" n={19} />
              <CB label="Seed-Backup" n={8} />
            </FilterGroup>

            <FilterGroup title="Preis">
              <div className="flex gap-2 mb-3">
                <div className="flex-1 h-9 flex items-center px-2.5" style={{ border: "1px solid #e7e4df", fontSize: 13 }}>
                  <span style={{ color: "#373939" }}>CHF</span>
                  <span className="ml-2 font-mono tabular-nums">0</span>
                </div>
                <div className="flex-1 h-9 flex items-center px-2.5" style={{ border: "1px solid #e7e4df", fontSize: 13 }}>
                  <span style={{ color: "#373939" }}>CHF</span>
                  <span className="ml-2 font-mono tabular-nums">500</span>
                </div>
              </div>
              <div className="relative h-6 flex items-center">
                <div style={{ height: 2, background: "#e7e4df", position: "absolute", left: 0, right: 0 }} />
                <div style={{ height: 2, background: "#0a0a0a", position: "absolute", left: "10%", right: "30%" }} />
                <div style={{ width: 12, height: 12, background: "#fafafa", border: "1px solid #0a0a0a", position: "absolute", left: "10%", transform: "translateX(-50%)" }} />
                <div style={{ width: 12, height: 12, background: "#fafafa", border: "1px solid #0a0a0a", position: "absolute", right: "30%", transform: "translateX(50%)" }} />
              </div>
            </FilterGroup>

            <FilterGroup title="Eigenschaften">
              <CB label="Open Source" n={18} checked />
              <CB label="Air-gapped" n={6} />
              <CB label="Bitcoin-only" n={9} />
              <CB label="Touchscreen" n={4} />
              <CB label="PSBT" n={12} />
              <CB label="Multisig" n={14} />
            </FilterGroup>

            <FilterGroup title="Hersteller">
              <CB label="Coldcard" n={4} />
              <CB label="BitBox (CH)" n={6} />
              <CB label="Trezor" n={5} />
              <CB label="Foundation" n={3} />
              <CB label="Blockstream" n={2} />
            </FilterGroup>

            <FilterGroup title="Verfügbarkeit">
              <CB label="Ab Lager Zürich" n={17} />
              <CB label="Limitierte Editionen" n={4} />
            </FilterGroup>

            <div className="mt-6 p-4" style={{ background: "#f4f2ee" }}>
              <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Unsicher?</div>
              <div style={{ fontSize: 14, color: "#0a0a0a", marginTop: 6, lineHeight: 1.4 }}>30 Minuten mit einem Techniker, gratis.</div>
              <Link href={`/${locale}/beratung`} className="mt-4 h-10 w-full flex items-center px-3" style={{ border: "1px solid #0a0a0a", background: "transparent", fontSize: 13, color: "#0a0a0a" }}>
                Beratung buchen →
              </Link>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="col-span-9">
          {/* Toolbar */}
          <div className="flex items-center justify-between pb-5" style={{ borderBottom: "1px solid #0a0a0a" }}>
            <div className="flex items-center gap-2">
              {["Open Source", "Air-gapped", "Hardware Wallet"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", background: "#0a0a0a", color: "#fafafa", padding: "5px 9px" }}>
                  {t} <span style={{ opacity: 0.6 }}>×</span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <select className="font-mono bg-transparent" style={{ fontSize: 12, color: "#0a0a0a", border: "none", outline: "none" }}>
                <option>Relevanz</option>
                <option>Preis aufsteigend</option>
                <option>Preis absteigend</option>
                <option>Neu</option>
              </select>
            </div>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-12 pt-8">
            {PRODUCTS.map((p) => (
              <Link key={p.n} href={`/${locale}/shop/${p.n.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="relative">
                  <ImagePlaceholder label={p.n} ratio="1/1" />
                  {p.house && <div className="absolute top-3 left-3"><HouseBadge /></div>}
                  {p.stock === "limited" && (
                    <div className="absolute top-3 right-3">
                      <Pill variant="solid">Limited · {p.left}/{p.total}</Pill>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>{p.c}</div>
                    <div style={{ fontSize: 15, color: "#0a0a0a", marginTop: 4, fontWeight: 500 }}>{p.n}</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono uppercase shrink-0" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939", marginTop: 2, borderBottom: "1px solid #f39320" }}>
                    <span style={{ color: "#f39320", fontWeight: 700 }}>BTC</span>
                    <span>−10%</span>
                  </span>
                </div>
                <div className="mt-3"><PriceBlock chf={p.p} size="sm" /></div>
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {p.tags.map((tg) => <Pill key={tg}>{tg}</Pill>)}
                </div>
                {p.stock === "limited" && (
                  <div className="mt-3"><LimitedCounter left={p.left} total={p.total} /></div>
                )}
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-between" style={{ borderTop: "1px solid #e7e4df", paddingTop: 20 }}>
            <span className="font-mono" style={{ fontSize: 12, color: "#373939" }}>Seite 01 / 03</span>
            <div className="flex items-center gap-2">
              {["01", "02", "03"].map((n, i) => (
                <button key={n} className="w-9 h-9 font-mono tabular-nums" style={{ border: `1px solid ${i === 0 ? "#0a0a0a" : "#e7e4df"}`, background: i === 0 ? "#0a0a0a" : "transparent", color: i === 0 ? "#fafafa" : "#0a0a0a", fontSize: 12 }}>
                  {n}
                </button>
              ))}
              <button className="h-9 px-4 font-mono" style={{ border: "1px solid #e7e4df", fontSize: 12, color: "#0a0a0a" }}>Weiter →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
