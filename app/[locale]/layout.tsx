import Link from "next/link";

export async function generateStaticParams() {
  return [{ locale: "de" }, { locale: "fr" }, { locale: "en" }, { locale: "it" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  return (
    <>
      <header className="px-8 py-4 border-b border-zinc-100 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-lg font-semibold tracking-tight"
        >
          dezentralshop
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
          <Link href={`/${locale}/shop`} className="hover:text-zinc-900 transition-colors">
            Shop
          </Link>
          <Link href={`/${locale}/marken`} className="hover:text-zinc-900 transition-colors">
            Marken
          </Link>
          <Link href={`/${locale}/blog`} className="hover:text-zinc-900 transition-colors">
            Blog
          </Link>
          <Link href={`/${locale}/beratung`} className="hover:text-zinc-900 transition-colors">
            Beratung
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link href={`/${locale}/suche`} className="text-zinc-500 hover:text-zinc-900 transition-colors">
            Suche
          </Link>
          <Link
            href={`/${locale}/warenkorb`}
            className="rounded-full bg-zinc-900 text-white px-4 py-2 text-xs font-medium hover:bg-zinc-700 transition-colors"
          >
            Warenkorb
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="px-8 py-8 border-t border-zinc-100 text-xs text-zinc-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <p className="font-semibold text-zinc-700 mb-1">dezentralshop</p>
            <p>Bitcoin-Produkte aus der Schweiz.</p>
            <p>10% Rabatt bei Zahlung mit Bitcoin.</p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/ueber-uns`} className="hover:text-zinc-700">Über uns</Link>
              <Link href={`/${locale}/beratung`} className="hover:text-zinc-700">Beratung</Link>
              <Link href={`/${locale}/status`} className="hover:text-zinc-700">Status</Link>
              <Link href={`/${locale}/reserves`} className="hover:text-zinc-700">Reserves</Link>
            </div>
            <div className="flex flex-col gap-2">
              <a href="https://dezentralshop.ch" className="hover:text-zinc-700">Aktueller Shop</a>
              <a
                href="https://github.com/Wicht1/next_dezentralshop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-700"
              >
                GitHub (Open Source)
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-zinc-100">
          <p>© 2026 Dezentralshop. Betrieben von Lex &amp; Jonathan.</p>
        </div>
      </footer>
    </>
  );
}
