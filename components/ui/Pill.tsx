type PillVariant = "outline" | "solid" | "orange" | "cream";

export default function Pill({
  children,
  variant = "outline",
}: {
  children: React.ReactNode;
  variant?: PillVariant;
}) {
  const styles: Record<PillVariant, React.CSSProperties> = {
    solid: { background: "#0a0a0a", color: "#fafafa" },
    orange: { background: "#f39320", color: "#0a0a0a" },
    cream: { background: "#f4f2ee", color: "#0a0a0a" },
    outline: { border: "1px solid #e7e4df", color: "#0a0a0a", background: "transparent" },
  };

  return (
    <span
      className="inline-flex items-center font-mono uppercase"
      style={{
        ...styles[variant],
        fontSize: 10,
        letterSpacing: "0.14em",
        padding: "4px 8px",
      }}
    >
      {children}
    </span>
  );
}
