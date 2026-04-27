import Pill from "@/components/ui/Pill";
import PriceBlock from "@/components/ui/PriceBlock";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getProductVariations, parsePrice } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

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

const TABS = ["Beschreibung", "Technisch", "Versand"];

export default async function ProduktPage(props: PageProps<"/[locale]/shop/[slug]">) {
  const { locale, slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const variations = product.type === "variable"
    ? await getProductVariations(product.id)
    : [];

  const price = parsePrice(product.price);
  const mainImage = product.images[0];
  const thumbnails = product.images.slice(1, 5);
  const inStock = product.stock_status === "instock";
  const tags = product.attributes.flatMap((a) => a.options).slice(0, 4);

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb */}
      <section className="max-w-[1280px] mx-auto px-8 pt-8 pb-4">
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          <Link href={`/${locale}/shop`}>Shop</Link>
          {product.categories[0] && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/${locale}/kategorie/${product.categories[0].slug}`}>
                {product.categories[0].name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span style={{ color: "#0a0a0a" }}>{product.name}</span>
        </div>
      </section>

      {/* Hero — gallery + buy panel */}
      <section className="max-w-[1280px] mx-auto px-8 pt-4 pb-20 grid grid-cols-12 gap-10">
        {/* Gallery */}
        <div className="col-span-7">
          <div className="grid grid-cols-12 gap-3">
            {/* Thumbnails */}
            {thumbnails.length > 0 && (
              <div className="col-span-2 flex flex-col gap-3">
                {thumbnails.map((img, i) => (
                  <div key={img.id} style={{ border: i === 0 ? "1px solid #0a0a0a" : "1px solid transparent", padding: 2 }}>
                    <div className="relative w-full" style={{ aspectRatio: "1/1", background: "#f4f2ee" }}>
                      <Image src={img.src} alt={img.alt || product.name} fill className="object-contain" sizes="80px" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Main image */}
            <div className={`${thumbnails.length > 0 ? "col-span-10" : "col-span-12"} relative`}>
              {mainImage ? (
                <div className="relative w-full" style={{ aspectRatio: "1/1", background: "#f4f2ee" }}>
                  <Image src={mainImage.src} alt={mainImage.alt || product.name} fill className="object-contain" sizes="(max-width: 1280px) 50vw, 640px" priority />
                  {tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {tags.slice(0, 2).map((t) => <Pill key={t}>{t}</Pill>)}
                    </div>
                  )}
                </div>
              ) : (
                <ImagePlaceholder label={product.name} ratio="1/1" />
              )}
            </div>
          </div>
        </div>

        {/* Buy panel */}
        <div className="col-span-5">
          {product.categories[0] && (
            <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
              {product.categories[0].name}
            </div>
          )}
          <h1 className="tracking-tight mt-3" style={{ fontSize: 44, letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.02 }}>
            {product.name}
          </h1>
          {product.short_description && (
            <div
              className="mt-3 prose-sm"
              style={{ fontSize: 15, color: "#373939", lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

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
            <PriceBlock chf={price} size="lg" btcSave btcSaveStyle="detail" />
          </div>

          {/* Variants */}
          {product.type === "variable" && variations.length > 0 && (
            product.attributes.filter((a) => a.variation).map((attr) => (
              <div key={attr.id} className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>{attr.name}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attr.options.map((opt, i) => (
                    <button key={opt} className="py-2 px-4" style={{ border: `1px solid ${i === 0 ? "#0a0a0a" : "#e7e4df"}`, background: i === 0 ? "#0a0a0a" : "transparent", color: i === 0 ? "#fafafa" : "#0a0a0a", fontSize: 13 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Stock */}
          <div className="mt-6 flex items-center gap-2" style={{ fontSize: 13, color: "#0a0a0a" }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: inStock ? "#2a9d5a" : "#e63946" }} />
            {inStock ? (
              <>
                <span>Auf Lager</span>
                {product.stock_quantity !== null && (
                  <span style={{ color: "#373939" }}>· noch {product.stock_quantity} verfügbar</span>
                )}
              </>
            ) : (
              <span style={{ color: "#e63946" }}>Ausverkauft</span>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 grid grid-cols-5 gap-3">
            <button
              disabled={!inStock}
              className="col-span-3 h-14 flex items-center justify-center gap-2"
              style={{ background: inStock ? "#0a0a0a" : "#e7e4df", color: inStock ? "#fafafa" : "#373939", fontSize: 14, fontWeight: 500, cursor: inStock ? "pointer" : "not-allowed" }}
            >
              In den Warenkorb
              <span className="font-mono" style={{ opacity: 0.6 }}>· CHF {price.toFixed(2)}</span>
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
        {/* Description */}
        <div className="col-span-8">
          {product.description && (
            <>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: "0.22em", color: "#373939" }}>§1 · Beschreibung</div>
              <div
                className="mt-5 prose prose-zinc max-w-none"
                style={{ fontSize: 15, lineHeight: 1.7, color: "#373939" }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </>
          )}
        </div>

        {/* Spec sheet */}
        <aside className="col-span-4">
          <div className="p-6" style={{ background: "#f4f2ee" }}>
            <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Details</div>
            <div className="tracking-tight mt-2" style={{ fontSize: 22, letterSpacing: "-0.015em", fontWeight: 500 }}>Produktinfo.</div>
            <div className="mt-5">
              {product.sku && (
                <div className="flex items-baseline justify-between py-2.5" style={{ borderBottom: "1px solid #e7e4df" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>SKU</span>
                  <span style={{ fontSize: 13, color: "#0a0a0a" }}>{product.sku}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex items-baseline justify-between py-2.5" style={{ borderBottom: "1px solid #e7e4df" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Gewicht</span>
                  <span style={{ fontSize: 13, color: "#0a0a0a" }}>{product.weight} g</span>
                </div>
              )}
              {product.dimensions.length && (
                <div className="flex items-baseline justify-between py-2.5" style={{ borderBottom: "1px solid #e7e4df" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Masse</span>
                  <span style={{ fontSize: 13, color: "#0a0a0a" }}>
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                  </span>
                </div>
              )}
              {product.attributes.map((attr) => (
                <div key={attr.id} className="flex items-baseline justify-between py-2.5" style={{ borderBottom: "1px solid #e7e4df" }}>
                  <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>{attr.name}</span>
                  <span style={{ fontSize: 13, color: "#0a0a0a", textAlign: "right", maxWidth: "60%" }}>{attr.options.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
