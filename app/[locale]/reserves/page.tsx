export default async function ReservesPage(
  props: PageProps<"/[locale]/reserves">
) {
  await props.params;
  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        Proof of Reserves
      </h1>
      <p className="text-zinc-500 text-sm mb-10">
        On-chain verifizierbar. Kein Vertrauen nötig – typisch Bitcoin.
      </p>
      <div className="border border-zinc-200 rounded-xl p-6">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-sm text-zinc-500">BTC-Bestand</p>
          <p className="text-2xl font-mono font-semibold">— BTC</p>
        </div>
        <p className="text-xs text-zinc-400 font-mono break-all">
          Adresse: — (wird hier erscheinen)
        </p>
      </div>
      <p className="text-xs text-zinc-400 mt-6">
        Letztes Update: —
      </p>
    </main>
  );
}
