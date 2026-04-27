import Pill from "@/components/ui/Pill";
import PriceBlock from "@/components/ui/PriceBlock";
import LimitedCounter from "@/components/ui/LimitedCounter";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories, parsePrice } from "@/lib/woocommerce";
import FilterSidebarContent, { toggleCatUrl, toggleFilterUrl } from "@/components/FilterSidebarContent";
import FilterDrawer from "@/components/FilterDrawer";

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#039;/g, "'");

export default async function ShopPage(props: PageProps<"/[locale]/shop">) {
  const [{ locale }, searchParams] = await Promise.all([props.params, props.searchParams]);

  const raw = searchParams.filter;
  const activeFilters: string[] = raw ? (Array.isArray(raw) ? raw : [raw]) : [];

  const rawCat = searchParams.cat;
  const activeCats: string[] = rawCat ? (Array.isArray(rawCat) ? rawCat : [rawCat]) : [];

  const [allProducts, allCategories] = await Promise.all([
    getProducts({ per_page: 96 }),
    getCategories(),
  ]);

  const topLevelCategories = allCategories.filter((c) => c.parent === 0);

  // Build filter groups from all fetched products
  const filterGroupMap = new Map<string, Set<string>>();
  for (const p of allProducts) {
    for (const attr of p.attributes) {
      if (attr.name.toLowerCase().startsWith("var")) continue;
      const label = attr.name.replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (!filterGroupMap.has(label)) filterGroupMap.set(label, new Set());
      for (const opt of attr.options) filterGroupMap.get(label)!.add(decode(opt));
    }
  }
  const filterGroups = Array.from(filterGroupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b, "de"))
    .map(([label, opts]) => ({
      label,
      options: Array.from(opts).sort((a, b) => a.localeCompare(b, "de")),
    }));

  // Filter by category (OR) then by attribute (AND)
  const hasAnyFilter = activeCats.length > 0 || activeFilters.length > 0;
  let displayProducts = allProducts;
  if (activeCats.length > 0) {
    displayProducts = displayProducts.filter((p) =>
      p.categories.some((c) => activeCats.includes(c.slug))
    );
  }
  if (activeFilters.length > 0) {
    displayProducts = displayProducts.filter((p) => {
      const allOpts = p.attributes.flatMap((a) => a.options.map(decode));
      return activeFilters.every((f) => allOpts.includes(f));
    });
  }
  if (!hasAnyFilter) displayProducts = displayProducts.slice(0, 24);

  const baseUrl = `/${locale}/shop`;

  const sidebarProps = { categories: topLevelCategories, filterGroups, activeCats, activeFilters, locale, baseUrl };

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb + title */}
      <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-8">
        <div className="font-mono uppercase mb-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          Shop
        </div>
        <div className="flex items-end justify-between">
          <h1 className="tracking-tight" style={{ fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1 }}>
            Alle Produkte.
          </h1>
          <div className="font-mono" style={{ fontSize: 12, color: "#373939" }}>
            {displayProducts.length}{hasAnyFilter ? ` von ${allProducts.length}` : ""} Produkte
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-8 grid grid-cols-12 gap-8 pb-24">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block col-span-3">
          <div className="sticky top-32">
            <FilterSidebarContent {...sidebarProps} />
          </div>
        </aside>

        {/* Product grid */}
        <div className="col-span-12 lg:col-span-9">
          {/* Toolbar */}
          <div className="flex items-center justify-between pb-5 flex-wrap gap-3" style={{ borderBottom: "1px solid #0a0a0a" }}>
            <div className="flex items-center gap-2 flex-wrap">
              {hasAnyFilter ? (
                <>
                  {activeCats.map((slug) => {
                    const cat = topLevelCategories.find((c) => c.slug === slug);
                    return (
                      <Link
                        key={slug}
                        href={toggleCatUrl(slug, activeCats, activeFilters, baseUrl)}
                        className="inline-flex items-center gap-2 font-mono uppercase"
                        style={{ fontSize: 10, letterSpacing: "0.14em", background: "#373939", color: "#fafafa", padding: "5px 9px" }}
                      >
                        {cat?.name ?? slug} <span style={{ opacity: 0.6 }}>×</span>
                      </Link>
                    );
                  })}
                  {activeFilters.map((f) => (
                    <Link
                      key={f}
                      href={toggleFilterUrl(f, activeCats, activeFilters, baseUrl)}
                      className="inline-flex items-center gap-2 font-mono uppercase"
                      style={{ fontSize: 10, letterSpacing: "0.14em", background: "#0a0a0a", color: "#fafafa", padding: "5px 9px" }}
                    >
                      {f} <span style={{ opacity: 0.6 }}>×</span>
                    </Link>
                  ))}
                </>
              ) : (
                <span className="font-mono" style={{ fontSize: 11, color: "#373939" }}>
                  {allProducts.length} Produkte total
                </span>
              )}
            </div>
            <select
              className="font-mono bg-transparent"
              style={{ fontSize: 12, color: "#0a0a0a", border: "none", outline: "none" }}
            >
              <option>Relevanz</option>
              <option>Preis aufsteigend</option>
              <option>Preis absteigend</option>
              <option>Neu</option>
            </select>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-12 pt-8">
            {displayProducts.map((p) => {
              const price = parsePrice(p.price);
              const img = p.images[0];
              const isLimited = p.manage_stock && p.stock_quantity !== null && p.stock_quantity <= 21;
              return (
                <Link key={p.id} href={`/${locale}/shop/${p.slug}`}>
                  <div className="relative">
                    {img ? (
                      <div className="relative w-full" style={{ aspectRatio: "1/1", background: "#f4f2ee" }}>
                        <Image
                          src={img.src}
                          alt={img.alt || p.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 300px"
                        />
                      </div>
                    ) : (
                      <div className="relative overflow-hidden w-full" style={{ aspectRatio: "1/1", background: "repeating-linear-gradient(135deg, #f4f2ee 0 14px, #ece8e1 14px 15px)" }}>
                        <div className="absolute inset-0 flex items-end justify-start p-3">
                          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", color: "#9c9689" }}>{p.name}</span>
                        </div>
                      </div>
                    )}
                    {isLimited && p.stock_quantity !== null && (
                      <div className="absolute top-3 right-3">
                        <Pill variant="solid">Limited · {p.stock_quantity}</Pill>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
                        {p.categories[0]?.name ?? ""}
                      </div>
                      <div style={{ fontSize: 15, color: "#0a0a0a", marginTop: 4, fontWeight: 500 }}>{p.name}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono uppercase shrink-0" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939", marginTop: 2, borderBottom: "1px solid #f39320" }}>
                      <span style={{ color: "#f39320", fontWeight: 700 }}>BTC</span>
                      <span>−10%</span>
                    </span>
                  </div>
                  <div className="mt-3"><PriceBlock chf={price} size="sm" /></div>
                  {isLimited && p.stock_quantity !== null && (
                    <div className="mt-3"><LimitedCounter left={p.stock_quantity} total={21} /></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer (button + overlay, lg:hidden internally) */}
      <FilterDrawer {...sidebarProps} />
    </div>
  );
}
