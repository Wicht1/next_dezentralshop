export default async function ShopPage(props: PageProps<"/[locale]/shop">) {
  const { locale } = await props.params;
  const { kategorie, marke, sortierung } = await props.searchParams;
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Shop</h1>
      <p className="text-zinc-500 text-sm mb-8">
        Alle Bitcoin-Produkte auf einen Blick.
      </p>
      <div className="flex gap-8">
        <aside className="w-56 shrink-0">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Filter
          </p>
          <p className="text-zinc-400 text-sm">Filter werden hier erscheinen.</p>
        </aside>
        <div className="flex-1">
          <p className="text-zinc-400 text-sm">Produkte werden hier erscheinen.</p>
        </div>
      </div>
    </main>
  );
}
