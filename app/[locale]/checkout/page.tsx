export default async function CheckoutPage(
  props: PageProps<"/[locale]/checkout">
) {
  await props.params;
  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Kasse</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-semibold mb-4">Lieferadresse</h2>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400">Vorname</div>
              <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400">Nachname</div>
            </div>
            <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400">E-Mail</div>
            <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400">Strasse &amp; Hausnummer</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400">PLZ</div>
              <div className="border border-zinc-200 rounded-lg px-4 py-3 text-sm text-zinc-400 col-span-2">Ort</div>
            </div>
          </div>

          <h2 className="font-semibold mt-8 mb-4">Zahlung</h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 border border-zinc-200 rounded-lg px-4 py-3 cursor-pointer hover:border-orange-400 transition-colors">
              <input type="radio" name="payment" value="bitcoin" className="accent-orange-500" />
              <span className="text-sm font-medium">₿ Bitcoin</span>
              <span className="ml-auto text-xs text-orange-500 font-medium">10% Rabatt</span>
            </label>
            <label className="flex items-center gap-3 border border-zinc-200 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-400 transition-colors">
              <input type="radio" name="payment" value="card" className="accent-zinc-900" />
              <span className="text-sm font-medium">Kreditkarte / Debit</span>
            </label>
            <label className="flex items-center gap-3 border border-zinc-200 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-400 transition-colors">
              <input type="radio" name="payment" value="twint" className="accent-zinc-900" />
              <span className="text-sm font-medium">TWINT</span>
            </label>
          </div>
        </div>

        <div className="border border-zinc-200 rounded-xl p-6 h-fit">
          <h2 className="font-semibold mb-4">Bestellung</h2>
          <p className="text-zinc-400 text-sm mb-6">Warenkorb leer.</p>
          <button className="w-full rounded-full bg-zinc-900 text-white py-3 text-sm font-medium hover:bg-zinc-700 transition-colors">
            Kostenpflichtig bestellen
          </button>
        </div>
      </div>
    </main>
  );
}
