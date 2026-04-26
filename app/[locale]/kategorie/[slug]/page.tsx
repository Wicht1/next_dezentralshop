export default async function KategoriePage(
  props: PageProps<"/[locale]/kategorie/[slug]">
) {
  const { slug } = await props.params;
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-zinc-500 text-sm mb-8">Alle Produkte in dieser Kategorie.</p>
      <p className="text-zinc-400 text-sm">Produkte werden hier erscheinen.</p>
    </main>
  );
}
