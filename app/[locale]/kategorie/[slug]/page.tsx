import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts, getCategories, parsePrice } from "@/lib/woocommerce";
import Pill from "@/components/ui/Pill";
import PriceBlock from "@/components/ui/PriceBlock";
import LimitedCounter from "@/components/ui/LimitedCounter";

export default async function KategoriePage(
  props: PageProps<"/[locale]/kategorie/[slug]">
) {
  const [{ locale, slug }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const activeFilter = typeof searchParams.filter === "string" ? searchParams.filter : null;

  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const allProducts = await getProducts({
    category: String(category.id),
    per_page: 24,
  });

  const products = activeFilter
    ? allProducts.filter((p) =>
        p.attributes.some((a) => a.options.some((o) => o === activeFilter))
      )
    : allProducts;

  // Row 1: all top-level categories
  const topLevelCats = allCategories.filter((c) => c.parent === 0);

  // Which top-level cat is "active" (current or its parent)
  const activeParentId = category.parent === 0 ? category.id : category.parent;

  // Row 2: sub-categories of the active parent + fil_ filters
  const subCats = allCategories.filter((c) => c.parent === activeParentId);

  // Group filter attributes by label (strip parenthetical suffix, exclude var_*)
  const filterGroups = new Map<string, Set<string>>();
  for (const p of allProducts) {
    for (const attr of p.attributes) {
      if (attr.name.toLowerCase().startsWith("var")) continue;
      const label = attr.name.replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (!filterGroups.has(label)) filterGroups.set(label, new Set());
      for (const opt of attr.options) filterGroups.get(label)!.add(opt);
    }
  }
  const sortedFilterGroups = Array.from(filterGroups.entries())
    .sort(([a], [b]) => a.localeCompare(b, "de"))
    .map(([label, opts]) => ({ label, options: Array.from(opts).sort((a, b) => a.localeCompare(b, "de")) }));

  const baseUrl = `/${locale}/kategorie/${slug}`;

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb + title */}
      <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-8">
        <div className="font-mono uppercase mb-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          <Link href={`/${locale}/shop`}>Shop</Link>
          <span className="mx-2">/</span>
          <span style={{ color: "#0a0a0a" }}>{category.name}</span>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="tracking-tight" style={{ fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1 }}>
            {category.name}.
          </h1>
          <div className="font-mono" style={{ fontSize: 12, color: "#373939" }}>
            {products.length}{activeFilter ? ` von ${allProducts.length}` : ""} Produkte
          </div>
        </div>
        {category.description && (
          <p className="mt-4 max-w-xl" style={{ fontSize: 15, color: "#373939", lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}

        {/* Row 1: Top-level categories — always static */}
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          <Link href={`/${locale}/shop`} className="font-mono uppercase px-3 py-1.5" style={{ fontSize: 10, letterSpacing: "0.14em", border: "1px solid #e7e4df", color: "#373939" }}>
            Alle
          </Link>
          {topLevelCats.map((cat) => {
            const isActive = cat.id === activeParentId;
            return (
              <Link
                key={cat.id}
                href={`/${locale}/kategorie/${cat.slug}`}
                className="font-mono uppercase px-3 py-1.5"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  background: isActive ? "transparent" : "#0a0a0a",
                  color: isActive ? "#f39320" : "#fafafa",
                  border: isActive ? "1px solid #f39320" : "1px solid #0a0a0a",
                }}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Row 2: Sub-categories */}
        {subCats.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {subCats.map((sub) => {
              const isActive = category.id === sub.id;
              return (
                <Link key={sub.id} href={`/${locale}/kategorie/${sub.slug}`} className="font-mono uppercase px-3 py-1.5" style={{ fontSize: 10, letterSpacing: "0.14em", background: isActive ? "transparent" : "#0a0a0a", color: isActive ? "#f39320" : "#fafafa", border: isActive ? "1px solid #f39320" : "1px solid #0a0a0a" }}>
                  {sub.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Row 3+: Grouped filters */}
        {sortedFilterGroups.length > 0 && (
          <div className="mt-4 space-y-2">
            {activeFilter && (
              <div className="flex items-center gap-2 mb-1">
                <Link href={baseUrl} className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.14em", color: "#9c9689" }}>
                  × Filter zurücksetzen
                </Link>
              </div>
            )}
            {sortedFilterGroups.map(({ label, options }) => {
              const LIMIT = 5;
              const visible = options.slice(0, LIMIT);
              const hidden = options.slice(LIMIT);
              const filterPill = (opt: string) => {
                const isActive = activeFilter === opt;
                return (
                  <Link key={opt} href={isActive ? baseUrl : `${baseUrl}?filter=${encodeURIComponent(opt)}`} className="font-mono uppercase px-2.5 py-1 shrink-0" style={{ fontSize: 9, letterSpacing: "0.12em", background: isActive ? "#0a0a0a" : "transparent", color: isActive ? "#fafafa" : "#373939", border: isActive ? "1px solid #0a0a0a" : "1px solid #e7e4df" }}>
                    {opt}
                  </Link>
                );
              };
              return (
                <div key={label} className="flex items-start gap-3">
                  <span className="font-mono uppercase shrink-0" style={{ fontSize: 9, letterSpacing: "0.18em", color: "#9c9689", paddingTop: 5, minWidth: 88 }}>
                    {label}
                  </span>
                  <div style={{ width: 1, background: "#e7e4df", alignSelf: "stretch", flexShrink: 0 }} />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {visible.map(filterPill)}
                    {hidden.length > 0 && (
                      <details>
                        <summary className="font-mono uppercase cursor-pointer" style={{ listStyleType: "none", fontSize: 9, letterSpacing: "0.14em", color: "#9c9689", padding: "4px 8px" }}>
                          +{hidden.length}
                        </summary>
                        <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                          {hidden.map(filterPill)}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Product grid */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24">
        <div style={{ borderTop: "1px solid #0a0a0a", paddingTop: 32 }}>
          {products.length === 0 ? (
            <p className="py-20 text-center font-mono" style={{ fontSize: 13, color: "#373939" }}>
              Keine Produkte in dieser Kategorie.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-x-6 gap-y-12">
              {products.map((p) => {
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
                            sizes="(max-width: 1280px) 33vw, 400px"
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
                          {category.name}
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
          )}
        </div>
      </section>
    </div>
  );
}
