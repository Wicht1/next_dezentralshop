# Dezentralshop – Projektdokument
> Version 1.0 – April 2026  
> Dieses Dokument ist das Gedächtnis des Projekts. Am Anfang jedes neuen Gesprächs hochladen.

---

## 1. Über den Shop

**URL:** dezentralshop.ch  
**Betreiber:** Lex & Jonathan  
**Mission:** Bitcoin-Produkte in höchster Qualität – Hardware Wallets, Mining, Bücher, Bekleidung, Accessoires  
**Besonderheit:** 10% Rabatt bei Zahlung mit Bitcoin  
**Firma:** Eine Firma, zwei Shops (dezentralshop.ch + decentralheat.ch) – gleiche Buchhaltung

---

## 2. Ziel des Projekts

Den bestehenden Elementor-Shop durch ein modernes, codebasiertes Frontend ersetzen das vollständig über GitHub verwaltet wird. WordPress/WooCommerce bleibt als Backend erhalten. Elementor fällt komplett weg.

**Neue URL während Aufbau:** next.dezentralshop.ch  
**Ziel-URL nach Migration:** dezentralshop.ch  
**Zeitrahmen:** 3–6 Monate

---

## 3. Architektur

```
next.dezentralshop.ch (Vercel)
        ↕ REST API
dezentralshop.ch/wp-json (Hostpoint)
WordPress + WooCommerce
        ↕ Bexio Automator Plugin
Bexio (Lager, Buchhaltung, Reporting)
        ↓
Post CH API (Versandetiketten)
```

### 3.1 Stack

| Schicht | Technologie |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Mehrsprachigkeit | next-intl |
| Hosting Frontend | Vercel |
| Backend / CMS | WordPress + WooCommerce (Hostpoint) |
| Buchhaltung / Lager | Bexio |
| Versand | Post CH API |
| Zahlungen | Wallee (Karte + Twint) + BTCPay (Bitcoin) |

### 3.2 Zwei Shops, ein Bexio

| Shop | Frontend | WooCommerce | Bexio |
|---|---|---|---|
| Dezentralshop | next.dezentralshop.ch | dezentralshop.ch | Ein Account |
| Decentralheat | (später) | decentralheat.ch | Ein Account |

- Artikel in Bexio sind nach Shop getrennt
- Dezentralshop kann auch Produkte von Decentralheat verkaufen
- Bexio ist die einzige Wahrheit für Lagerbestände
- Decentralheat vorerst manuell in Bexio verbucht

---

## 4. Automatisierter Verkaufsablauf (Dezentralshop)

```
1. Kunde bestellt auf next.dezentralshop.ch
2. Next.js erstellt Order via WooCommerce REST API
3. Kunde bezahlt (Wallee / BTCPay / Twint)
4. WooCommerce meldet Bestellung an Bexio (Bexio Automator Plugin)
5. Bexio reduziert Lagerbestand um 1
6. Post CH API erkennt: bezahlt → generiert Versandetikett
7. Mitarbeiter packt, klebt Etikett, versendet
```

### Einkauf / Lagerauffüllung

```
1. Neue Ware wird eingekauft
2. Bestand wird in Bexio aktualisiert
3. WooCommerce synchronisiert Bestand von Bexio
```

---

## 5. Features

### 5.1 Must-Have (Phase 1 & 2)

- [ ] Produktliste mit Kategorien
- [ ] Filter (Preis, Grösse, Farbe, custom Attribute wie "Open Source", "Hardware Wallet")
- [ ] Volltextsuche
- [ ] Produktseiten mit Varianten und Bildergalerie
- [ ] Warenkorb
- [ ] Checkout (Gast-only, kein Login nötig)
- [ ] Zahlungsintegration: Wallee (Karte + Twint) + BTCPay (Bitcoin)
- [ ] 10% Bitcoin-Rabatt Logik
- [ ] Bestellbestätigung per E-Mail
- [ ] Blog / CMS Inhalte via WordPress REST API
- [ ] Editorial Commerce: Produkte und Blog-Content gemischt auf Archivseiten
- [ ] Marken-Landingpages (z.B. /marken/coldcard, /marken/seedor)
- [ ] Produkt-Feed API (JSON für externe Partner wie bitcoinassociation.ch)
- [ ] SEO: Meta-Tags, strukturierte Daten, sitemap.xml
- [ ] Google Analytics (sauber, DSGVO-konform)
- [ ] Google Merchant Center Feed

