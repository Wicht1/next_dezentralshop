import StatusEntryItem from "@/components/ui/status/StatusEntryItem";
import { getDictionary } from "@/lib/dictionaries";
import { formatStatusRenderedAt, getStatusPageData } from "@/lib/status";

export const revalidate = 30;

export default async function StatusPage(props: PageProps<"/[locale]/status">) {
  const { locale } = await props.params;
  const dictionary = await getDictionary(locale);
  const { renderedAt, entries } = await getStatusPageData(locale);
  const copy = dictionary.status;

  return (
    <main className="max-w-2xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        {copy.title}
      </h1>
      <p className="text-zinc-500 text-sm mb-4">{copy.intro}</p>
      <p className="text-xs text-zinc-400 mb-10">
        {copy.lastUpdate}: {formatStatusRenderedAt(renderedAt, locale)}
      </p>

      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <StatusEntryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </main>
  );
}
