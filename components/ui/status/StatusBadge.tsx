import type { StatusState } from "@/lib/status";

const STATE_CLASSES: Record<StatusState, string> = {
  online: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warn: "border-amber-200 bg-amber-50 text-amber-700",
  down: "border-red-200 bg-red-50 text-red-700",
  unknown: "border-zinc-200 bg-zinc-50 text-zinc-500",
};

export default function StatusBadge({
  state,
  label,
}: {
  state: StatusState;
  label: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase ${STATE_CLASSES[state]}`}
    >
      {label}
    </span>
  );
}
