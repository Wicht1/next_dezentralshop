export default async function MarkePage(
  props: PageProps<"/[locale]/marken/[marke]">
) {
  const { marke } = await props.params;
  const markeName = marke.charAt(0).toUpperCase() + marke.slice(1);
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <p className="text-xs text-zinc-400 mb-2">Marken</p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">{markeName}</h1>
      <p className="text-zinc-500 max-w-2xl mb-12">
        {markeName} Produkte kaufen in der Schweiz – direkt bei Dezentralshop.
      </p>
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Alle {markeName} Produkte
        </h2>
        <p className="text-zinc-400 text-sm">Produkte werden hier erscheinen.</p>
      </div>
    </main>
  );
}
