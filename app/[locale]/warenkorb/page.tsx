export default async function WarenkorbPage(
  props: PageProps<"/[locale]/warenkorb">
) {
  const { locale } = await props.params;
  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Warenkorb</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-zinc-400 text-sm">Dein Warenkorb ist leer.</p>
        </div>
        <div className="border border-zinc-200 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Zusammenfassung</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-zinc-500">Zwischensumme</span>
            <span>CHF 0.00</span>
          </div>
          <div className="flex justify-between text-sm mb-4 text-orange-500">
            <span>Bitcoin-Rabatt (10%)</span>
            <span>– CHF 0.00</span>
          </div>
          <div className="border-t border-zinc-100 pt-4 flex justify-between font-semibold mb-6">
            <span>Total</span>
            <span>CHF 0.00</span>
          </div>
          <a
            href={`/${locale}/checkout`}
            className="block w-full text-center rounded-full bg-zinc-900 text-white py-3 text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            Zur Kasse
          </a>
        </div>
      </div>
    </main>
  );
}
