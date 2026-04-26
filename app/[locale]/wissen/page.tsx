import Pill from "@/components/ui/Pill";
import Link from "next/link";

const ARTICLES = [
  { n: "014", cat: "Guide", t: "Seed-Backup richtig gemacht", d: "12 min", featured: true },
  { n: "013", cat: "Review", t: "BitBox02 vs. Coldcard Mk4 — direkter Vergleich", d: "18 min" },
  { n: "012", cat: "Tutorial", t: "Multisig mit Sparrow + Coldcard einrichten", d: "22 min" },
  { n: "011", cat: "Meinung", t: "Warum wir keine Altcoins verkaufen", d: "6 min" },
  { n: "010", cat: "Guide", t: "Bitcoin selbst verwahren — der Einstieg", d: "15 min" },
  { n: "009", cat: "Review", t: "Bitaxe Gamma 601 — ein Jahr Solo-Mining", d: "20 min" },
];

const VIDEOS = [
  { t: "Coldcard Mk4 · Unboxing & Setup", d: "14:02" },
  { t: "PSBT via microSD erklärt", d: "08:47" },
  { t: "Tamper-Evident Siegel prüfen", d: "04:18" },
];

const TOPICS = [
  { t: "Alle", n: 62, active: true },
  { t: "Guides", n: 18 },
  { t: "Reviews", n: 14 },
  { t: "Tutorials", n: 21 },
  { t: "Videos", n: 38 },
  { t: "Meinung", n: 9 },
  { t: "Glossar", n: "A–Z" },
];

