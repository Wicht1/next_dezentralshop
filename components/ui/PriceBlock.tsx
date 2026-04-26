const SATS_PER_CHF = 1020;

function fmtChf(n: number) {
  return "CHF " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "’");
}

function fmtSats(s: number) {
  return s.toLocaleString("de-CH").replace(/\./g, "’") + " sats";
}

type Size = "sm" | "md" | "lg";

export default function PriceBlock({
  chf,
  size = "md",
  btcSave = false,
  btcSaveStyle = "compact",
}: {
  chf: number;
  size?: Size;
  btcSave?: boolean;
  btcSaveStyle?: "compact" | "detail";
}) {
  const sizes: Record<Size, { chf: number; sats: number }> = {
    sm: { chf: 15, sats: 11 },
    md: { chf: 18, sats: 12 },
    lg: { chf: 32, sats: 14 },
  };
  const s = sizes[size];
  const sats = Math.round(chf * SATS_PER_CHF);
  const saving = chf * 0.1;
  const chfWithBtc = chf - saving;
  const savingLabel =
    "CHF " + saving.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "’");

  if (btcSave && btcSaveStyle === "detail") {
    return (
      <div>
        <div className="flex items-baseline gap-3">
          <span
            className="font-semibold tabular-nums"
            style={{ fontSize: s.chf, color: "#0a0a0a", letterSpacing: "-0.01em" }}
          >
            {fmtChf(chf)}
          </span>
          <span className="font-mono tabular-nums" style={{ fontSize: s.sats, color: "#373939" }}>
            ≈ {fmtSats(sats)}
          </span>
        </div>
        <div
          className="mt-2.5 inline-flex items-center gap-2.5 px-3 py-1.5"
          style={{ background: "#f39320", color: "#0a0a0a" }}
        >
          <span className="font-bold" style={{ fontSize: 14 }}>
            ₿
          </span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            Mit Bitcoin nur {fmtChf(chfWithBtc)}
          </span>
          <span className="font-mono" style={{ fontSize: 11, opacity: 0.75 }}>
            Spare {savingLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span
        className="font-semibold tabular-nums"
        style={{ fontSize: s.chf, color: "#0a0a0a", letterSpacing: "-0.01em" }}
      >
        {fmtChf(chf)}
      </span>
      <span className="font-mono tabular-nums" style={{ fontSize: s.sats, color: "#373939" }}>
        ≈ {fmtSats(sats)}
      </span>
      {btcSave && (
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: s.sats, color: "#f39320", fontWeight: 700, letterSpacing: "0.02em" }}
        >
          −10% ₿
        </span>
      )}
    </div>
  );
}
