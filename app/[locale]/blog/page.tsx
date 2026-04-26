export default async function BlogPage(props: PageProps<"/[locale]/blog">) {
  const { locale } = await props.params;
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Blog</h1>
      <p className="text-zinc-500 text-sm mb-10">
        Guides, News und Hintergründe rund um Bitcoin.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <p className="text-zinc-400 text-sm col-span-3">
          Blogposts werden hier erscheinen.
        </p>
      </div>
    </main>
  );
}
