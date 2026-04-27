# Dezentralshop – Architektur & Entwickler-Guide

Für neue Entwickler die ins Projekt einsteigen.  
Projektkontext & Roadmap: `docs/PROJEKT.md`

---

## Ordnerstruktur

```
next_dezentralshop/
│
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root-Layout (Metadata, Font)
│   ├── page.tsx                # Root: redirect → /de
│   ├── globals.css             # Tailwind base styles
│   │
│   ├── [locale]/               # Alle Seiten unter /de, /fr, /en, /it
│   │   ├── layout.tsx          # Locale-Layout: TopBar + Footer
│   │   ├── page.tsx            # Homepage / Coming Soon
│   │   ├── shop/
│   │   │   ├── page.tsx        # Produktliste ← WooCommerce
│   │   │   └── [slug]/page.tsx # Produktdetail ← WooCommerce
│   │   ├── wissen/
│   │   │   ├── page.tsx        # Blog-Liste ← WordPress (TODO: befüllen)
│   │   │   └── [slug]/page.tsx # Blogartikel ← WordPress (TODO: befüllen)
│   │   ├── blog/               # TODO: 301 → /wissen
│   │   ├── kategorie/[slug]/   # Kategorie-Seiten
│   │   ├── marken/[marke]/     # Marken-Landingpages
│   │   ├── warenkorb/          # Warenkorb (Platzhalter)
│   │   ├── checkout/           # Checkout (Platzhalter)
│   │   ├── beratung/           # Cal.com Buchung
│   │   ├── status/             # Transparenz-Seite
│   │   └── reserves/           # Proof of Reserves
│   │
│   └── api/
│       └── feed/products/      # Produkt-Feed für externe Partner
│           └── route.ts
│
├── components/
│   ├── TopBar.tsx              # Navigation, Bitcoin-Ticker, Warenkorb
│   ├── Footer.tsx              # Footer mit Links, GitHub
│   ├── NavItems.tsx            # Nav-Links
│   └── ui/                     # Wiederverwendbare UI-Komponenten
│       ├── PriceBlock.tsx      # CHF + Sats Preisanzeige
│       ├── Pill.tsx            # Tags / Badges
│       ├── LimitedCounter.tsx  # "Noch X von 21 verfügbar"
│       ├── HouseBadge.tsx      # "Made by Dezentralshop" Badge
│       └── BtcDiscountChip.tsx # Bitcoin -10% Chip
│
├── lib/
│   ├── woocommerce.ts          # WooCommerce REST API Client + Typen
│   └── wordpress.ts            # WordPress REST API Client + Typen
│
├── docs/
│   ├── PROJEKT.md              # Projektgedächtnis (Vision, Roadmap)
│   └── ARCHITEKTUR.md          # Diese Datei
│
├── proxy.ts                    # Middleware: Locale-Routing
├── next.config.ts              # Next.js Config (Remote Images)
├── CLAUDE.md                   # Claude Code Kontext (automatisch geladen)
└── .env.example                # Benötigte Umgebungsvariablen
```

---

## Wie API-Calls funktionieren

Alle Daten kommen serverseitig. Kein `useEffect`, kein Client-Fetching.

```tsx
// ✅ Richtig – Server Component
export default async function ShopPage() {
  const products = await getProducts({ per_page: 24 });
  return <div>{products.map(...)}</div>;
}

// ❌ Falsch – nie so machen
useEffect(() => {
  fetch('/api/products').then(...)
}, []);
```

### WooCommerce-Produkt laden

```tsx
import { getProducts, getProductBySlug } from "@/lib/woocommerce";

// Liste
const products = await getProducts({ per_page: 24, category: "mining" });

// Einzelprodukt
const product = await getProductBySlug("coldcard-mk4");
if (!product) notFound();
```

### WordPress-Artikel laden

```tsx
import { getPosts, getPostBySlug, getFeaturedImage } from "@/lib/wordpress";

// Liste
const posts = await getPosts({ per_page: 12 });

// Einzelartikel
const post = await getPostBySlug("bitcoin-verwahren-guide");
const img = getFeaturedImage(post); // { src, alt } | null
```

---

## Preise & Bitcoin-Rabatt

Preisberechnung **immer serverseitig** – nie im Client.

```tsx
import { parsePrice, fmtChf, btcPrice } from "@/lib/woocommerce";

const price = parsePrice(product.price); // "178" → 178
const btc = btcPrice(price);             // 178 * 0.9 = 160.20
```

Der `PriceBlock`-Component zeigt CHF + Sats + optionalen BTC-Rabatt:

```tsx
<PriceBlock chf={178} size="lg" btcSave btcSaveStyle="detail" />
```

---

## Neue Seite anlegen

1. Datei unter `app/[locale]/meine-seite/page.tsx` erstellen
2. `PageProps<"/[locale]/meine-seite">` als Props-Typ verwenden
3. `const { locale } = await props.params;` für Locale
4. Design-Tokens aus `CLAUDE.md` verwenden (keine Tailwind-Farben)

```tsx
export default async function MeineSeite(props: PageProps<"/[locale]/meine-seite">) {
  const { locale } = await props.params;
  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* ... */}
    </div>
  );
}
```

---

## Neue UI-Komponente anlegen

Unter `components/ui/MeineKomponente.tsx`. Kein default export mit Props-Interface-Mischung – sauber trennen:

```tsx
type Props = {
  label: string;
  variant?: "default" | "solid";
};

export default function MeineKomponente({ label, variant = "default" }: Props) {
  return (
    <span style={{ /* Design-Token Farben */ }}>
      {label}
    </span>
  );
}
```

---

## Git-Workflow

```bash
# Feature starten
git checkout -b feature/mein-feature

# Entwickeln, committen
git add <files>
git commit -m "Add: kurze Beschreibung"

# Push + PR
git push -u origin feature/mein-feature
gh pr create --title "..." --body "..."

# Nach Review: merge via GitHub, branch wird gelöscht
# Vercel deployed automatisch auf main
```

**Branch-Namen:** `feature/`, `fix/`, `chore/`  
**Commits:** Englisch, imperativ ("Add", "Fix", "Update")

---

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# .env.local anlegen (siehe .env.example)
cp .env.example .env.local
# Keys eintragen

# Dev-Server starten
npm run dev
# → http://localhost:3000/de/shop

# Build testen (vor PR immer ausführen)
npm run build
```

---

## Externe Systeme

| System | URL | Zugang |
|---|---|---|
| WooCommerce Admin | dezentralshop.ch/wp-admin | Lex / Jonathan |
| Vercel Dashboard | vercel.com | Lex / Jonathan |
| GitHub Repo | github.com/Wicht1/next_dezentralshop | Wicht1 |
| BTCPay | – | noch zu migrieren |
| Wallee | – | noch zu migrieren |
