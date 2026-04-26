export default async function ProduktPage(
  props: PageProps<"/[locale]/shop/[slug]">
) {
  const { locale, slug } = await props.params;
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-zinc-100 rounded-2xl aspect-square flex items-center justify-center text-zinc-300 text-sm">
          Produktbild
        </div>
        <div>
          <p className="text-xs text-zinc-400 mb-2">Kategorie</p>
          <h1 className="text-3xl font-semibold tracking-tight mb-4">{slug}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold">CHF —</span>
            <span className="text-sm text-zinc-400">— sats</span>
            <span className="text-xs text-orange-500 font-medium ml-2">
              10% Bitcoin-Rabatt
            </span>
          </div>
          <div className="flex gap-3 mb-8">
            <button className="flex-1 rounded-full bg-zinc-900 text-white py-3 text-sm font-medium hover:bg-zinc-700 transition-colors">
              In den Warenkorb
            </button>
            <a
              href={`/${locale}/beratung`}
              className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              Beratung buchen
            </a>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Produktbeschreibung wird hier erscheinen.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
