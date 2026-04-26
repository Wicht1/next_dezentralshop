const DIENSTE = [
  { name: "BTCPay Server", typ: "selbst gehostet", ok: true },
  { name: "WordPress / WooCommerce", typ: "Hostpoint (CH)", ok: true },
  { name: "Vercel (Frontend)", typ: "zentral", ok: null },
  { name: "Bexio", typ: "zentral", ok: null },
  { name: "Wallee", typ: "zentral", ok: null },
  { name: "Post CH API", typ: "zentral", ok: null },
];

export default async function StatusPage(props: PageProps<"/[locale]/status">) {
  await props.params;
  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Status &amp; Transparenz</h1>
      <p className="text-zinc-500 text-sm mb-10">
        Pragmatisch ehrlich. Nicht alles ist dezentral – aber wir zeigen was ist.
      </p>
      <div className="flex flex-col gap-3">
        {DIENSTE.map((dienst) => (
          <div
            key={dienst.name}
            className="flex items-center justify-between border border-zinc-100 rounded-xl px-5 py-4"
          >
            <div>
              <p className="text-sm font-medium">{dienst.name}</p>
              <p className="text-xs text-zinc-400">{dienst.typ}</p>
            </div>
            <span className="text-lg">
              {dienst.ok === true ? "✅" : dienst.ok === false ? "❌" : "⚠️"}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xs text-zinc-400 leading-relaxed">
        <p>✅ Selbst gehostet &nbsp;|&nbsp; ⚠️ Zentral &nbsp;|&nbsp; ❌ Problem</p>
      </div>
    </main>
  );
}
