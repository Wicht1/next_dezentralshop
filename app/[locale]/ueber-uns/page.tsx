export default async function UeberUnsPage(
  props: PageProps<"/[locale]/ueber-uns">
) {
  await props.params;
  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Über uns</h1>
      <p className="text-zinc-500 leading-relaxed mb-8">
        Wir sind Lex &amp; Jonathan – Bitcoin-Enthusiasten aus der Schweiz.
        Dezentralshop wurde gegründet um Bitcoin-Produkte in höchster Qualität
        zugänglich zu machen.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {["Lex", "Jonathan"].map((name) => (
          <div key={name} className="border border-zinc-200 rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-zinc-100 mb-4" />
            <p className="font-semibold">{name}</p>
            <p className="text-zinc-500 text-sm mt-1">Mitgründer</p>
          </div>
        ))}
      </div>
    </main>
  );
}