### 5.2 Must-Have (Phase 3)

- [ ] Mehrsprachigkeit: DE / FR / EN / IT
- [ ] SEO-Migration (bestehende URLs prüfen, Redirects einrichten)
- [ ] Yoast-Daten übernehmen (Meta-Titles, Descriptions)
- [ ] Rabattcodes / Gutscheine

### 5.3 Eigene Feature-Projekte (Phase 4+)

- [ ] **Newsletter Preference Center:** Kunden wählen selbst welche Benachrichtigungen sie wollen (Preisänderung Kategorie X, neuer Blog zu Thema Y etc.)
- [ ] **Referral-Programm:** Auszahlung in CHF oder Crypto, Dashboard für Kunden (Link per E-Mail, kein Login nötig)
- [ ] **Produkt-Feed API mit Partner-Management:** API-Keys pro Partner, Zugangskontrolle

### 5.4 Nice-to-Have

- [ ] Digitale Produkte (separater Fulfillment-Flow, kein Versandetikett)
- [ ] Wincher SEO-Integration
- [ ] EU-Fulfillment Dienstleister Anbindung (für spätere EU-Expansion)

---

## 6. Zahlungsarten

| Methode | Anbieter | Priorität |
|---|---|---|
| Bitcoin | BTCPay | Hauptzahlungsmittel der Kunden |
| Kreditkarte / Debit | Wallee | Wichtig |
| Twint | Wallee | Wichtig |

**Checkout-Flow:** Redirect zu Wallee / BTCPay, zurück zu next.dezentralshop.ch/danke  
**Wichtig:** Preisberechnung immer serverseitig, nie clientseitig

---

## 7. Mehrsprachigkeit

**Sprachen:** DE (Hauptsprache), FR, EN, IT  
**URL-Struktur:**
```
dezentralshop.ch/          → DE
dezentralshop.ch/fr/       → FR
dezentralshop.ch/en/       → EN
dezentralshop.ch/it/       → IT
```
**Technologie:** next-intl  
**Wichtig:** Von Tag 1 in der Architektur, nicht nachträglich einbauen

---

## 8. SEO

- Yoast Premium + Wincher läuft aktuell auf dezentralshop.ch
- Google Search Console aktiv
- Google Analytics vorhanden (chaotisch, beim Neuaufbau sauber aufsetzen)
- Bestehende Rankings unbekannt → vor Launch mit Search Console prüfen
- Alle bestehenden URLs müssen mit 301-Redirects erhalten bleiben
- Marken-Landingpages sind stärkster SEO-Hebel ("Coldcard Schweiz kaufen" etc.)

---

## 9. Externe Anbindungen

| System | Zweck | Status |
|---|---|---|
| Bexio | Lager, Buchhaltung | Läuft via Bexio Automator Plugin |
| Post CH API | Versandetiketten | Zu integrieren |
| BTCPay | Bitcoin-Zahlungen | Läuft, zu migrieren |
| Wallee | Karte + Twint | Läuft, zu migrieren |
| Google Merchant Center | Produkt-Feed | Läuft, zu migrieren |
| Bitcoin Association CH | Produkt-Feed Konsument | Läuft, URL anpassen |
| Google Analytics | Tracking | Läuft, neu aufzusetzen |
| Wincher | SEO Tracking | Läuft, zu migrieren |

---

## 10. Produkt-Feed API

Externe Websites können Produkte von Dezentralshop anzeigen und zum Checkout weiterleiten.

**Aktueller Konsument:** bitcoinassociation.ch  
**Geplant:** Mehrere Partner mit API-Keys  

**Endpunkt (geplant):**
```
GET next.dezentralshop.ch/api/feed/products
GET next.dezentralshop.ch/api/feed/products?brand=coldcard
GET next.dezentralshop.ch/api/feed/products?category=hardware-wallet
```

---

## 11. Marken-Landingpages

Hersteller können Schweizer Kunden direkt auf ihre Marken-Landingpage schicken.

