import Link from "next/link";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  return (
    <main>
      <section className="px-8 py-24 text-center">
        <div className="mb-8 text-5xl select-none">₿</div>
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          Bitcoin-Produkte in höchster Qualität
        </h1>
        <p className="text-zinc-500 text-xl max-w-xl mx-auto leading-relaxed mb-10">
          Hardware Wallets, Mining, Bücher &amp; Accessoires –{" "}
          <span className="text-zinc-900 font-medium">
            10&nbsp;% Rabatt bei Zahlung mit Bitcoin.
          </span>
        </p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          Zum Shop <span aria-hidden>→</span>
        </Link>
      </section>

      <section className="px-8 py-16 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Kategorien</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Hardware Wallets", "Mining", "Bücher", "Bekleidung"].map((cat) => (
              <Link
                key={cat}
                href={`/${locale}/shop`}
                className="border border-zinc-200 rounded-xl p-6 hover:border-zinc-400 transition-colors text-sm font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-16 border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Empfehlung des Monats</h2>
          <p className="text-zinc-500 text-sm mb-8">von Lex &amp; Jonathan</p>
          <p className="text-zinc-400 text-sm">Produkte werden hier erscheinen.</p>
        </div>
      </section>
    </main>
  );
}