function ImagePlaceholder({ label, ratio = "4/3", dark = false }: { label: string; ratio?: string; dark?: boolean }) {
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

export default async function WissenPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Masthead */}
      <section className="max-w-[1280px] mx-auto px-8 pt-16 pb-12">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-7">
            <div className="font-mono uppercase mb-5" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>
              Ausgabe 014 · April 2026
            </div>
            <h1 className="tracking-tight" style={{ fontSize: "clamp(56px,7vw,84px)", lineHeight: 0.94, letterSpacing: "-0.03em", fontWeight: 500 }}>
              Wissen.
            </h1>
            <p className="mt-6 max-w-[540px]" style={{ fontSize: 17, lineHeight: 1.5, color: "#373939" }}>
              Guides, Reviews und ehrliche Meinungen zu Bitcoin-Hardware.
              Wir schreiben keine Produkt-PR — wir schreiben, was wir selbst
              wissen wollten, bevor wir gekauft haben.
            </p>
          </div>
          <div className="col-span-5 flex items-end justify-end">
            <div className="font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.06em", lineHeight: 1.8 }}>
              <div>14 Ausgaben · seit Januar 2025</div>
              <div>62 Artikel · 38 Videos</div>
              <div>Deutsch · Englisch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Topic nav */}
      <section style={{ borderTop: "1px solid #0a0a0a", borderBottom: "1px solid #e7e4df" }}>
        <div className="max-w-[1280px] mx-auto px-8 flex items-center gap-6 h-14 overflow-x-auto">
          {TOPICS.map((c) => (
            <a key={c.t} className="flex items-center gap-2 shrink-0" style={{ color: c.active ? "#0a0a0a" : "#373939" }}>
              <span style={{ fontSize: 14, fontWeight: c.active ? 500 : 400 }}>{c.t}</span>
              <span className="font-mono tabular-nums" style={{ fontSize: 11, color: "#373939" }}>{c.n}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured spread */}
      <section className="max-w-[1280px] mx-auto px-8 py-20 grid grid-cols-12 gap-10">
        <a className="col-span-7" href={`/${locale}/wissen/seed-backup-richtig-gemacht`}>
          <ImagePlaceholder label="Seed-Backup Hero" ratio="4/3" />
          <div className="mt-6 flex items-center gap-4">
            <Pill variant="solid">Titelgeschichte</Pill>
            <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Nr. 014 · Guide · 12 min</span>
          </div>
          <h2 className="tracking-tight mt-5" style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.02 }}>
            Seed-Backup richtig gemacht.
          </h2>
          <p className="mt-5 max-w-[600px]" style={{ fontSize: 16, lineHeight: 1.55, color: "#373939" }}>
            Zwölf Wörter entscheiden über dein Bitcoin-Vermögen. Wir zeigen,
            warum Papier die falsche Antwort ist, was Stahl kann und wo die
            Grenzen liegen — inklusive Stresstest mit Feuer, Wasser und einem Hammer.
          </p>
          <div className="mt-5 flex items-center gap-3" style={{ fontSize: 13, color: "#0a0a0a" }}>
            <span>Lukas M.</span>
            <span style={{ color: "#373939" }}>·</span>
            <span style={{ color: "#373939" }}>18. April 2026</span>
          </div>
        </a>

        <div className="col-span-5">
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "#373939" }}>Auch in dieser Ausgabe</div>
          <div className="mt-5" style={{ borderTop: "1px solid #e7e4df" }}>
            {ARTICLES.slice(1, 5).map((a) => (
              <a key={a.n} className="flex items-start gap-5 py-6" style={{ borderBottom: "1px solid #e7e4df" }}>
                <div style={{ width: 96, flexShrink: 0 }}>
                  <ImagePlaceholder label={a.t} ratio="1/1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.16em", color: "#373939" }}>
                    <span>Nr. {a.n}</span><span>·</span><span>{a.cat}</span><span>·</span><span>{a.d}</span>
                  </div>
                  <h3 className="tracking-tight mt-2" style={{ fontSize: 17, letterSpacing: "-0.01em", fontWeight: 500, lineHeight: 1.25 }}>{a.t}</h3>
                </div>
                <span style={{ fontSize: 14, color: "#0a0a0a", marginTop: 4 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video section — dark */}
      <section style={{ background: "#0a0a0a", color: "#fafafa" }}>
        <div className="max-w-[1280px] mx-auto px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#f39320" }}>Videos · Dezentralshop TV</div>
              <h2 className="tracking-tight mt-4" style={{ fontSize: "clamp(28px,3.5vw,44px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1 }}>
                Setup, Sicherheit, Selbstverwahrung —<br />
                <span style={{ color: "#8a8a8a" }}>alles in Bewegtbild.</span>
              </h2>
            </div>
            <a className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.14em", color: "#fafafa" }}>Alle Videos →</a>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <a key={i} className="group">
                <div className="relative">
                  <div className="relative overflow-hidden w-full" style={{ aspectRatio: "16/9", background: "repeating-linear-gradient(135deg, #0a0a0a 0 14px, #121212 14px 15px)" }}>
                    <div className="absolute bottom-3 right-3 font-mono px-2 py-1" style={{ fontSize: 11, color: "#fafafa", background: "rgba(0,0,0,0.7)", letterSpacing: "0.04em" }}>{v.d}</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center" style={{ background: "#fafafa" }}>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="#0a0a0a"><path d="M4 2l12 7-12 7z" /></svg>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: "#f39320" }}>Dezentralshop</div>
                  <h3 className="tracking-tight mt-2" style={{ fontSize: 18, letterSpacing: "-0.01em", fontWeight: 500, lineHeight: 1.25 }}>{v.t}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-12 gap-8 mb-10 items-end">
          <div className="col-span-5">
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>Archiv</div>
            <h2 className="tracking-tight mt-4" style={{ fontSize: 40, letterSpacing: "-0.025em", fontWeight: 500 }}>
              Alles, was wir<br />bisher geschrieben haben.
            </h2>
          </div>
          <div className="col-span-7 flex items-center justify-end gap-3">
            <div className="h-10 flex items-center px-3 gap-2" style={{ border: "1px solid #e7e4df", minWidth: 260 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#373939" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
              <span style={{ fontSize: 13, color: "#373939" }}>Suche · z.B. "Multisig", "PSBT"</span>
            </div>
            <select className="h-10 px-3 font-mono bg-transparent" style={{ fontSize: 12, color: "#0a0a0a", border: "1px solid #e7e4df" }}>
              <option>Neueste zuerst</option>
              <option>Älteste zuerst</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-4 py-3" style={{ borderTop: "1px solid #0a0a0a", borderBottom: "1px solid #e7e4df" }}>
            <span className="font-mono" style={{ fontSize: 22, letterSpacing: "-0.01em", color: "#0a0a0a", fontWeight: 500 }}>2026</span>
            <span className="font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.1em" }}>· 14 Ausgaben</span>
          </div>
          {ARTICLES.map((a) => (
            <a key={a.n} className="grid grid-cols-12 gap-6 items-center py-6 group" style={{ borderBottom: "1px solid #e7e4df" }}>
              <div className="col-span-1">
                <span className="font-mono tabular-nums" style={{ fontSize: 13, color: "#373939", letterSpacing: "0.04em" }}>Nr. {a.n}</span>
              </div>
              <div className="col-span-2">
                <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.16em", color: "#0a0a0a" }}>{a.cat}</span>
              </div>
              <div className="col-span-6">
                <h4 className="tracking-tight" style={{ fontSize: 20, letterSpacing: "-0.015em", fontWeight: 500, lineHeight: 1.25 }}>{a.t}</h4>
              </div>
              <div className="col-span-2">
                <span className="font-mono" style={{ fontSize: 12, color: "#373939" }}>{a.d} · Lesedauer</span>
              </div>
              <div className="col-span-1 text-right">
                <span style={{ fontSize: 16, color: "#0a0a0a" }}>→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <button className="h-12 px-8" style={{ border: "1px solid #0a0a0a", background: "transparent", fontSize: 13, color: "#0a0a0a" }}>
            Ältere Ausgaben laden →
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-12 gap-8 items-center py-14 px-12" style={{ background: "#f4f2ee" }}>
          <div className="col-span-7">
            <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Newsletter · alle 4 Wochen</div>
            <h3 className="tracking-tight mt-3" style={{ fontSize: 34, letterSpacing: "-0.02em", fontWeight: 500, lineHeight: 1.05 }}>
              Neue Ausgabe direkt<br />in den Posteingang.
            </h3>
            <p className="mt-4 max-w-[440px]" style={{ fontSize: 14, color: "#373939", lineHeight: 1.55 }}>
              Kein Tracking, keine Affiliate-Links, kein Spam. Nur der neue Leitartikel, plus ein kuratierter Lesetipp.
            </p>
          </div>
          <div className="col-span-5">
            <div className="flex">
              <input placeholder="du@beispiel.ch" className="flex-1 h-12 px-4 outline-none" style={{ background: "#fafafa", border: "1px solid #e7e4df", borderRight: "none", fontSize: 14 }} />
              <button className="h-12 px-6" style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 13 }}>Abonnieren</button>
            </div>
            <div className="mt-3 font-mono" style={{ fontSize: 11, color: "#373939", letterSpacing: "0.04em" }}>
              1&apos;847 Leser · jederzeit abmeldbar
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
