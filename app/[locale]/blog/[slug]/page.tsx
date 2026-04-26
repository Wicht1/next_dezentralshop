export default async function BlogPostPage(
  props: PageProps<"/[locale]/blog/[slug]">
) {
  const { slug } = await props.params;
  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <p className="text-xs text-zinc-400 mb-4">Blog</p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4 leading-tight">
        {slug.replace(/-/g, " ")}
      </h1>
      <div className="flex items-center gap-4 text-xs text-zinc-400 mb-10">
        <span>Dezentralshop</span>
        <span>—</span>
        <span>Datum</span>
      </div>
      <div className="prose prose-zinc max-w-none">
        <p className="text-zinc-400">Inhalt wird hier erscheinen.</p>
      </div>
    </main>
  );
}
