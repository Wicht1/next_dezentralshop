import Link from "next/link";

const MARKEN = [
  "coldcard",
  "seedor",
  "bitaxe",
  "21energy",
  "avalon",
  "onekey",
  "xellox",
  "safeseed",
];

export default async function MarkenPage(props: PageProps<"/[locale]/marken">) {
  const { locale } = await props.params;
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Marken</h1>
      <p className="text-zinc-500 text-sm mb-10">
        Unsere Hersteller – direkte Anlaufstellen für Bitcoin-Hardware.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MARKEN.map((marke) => (
          <Link
            key={marke}
            href={`/${locale}/marken/${marke}`}
            className="border border-zinc-200 rounded-xl p-6 hover:border-zinc-400 transition-colors"
          >
            <p className="text-sm font-semibold capitalize">{marke}</p>
            <p className="text-xs text-zinc-400 mt-1">Produkte ansehen →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