**URL-Struktur:** dezentralshop.ch/marken/[marke]  
**Bekannte Marken:** Coldcard / Coinkite, Seedor, Bitaxe, 21energy, Avalon, OneKey, Xellox, SafeSeed  

**Inhalt pro Landingpage:**
- Marken-Story / Über die Marke
- Alle Produkte dieser Marke
- SEO-optimiert für "[Markenname] Schweiz kaufen"

---

## 12. Design-Referenz

**Referenz:** transa.ch  
**Charakteristik:** Viel Weissraum, starke Produktbilder, Filter die funktionieren, klare Typografie  
**Besonderheiten Dezentralshop:**
- Bitcoin-Preisanzeige in Sats neben CHF-Preis
- 10% Bitcoin-Rabatt prominent zeigen
- Team-Empfehlungen (Lex, Jonathan) als persönliches Element
- Tech-affine, Bitcoin-Community als Zielgruppe

---

## 13. Phasenplan

### Phase 1 – Fundament (Wochen 1–4)
- [ ] WooCommerce REST API Keys erstellen
- [ ] GitHub Repo `dezentralshop-frontend` erstellen
- [ ] Next.js Projekt initialisieren (TypeScript, Tailwind, App Router, next-intl)
- [ ] Vercel verbinden, Subdomain next.dezentralshop.ch einrichten
- [ ] Erste API-Verbindung: Produkte laden und anzeigen
- [ ] Basisstruktur Mehrsprachigkeit (DE zuerst, Struktur für FR/EN/IT)

### Phase 2 – Shop-Kern (Wochen 5–10)
- [ ] Produktliste mit Kategorien und Filtern
- [ ] Produktseiten mit Varianten und Bildergalerie
- [ ] Custom Attribute als Filter (Open Source, Hardware Wallet etc.)
- [ ] Warenkorb
- [ ] Checkout mit BTCPay + Wallee
- [ ] 10% Bitcoin-Rabatt Logik
- [ ] Blog-Integration via WordPress REST API
- [ ] Editorial Commerce (Produkte + Blog gemischt)
- [ ] Marken-Landingpages

### Phase 3 – Vollständigkeit (Wochen 11–18)
- [ ] Alle 4 Sprachen vollständig
- [ ] SEO-Audit bestehende URLs (Search Console)
- [ ] 301-Redirects einrichten
- [ ] Yoast Meta-Daten übernehmen
- [ ] Google Analytics sauber aufsetzen
- [ ] Google Merchant Center Feed
- [ ] Produkt-Feed API für externe Partner
- [ ] Rabattcodes
- [ ] Digitale Produkte Flow

### Phase 4 – Go Live
- [ ] dezentralshop.ch zeigt auf neues Frontend
- [ ] WordPress bleibt als reines Backend
- [ ] Monitoring, Fehler beheben

### Phase 5 – Eigene Features (nach Go Live)
- [ ] Newsletter Preference Center
- [ ] Referral-Programm mit Dashboard
- [ ] Partner API-Key Management
- [ ] Decentralheat als zweites Frontend

---

## 14. Offene Fragen

- [ ] Welche URLs ranken aktuell gut in Google? (Search Console prüfen)
- [ ] Wie genau funktioniert das bestehende Referral-Plugin? (Code anschauen)
- [ ] Welche Felder/Struktur liefert der aktuelle Produkt-Feed? (für Migration)
- [ ] Bexio → WooCommerce Bestandssync: Webhook oder Cron-Job?
- [ ] Post CH API: welche Integration läuft aktuell?

---

## 15. Wichtige Links

| Resource | URL |
|---|---|
| Live Shop | https://dezentralshop.ch |
| WooCommerce Admin | https://dezentralshop.ch/wp-admin |
| GitHub (geplant) | https://github.com/[org]/dezentralshop-frontend |
| Vercel (geplant) | next.dezentralshop.ch |
| Design Referenz | https://transa.ch |
| Bitcoin Association Feed | https://www.bitcoinassociation.ch/shop |

---

*Letzte Aktualisierung: April 2026*  
*Nächster Schritt: WooCommerce REST API Keys erstellen → GitHub Repo anlegen → Next.js initialisieren*
