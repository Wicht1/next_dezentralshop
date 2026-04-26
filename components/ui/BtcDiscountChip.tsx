function fmtChf(n: number) {
  return "CHF " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export default function BtcDiscountChip({
  variant = "inline",
  chf,
}: {
  variant?: "inline" | "banner";
  chf?: number;
}) {
  const saving = chf ? chf * 0.1 : null;
  const savingLabel = saving != null ? fmtChf(saving) : null;

  if (variant === "banner") {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#fafafa", border: "1px solid #0a0a0a" }}
      >
        <div
          className="w-7 h-7 flex items-center justify-center font-bold"
          style={{ background: "#0a0a0a", color: "#f39320", fontSize: 14 }}
        >
          ₿
        </div>
        <div className="flex-1">
          <div style={{ fontSize: 13, color: "#0a0a0a", fontWeight: 500 }}>
            {savingLabel ? `Spare ${savingLabel} mit Bitcoin` : "Spare 10% mit Bitcoin"}
          </div>
          <div
            className="font-mono"
            style={{ fontSize: 11, color: "#373939", marginTop: 1 }}
          >
            On-chain oder Lightning · automatisch im Checkout
          </div>
        </div>
      </div>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono uppercase"
      style={{
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "#0a0a0a",
        padding: "3px 7px",
        background: "transparent",
        borderBottom: "1px solid #f39320",
      }}
    >
      <span style={{ color: "#f39320", fontWeight: 700 }}>BTC</span>
      <span>Spare {savingLabel ?? "10%"}</span>
    </span>
  );
}
