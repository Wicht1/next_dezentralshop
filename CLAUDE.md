# Dezentralshop – Claude Code Context

Dieses Dokument wird von Claude Code automatisch geladen. Es enthält alle wichtigen Konventionen und den aktuellen Stand des Projekts.

Vollständiges Projektdokument: `docs/PROJEKT.md`  
Technische Architektur: `docs/ARCHITEKTUR.md`

---

## Projekt-Überblick

Next.js 14 Frontend für dezentralshop.ch – ersetzt Elementor, WooCommerce bleibt als Backend.  
**Live-URL (Aufbau):** next.dezentralshop.ch  
**Ziel-URL:** dezentralshop.ch  
**Betreiber:** Lex & Jonathan

---

## Stack

| Schicht | Technologie |
|---|---|
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS + Inline-Styles (Design-System via Farben) |
| Mehrsprachigkeit | next-intl (Struktur vorhanden, noch nicht vollständig) |
| Backend | WordPress + WooCommerce REST API |
| Hosting | Vercel |
| Zahlungen | BTCPay (Bitcoin) + Wallee (Karte/Twint) – noch nicht integriert |

---

## Farb- und Design-System

Nicht mit Tailwind-Farben arbeiten – das Projekt nutzt explizite Hex-Werte:

| Token | Wert | Verwendung |
|---|---|---|
| `#0a0a0a` | Fast-Schwarz | Primärfarbe, Text, Buttons |
| `#fafafa` | Fast-Weiss | Hintergründe, helle Buttons |
| `#f4f2ee` | Warm-Grau | Karten-Hintergründe, Sidebar |
| `#e7e4df` | Border | Trennlinien |
| `#373939` | Mittelgrau | Sekundärtext, Labels |
| `#f39320` | Bitcoin-Orange | Akzente, BTC-Rabatt |
| `#2a9d5a` | Grün | Lagerbestand "Auf Lager" |
| `#e63946` | Rot | Ausverkauft, Fehler |

**Typografie:** Font-Mono für Labels/Meta (uppercase, tracking), regulärer Font für Fliesstext.

---

## API-Clients

### WooCommerce – `lib/woocommerce.ts`
- Authentifizierung via Basic Auth (Key + Secret aus `.env.local`)
- ISR: `revalidate: 60` (Produkte, 1 Minute)
- Wichtigste Funktionen:
  - `getProducts(params)` – Produktliste
  - `getProductBySlug(slug)` – Einzelprodukt
  - `getProductVariations(productId)` – Varianten
  - `getCategories()` – Produktkategorien

### WordPress – `lib/wordpress.ts`
- Kein Auth nötig (public API für published posts)
- ISR: `revalidate: 300` (Blog, 5 Minuten)
- Wichtigste Funktionen:
  - `getPosts(params)` – Beitragliste
  - `getPostBySlug(slug)` – Einzelbeitrag
  - `getFeaturedImage(post)` – Bild aus `_embed`
  - `getPostCategories(post)` – Kategorien aus `_embed`

---

## Routing

```
/                    → redirect → /de
/[locale]/           → Coming Soon / Homepage
/[locale]/shop       → Produktliste (WooCommerce)
/[locale]/shop/[slug]→ Produktdetail (WooCommerce)
/[locale]/wissen     → Blog-Liste (WordPress) ← korrekte Route
/[locale]/wissen/[slug] → Blogartikel (WordPress)
/[locale]/blog/      → 301 redirect → /[locale]/wissen (TODO)
/[locale]/marken/[marke] → Marken-Landingpage
/[locale]/kategorie/[slug] → Kategorie-Seiten
/[locale]/warenkorb  → Warenkorb
/[locale]/checkout   → Checkout
/[locale]/beratung   → Beratung buchen (Cal.com)
/[locale]/status     → Transparenz-Seite
/[locale]/reserves   → Proof of Reserves
/api/feed/products   → Produkt-Feed für externe Partner
```

**Sprachen:** `de` (Standard), `fr`, `en`, `it` – Routing via `proxy.ts` (Middleware).

---

## Offene TODOs (Stand April 2026)

### Dringend
- [ ] `/[locale]/blog` → 301 Redirect auf `/[locale]/wissen`
- [ ] `wissen/page.tsx` und `wissen/[slug]/page.tsx` mit WordPress-Daten füllen (Code liegt in `blog/page.tsx` und `blog/[slug]/page.tsx`)

### Phase 2
- [ ] Warenkorb-Logik (aktuell Platzhalter)
- [ ] Checkout mit BTCPay + Wallee
- [ ] 10% Bitcoin-Rabatt Logik serverseitig
- [ ] Kategorie-Seiten (`/kategorie/[slug]`) mit echten Daten

### Phase 3
- [ ] Mehrsprachigkeit vollständig (FR, EN, IT)
- [ ] SEO: Metadata pro Seite, sitemap.xml, strukturierte Daten
- [ ] Google Analytics (DSGVO-konform)
- [ ] Marken-Landingpages mit echten Daten

---

## Umgebungsvariablen

Siehe `.env.example` für alle benötigten Keys.

```
WOOCOMMERCE_URL=https://dezentralshop.ch
WOOCOMMERCE_KEY=ck_...
WOOCOMMERCE_SECRET=cs_...
```

Für Vercel: Im Dashboard unter Settings → Environment Variables eintragen.

---

## Konventionen

- **Neue Seiten** immer unter `app/[locale]/` anlegen
- **API-Calls** nur in Server Components (keine `useEffect`-Fetches)
- **Preisberechnung** immer serverseitig – nie im Client
- **Bilder** via `next/image` mit `fill` + `sizes` Attribut
- **Branches:** `feature/[name]` → PR → `main` (Vercel deployed automatisch)
- **Commits:** Englisch, kurz, mit Co-Author Tag
