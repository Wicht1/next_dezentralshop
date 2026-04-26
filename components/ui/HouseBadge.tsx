export default function HouseBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 font-mono uppercase"
      style={{
        fontSize: 9,
        letterSpacing: "0.14em",
        color: "#0a0a0a",
        background: "#fafafa",
        border: "1px solid #0a0a0a",
        padding: "3px 7px",
      }}
    >
      <span className="inline-block w-1 h-1" style={{ background: "#f39320" }} />
      Made by Dezentralshop
    </div>
  );
}
