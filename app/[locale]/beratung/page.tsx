export default async function BeratungPage(
  props: PageProps<"/[locale]/beratung">
) {
  await props.params;
  return (
    <main className="max-w-2xl mx-auto px-8 py-12 text-center">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Beratung buchen
      </h1>
      <p className="text-zinc-500 leading-relaxed mb-10">
        Unsicher welches Produkt das richtige ist? Wir helfen dir. Kostenlose
        Beratung von Lex oder Jonathan – persönlich, per Video oder Chat.
      </p>
      <a
        href="https://cal.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Termin buchen <span aria-hidden>→</span>
      </a>
    </main>
  );
}
