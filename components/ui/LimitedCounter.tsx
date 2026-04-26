export default function LimitedCounter({
  left,
  total,
}: {
  left: number;
  total: number;
}) {
  const pct = (left / total) * 100;
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-[2px] w-16" style={{ background: "#e7e4df", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${pct}%`,
            background: "#f39320",
          }}
        />
      </div>
      <span
        className="font-mono tabular-nums"
        style={{ fontSize: 11, color: "#373939", letterSpacing: "0.04em" }}
      >
        noch {left}/{total}
      </span>
    </div>
  );
}
