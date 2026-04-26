export default async function DankePage(props: PageProps<"/[locale]/danke">) {
  const { locale } = await props.params;
  const { bestellung } = await props.searchParams;
  return (
    <main className="max-w-2xl mx-auto px-8 py-24 text-center">
      <div className="text-5xl mb-6 select-none">✓</div>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        Vielen Dank für deine Bestellung!
      </h1>
      {bestellung && (
        <p className="text-zinc-500 text-sm mb-2">
          Bestellnummer: <span className="font-mono text-zinc-700">{bestellung}</span>
        </p>
      )}
      <p className="text-zinc-500 mb-10 leading-relaxed">
        Wir haben deine Bestellung erhalten und bestätigen sie per E-Mail. Bei
        Fragen erreichst du uns jederzeit.
      </p>
      <a
        href={`/${locale}/shop`}
        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Weiter shoppen <span aria-hidden>→</span>
      </a>
    </main>
  );
}
