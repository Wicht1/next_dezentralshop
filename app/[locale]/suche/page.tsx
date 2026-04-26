export default async function SuchePage(props: PageProps<"/[locale]/suche">) {
  const { locale } = await props.params;
  const { q } = await props.searchParams;
  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Suche</h1>
      <form action={`/${locale}/suche`} method="get">
        <div className="flex gap-3 mb-10">
          <input
            name="q"
            type="search"
            defaultValue={q as string | undefined}
            placeholder="Hardware Wallet, Coldcard, Mining…"
            className="flex-1 border border-zinc-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-zinc-400"
          />
          <button
            type="submit"
            className="rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Suchen
          </button>
        </div>
      </form>
      {q ? (
        <p className="text-zinc-400 text-sm">
          Suchergebnisse für „{q}" werden hier erscheinen.
        </p>
      ) : (
        <p className="text-zinc-400 text-sm">Suchbegriff eingeben.</p>
      )}
    </main>
  );
}
