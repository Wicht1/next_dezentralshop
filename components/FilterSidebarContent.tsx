import Link from "next/link";

export type FilterCategory = { id: number; name: string; slug: string; count: number };
export type FilterGroup = { label: string; options: string[] };

export type FilterSidebarProps = {
  categories: FilterCategory[];
  filterGroups: FilterGroup[];
  activeFilters: string[];
  locale: string;
  baseUrl: string;
};

export function buildToggleUrl(opt: string, activeFilters: string[], baseUrl: string): string {
  const next = activeFilters.includes(opt)
    ? activeFilters.filter((f) => f !== opt)
    : [...activeFilters, opt];
  if (next.length === 0) return baseUrl;
  return `${baseUrl}?${next.map((f) => `filter=${encodeURIComponent(f)}`).join("&")}`;
}

export default function FilterSidebarContent({
  categories,
  filterGroups,
  activeFilters,
  locale,
  baseUrl,
}: FilterSidebarProps) {
  return (
    <div>
      <div className="flex items-center justify-between pb-4" style={{ borderBottom: "1px solid #e7e4df" }}>
        <div className="font-semibold tracking-tight" style={{ fontSize: 15 }}>Filter</div>
        {activeFilters.length > 0 && (
          <Link href={baseUrl} className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
            Alle zurücksetzen
          </Link>
        )}
      </div>

      {/* Kategorien */}
      <div style={{ borderTop: "1px solid #e7e4df" }} className="py-5">
        <div className="font-mono uppercase mb-4" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>
          Kategorie
        </div>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/${locale}/kategorie/${cat.slug}`} className="flex items-center gap-2.5 py-1.5">
            <span className="inline-block shrink-0" style={{ width: 14, height: 14, border: "1px solid #e7e4df" }} />
            <span style={{ fontSize: 13, color: "#0a0a0a", flex: 1 }}>{cat.name}</span>
            <span className="font-mono" style={{ fontSize: 11, color: "#373939" }}>{cat.count}</span>
          </Link>
        ))}
      </div>

      {/* Attribute filter groups */}
      {filterGroups.map(({ label, options }) => (
        <div key={label} style={{ borderTop: "1px solid #e7e4df" }} className="py-5">
          <div className="font-mono uppercase mb-4" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#0a0a0a" }}>
            {label}
          </div>
          {options.map((opt) => {
            const isActive = activeFilters.includes(opt);
            return (
              <Link
                key={opt}
                href={buildToggleUrl(opt, activeFilters, baseUrl)}
                className="flex items-center gap-2.5 py-1.5"
              >
                <span
                  className="inline-block shrink-0"
                  style={{
                    width: 14,
                    height: 14,
                    border: `1px solid ${isActive ? "#0a0a0a" : "#e7e4df"}`,
                    background: isActive ? "#0a0a0a" : "transparent",
                    position: "relative",
                  }}
                >
                  {isActive && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ position: "absolute", top: 1, left: 1 }}>
                      <path d="M1 5l3 3 5-6" stroke="#f39320" strokeWidth="1.5" />
                    </svg>
                  )}
                </span>
                <span style={{ fontSize: 13, color: "#0a0a0a", flex: 1 }}>{opt}</span>
              </Link>
            );
          })}
        </div>
      ))}

      {/* Beratung CTA */}
      <div className="mt-2 p-4" style={{ background: "#f4f2ee" }}>
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Unsicher?</div>
        <div style={{ fontSize: 14, color: "#0a0a0a", marginTop: 6, lineHeight: 1.4 }}>
          30 Minuten mit einem Techniker, gratis.
        </div>
        <Link
          href={`/${locale}/beratung`}
          className="mt-4 h-10 w-full flex items-center px-3"
          style={{ border: "1px solid #0a0a0a", background: "transparent", fontSize: 13, color: "#0a0a0a" }}
        >
          Beratung buchen →
        </Link>
      </div>
    </div>
  );
}
