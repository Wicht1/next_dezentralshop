import Link from "next/link";
import type { StatusEntry } from "@/lib/status";
import StatusBadge from "@/components/ui/status/StatusBadge";

export default function StatusEntryItem({ entry }: { entry: StatusEntry }) {
  return (
    <article className="border border-zinc-100 rounded-xl px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium">{entry.title}</h2>
          <p className="text-xs text-zinc-400 mt-1">{entry.source}</p>
        </div>
        <StatusBadge state={entry.state} label={entry.stateLabel} />
      </div>

      {entry.primaryValue && (
        <p className="mt-4 text-2xl font-mono font-semibold tracking-tight">
          {entry.primaryValue}
        </p>
      )}

      {entry.rows && entry.rows.length > 0 && (
        <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 text-sm">
          {entry.rows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-zinc-500">{row.label}</dt>
              <dd className="font-medium text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {entry.events && entry.events.length > 0 && (
        <ul className="mt-4 space-y-3">
          {entry.events.map((event) => (
            <li key={`${event.when}-${event.title}`} className="text-sm">
              <p className="font-medium">
                {event.url ? (
                  <Link
                    href={event.url}
                    className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {event.title}
                  </Link>
                ) : (
                  event.title
                )}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{event.when}</p>
              {event.location && (
                <p className="text-xs text-zinc-400 mt-0.5">{event.location}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {entry.note && (
        <p className="mt-4 text-xs text-zinc-500 leading-relaxed">{entry.note}</p>
      )}

      {entry.links && entry.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {entry.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
